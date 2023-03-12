import type { SvelteEvent } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

declare class TimePicker extends SvelteComponentTyped<
  {
    name: string;
    label: string;
    value?: Date;
    format?: string;
  },
  {
    change: SvelteEvent<Date>;
    close: SvelteEvent;
    open: SvelteEvent;
  }
> {}

export default TimePicker;
