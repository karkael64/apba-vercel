<script lang="ts">
  import { Button, Modal } from '$lib/client';
  import Markdown from '../markdown/Markdown.svelte';
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let text = '';

  let inputRef: HTMLTextAreaElement;

  $: {
    if (inputRef && text !== inputRef.value) {
      inputRef.value = text;
    }
  }

  const onInput = () => {
    text = inputRef.value;
  };

  const onClose = () => {
    open = false;
  };

  const dispatch = createEventDispatcher();

  const onSave = () => {
    dispatch('save', text);
    open = false;
  };
</script>

<Modal bind:open>
  <div class="head">
    <h2>Editeur de Markdown</h2>
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
    <label class="frame">
      <span class="label">Texte au format Markdown</span>
      <textarea on:input="{onInput}" bind:this="{inputRef}"></textarea>
    </label>
    <div class="frame">
      <span class="label">Résultat attendu</span>
      <Markdown content="{text}" />
    </div>
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
  .frame {
    display: block;
    border: 1px solid var(--medium);
    padding: 1rem;
    margin: 1rem 0;
  }
  .label {
    color: var(--medium);
    font-size: 0.875rem;
  }
  textarea,
  textarea:hover,
  textarea:focus {
    display: block;
    color: inherit;
    background: none;
    border: none;
    outline: none;
    min-width: 100%;
    max-width: 100%;
    min-height: 5rem;
  }
</style>
