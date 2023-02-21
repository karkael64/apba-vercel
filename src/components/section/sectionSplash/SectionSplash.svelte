<script lang="ts">
  import Markdown from '../../molecule/markdown/Markdown.svelte';
  import type { ButtonProps } from '../../atoms/buttons/Buttons.svelte';
  import Buttons from '../../atoms/buttons/Buttons.svelte';
  import FullSection from '../../layout/fullSection/FullSection.svelte';
  import ImageLoader from '../../molecule/imageLoader/ImageLoader.svelte';
  import EditorButton from '../../molecule/editorButton/EditorButton.svelte';
  import type { SvelteEvent } from '$lib/client';

  export let buttonList: ButtonProps[];
  export let backgroundImages: string[];
  export let height = '80vh';
  export let body = '';
  export let variant = '';

  const onSaveBody = (ev: SvelteEvent<string>) => {
    body = ev.detail;
  };
</script>

<FullSection height="{height}">
  <div class="split-background">
    {#each backgroundImages as backgroundImage}
      <div>
        <ImageLoader src="{backgroundImage}" alt="" width="100%" height="100%" />
      </div>
    {/each}
  </div>
  <div class="{`splash ${variant}`}">
    <Markdown content="{body}" />
    <EditorButton markdown="{body}" on:save="{onSaveBody}" />
    <div class="splash-button">
      <Buttons list="{buttonList}" />
    </div>
  </div>
</FullSection>

<style>
  .splash {
    position: absolute;
    bottom: 5em;
    background: linear-gradient(var(--negative), var(--minus));
    color: var(--positive);
    padding: 2em 3em;
    margin: 5em 5%;
    border-radius: 1em;
  }

  .split-background {
    display: flex;
    height: 100%;
  }

  .split-background > div {
    flex: 1 1 1px;
    overflow: hidden;
  }

  .splash-button {
    position: absolute;
  }

  @media only screen and (min-width: 1000px) {
    .splash {
      right: 10em;
      margin: 0;
      padding: 2em 3em;
      border-radius: 1em;
    }

    .splash.left {
      left: 10em;
      right: auto;
    }

    .split-background {
      display: flex;
      height: 100%;
    }

    .splash-button {
      right: -5em;
    }
  }
</style>
