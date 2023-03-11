import type { SvelteEvent } from '../../../util/common';
import { SvelteComponentTyped } from 'svelte';
import type { prisma } from '$lib/server';

export type Occurence = prisma.EventOccurence & { serie: prisma.EventSerie };

declare class Agenda extends SvelteComponentTyped<
  {
    events?: (prisma.Event | Occurence)[];
    isWeekStartingWithSunday?: true;
  },
  {
    click: SvelteEvent<Date>;
  }
> {}

export default Agenda;
