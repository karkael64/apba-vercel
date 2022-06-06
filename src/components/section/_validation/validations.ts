import type { AnyObject } from 'src/components/common/ambient';
import { isString, isStringList } from './types';

export const hasString = <R extends string, T extends AnyObject, K extends string>(
  el: T,
  key: K
): el is T & { [k in K]?: R } => isString(el[key]);

export const hasStringList = <R extends string, T extends AnyObject, K extends string>(
  el: T,
  key: K
): el is T & { [k in K]?: R[] } => isStringList(el[key]);

export const hasOptionalString = <T extends AnyObject, K extends string>(
  el: T,
  key: K
): el is T & { [k in K]?: string } => !(key in el) || isString(el[key]);

export const hasOptionalBetween = <T extends AnyObject, K extends string, S>(
  el: T,
  key: K,
  values: readonly S[]
): el is T & { [k in K]?: S } => !(key in el) || values.includes(el[key]);
