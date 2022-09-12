<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';

export let month: number = 0;

const dispatch = createEventDispatcher();

const getMonthName = (month: number) => {
  switch (month) {
    case 0:
      return 'Janvier';
    case 1:
      return 'Février';
    case 2:
      return 'Mars';
    case 3:
      return 'Avril';
    case 4:
      return 'Mai';
    case 5:
      return 'Juin';
    case 6:
      return 'Juillet';
    case 7:
      return 'Août';
    case 8:
      return 'Septembre';
    case 9:
      return 'Octobre';
    case 10:
      return 'Novembre';
    default:
      return 'Décembre';
  }
};

const months = Array.from({ length: 12 });

let scroller: HTMLDivElement;

onMount(() => {
  const itemHeight = scroller.firstElementChild?.clientHeight ?? 24;
  const scrollTop = Math.min(itemHeight * month - itemHeight * 2);
  scroller.scrollTo({ top: scrollTop, behavior: 'smooth' });
});
</script>

<div class="scroll" bind:this="{scroller}">
  {#each months as _, index}
    <div on:click="{() => dispatch('select', index)}">{getMonthName(index)}</div>
  {/each}
</div>

<style>
.scroll {
  height: 7.5rem;
  overflow-x: clip;
  overflow-y: scroll;
  text-align: center;
}

.scroll > div {
  height: 1.5rem;
  line-height: 1.5rem;
  cursor: pointer;
}

.scroll > div:hover {
  opacity: 0.8;
}
</style>
