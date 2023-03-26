import type { SvelteEvent } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';
import type { prisma } from '$lib/server';

export type Occurence = prisma.EventOccurence & { serie: prisma.EventSerie };

declare class Agenda extends SvelteComponentTyped<
  {
    events?: (prisma.Event | Occurence)[];
    isWeekStartingWithSunday?: true;
    admin?: boolean;
  },
  {
    click: SvelteEvent<Date>;
    editEvent: SvelteEvent<number>;
    editEventOccurence: SvelteEvent<number>;
    editEventSerie: SvelteEvent<number>;
  }
> {}

export default Agenda;
