<script lang="ts">
  import Calendar from '../../molecule/calendar/Calendar.svelte';
  import TextField from '../textField/TextField.svelte';
  import { formatDateLocal, type SvelteEvent } from '../../../util/common';
  import { createEventDispatcher } from 'svelte';

  export let label: string | undefined = undefined;
  export let name: string;
  export let value: Date | undefined = undefined;
  export let format: string | undefined = undefined;

  let isOpen = false;
  let anchorDate = value ? new Date(value) : new Date();

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
      const newDate = new Date(value);
      newDate.setFullYear(ev.detail.getFullYear());
      newDate.setMonth(ev.detail.getMonth());
      newDate.setDate(ev.detail.getDate());
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
</script>

<div class="date-picker" on:click="{onPrevent}">
  <TextField
    type="text"
    label="{label}"
    name="{name}"
    on:focus="{onOpen}"
    value="{value && (format ? formatDateLocal(value, format) : value.toLocaleDateString())}" />
  {#if isOpen}
    <div class="handler" on:click="{onClose}"></div>
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
  .handler {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
