<script lang="ts">
  import type { prisma, SvelteEvent } from '$lib/server';
  import { DatePicker, Select, TimePicker, type SelectOptions } from '../../atoms';
  import { daysName } from '../../../util/common/date';
  import MarkdownEditor from '../markdownEditor/MarkdownEditor.svelte';

  const periodOptions = {
    date: 'Date précise',
    weekly: 'Chaque jour de la semaine',
    monthly: 'Chaque jour du mois'
  } as const;

  const dayOptions = daysName.reduce((acc, dayName, index) => {
    acc[index] = dayName;
    return acc;
  }, {} as SelectOptions);

  const dayMonthOptions = Array.from({ length: 31 }).reduce((acc: SelectOptions, _, index) => {
    acc[index + 1] = (index + 1).toString();
    return acc;
  }, {} as SelectOptions);

  export let body: prisma.EventOccurence['body'];
  export let start: prisma.EventOccurence['start'];
  export let end: prisma.EventOccurence['end'];
  export let serieId: prisma.EventOccurence['serieId'];
  export let series: prisma.EventSerie[];
  export let periodSelected: keyof typeof periodOptions;
  export let weekDaySelected;
  export let monthDaySelected;

  const onStartChange = (ev: SvelteEvent<Date>) => {
    const newEnd = new Date(ev.detail);
    newEnd.setHours(newEnd.getHours() + 2);
    end = newEnd;
  };

  const onEndChange = (ev: SvelteEvent<Date>) => {
    if (start.valueOf() > ev.detail.valueOf()) {
      const newStart = new Date(ev.detail);
      newStart.setHours(newStart.getHours() - 2);
      start = newStart;
    }
  };

  let serieIdString: string = series[0].id.toString();
  $: serieId = parseInt(serieIdString);

  let weekDaySelectedString = '0';
  $: weekDaySelected = parseInt(weekDaySelectedString);

  let monthDaySelectedString = '1';
  $: monthDaySelected = parseInt(monthDaySelectedString);

  let serieOptions: SelectOptions = {};
  $: {
    serieOptions = series.reduce((acc, serie) => {
      acc[serie.id] = serie.title;
      return acc;
    }, {} as SelectOptions);
  }
</script>

<form>
  <h2>Activité</h2>
  <Select bind:value="{serieIdString}" options="{serieOptions}" />

  <h2>Message</h2>
  <MarkdownEditor bind:markdown="{body}" />

  <h2>Période</h2>
  <Select bind:value="{periodSelected}" options="{periodOptions}" />

  {#if periodSelected === 'date'}
    <h2>Date précise</h2>
    <DatePicker label="Date précise" name="date" bind:value="{start}" on:change="{onStartChange}" />
    <TimePicker
      label="Heure de début"
      name="startHour"
      bind:value="{start}"
      on:change="{onStartChange}" />
    <TimePicker label="Heure de fin" name="endHour" bind:value="{end}" on:change="{onEndChange}" />
  {/if}

  {#if periodSelected === 'weekly'}
    <h2>Chaque jour de la semaine</h2>
    <Select options="{dayOptions}" bind:value="{weekDaySelectedString}" />

    <DatePicker
      label="Premier jour"
      name="startDate"
      bind:value="{start}"
      on:change="{onStartChange}" />
    <DatePicker label="Dernier jour" name="endDate" bind:value="{end}" on:change="{onEndChange}" />

    <TimePicker label="Heure de début" name="startHour" bind:value="{start}" />
    <TimePicker label="Heure de fin" name="endHour" bind:value="{end}" />
  {/if}

  {#if periodSelected === 'monthly'}
    <h2>Chaque jour du mois</h2>
    <Select options="{dayMonthOptions}" bind:value="{monthDaySelectedString}" />

    <DatePicker
      label="Premier jour"
      name="startDate"
      bind:value="{start}"
      on:change="{onStartChange}" />
    <DatePicker label="Dernier jour" name="endDate" bind:value="{end}" on:change="{onEndChange}" />

    <TimePicker label="Heure de début" name="startHour" bind:value="{start}" />
    <TimePicker label="Heure de fin" name="endHour" bind:value="{end}" />
  {/if}
</form>
