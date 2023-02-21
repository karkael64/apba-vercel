<script lang="ts">
  import { fade } from 'svelte/transition';
  import Portal from '../portal/Portal.svelte';
  export let open = false;

  const onClose = () => {
    open = false;
  };
</script>

<Portal>
  {#if open}
    <div class="modal" transition:fade="{{ duration: 100 }}">
      <div class="cover"></div>
      <div class="main" on:click="{onClose}">
        <div class="container" on:click|preventDefault|stopPropagation>
          <slot />
        </div>
      </div>
    </div>
  {/if}
</Portal>

<style>
  .modal {
    z-index: 1;
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: var(--medium);
  }
  .main {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .container {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 50rem;
    max-height: 80%;
    background-color: var(--negative);
    border: 1px solid var(--medium);
  }

  @media only screen and (max-width: 999px) {
    .container {
      margin: 0 2rem;
      width: 100%;
    }
  }
</style>
