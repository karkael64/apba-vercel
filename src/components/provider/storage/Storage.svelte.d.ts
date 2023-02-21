import type { AnyObject } from '$lib/client';
import { SvelteComponentTyped } from 'svelte';

declare class Storage extends SvelteComponentTyped<
  AnyObject,
  AnyObject,
  { default: SvelteComponent }
> {}

export default Storage;
