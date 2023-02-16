/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObject<K extends string | number = string | number, T = unknown> = Record<K, T>;
export type AnyArray<T = unknown> = T[];
export type SvelteEvent<T> = Event & { detail: T };
export type Falsy = false | '' | 0 | null | undefined;
export type Truthy<T> = T extends Falsy ? never : T;
