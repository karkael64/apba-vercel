<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ButtonColor, ButtonShape } from './Button.svelte';

  export let color: ButtonColor = 'secondary';
  export let shape: ButtonShape = 'round';
  export let href: string | undefined = undefined;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  let classes = '';
  $: classes = ['button', color, shape, disabled ? 'disabled' : ''].filter((c) => !!c).join(' ');

  const handleClick = () => {
    if (!disabled) {
      dispatch('click');
    }
  };
</script>

{#if href}
  <a href="{href}" type="button" class="{classes}" on:click="{handleClick}"><slot /></a>
{:else}
  <button type="button" class="{classes}" disabled="{disabled}" on:click="{handleClick}">
    <slot />
  </button>
{/if}

<style>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;

    padding: 0 1em;
    border: 0;
    height: 2.5em;

    cursor: pointer;
    user-select: none;
    color: white;

    font-size: 1rem;
    font-weight: 700;
    line-height: 1;

    transition: all 0.2s;
  }

  .button:hover {
    box-shadow: inset 0 0 1.2em 0 #8888;
  }

  .button.primary {
    background: var(--primary);
  }

  .button.secondary {
    background: var(--secondary);
  }

  .button.square {
    border-radius: none;
  }

  .button.round {
    border-radius: 4px;
  }

  .button.circle {
    border-radius: 4em;
  }

  .button.disabled {
    cursor: default;
    color: var(--positive);
    background: var(--minus);
  }

  .button.editor {
    background: #eef;
    color: black;
    border: grey;
    border-radius: 1rem;
    box-shadow: 0 0 1rem 0 #000;
  }
</style>
