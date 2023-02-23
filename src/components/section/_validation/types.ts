import type { AnyObject } from '../../../util/common';

export const isObject = (el: unknown): el is AnyObject => !!el && typeof el === 'object';
export const isString = <R extends string = string>(el: unknown): el is R => typeof el === 'string';
export const isStringList = <R extends string = string>(el: unknown): el is R[] =>
  Array.isArray(el) && !el.find((item) => !isString(item));
