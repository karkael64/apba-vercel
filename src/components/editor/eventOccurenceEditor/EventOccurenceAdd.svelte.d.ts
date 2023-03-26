import { SvelteComponentTyped } from 'svelte';

declare class EventOccurenceAdd extends SvelteComponentTyped<{
  open?: boolean;
  series: prisma.EventSerie[];
}> {}

export default EventOccurenceAdd;
