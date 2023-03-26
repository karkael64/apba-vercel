<script lang="ts">
  import type { prisma } from '$lib/server';
  import { TextField } from '../../atoms';
  import MarkdownEditor from '../markdownEditor/MarkdownEditor.svelte';

  export let title: prisma.EventSerie['title'];
  export let body: prisma.EventSerie['body'];
</script>

<form>
  <h2>Titre</h2>
  <TextField name="title" type="text" bind:value="{title}" />

  <h2>Description de l'activité</h2>
  <MarkdownEditor bind:markdown="{body}" />
</form>
