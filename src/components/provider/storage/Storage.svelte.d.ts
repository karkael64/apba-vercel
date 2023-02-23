import type { AnyObject } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';

declare class Storage extends SvelteComponentTyped<
  AnyObject,
  AnyObject,
  { default: SvelteComponent }
> {}

export default Storage;
