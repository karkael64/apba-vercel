<script lang="ts">
  import {
    Agenda,
    Button,
    Calendar,
    dateToString,
    EventAdd,
    EventEdit,
    EventOccurenceAdd,
    EventOccurenceEdit,
    EventSerieAdd,
    EventSerieEdit,
    type SvelteEvent,
    type prisma,
    groupStorage,
    makeQueryString,
    type JsonOutput
  } from '$lib/client';
  import { onMount } from 'svelte';

  type EventFull = prisma.Event & {
    files: prisma.MapEventFile[];
  };

  type EventOccurenceFull = prisma.EventOccurence & {
    files: prisma.MapEventOccurenceFile[];
    serie: prisma.EventSerie;
  };

  let eventSeries: JsonOutput<prisma.EventSerie>[] = [];
  let anchorDate = new Date();
  let all: (EventFull | EventOccurenceFull)[] = [];
  let eventDates: Date[] = [];

  const redirect = (ev: SvelteEvent<Date>) => {
    const node = document.querySelector(
      `[data-date=${JSON.stringify(dateToString(ev.detail))}]`
    ) as HTMLElement | null;
    if (node) {
      document.body.scrollTo({ top: node.offsetTop, behavior: 'smooth' });
    }
  };

  const onNextMonthClick = () => {
    const dt = new Date(anchorDate);
    dt.setDate(1);
    dt.setMonth(anchorDate.getMonth() + 1);
    anchorDate = dt;
  };

  const loadPeriod = async (year: number, monthIndex: number) => {
    const start = new Date(year, monthIndex, 1).toJSON();
    const end = new Date(year, monthIndex + 1, 1).toJSON();
    const qs = makeQueryString({ start, end });

    const [events, eventOccurences, eventSeries] = await Promise.all([
      (async (): Promise<JsonOutput<EventFull>[]> =>
        (
          await (await fetch(`/api/events${qs}`)).json()
        ).events)(),
      (async (): Promise<JsonOutput<EventOccurenceFull>[]> =>
        (
          await (await fetch(`/api/events/occurences${qs}`)).json()
        ).eventOccurences)(),
      (async (): Promise<JsonOutput<prisma.EventSerie>[]> =>
        (
          await (await fetch(`/api/events/series`)).json()
        ).eventSeries)()
    ]);

    return {
      events,
      eventOccurences,
      eventSeries
    };
  };

  let openEventAdd = false;
  let openEventOccurenceAdd = false;
  let openEventSerieAdd = false;

  const addEvent = () => (openEventAdd = true);
  const addEventOccurence = () => (openEventOccurenceAdd = true);
  const addEventSerie = () => (openEventSerieAdd = true);

  let openEventEdit: number | null = null;
  let openEventOccurenceEdit: number | null = null;
  let openEventSerieEdit: number | null = null;

  const editEvent = (event: SvelteEvent<number>) => (openEventEdit = event.detail);
  const editEventOccurence = (event: SvelteEvent<number>) =>
    (openEventOccurenceEdit = event.detail);
  const editEventSerie = (event: SvelteEvent<number>) => (openEventSerieEdit = event.detail);

  const closeEvent = () => (openEventEdit = null);
  const closeEventOccurence = () => (openEventOccurenceEdit = null);
  const closeEventSerie = () => (openEventSerieEdit = null);

  let mounted = false;
  let dateState: null | Date = null;

  onMount(() => {
    mounted = true;
  });

  $: (async () => {
    if (mounted && dateState !== anchorDate) {
      dateState = anchorDate;
      const data = await loadPeriod(anchorDate.getFullYear(), anchorDate.getMonth());
      eventSeries = data.eventSeries;

      all = [...data.events, ...data.eventOccurences].map((ev): EventFull | EventOccurenceFull => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end)
      }));

      eventDates = all.map(({ start }) => start);
    }
  })();
</script>

<div class="agenda">
  {#if $groupStorage === 'admin'}
    <p>
      <Button color="editor" on:click="{addEventSerie}">Ajouter une nouvelle activité</Button>
    </p>
    <p>
      <Button color="editor" on:click="{addEventOccurence}"
        >Ajouter des sessions d'une activité</Button>
    </p>
    <p>
      <Button color="editor" on:click="{addEvent}">Ajouter un événement unique</Button>
    </p>
  {/if}
  <Calendar on:click="{redirect}" events="{eventDates}" bind:anchorDate />
  <Agenda
    events="{all}"
    admin="{$groupStorage === 'admin'}"
    on:editEvent="{editEvent}"
    on:editEventOccurence="{editEventOccurence}"
    on:editEventSerie="{editEventSerie}" />
  <p>
    <Button on:click="{onNextMonthClick}" color="primary">Mois suivant</Button>
  </p>
</div>

{#if $groupStorage === 'admin'}
  <EventAdd bind:open="{openEventAdd}" />
  <EventEdit eventId="{openEventEdit}" on:close="{closeEvent}" />
  {#if eventSeries.length}
    <EventOccurenceAdd bind:open="{openEventOccurenceAdd}" series="{eventSeries}" />
    <EventOccurenceEdit
      eventId="{openEventOccurenceEdit}"
      series="{eventSeries}"
      on:close="{closeEventOccurence}" />
  {/if}
  <EventSerieAdd bind:open="{openEventSerieAdd}" />
  <EventSerieEdit eventId="{openEventSerieEdit}" on:close="{closeEventSerie}" />
{/if}

<style>
  .agenda {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    padding: 2em;
  }
</style>
