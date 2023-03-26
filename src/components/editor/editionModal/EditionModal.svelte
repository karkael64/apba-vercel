<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '../../atoms/button/Button.svelte';
  import Modal from '../../layout/modal/Modal.svelte';

  export let open = false;
  export let title = '';
  export let mode: 'create' | 'update' = 'create';

  const dispatch = createEventDispatcher();

  const onClose = () => (open = false);

  const onCreate = () => {
    dispatch('create');
    onClose();
  };
  const onUpdate = () => {
    dispatch('update');
    onClose();
  };
  const onDelete = () => {
    dispatch('delete');
    onClose();
  };
</script>

<Modal bind:open>
  <div class="head">
    <h2>{title}</h2>
    <div class="head-buttons">
      {#if mode === 'create'}
        <div>
          <Button color="primary" on:click="{onCreate}">Créer &plus;</Button>
        </div>
      {/if}
      {#if mode === 'update'}
        <div>
          <Button color="primary" on:click="{onUpdate}">Modifier &check;</Button>
        </div>
      {/if}
      {#if mode === 'update'}
        <div>
          <Button color="secondary" on:click="{onDelete}">Supprimer &#128465;</Button>
        </div>
      {/if}
      <div>
        <Button color="secondary" on:click="{onClose}">Annuler &cross;</Button>
      </div>
    </div>
  </div>
  <div class="content">
    <slot />
  </div>
</Modal>

<style>
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 auto;
    background: var(--minus);
    padding: 1rem;
  }
  .head-buttons {
    display: flex;
  }
  .head-buttons > * {
    margin-left: 1rem;
  }
  .content {
    flex: 1 1 auto;
    padding: 1rem 1rem 20rem 1rem;
    overflow: clip auto;
  }
  h2 {
    margin: 0;
  }
</style>
