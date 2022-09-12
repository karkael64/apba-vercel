import { SvelteComponentTyped } from 'svelte';

declare class Day extends SvelteComponentTyped<
  {
    number: number;
    pin?: boolean;
    weak?: boolean;
  },
  {
    click: Event;
  }
> {}

export default Day;
