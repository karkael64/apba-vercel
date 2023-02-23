import type { AnyObject } from '../../../util/common';
import { type SvelteComponent, SvelteComponentTyped } from 'svelte';

declare class Color extends SvelteComponentTyped<
  { defaultColorScheme?: 'light' | 'dark' },
  AnyObject,
  { default: SvelteComponent }
> {}

export default Color;
