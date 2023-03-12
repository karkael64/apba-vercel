import type { AnyArray } from './ambient';

export const throttle = <A extends AnyArray>(fn: (...args: A) => void, delay: number) => {
  let id: number | null = null;
  return (...args: A) => {
    if (id !== null) clearTimeout(id);
    id = setTimeout(fn, delay, ...args) as unknown as number;
  };
};
