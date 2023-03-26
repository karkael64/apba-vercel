<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '../../atoms/button/Button.svelte';
  import Modal from '../../layout/modal/Modal.svelte';

  export let open = false;
  export let inner = false;
  export let title = '';

  const onClose = () => {
    open = false;
  };

  const dispatch = createEventDispatcher();

  const onSave = () => {
    dispatch('save');
    open = false;
  };

  const onClick = () => {
    open = true;
  };
</script>

<button class="{inner ? 'inner' : ''}" on:click="{onClick}">✎</button>
<Modal bind:open>
  <div class="head">
    <h2>{title}</h2>
    <div class="head-buttons">
      <div>
        <Button color="primary" on:click="{onSave}">Valider &check;</Button>
      </div>
      <div>
        <Button color="secondary" on:click="{onClose}">&cross;</Button>
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
    padding: 1rem;
    overflow: clip auto;
  }
  h2 {
    margin: 0;
  }
  button {
    position: absolute;
    display: block;
    bottom: 100%;
    right: 0;

    background: #eef;
    color: black;
    border: grey;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    width: 3rem;
    height: 3rem;
    box-shadow: 0 0 1rem 0 #000;
    cursor: pointer;
  }

  button.inner {
    bottom: auto;
    top: 0;
  }
</style>
