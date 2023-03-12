import type { SvelteEvent } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';

type View = 'date' | 'week' | 'month' | 'year';

declare class TimeSelect extends SvelteComponentTyped<
  { anchorDate: Date },
  { click: SvelteEvent<Date>; changeAnchorDate: SvelteEvent<Date> }
> {}

export default TimeSelect;
