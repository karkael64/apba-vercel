<script lang="ts">
import Markdown from '../markdown/Markdown.svelte';
import type { Event, Occurence } from './Agenda.svelte';

const isOccurence = (el: Event | Occurence): el is Occurence =>
  'event' in el && el.event && typeof el.event === 'object';

export let event: Event | Occurence;
</script>

{#if isOccurence(event)}
  <div class="occurence">
    <Markdown content="{event.event.body}" />
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
  border-radius: 0.5em;
  margin: 0.5em;
  padding: 0.5em 1em;
}
.single {
  border: 3px solid var(--primary);
  border-radius: 0.5em;
  margin: 0.5em;
  padding: 0.5em 1em;
}
</style>
