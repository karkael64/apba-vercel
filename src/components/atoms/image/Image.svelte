<script lang="ts">
  import { objectToStyleString } from '../../../common/style';

  export let src: string;
  export let alt: string;
  export let transitionDuration: number = 0.6;
  export let filter: string | number | undefined = undefined;

  import { onMount } from 'svelte';

  let loaded = false;
  let thisImage: HTMLImageElement;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<img
  src="{src}"
  alt="{alt}"
  loading="lazy"
  class:loaded
  bind:this="{thisImage}"
  style="{objectToStyleString({ transitionDuration: `${transitionDuration}s`, filter })}" />

<style>
  img {
    line-height: 1em;
    opacity: 0;
    transition: opacity 600ms ease-out;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img.loaded {
    opacity: 1;
  }
</style>
