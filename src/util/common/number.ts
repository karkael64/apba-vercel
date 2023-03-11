export const modulo = (num: number, mod: number) => {
  return ((num % mod) + Math.abs(mod)) % mod;
};
