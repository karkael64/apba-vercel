import type { SvelteEvent } from 'src/common/ambient';
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
