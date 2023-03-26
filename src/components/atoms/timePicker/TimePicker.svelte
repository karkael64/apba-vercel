<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { TimeSelect } from '../../molecule';
  import { formatDateLocal, type SvelteEvent } from '../../../util/common';
  import TextField from '../textField/TextField.svelte';

  export let label: string;
  export let name: string;
  export let value: Date | undefined = undefined;
  export let format: string | undefined = undefined;

  let isOpen = false;
  let anchorDate = new Date();

  $: if (value) anchorDate = new Date(value);

  const dispatch = createEventDispatcher();

  const onOpen = () => {
    isOpen = true;
    dispatch('open');
  };

  const onClose = () => {
    isOpen = false;
    dispatch('close');
  };

  const onClick = (ev: SvelteEvent<Date>) => {
    if (value) {
      const newDate = new Date(ev.detail);
      newDate.setFullYear(value.getFullYear());
      newDate.setMonth(value.getMonth());
      newDate.setDate(value.getDate());
      value = newDate;
    } else {
      value = ev.detail;
    }
    isOpen = false;
    dispatch('change', value);
  };

  const onPrevent = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  const handleClick = () => {
    value = anchorDate;
    isOpen = false;
    dispatch('change', anchorDate);
  };
</script>

<div class="date-picker" on:click="{onPrevent}">
  <TextField
    type="text"
    label="{label}"
    name="{name}"
    on:focus="{onOpen}"
    value="{value && (format ? formatDateLocal(value, format) : value.toLocaleTimeString())}" />
  {#if isOpen}
    <div class="handler" on:click="{onClose}"></div>
    <div class="relative">
      <TimeSelect bind:anchorDate on:click="{onClick}" />
      <div class="buttons">
        <button class="button" on:click="{onClose}">annuler</button>
        <button class="button" on:click="{handleClick}">confirmer</button>
      </div>
    </div>
  {/if}
</div>

<svelte:body on:click="{onClose}" />

<style>
  .date-picker {
    position: relative;
  }

  .relative {
    z-index: 1;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--negative);
    border: 1px solid var(--medium);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .buttons {
    flex: 0 0 1rem;
    min-height: 1rem;
    padding: 1rem;

    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .button {
    outline: 1px solid var(--minus);
    border: none;
    border-radius: 2px;
    background: none;
    color: var(--positive);
    cursor: pointer;
    opacity: 0.8;
  }

  .button:focus,
  .button:hover {
    opacity: 1;
  }

  .button:focus {
    outline: 1px solid var(--primary);
  }

  .handler {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
