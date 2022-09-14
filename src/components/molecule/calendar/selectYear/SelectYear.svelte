<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';

export let year: number = 1970;

const dispatch = createEventDispatcher();
const currentYear = new Date().getFullYear();

const years = Array.from({ length: 40 }, (_, index) => currentYear + index - 20);

let scroller: HTMLDivElement;

onMount(() => {
  const item = Array.prototype.find.call(
    scroller.children,
    (child: Element) => child.textContent === year.toString()
  );
  const scrollTop = item.offsetTop - (scroller.clientHeight - item.clientHeight) / 2;
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
  position: relative;
  overflow-x: clip;
  overflow-y: scroll;
  text-align: center;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 20px var(--negative);
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
