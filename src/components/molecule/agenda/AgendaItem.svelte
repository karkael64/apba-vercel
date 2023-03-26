<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { prisma } from '$lib/server';
  import Button from '../../atoms/button/Button.svelte';
  import Markdown from '../markdown/Markdown.svelte';
  import type { Occurence } from './Agenda.svelte';

  const isOccurence = (el: prisma.Event | Occurence): el is Occurence =>
    'serie' in el && el.serie && typeof el.serie === 'object';

  export let event: prisma.Event | Occurence;
  export let admin = false;

  const dispatch = createEventDispatcher();

  const editEvent = () => dispatch('editEvent', event.id);
  const editEventOccurence = () => dispatch('editEventOccurence', event.id);
  const editEventSerie = () => {
    if (isOccurence(event)) dispatch('editEventSerie', event.serieId);
  };
</script>

{#if isOccurence(event)}
  <div class="occurence">
    <Markdown content="{event.serie.body}" />
    {#if admin}
      <Button color="editor" on:click="{editEventSerie}">Modifier l'activité</Button>
    {/if}
    <Markdown content="{event.body}" />
    {#if admin}
      <Button color="editor" on:click="{editEventOccurence}">Modifier la session d'activité</Button>
    {/if}
  </div>
{:else}
  <div class="single">
    <Markdown content="{event.body}" />
    {#if admin}
      <Button color="editor" on:click="{editEvent}">Modifier la session d'activité</Button>
    {/if}
  </div>
{/if}

<style>
  .occurence {
    border: 3px solid var(--secondary);
    border-radius: 2.5em;
    margin: 0.5em;
    padding: 0.5em 1em;
  }
  .single {
    border: 3px solid var(--primary);
    border-radius: 2.5em;
    margin: 0.5em;
    padding: 0.5em 1em;
  }
</style>
