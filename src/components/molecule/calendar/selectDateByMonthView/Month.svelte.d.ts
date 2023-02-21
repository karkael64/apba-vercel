import type { SvelteEvent } from '$lib/client';
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
    editYear: Event;
    editMonth: Event;
    previous: Event;
    next: Event;
    today: Event;
  }
> {}

export default Month;
