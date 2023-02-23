<script lang="ts">
  import { Markdown } from '../../molecule';
  import { FullSection } from '../../layout';
  import SveltePlainEditor from './SectionPlainEditor.svelte';

  export let body = '';
</script>

<FullSection height="auto">
  <div class="pad">
    <Markdown content="{body}" />
  </div>
  <SveltePlainEditor body="{body}" on:save />
</FullSection>

<style>
  .pad {
    position: relative;
    max-width: 50vw;
    padding: 2em;
    flex-direction: column;
  }
</style>
