<script lang="ts">
  import { todayNoon } from '$lib/client';
  import type { prisma } from '$lib/server';
  import { createEventDispatcher } from 'svelte';
  import EditionModal from '../editionModal/EditionModal.svelte';
  import EventOccurenceEditor, { type EventPeriod } from './EventOccurenceEditor.svelte';

  export let series: prisma.EventSerie[];
  export let eventId: null | number = null;

  let open = false;

  let serieId = 0;
  let body = '';
  let start = new Date(todayNoon);
  let end = new Date(todayNoon);
  let periodSelected: EventPeriod = 'date';
  let weekDaySelected = 0;
  let monthDaySelected = 0;

  const handleUpdate = async () => {
    await fetch(`/api/events/occurences/${eventId}`, {
      method: 'PATCH',
      body: JSON.stringify({ eventOccurence: { serieId, body, start, end } })
    });
    open = false;
  };

  const handleDelete = async () => {
    await fetch(`/api/events/occurences/${eventId}`, { method: 'DELETE' });
    open = false;
  };

  $: (async () => {
    if (eventId) {
      const resp = await fetch(`/api/events/occurences/${eventId}`);
      const event: prisma.EventOccurence = (await resp.json()).eventOccurence;

      serieId = event.serieId;
      body = event.body;
      start = new Date(event.start);
      end = new Date(event.end);

      open = true;
    }
  })();

  const dispatch = createEventDispatcher();

  $: if (!open) dispatch('close');
</script>

{#if eventId !== null}
  <EditionModal
    bind:open
    title="Ajouter un événement"
    on:update="{handleUpdate}"
    on:delete="{handleDelete}"
    mode="update">
    <EventOccurenceEditor
      bind:body
      bind:end
      bind:start
      bind:series
      bind:serieId
      bind:periodSelected
      bind:weekDaySelected
      bind:monthDaySelected />
  </EditionModal>
{/if}
