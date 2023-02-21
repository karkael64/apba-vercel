<script lang="ts">
  import { storage } from '$lib/client';
  import { onMount } from 'svelte';

  onMount(async () => {
    await fetch('/api/auth/logout');
    storage.set({ group: null, expire: null });
    setTimeout(() => (location.href = '/'), 2000);
  });
</script>

<h2>Déconnexion</h2>
