<script lang="ts">
  import { onMount } from 'svelte';

  import { dark, light } from '../../../util/client';
  import { objectReduce } from '../../../util/common';
  import { colorScheme } from './colorScheme';

  export let defaultColorScheme: 'light' | 'dark' | undefined = undefined;

  let el: HTMLStyleElement;

  const colorsToCssVar = (obj: Record<string, string>) =>
    objectReduce(obj, (acc, item, key) => `${acc}\n--${key}: ${item};`, '');

  let index: number;

  onMount(() => {
    colorScheme.subscribe((value) => {
      if (!el || !el.sheet) return;
      if (index !== undefined) el.sheet.deleteRule(index);
      el.parentNode?.appendChild(el);
      if (value === 'light') {
        index = el.sheet.insertRule(`:root {${colorsToCssVar(light)}\n}`);
      } else if (value === 'dark') {
        index = el.sheet.insertRule(`:root {${colorsToCssVar(dark)}\n}`);
      } else {
        const userPreferColorScheme = window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
        const setColorScheme = defaultColorScheme || userPreferColorScheme;
        colorScheme.set(setColorScheme === 'light' ? 'light' : 'dark');
      }
    });
  });
</script>

<svelte:head>
  <style bind:this="{el}"></style>
</svelte:head>

<slot />
