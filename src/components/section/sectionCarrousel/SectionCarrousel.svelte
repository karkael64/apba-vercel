<script lang="ts">
  import { Carrousel, type CarrouselPicture } from '../../molecule';
  import SectionCarrouselEditor from './SectionCarrouselEditor.svelte';

  export let pictures: CarrouselPicture[];
  export let duration: number | undefined;
  export let height: string | number | undefined;
</script>

<div>
  <Carrousel pictures="{pictures}" duration="{duration}" height="{height}" />
  <SectionCarrouselEditor pictures="{pictures}" duration="{duration}" height="{height}" on:save />
</div>

<style>
  div {
    position: relative;
    width: 100%;
  }
</style>
