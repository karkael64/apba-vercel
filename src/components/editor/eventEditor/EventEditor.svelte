<script lang="ts">
  import type { prisma, SvelteEvent } from '$lib/server';
  import { DatePicker, TimePicker, TextField } from '../../atoms';
  import MarkdownEditor from '../markdownEditor/MarkdownEditor.svelte';

  export let start: prisma.Event['start'];
  export let end: prisma.Event['end'];
  export let title: prisma.Event['title'];
  export let body: prisma.Event['body'];

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
</script>

<form>
  <h2>Titre</h2>
  <TextField name="title" type="text" bind:value="{title}" />

  <h2>Début</h2>
  <DatePicker label="Jour" name="startDate" bind:value="{start}" on:change="{onStartChange}" />
  <TimePicker label="Heure" name="startHour" bind:value="{start}" on:change="{onStartChange}" />

  <h2>Fin</h2>
  <DatePicker label="Jour" name="endDate" bind:value="{end}" on:change="{onEndChange}" />
  <TimePicker label="Heure" name="endHour" bind:value="{end}" on:change="{onEndChange}" />

  <h2>Message</h2>
  <MarkdownEditor bind:markdown="{body}" />
</form>
