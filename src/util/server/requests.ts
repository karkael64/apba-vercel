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
  auth: ConnectedUser | null,
  event: RequestEvent<Params, SearchParams, Body>
) => boolean;

type CachePropsCallback<
  F extends string,
  Params extends AnyObject,
  SearchParams extends AnyObject,
  Body
> = (
  auth: ConnectedUser | null,
  event: RequestEvent<Params, SearchParams, Body>
) => AnyObject<F, string>;

type CacheSettings<
  F extends string | undefined,
  Params extends AnyObject,
  SearchParams extends AnyObject,
  Body
> = {
  outputType: string;
  fields?: readonly F[];
  getCacheProps?: F extends string ? CachePropsCallback<F, Params, SearchParams, Body> : never;
  shouldRemove?: boolean;
};

const authorizeMap: Record<
  'logged' | 'self' | 'admin',
  AuthorizeCallback<AnyObject, AnyObject, unknown>
> = {
  logged: (auth) => !!auth,
  self: (auth, event) =>
    (!!auth && event.params.uid === auth.user.id) || auth?.user.level.name === 'admin',
  admin: (auth) => auth?.user.level.name === 'admin'
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
    event: RequestEvent<
      Config['PathParams'] & AnyObject,
      Config['SearchParams'] & AnyObject,
      Config['Body']
    >
  ): Promise<RequestHandlerOutput<Config['Output'] | OutputError>> => {
    try {
      const searchParams = Array.from(event.url.searchParams.keys()).reduce((acc, key) => {
        acc[key] = tryParseJson(event.url.searchParams.get(key) ?? '');
        return acc;
      }, {} as AnyObject);
      const eventWithParams = Object.assign({}, event, { searchParams });
      let userAuth: ConnectedUser | null = null;
      if (cacheSettings?.getCacheProps || logState) {
        userAuth = await getConnectedUser(event.locals.userid);
      }
      let cache: null | CacheHandler = null;
      if (cacheSettings) {
        cache = makeCache(
          cacheSettings.outputType,
          (cacheSettings.fields ?? []) as readonly string[],
          cacheSettings.getCacheProps?.(userAuth, eventWithParams) ??
            ({} as AnyObject<Config['CacheField'] & string, string>)
        );
        const cacheData = (await cache.read()) as Config['Output'] | null;
        if (cacheData) {
          return { body: cacheData } as RequestHandlerOutput<Config['Output']>;
        }
      }
      if (logState) {
        const verifyAuth = authorizeMap[logState];
        if (!verifyAuth?.(userAuth, eventWithParams)) throw HttpCode.forbidden();
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const output = await fn(eventWithParams, userAuth!);
      if (cache) {
        if (cacheSettings?.shouldRemove) {
          await cache.remove();
        } else {
          await cache.write(output.body);
        }
      }
      return output;
    } catch (error) {
      if (error instanceof HttpCode) {
        const code = error.code;
        const message = error.message;
        const cause = error.cause;
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
      }
      return {
        status: 500,
        body: { message: `${error}` }
      };
    }
  };

const PEPPER = process?.env.PEPPER || '';

export const stringToHashPepper = (text: string) => stringToHashSalt(PEPPER + text, 32);
