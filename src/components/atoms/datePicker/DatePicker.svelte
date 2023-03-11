<script lang="ts">
  import Calendar from '../../molecule/calendar/Calendar.svelte';
  import TextField from '../textField/TextField.svelte';
  import { formatDateLocal, type SvelteEvent } from '../../../util/common';
  import { createEventDispatcher } from 'svelte';

  export let label: string;
  export let name: string;
  export let value: Date | undefined = undefined;
  export let format: string | undefined = undefined;

  let isOpen = false;
  let anchorDate = new Date();

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
    value = ev.detail;
    isOpen = false;
    dispatch('change', ev.detail);
  };

  const onPrevent = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
  };
</script>

<div class="date-picker" on:click="{onPrevent}">
  <TextField
    type="text"
    label="{label}"
    name="{name}"
    on:focus="{onOpen}"
    value="{value && (format ? formatDateLocal(value, format) : value.toLocaleDateString())}" />
  {#if isOpen}
    <div class="relative">
      <Calendar bind:anchorDate on:click="{onClick}" />
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
  }
</style>
