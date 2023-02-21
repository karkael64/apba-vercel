<script lang="ts">
  import Markdown from '../../molecule/markdown/Markdown.svelte';
  import { FullSection } from '../../layout';
  import EditorButton from '../../molecule/editorButton/EditorButton.svelte';
  import type { SvelteEvent } from '$lib/client';

  export let body = '';

  const onSaveBody = (ev: SvelteEvent<string>) => {
    body = ev.detail;
  };
</script>

<FullSection height="auto">
  <div class="pad">
    <Markdown content="{body}" />
    <EditorButton markdown="{body}" on:save="{onSaveBody}" inner />
  </div>
</FullSection>

<style>
  .pad {
    position: relative;
    max-width: 50vw;
    padding: 2em;
    flex-direction: column;
  }
</style>
