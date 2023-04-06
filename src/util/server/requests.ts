/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandlerOutput } from '@sveltejs/kit';
import { getConnectedUser, type ConnectedUser } from './auth';
import {
  isObject,
  hasObjectAttribute,
  isObjectValueContained,
  isString,
  tryParseJson,
  type AnyObject
} from '../common';
import { makeCache, type CacheHandler } from './cache';
import { stringToHashSalt } from '../common/string';

declare type Replace<T, K extends keyof T, U> = Omit<T, K> & { [k in K]: U };

export interface RequestEvent<Params extends AnyObject, SearchParams extends AnyObject, Body> {
  clientAddress: string;
  locals: App.Locals;
  params: Params;
  searchParams: SearchParams;
  platform: Readonly<App.Platform>;
  request: Replace<Request, 'json', () => Promise<Body>>;
  routeId: string | null;
  url: URL;
}

export type RequestHandler<
  Params extends AnyObject,
  SearchParams extends AnyObject,
  Body,
  Output
> = (
  event: RequestEvent<Params, SearchParams, Body>,
  userAuth: ConnectedUser | null
) => Promise<RequestHandlerOutput<Output>>;

const badRequestParamLocations = [
  'method',
  'url',
  'header',
  'body',
  'authentication',
  'permission'
] as const;

type BadRequestParamLocation = typeof badRequestParamLocations[number] & string;

export type BadRequestParam = {
  location: BadRequestParamLocation;
  field: string;
  value: unknown;
  message: string;
};

const isBadRequestParam = (el: unknown): el is BadRequestParam =>
  isObject(el) &&
  isObjectValueContained(el, 'location', badRequestParamLocations) &&
  hasObjectAttribute(el, 'field') &&
  hasObjectAttribute(el, 'value') &&
  hasObjectAttribute(el, 'message') &&
  isString(el.field) &&
  isString(el.message);

const isBadRequestParamList = (el: unknown): el is BadRequestParam[] =>
  Array.isArray(el) && !el.find((item) => !isBadRequestParam(item));

const appendHeader = (response: RequestHandlerOutput<any>, field: string, value: string) => {
  if (response.headers) {
    if (response.headers instanceof Headers) {
      response.headers.append(field, value);
    } else if (isObject(response.headers)) {
      response.headers[field] = value;
    }
  } else {
    response.headers = { [field]: value };
  }
};

export class HttpCode extends Error {
  public code;

  constructor(code = 500, message = 'Unexpected error', options?: ErrorOptions) {
    super(message, options);
    this.code = code;
  }

  static noContent() {
    return new this(204, 'No content');
  }

  static redirect(to: string) {
    return new this(302, 'Found', { cause: to });
  }

  static badRequest(errors: BadRequestParam[]) {
    return new this(400, 'Bad request', { cause: errors });
  }

  static forbidden() {
    return new this(403, 'Forbidden');
  }

  static notFound() {
    return new this(404, 'Not found');
  }

  static serverError() {
    return new this(500, 'Internal server error');
  }
}

type OutputError = { message: string; errors?: BadRequestParam[] };

type AuthorizeCallback<Params extends AnyObject, SearchParams extends AnyObject, Body> = (
  event: RequestEvent<Params, SearchParams, Body>,
  auth: ConnectedUser | null
) => boolean;

type CachePropsCallback<
  F extends string,
  Params extends AnyObject,
  SearchParams extends AnyObject,
  Body
> = (
  event: RequestEvent<Params, SearchParams, Body>,
  auth: ConnectedUser | null
) => AnyObject<F, string> | Promise<AnyObject<F, string>>;

type CacheInvalidate = {
  outputType: string;
  props: AnyObject<string, string>;
};

type CacheInvalidateCallback<Params extends AnyObject, SearchParams extends AnyObject, Body> = (
  event: RequestEvent<Params, SearchParams, Body>,
  auth: ConnectedUser | null
) => CacheInvalidate[] | Promise<CacheInvalidate[]>;

type CacheSettingsAction = 'read' | 'remove' | 'replace';

type CacheSettings<
  F extends string | undefined,
  Params extends AnyObject,
  SearchParams extends AnyObject,
  Body
> = {
  outputType?: string;
  fields?: readonly F[];
  getCacheProps?: F extends string ? CachePropsCallback<F, Params, SearchParams, Body> : never;
  invalidateCaches?: CacheInvalidateCallback<Params, SearchParams, Body>;
  action?: CacheSettingsAction;
};

const readParams = async <
  Config extends {
    PathParams?: AnyObject;
    SearchParams?: AnyObject;
    Body?: AnyObject;
    Output?: unknown;
    CacheField?: string;
  }
>(
  rawEvent: RequestEvent<
    Config['PathParams'] & AnyObject,
    Config['SearchParams'] & AnyObject,
    Config['Body']
  >,
  logState: null | keyof typeof authorizeMap,
  cacheSettings?: CacheSettings<
    Config['CacheField'],
    Config['PathParams'] & AnyObject,
    Config['SearchParams'] & AnyObject,
    Config['Body']
  >
) => {
  const searchParams = Array.from(rawEvent.url.searchParams.keys()).reduce((acc, key) => {
    acc[key] = tryParseJson(rawEvent.url.searchParams.get(key) ?? '');
    return acc;
  }, {} as AnyObject);
  const event = Object.assign({}, rawEvent, { searchParams });
  let userAuthentication: ConnectedUser | null = null;
  if (cacheSettings?.getCacheProps || cacheSettings?.invalidateCaches || logState) {
    userAuthentication = await getConnectedUser(rawEvent.locals.userid);
  }

  return { event, userAuthentication };
};

const invalidateCache = async (targetCache: CacheInvalidate) => {
  const cache = await makeCache(
    targetCache.outputType,
    Object.keys(targetCache.props),
    targetCache.props
  );
  await cache.remove();
};

const getMathingCache = async <
  Config extends {
    PathParams?: AnyObject;
    SearchParams?: AnyObject;
    Body?: AnyObject;
    Output?: unknown;
    CacheField?: string;
  }
>(
  event: RequestEvent<
    Config['PathParams'] & AnyObject,
    Config['SearchParams'] & AnyObject,
    Config['Body']
  >,
  userAuthentication: ConnectedUser | null,
  cacheSettings?: CacheSettings<
    Config['CacheField'],
    Config['PathParams'] & AnyObject,
    Config['SearchParams'] & AnyObject,
    Config['Body']
  >
) => {
  let cache: null | CacheHandler<Config['Output']> = null;
  if (cacheSettings) {
    const invalidateCacheList = await cacheSettings.invalidateCaches?.(event, userAuthentication);
    if (invalidateCacheList?.length) {
      await Promise.all(invalidateCacheList.map(invalidateCache));
    }
    if (cacheSettings.outputType && cacheSettings.action) {
      cache = await makeCache(
        cacheSettings.outputType,
        (cacheSettings.fields ?? []) as readonly string[],
        await cacheSettings.getCacheProps?.(event, userAuthentication)
      );
      if (cacheSettings.action === 'read') {
        const cacheData: Config['Output'] | null = await cache.read();
        return { cache, cacheData };
      }
    }
  }
  return { cache, cacheData: null };
};

const manageHttpCode = (httpCode: HttpCode) => {
  const code = httpCode.code;
  const message = httpCode.message;
  const cause = httpCode.cause;
  if (code === 302 && isString(cause)) {
    return {
      status: 302,
      headers: { location: cause },
      body: { message }
    };
  }
  if (code === 400 && isBadRequestParamList(cause)) {
    return {
      status: 400,
      body: {
        message,
        errors: cause
      }
    };
  }
  return {
    status: code,
    body: { message }
  };
};

const authorizeMap: Record<
  'logged' | 'self' | 'admin',
  AuthorizeCallback<AnyObject, AnyObject, unknown>
> = {
  logged: (_, auth) => !!auth,
  self: (event, auth) =>
    (!!auth && event.params.uid === auth.user.id) || auth?.user.level.name === 'admin',
  admin: (_, auth) => auth?.user.level.name === 'admin'
};

export const handleRequest =
  <
    Config extends {
      PathParams?: AnyObject;
      SearchParams?: AnyObject;
      Body?: AnyObject;
      Output?: unknown;
      CacheField?: string;
    }
  >(
    logState: null | keyof typeof authorizeMap,
    fn: RequestHandler<
      Config['PathParams'] & AnyObject,
      Config['SearchParams'] & AnyObject,
      Config['Body'],
      Config['Output']
    >,
    cacheSettings?: CacheSettings<
      Config['CacheField'],
      Config['PathParams'] & AnyObject,
      Config['SearchParams'] & AnyObject,
      Config['Body']
    >
  ) =>
  async (
    rawEvent: RequestEvent<
      Config['PathParams'] & AnyObject,
      Config['SearchParams'] & AnyObject,
      Config['Body']
    >
  ): Promise<RequestHandlerOutput<Config['Output'] | OutputError>> => {
    try {
      const { event, userAuthentication } = await readParams(rawEvent, logState, cacheSettings);
      const { cache, cacheData } = await getMathingCache(event, userAuthentication, cacheSettings);
      if (cache && cacheData && cacheSettings?.action === 'read') {
        const response = { body: cacheData } as RequestHandlerOutput<Config['Output']>;
        appendHeader(response, 'x-cache-action', `load; lastUpdateAt=${cache.updatedAt}`);
        return response;
      }

      // verify authorization
      if (logState) {
        const verifyAuthorization = authorizeMap[logState];
        if (!verifyAuthorization?.(event, userAuthentication)) throw HttpCode.forbidden();
      }

      // execute handler
      const output = await fn(event, userAuthentication);

      // write cache for next same request
      if (cacheSettings && cache) {
        if (cacheSettings?.action === 'remove') {
          appendHeader(output, 'x-cache-action', `remove; lastUpdateAt=${cache.updatedAt}`);
          await cache.remove();
        } else if (output.body) {
          if (cache.exists) {
            appendHeader(output, 'x-cache-action', `replace; lastUpdateAt=${cache.updatedAt}`);
          } else {
            appendHeader(output, 'x-cache-action', 'create');
          }
          await cache.write(output.body);
        }
      }

      // send
      return output;
    } catch (error) {
      // expected errors are managed for sending a valid output
      if (error instanceof HttpCode) {
        return manageHttpCode(error);
      }

      // unexpected errors always send a server error
      return {
        status: 500,
        body: { message: `${error}` }
      };
    }
  };

const PEPPER = process?.env.PEPPER || '';

export const stringToHashPepper = (text: string) => stringToHashSalt(PEPPER + text, 32);
