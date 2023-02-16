import type { AnyObject } from './ambient';
import { generateHash } from './string';

export const isObject = (el: unknown): el is AnyObject => el !== null && typeof el === 'object';

export const hasObjectAttribute = <T extends AnyObject, F extends string>(
  obj: T,
  field: F
): obj is T & { [f in F]: unknown } => field in obj;

export const isObjectValueContained = <T extends AnyObject, F extends string, L>(
  obj: T,
  field: F,
  list: L[] | readonly L[]
): obj is T & { [f in F]: L } => hasObjectAttribute(obj, field) && list.includes(obj[field] as L);

export const objectReduce = <T extends AnyObject, R>(
  obj: T,
  reducer: (acc: R, item: T[keyof T], key: keyof T, all: T) => R,
  init: R
): R =>
  (Object.keys(obj) as (keyof T)[]).reduce((acc, key) => reducer(acc, obj[key], key, obj), init);

export const objectMap = <T extends AnyObject, R>(
  obj: T,
  mapper: (item: T[keyof T], key: keyof T, all: T) => R
): Record<keyof T, R> =>
  objectReduce(
    obj,
    (acc, item, key) => {
      acc[key] = mapper(item, key, obj);
      return acc;
    },
    {} as Record<keyof T, R>
  );

export const objectPick = <T extends AnyObject, K extends string = keyof T & string>(
  object: T,
  keys: K[]
) =>
  keys.reduce((acc, key) => {
    if (key in object) {
      acc[key] = object[key];
    }
    return acc;
  }, {} as Pick<T, K>);

export const objectToToken = (obj: AnyObject) =>
  Buffer.from(JSON.stringify({ typ: 'JWT' })).toString('base64') +
  '.' +
  Buffer.from(JSON.stringify(obj)).toString('base64') +
  '.' +
  Buffer.from(generateHash()).toString('base64');

export const objectKeys = <T extends AnyObject>(obj: T) =>
  Object.keys(obj) as unknown as (keyof T & string)[];

export const objectRemoveUndefined = <T extends AnyObject>(obj: T) =>
  objectKeys(obj).reduce((acc, key) => {
    if (obj[key] !== undefined) acc[key] = obj[key];
    return acc;
  }, {} as T) as { [k in keyof T]-?: NonNullable<T[k]> };
