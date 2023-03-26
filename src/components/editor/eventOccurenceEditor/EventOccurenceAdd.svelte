<script lang="ts">
  import { todayNoon } from '$lib/client';
  import type { prisma } from '$lib/server';
  import EditionModal from '../editionModal/EditionModal.svelte';
  import EventOccurenceEditor, { type EventPeriod } from './EventOccurenceEditor.svelte';

  export let series: prisma.EventSerie[];
  export let open = false;

  let serieId = 0;
  let body = '';
  let start = new Date(todayNoon);
  let end = new Date(todayNoon);
  let periodSelected: EventPeriod = 'date';
  let weekDaySelected = 0;
  let monthDaySelected = 0;

  const handleCreate = async () => {
    await fetch(`/api/events/occurences`, {
      method: 'POST',
      body: JSON.stringify({
        eventOccurence: {
          serieId,
          body,
          start,
          end,
          weekDaySelected: periodSelected === 'weekly' ? weekDaySelected : undefined,
          monthDaySelected: periodSelected === 'monthly' ? monthDaySelected : undefined
        }
      })
    });
    open = false;
  };
</script>

<EditionModal bind:open title="Ajouter un événement" on:create="{handleCreate}" mode="create">
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
