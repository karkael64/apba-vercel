import type { SvelteEvent } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';
import type { Occurence } from './Agenda.svelte';
import type { prisma } from '$lib/server';

declare class AgendaItem extends SvelteComponentTyped<
  { event: prisma.Event | Occurence },
  { click: SvelteEvent<Date> }
> {}

export default AgendaItem;
