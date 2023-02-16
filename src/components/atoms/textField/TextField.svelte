<script lang="ts">
  import { customEventListener } from '$lib/client';
  import { createEventDispatcher, onMount } from 'svelte';

  export let type: string;
  export let name: string;
  export let label: string;
  export let error: string | undefined = undefined;
  export let value: string = '';

  let inputRef: HTMLInputElement;
  let focus = false;

  const dispatch = createEventDispatcher();

  const onFocus = () => {
    focus = true;
    dispatch('focus');
  };

  const onBlur = () => {
    focus = false;
    dispatch('blur');
  };

  const onInput = () => {
    value = inputRef.value;
    dispatch('input');
  };

  onMount(() => {
    inputRef.addEventListener('keydown', (ev) => {
      if (ev.key.toLowerCase() === 'enter') {
        dispatch('enter');
      }
    });

    customEventListener(
      inputRef,
      () => inputRef.matches('input:-webkit-autofill, input:autofill'),
      () => (focus = true),
      { interval: 10 }
    );
  });
</script>

<label>
  <span class="label-placeholder">&nbsp;</span>
  <span class="{`label-text ${!focus && inputRef?.value.length <= 0 ? 'inner' : ''}`}"
    >{label}</span>
  <input
    bind:this="{inputRef}"
    value="{value}"
    name="{name}"
    type="{type}"
    on:input="{onInput}"
    on:focus="{onFocus}"
    on:blur="{onBlur}" />
  <span class="{`error ${error ? 'active' : ''}`}">{error}</span>
</label>

<style>
  label {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  span.label-placeholder {
    opacity: 0;
  }
  span.label-text {
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.2s all ease;
    pointer-events: none;
    color: var(--medium);
    width: 100%;
  }
  span.label-text.inner {
    top: 1.875rem;
    left: 1rem;
    width: calc(100% - 2rem);
  }
  span.label-placeholder,
  span.label-text {
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  input {
    border: none;
    outline: 1px solid var(--medium);
    background-color: var(--negative);
    color: var(--positive);
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    border-radius: 0.25rem;
    text-overflow: ellipsis;
  }
  input:autofill,
  input:-webkit-autofill,
  input:-internal-autofill-selected {
    font-size: 1rem;
    transition: font-size 600000s 0s, background-color 600000s 0s, color 600000s 0s;
  }
  input:focus {
    outline: 2px solid var(--primary);
  }
  span.error {
    opacity: 0;
    color: var(--burntSienna);
    background: var(--medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
  }
  span.error.active {
    opacity: 1;
  }
</style>
