<script lang="ts">
  import { Button } from '../../atoms';
  import { Markdown } from '../../molecule';
  import { ThumbDefinition } from '../../layout';
  import type { Thumb } from './SectionThumbs.svelte';
  import SectionThumbsEditor from './SectionThumbsEditor.svelte';

  export let thumbs: Thumb[];
</script>

<div class="flex">
  {#each thumbs as thumb, id}
    <ThumbDefinition pictureUrl="{thumb.pictureUrl}" pictureAlt="{thumb.pictureAlt}">
      <Markdown content="{thumb.body ?? ''}" />
      {#if thumb.buttonHref}
        <center>
          <Button href="{thumb.buttonHref}" color="{thumb.buttonColor ?? 'primary'}"
            >{thumb.buttonLabel}</Button>
        </center>
      {/if}
    </ThumbDefinition>
  {/each}
  <SectionThumbsEditor thumbs="{thumbs}" on:save />
</div>

<style>
  .flex {
    position: relative;
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
