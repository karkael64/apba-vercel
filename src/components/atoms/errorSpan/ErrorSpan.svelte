<script lang="ts">
  export let error: string | undefined = undefined;
</script>

{#if error !== undefined}
  <span class="{`error${error ? ' active' : ''}`}">{error}</span>
{/if}

<style>
  span.error {
    opacity: 0;
    color: var(--burntSienna);
    background: var(--medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.875rem;
    padding: 0 0.5em;
    border-radius: 0.25rem;
    height: 1.125em;
  }
  span.error.active {
    opacity: 1;
  }
</style>
