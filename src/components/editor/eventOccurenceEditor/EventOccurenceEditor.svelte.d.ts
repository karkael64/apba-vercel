import type { prisma } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

declare class EventSerieEditor extends SvelteComponentTyped<
  Pick<prisma.EventOccurence, 'serieId' | 'body' | 'end' | 'start'>
> {}

export default EventSerieEditor;
