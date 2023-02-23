<script lang="ts">
  import { initStorage, storage } from '../../../util/client';
  import { onMount } from 'svelte';

  let loaded = false;
  onMount(initStorage);
</script>

{#if loaded}
  <slot />
{/if}
