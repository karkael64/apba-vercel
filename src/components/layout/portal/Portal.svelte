<script context="module" lang="ts">
  export const portal = (nodeRef: HTMLElement, container: HTMLElement) => {
    const update = (container: HTMLElement) => {
      container.appendChild(nodeRef);
      nodeRef.hidden = false;
    };

    const destroy = () => {
      nodeRef.parentNode?.removeChild(nodeRef);
    };

    update(container);

    return { update, destroy };
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  export let container: HTMLElement;

  onMount(() => {
    if (!container) {
      container = document.body;
    }
  });
</script>

{#if container}
  <div use:portal="{container}">
    <slot />
  </div>
{/if}
