<script lang="ts">
  import Markdown from '../../molecule/markdown/Markdown.svelte';
  import Button from '../../atoms/button/Button.svelte';
  import ThumbDefinition from '../../layout/thumbDefinition/ThumbDefinition.svelte';

  type Thumb = {
    pictureUrl: string;
    pictureAlt: string;
    buttonHref?: string;
    buttonLabel?: string;
    buttonColor?: 'primary' | 'secondary';
    body?: string;
  };

  export let thumbs: Thumb[];
</script>

<div class="flex">
  {#each thumbs as thumb}
    <ThumbDefinition pictureUrl="{thumb.pictureUrl}" pictureAlt="{thumb.pictureAlt}">
      <Markdown content="{thumb.body ?? ''}" />
      {#if thumb.buttonHref}
        <center>
          <Button href="{thumb.buttonHref}" color="{thumb.buttonColor ?? 'primary'}"
            >{thumb.buttonLabel ?? 'Plus de détails…'}</Button
          >
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
