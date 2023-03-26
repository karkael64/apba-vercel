import { SvelteComponentTyped } from 'svelte';

declare class EventEdit extends SvelteComponentTyped<
  { eventId?: number | null },
  { close: Event }
> {}

export default EventEdit;
