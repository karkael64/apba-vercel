/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObject<K extends string | number = string | number, T = any> = Record<K, T>;
export type AnyArray<T = any> = T[];
