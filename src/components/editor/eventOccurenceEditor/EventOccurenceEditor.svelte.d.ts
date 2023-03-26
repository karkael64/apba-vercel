import type { prisma } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

export type EventPeriod = 'date' | 'weekly' | 'monthly';

declare class EventSerieEditor extends SvelteComponentTyped<
  Pick<prisma.EventOccurence, 'serieId' | 'body' | 'end' | 'start'> & {
    series: prisma.EventSerie[];
    periodSelected: EventPeriod;
    weekDaySelected: number;
    monthDaySelected: number;
  }
> {}

export default EventSerieEditor;
