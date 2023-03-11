<script lang="ts">
  import type { prisma } from '$lib/server';
  import DatePicker from '../../atoms/datePicker/DatePicker.svelte';
  import TextField from '../../atoms/textField/TextField.svelte';

  export let start: prisma.Event['start'];
  export let end: prisma.Event['end'];

  let title = '';
  let startDate = new Date();
  let startHour = '';

  let endDate = new Date(end);
  let endHour = '';

  const applyDateOnEnd = (date: Date) => {
    end = new Date(endDate);
    const [endH, endM, endS] = endHour.split(':');
    end.setHours(parseInt(endH));
    end.setMinutes(parseInt(endM));
    end.setSeconds(parseInt(endS));
  };

  const applyDateOnStart = (date: Date) => {
    start = new Date(startDate);
    const [startH, startM, startS] = startHour.split(':');
    start.setHours(parseInt(startH));
    start.setMinutes(parseInt(startM));
    start.setSeconds(parseInt(startS));
  };
</script>

<form>
  <TextField label="Titre" name="title" type="text" bind:value="{title}" />
  <h2>Début</h2>
  <DatePicker label="Jour" name="startDate" bind:value="{startDate}" on:change />
  <TextField label="Heure" name="startHour" type="text" bind:value="{startHour}" />
  <h2>Fin</h2>
  <DatePicker label="Jour" name="endDate" bind:value="{endDate}" />
  <TextField label="Heure" name="endHour" type="text" bind:value="{endHour}" />
</form>
