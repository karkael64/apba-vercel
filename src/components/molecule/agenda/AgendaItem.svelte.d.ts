import type { SvelteEvent } from 'src/components/common/ambient';
import { SvelteComponentTyped } from 'svelte';
import type { Event, Occurence } from './Agenda.svelte';

declare class AgendaItem extends SvelteComponentTyped<
  { event: Event | Occurence },
  { click: SvelteEvent<Date> }
> {}

export default AgendaItem;
