import { SvelteComponentTyped } from 'svelte';

type View = 'date' | 'week' | 'month' | 'year';

declare class Agenda extends SvelteComponentTyped<
  {
    originView?: View;
    date?: Date;
    events?: Date[];
  },
  {
    click: Date;
  }
> {}

export default Agenda;
