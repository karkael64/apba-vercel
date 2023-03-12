<script lang="ts">
  import type { prisma } from '$lib/server';
  import { DatePicker, TimePicker, TextField } from '../../atoms';
  import MarkdownEditor from '../markdownEditor/MarkdownEditor.svelte';

  export let start: prisma.Event['start'];
  export let end: prisma.Event['end'];
  export let title: prisma.Event['title'];
  export let body: prisma.Event['body'];
</script>

<form>
  <h2>Titre</h2>
  <TextField name="title" type="text" bind:value="{title}" />

  <h2>Début</h2>
  <DatePicker label="Jour" name="startDate" bind:value="{start}" />
  <TimePicker label="Heure" name="startHour" bind:value="{start}" />

  <h2>Fin</h2>
  <DatePicker label="Jour" name="endDate" bind:value="{end}" />
  <TimePicker label="Heure" name="endHour" bind:value="{end}" />

  <h2>Message</h2>
  <MarkdownEditor bind:markdown="{body}" />
</form>
