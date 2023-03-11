<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let pin: boolean = false;
  export let number: number;
  export let weak: boolean = false;
  export let today: boolean = false;

  const dispatch = createEventDispatcher();

  const handleKeydown = (ev: KeyboardEvent) => {
    if (['space', 'enter'].includes(ev.code.toLowerCase())) {
      ev.preventDefault();
      ev.stopPropagation();
      dispatch('click');
    }
  };
</script>

<div
  tabindex="0"
  class="{`day ${pin ? '' : 'hidePin'} ${weak ? 'weak' : ''} ${today ? 'today' : ''}`}"
  on:click
  on:keydown="{handleKeydown}">
  <span class="number">{number}</span>
  <span class="pin"></span>
</div>

<style>
  .day {
    outline: 1px solid transparent;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    border: 1px solid var(--primary);
    border-radius: 2px;
    cursor: pointer;
  }

  .day.hidePin {
    border-color: var(--minus);
  }

  .day.hidePin .pin {
    opacity: 0;
  }

  .day:focus {
    outline: 1px solid var(--primary);
  }

  .pin {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: var(--primary);
  }

  .number {
    display: inline-block;
    width: 1.5em;
    height: 1.2em;
    text-align: center;
  }

  .weak {
    opacity: 0.4;
  }

  .today {
    background: var(--minus);
  }
</style>
