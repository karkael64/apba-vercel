<script lang="ts">
  import { type CSSObject, objectToStyleString } from '../../../util/client';
  import { ImageLoader } from '../../molecule';

  export let backgroundImage: string | undefined = undefined;
  export let backgroundFilter: string | undefined = undefined;
  export let height: string | undefined = undefined;

  $: styles = { height } as CSSObject;
</script>

<section style="{objectToStyleString(styles)}">
  {#if backgroundImage}
    <div class="covered">
      <ImageLoader
        src="{backgroundImage}"
        alt="Fond de section"
        height="{height || '100vh'}"
        filter="{backgroundFilter}" />
    </div>
  {/if}
  <slot />
</section>

<style>
  section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .covered {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
