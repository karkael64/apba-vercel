<script context="module" lang="ts">
  import { userAuth } from '$lib/client';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch }) => {
    const req = await fetch(`/api/auth/login`);
    try {
      const userAuthData = await req.json();
      userAuth.set(userAuthData);
    } catch (e) {
      userAuth.set(null);
    }
    return {};
  };
</script>

<script lang="ts">
  import { Color, Nav, Footer, Storage } from '$lib/client';
  import '../app.css';
</script>

<Storage />
<Color />
<Nav />
<main>
  <slot />
</main>
<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 314px);
  }
</style>
