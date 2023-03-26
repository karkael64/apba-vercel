/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObject<K extends string | number = string | number, T = unknown> = Record<K, T>;
export type AnyArray<T = unknown> = T[];
export type SvelteEvent<D = unknown, T extends Element = Element> = Event & {
  detail: D;
  target: T;
};
export type Falsy = false | '' | 0 | null | undefined;
export type Truthy<T> = T extends Falsy ? never : T;

export type JsonOutput<T> = T extends Date | (new (...args: any) => { toJSON: any })
  ? string
  : T extends void | undefined | symbol | ((...args: any[]) => any)
  ? never
  : T extends AnyObject
  ? { [k in keyof T]: JsonOutput<T[k]> }
  : T;
