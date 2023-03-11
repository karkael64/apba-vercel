<script lang="ts">
  import type { prisma } from '$lib/server';
  import Markdown from '../markdown/Markdown.svelte';
  import type { Occurence } from './Agenda.svelte';

  const isOccurence = (el: prisma.Event | Occurence): el is Occurence =>
    'serie' in el && el.serie && typeof el.serie === 'object';

  export let event: prisma.Event | Occurence;
</script>

{#if isOccurence(event)}
  <div class="occurence">
    <Markdown content="{event.serie.body}" />
    <Markdown content="{event.body}" />
  </div>
{:else}
  <div class="single">
    <Markdown content="{event.body}" />
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
