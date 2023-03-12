<script lang="ts">
  import type { prisma } from '$lib/server';
  import { Select } from '../../atoms';
  import MarkdownEditor from '../markdownEditor/MarkdownEditor.svelte';

  export let body: prisma.EventOccurence['body'];
  export let serieId: prisma.EventOccurence['serieId'];
  export let start: prisma.EventOccurence['start'];
  export let end: prisma.EventOccurence['end'];

  const options = {
    hello: 'World',
    test: 'ok'
  } as const;

  let value: keyof typeof options = 'hello';
</script>

<form>
  <h2>Créer des occurences de cette activité</h2>
  <Select name="serieId" bind:value options="{options}" />

  <h2>Message</h2>
  <MarkdownEditor bind:markdown="{body}" />
</form>
