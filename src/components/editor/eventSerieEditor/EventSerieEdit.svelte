<script lang="ts">
  import type { prisma } from '$lib/server';
  import { createEventDispatcher } from 'svelte';
  import EditionModal from '../editionModal/EditionModal.svelte';
  import EventSerieEditor from './EventSerieEditor.svelte';

  export let eventId: string | null;
  let open = false;

  let title = '';
  let body = '';

  const handleUpdate = async () => {
    await fetch(`/api/events/series/${eventId}`, {
      method: 'PATCH',
      body: JSON.stringify({ eventSerie: { title, body } })
    });
    open = false;
  };

  const handleDelete = async () => {
    await fetch(`/api/events/series/${eventId}`, { method: 'DELETE' });
    open = false;
  };

  $: (async () => {
    if (eventId) {
      const resp = await fetch(`/api/events/series/${eventId}`);
      const event: prisma.Event = (await resp.json()).eventSerie;
      title = event.title;
      body = event.body;
      open = true;
    }
  })();

  const dispatch = createEventDispatcher();

  $: if (!open) dispatch('close');
</script>

<EditionModal
  bind:open
  title="Modifier une activité"
  on:update="{handleUpdate}"
  on:delete="{handleDelete}"
  mode="update">
  <EventSerieEditor bind:title bind:body />
</EditionModal>
