import type { AnyObject } from '../../../util/common';
import { type SvelteComponent, SvelteComponentTyped } from 'svelte';

declare class Portal extends SvelteComponentTyped<
  { container?: HTMLElement },
  AnyObject,
  { default: SvelteComponent }
> {}

export default Portal;
