import type { SvelteEvent } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';

declare class SelectYear extends SvelteComponentTyped<
  { year: number },
  { select: SvelteEvent<number> }
> {}

export default SelectYear;
