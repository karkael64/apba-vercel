import type { AnyObject } from '$lib/client';
import { SvelteComponentTyped } from 'svelte';

declare class Color extends SvelteComponentTyped<
  { defaultColorScheme?: 'light' | 'dark' },
  AnyObject,
  { default: SvelteComponent }
> {}

export default Color;
