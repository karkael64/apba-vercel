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
  const monthName = getMonthName(month);
  const item = Array.prototype.find.call(
    scroller.children,
    (child: Element) => child.textContent === monthName
  );
  const scrollTop = item.offsetTop - (scroller.clientHeight - item.clientHeight) / 2;
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
</style>
