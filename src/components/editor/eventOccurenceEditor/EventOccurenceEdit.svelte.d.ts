import { SvelteComponentTyped } from 'svelte';

declare class EventOccurenceEdit extends SvelteComponentTyped<
  {
    series: prisma.EventSerie[];
    eventId?: number | null;
  },
  { close: Event }
> {}

export default EventOccurenceEdit;
