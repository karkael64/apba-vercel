import type { SvelteEvent } from 'src/common/ambient';
import { SvelteComponentTyped } from 'svelte';

export type File = {
  url: string;
  thumb: string;
  type: string;
  title: string;
};

export type Event = {
  date: Date;
  body: string;
};

export type Occurence = {
  date: Date;
  body: string;
  event: {
    body: string;
  };
};

declare class Agenda extends SvelteComponentTyped<
  {
    events?: (Event | Occurence)[];
    isWeekStartingWithSunday?: true;
  },
  {
    click: SvelteEvent<Date>;
  }
> {}

export default Agenda;
