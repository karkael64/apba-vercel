<script lang="ts">
  import { type ButtonProps, Buttons } from '../../atoms';
  import { Markdown, ImageLoader } from '../../molecule';
  import { FullSection } from '../../layout';
  import SectionSplashEditor from './SectionSplashEditor.svelte';
  import type { PictureEditorProps } from 'src/components/editor';
  import type { SectionSplashProps } from './SectionSplash.svelte';

  export let buttonList: ButtonProps[];
  export let backgroundImages: PictureEditorProps[];
  export let height = '80vh';
  export let body = '';
  export let variant: SectionSplashProps['variant'] = 'right';
</script>

<FullSection height="{height}">
  <div class="split-background">
    {#each backgroundImages as { url, alt }}
      <div>
        <ImageLoader src="{url}" alt="{alt}" width="100%" height="100%" />
      </div>
    {/each}
  </div>
  <div class="{`splash ${variant}`}">
    <Markdown content="{body}" />
    <div class="splash-button">
      <Buttons list="{buttonList}" />
    </div>
  </div>
  <SectionSplashEditor
    buttonList="{buttonList}"
    backgroundImages="{backgroundImages}"
    height="{height}"
    body="{body}"
    variant="{variant}"
    on:save />
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
    .splash,
    .splash.right {
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
