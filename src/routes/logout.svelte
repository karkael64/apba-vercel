<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    await fetch('/api/auth/logout');
    setTimeout(() => (location.href = '/'), 2000);
  });
</script>

<h2>Déconnexion</h2>
