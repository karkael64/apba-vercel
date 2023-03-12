import type { prisma } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

declare class EventSerieEditor extends SvelteComponentTyped<
  Pick<prisma.EventSerie, 'title' | 'body'>
> {}

export default EventSerieEditor;
