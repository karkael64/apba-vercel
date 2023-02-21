<script lang="ts">
  import Markdown from '../../molecule/markdown/Markdown.svelte';
  import Button from '../../atoms/button/Button.svelte';
  import ThumbDefinition from '../../layout/thumbDefinition/ThumbDefinition.svelte';
  import EditorButton from '../../molecule/editorButton/EditorButton.svelte';
  import type { SvelteEvent } from '$lib/client';

  type Thumb = {
    pictureUrl: string;
    pictureAlt: string;
    buttonHref?: string;
    buttonLabel?: string;
    buttonColor?: 'primary' | 'secondary';
    body?: string;
  };

  export let thumbs: Thumb[];

  const makeSaveBody = (id: number) => (ev: SvelteEvent<string>) => {
    const thumb = thumbs.at(id);
    if (thumb) thumb.body = ev.detail;
  };
</script>

<div class="flex">
  {#each thumbs as thumb, id}
    <ThumbDefinition pictureUrl="{thumb.pictureUrl}" pictureAlt="{thumb.pictureAlt}">
      <Markdown content="{thumb.body ?? ''}" />
      <EditorButton markdown="{thumb.body}" on:save="{makeSaveBody(id)}" />
      {#if thumb.buttonHref}
        <center>
          <Button href="{thumb.buttonHref}" color="{thumb.buttonColor ?? 'primary'}"
            >{thumb.buttonLabel ?? 'Plus de détails…'}</Button>
        </center>
      {/if}
    </ThumbDefinition>
  {/each}
</div>

<style>
  .flex {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background: linear-gradient(var(--negative), var(--minus));
    padding: 5em 0;
  }
</style>
