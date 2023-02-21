import type { AnyObject } from '$lib/server';
import { type SvelteComponent, SvelteComponentTyped } from 'svelte';

declare class Portal extends SvelteComponentTyped<
  { container?: HTMLElement },
  AnyObject,
  { default: SvelteComponent }
> {}

export default Portal;
