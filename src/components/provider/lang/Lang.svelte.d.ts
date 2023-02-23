import type { AnyObject } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';

declare class Lang extends SvelteComponentTyped<
  { buildRoute?(langCode: string): string },
  AnyObject,
  { test: SvelteComponentTyped }
> {}

export default Lang;
