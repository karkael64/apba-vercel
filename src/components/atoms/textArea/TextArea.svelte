<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let label = '';
  export let value = '';

  let inputRef: HTMLTextAreaElement;

  $: {
    if (inputRef && value !== inputRef.value) {
      inputRef.value = value;
    }
  }

  const onInput = () => {
    value = inputRef.value;
  };

  const dispatch = createEventDispatcher();

  onMount(() => {
    inputRef.addEventListener('keydown', (ev) => {
      if (ev.key.toLowerCase() === 'enter') {
        dispatch('enter');
      }
    });
  });
</script>

<label>
  <span class="label">{label}</span>
  <textarea on:input="{onInput}" bind:this="{inputRef}" on:focus on:blur on:input></textarea>
</label>

<style>
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
  }
  .label {
    color: var(--medium);
    font-size: 0.875rem;
  }
  textarea,
  textarea:hover {
    display: block;
    border: none;
    outline: 1px solid var(--medium);
    background-color: var(--negative);
    color: var(--positive);
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    border-radius: 0.25rem;
    min-width: calc(100% - 2rem);
    max-width: calc(100% - 2rem);
    min-height: 5rem;
  }
  textarea:autofill,
  textarea:-webkit-autofill,
  textarea:-internal-autofill-selected {
    font-size: 1rem;
    transition: font-size 600000s 0s, background-color 600000s 0s, color 600000s 0s;
  }
  textarea:focus {
    outline: 2px solid var(--primary);
  }
</style>
