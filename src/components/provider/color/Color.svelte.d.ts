import type { AnyObject } from 'src/common/ambient';
import { SvelteComponentTyped } from 'svelte';

declare class Color extends SvelteComponentTyped<
  { defaultColorScheme?: 'light' | 'dark' },
  AnyObject,
  { default: SvelteComponent }
> {}

export default Color;
