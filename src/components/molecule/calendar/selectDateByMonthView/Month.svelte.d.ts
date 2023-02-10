import type { SvelteEvent } from 'src/common/ambient';
import { SvelteComponentTyped } from 'svelte';

declare class Month extends SvelteComponentTyped<
  {
    events: Date[];
    year: number;
    month: number;
    isWeekStartingWithSunday?: true;
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
