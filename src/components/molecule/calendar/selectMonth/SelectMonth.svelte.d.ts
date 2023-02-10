import type { SvelteEvent } from 'src/common/ambient';
import { SvelteComponentTyped } from 'svelte';

declare class SelectMonth extends SvelteComponentTyped<
  { month: number },
  { select: SvelteEvent<number> }
> {}

export default SelectMonth;
