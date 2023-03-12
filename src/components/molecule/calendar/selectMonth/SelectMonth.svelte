<script lang="ts">
  import { getMonthName } from '../../../../util/common';
  import { createEventDispatcher, onMount } from 'svelte';

  export let month: number = 0;

  const dispatch = createEventDispatcher();

  const months = Array.from({ length: 12 });

  let scroller: HTMLDivElement;

  onMount(() => {
    const monthName = getMonthName(month);
    const item = Array.prototype.find.call(
      scroller.children,
      (child: Element) => child.textContent === monthName
    );
    const scrollTop = item.offsetTop - (scroller.clientHeight - item.clientHeight) / 2;
    scroller.scrollTo({ top: scrollTop });
  });
</script>

<div class="scroll" bind:this="{scroller}">
  {#each months as _, index}
    <div on:click="{() => dispatch('select', index)}">{getMonthName(index)}</div>
  {/each}
</div>

<style>
  .scroll {
    position: relative;
    overflow-x: clip;
    overflow-y: scroll;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .scroll > div {
    height: 1.5em;
    line-height: 1.5em;
    cursor: pointer;
  }

  .scroll > div:hover {
    opacity: 0.8;
  }

  .scroll > div:first-child {
    padding-top: 1rem;
  }

  .scroll > div:last-child {
    padding-bottom: 1rem;
  }
</style>
