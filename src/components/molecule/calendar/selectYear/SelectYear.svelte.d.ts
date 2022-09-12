import type { SvelteEvent } from 'src/components/common/ambient';
import { SvelteComponentTyped } from 'svelte';

declare class SelectYear extends SvelteComponentTyped<
  { year: number },
  { select: SvelteEvent<number> }
> {}

export default SelectYear;
