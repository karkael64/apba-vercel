import type { SvelteEvent } from 'src/components/common/ambient';
import { SvelteComponentTyped } from 'svelte';

declare class Month extends SvelteComponentTyped<
  {
    events: Date[];
    year: number;
    month: number;
  },
  {
    click: SvelteEvent<Date>;
    edityear: Event;
    editmonth: Event;
    previous: Event;
    next: Event;
  }
> {}

export default Month;
