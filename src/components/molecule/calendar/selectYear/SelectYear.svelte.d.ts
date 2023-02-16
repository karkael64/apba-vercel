import type { SvelteEvent } from '$lib/client';
import { SvelteComponentTyped } from 'svelte';

declare class SelectYear extends SvelteComponentTyped<
  { year: number },
  { select: SvelteEvent<number> }
> {}

export default SelectYear;
