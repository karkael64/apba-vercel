<script>
  import { FullSection } from '../../layout';
</script>

<FullSection height="auto">
  <div class="pad">
    <slot />
  </div>
</FullSection>

<style>
  .pad {
    max-width: 50vw;
    padding: 2em;
    flex-direction: column;
  }
</style>
