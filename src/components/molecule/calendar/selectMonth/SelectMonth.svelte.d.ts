import type { SvelteEvent } from '$lib/client';
import { SvelteComponentTyped } from 'svelte';

declare class SelectMonth extends SvelteComponentTyped<
  { month: number },
  { select: SvelteEvent<number> }
> {}

export default SelectMonth;
