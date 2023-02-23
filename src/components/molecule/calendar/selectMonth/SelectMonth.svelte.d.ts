import type { SvelteEvent } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';

declare class SelectMonth extends SvelteComponentTyped<
  { month: number },
  { select: SvelteEvent<number> }
> {}

export default SelectMonth;
