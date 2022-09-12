<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';

export let year: number = 1970;

const dispatch = createEventDispatcher();
const currentYear = new Date().getFullYear();

const years = Array.from({ length: 20 }, (_, index) => currentYear + index - 10);

let scroller: HTMLDivElement;

onMount(() => {
  const itemHeight = scroller.firstElementChild?.clientHeight ?? 24;
  const scrollTop = Math.min(itemHeight * (year - currentYear) + itemHeight * 8);
  scroller.scrollTo({ top: scrollTop, behavior: 'smooth' });
});
</script>

<div class="scroll" bind:this="{scroller}">
  {#each years as year}
    <div on:click="{() => dispatch('select', year)}">{year}</div>
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
