import { SvelteComponentTyped } from 'svelte';

declare class Month extends SvelteComponentTyped<
  {
    events: Date[];
    year: number;
    month: number;
  },
  {
    click: Date;
    edityear: Event;
    editmonth: Event;
    previous: Event;
    next: Event;
  }
> {}

export default Month;
