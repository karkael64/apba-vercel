import type { SvelteEvent } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';

type View = 'date' | 'week' | 'month' | 'year';

declare class Calendar extends SvelteComponentTyped<
  {
    anchorDate: Date;
    view?: View;
    events?: Date[];
  },
  {
    click: SvelteEvent<Date>;
    changeAnchorDate: SvelteEvent<Date>;
  }
> {}

export default Calendar;
