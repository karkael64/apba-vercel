import type { prisma } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

declare class EventEditor extends SvelteComponentTyped<
  Pick<prisma.Event, 'title' | 'body' | 'start' | 'end'>
> {}

export default EventEditor;
