import type { SvelteEvent } from '$lib/client';
import { SvelteComponentTyped } from 'svelte';

type View = 'date' | 'week' | 'month' | 'year';

declare class Calendar extends SvelteComponentTyped<
  {
    originView?: View;
    date?: Date;
    events?: Date[];
  },
  {
    click: SvelteEvent<Date>;
  }
> {}

export default Calendar;
