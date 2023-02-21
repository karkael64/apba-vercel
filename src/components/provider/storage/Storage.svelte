<script lang="ts">
  import { initStorage, isString, storage } from '$lib/client';
  import { onMount } from 'svelte';
  let loaded = false;

  onMount(() => {
    const { group, expire } = initStorage();
    if (group && isString(expire) && expire.length) {
      if (new Date(expire).valueOf() < Date.now()) {
        storage.set({ group: undefined, expire: undefined });
      }
    }
    loaded = true;
  });
</script>

{#if loaded}
  <slot />
{/if}
