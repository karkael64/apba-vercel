import { SvelteComponentTyped } from 'svelte';

declare class EventSerieEdit extends SvelteComponentTyped<
  { eventId?: number | null },
  { close: Event }
> {}

export default EventSerieEdit;
