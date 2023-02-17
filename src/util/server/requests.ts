import type { RequestHandlerOutput } from '@sveltejs/kit';
import { getConnectedUser, type ConnectedUser } from './auth';
import {
  isObject,
  hasObjectAttribute,
  isObjectValueContained,
  isString,
  stringToHash
} from '../common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

declare type Replace<T extends AnyObject, K extends keyof T, U> = Omit<T, K> & { [k in K]: U };

export interface RequestEvent<Params extends AnyObject, Body> {
  clientAddress: string;
  locals: App.Locals;
  params: Params;
  platform: Readonly<App.Platform>;
  request: Replace<Request, 'json', () => Promise<Body>>;
  routeId: string | null;
  url: URL;
}

export type RequestHandler<Params extends AnyObject, Body, Output> = (
  event: RequestEvent<Params, Body>,
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

  getCode() {
    return this.code;
  }

  static ok() {
    return new this(200, 'OK');
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

  static methodNotAllowed() {
    return new this(405, 'Method not allowed');
  }

  static serverError() {
    return new this(500, 'Internal server error');
  }
}

type OutputError = { message: string; errors?: BadRequestParam[] };

const authorizeMap: Record<
  'logged' | 'self' | 'admin',
  (auth: ConnectedUser | null, event: RequestEvent<AnyObject, unknown>) => boolean
> = {
  logged: (auth) => !!auth,
  self: (auth, event) =>
    (!!auth && event.params.uid === auth.user.id) || auth?.user.level.name === 'admin',
  admin: (auth) => auth?.user.level.name === 'admin'
};

export const handleRequest =
  <Params extends AnyObject = never, Body = never, Output = never>(
    logState: null | keyof typeof authorizeMap,
    fn: RequestHandler<Params, Body, Output>
  ) =>
  async (
    event: RequestEvent<Params, Body>
  ): Promise<RequestHandlerOutput<Output | OutputError>> => {
    try {
      let userAuth: ConnectedUser | null = null;
      if (logState) {
        userAuth = await getConnectedUser(event);
        const verifyAuth = authorizeMap[logState];
        if (!verifyAuth?.(userAuth, event)) throw HttpCode.forbidden();
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await fn(event, userAuth!);
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
        if (code === 400 && isString(cause)) {
          return {
            status: 302,
            headers: { location: cause },
            body: { message }
          };
        }
        if (code === 302 && isBadRequestParamList(cause)) {
          return {
            status: 302,
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

export const stringToHashPepper = (text: string) => stringToHash(PEPPER + text);
