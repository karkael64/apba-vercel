<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { todayNoon } from '$lib/client';
  import type { prisma } from '$lib/server';
  import EditionModal from '../editionModal/EditionModal.svelte';
  import EventEditor from './EventEditor.svelte';

  export let eventId: number | null = null;
  let open = false;

  let title = '';
  let body = '';
  let start = new Date(todayNoon);
  let end = new Date(todayNoon);

  const handleUpdate = async () => {
    await fetch(`/api/events/${eventId}`, {
      method: 'PATCH',
      body: JSON.stringify({ event: { title, body, start, end } })
    });
    open = false;
  };

  const handleDelete = async () => {
    await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
    open = false;
  };

  $: (async () => {
    if (eventId) {
      const resp = await fetch(`/api/events/${eventId}`);
      const event: prisma.Event = (await resp.json()).event;

      title = event.title;
      body = event.body;
      start = new Date(event.start);
      end = new Date(event.end);

      open = true;
    }
  })();

  const dispatch = createEventDispatcher();

  $: if (!open) dispatch('close');
</script>

<EditionModal
  bind:open
  title="Ajouter un événement"
  on:update="{handleUpdate}"
  on:delete="{handleDelete}"
  mode="update">
  <EventEditor bind:title bind:body bind:end bind:start />
</EditionModal>
