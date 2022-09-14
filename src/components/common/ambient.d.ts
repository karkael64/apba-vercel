/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObject<K extends string | number = string | number, T = unknown> = Record<K, T>;
export type AnyArray<T> = T[];
export type SvelteEvent<T> = Event & { detail: T };
