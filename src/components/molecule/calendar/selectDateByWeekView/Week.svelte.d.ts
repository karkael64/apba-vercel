import type { SvelteEvent } from '$lib/client';
import { SvelteComponentTyped } from 'svelte';

declare class Week extends SvelteComponentTyped<
  {
    events: Date[];
    year: number;
    month: number;
    firstWeekDate: Date;
  },
  {
    click: SvelteEvent<Date>;
    previous: Event;
    next: Event;
  }
> {}

export default Week;
