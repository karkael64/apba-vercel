<script lang="ts">
  import { Color, Nav, Footer, Storage } from '$lib/client';
  import '../app.css';
</script>

<Storage>
  <Color />
  <Nav />
  <main>
    <slot />
  </main>
  <Footer />
</Storage>

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
