<script lang="ts">
  import { groupStorage, isString } from '$lib/client';
  import type { Writable } from 'svelte/store';
  import MarkdownEditor from '../markdownEditor/MarkdownEditor.svelte';

  export let inner: boolean | undefined = false;
  export let markdown: string | undefined = undefined;
  let isMarkdownOpen = false;

  const onClick = () => {
    isMarkdownOpen = true;
  };

  type InferWritable<T> = T extends Writable<infer S> ? S : never;
  let group: InferWritable<typeof groupStorage> = '';

  groupStorage.subscribe((value) => {
    if (isString(value)) {
      group = value ?? '';
    }
  });
</script>

{#if group === 'admin'}
  <button class="{inner ? 'inner' : ''}" on:click="{onClick}">✏</button>
  {#if markdown !== undefined}
    <MarkdownEditor bind:text="{markdown}" bind:open="{isMarkdownOpen}" on:save />
  {/if}
{/if}

<style>
  button {
    position: absolute;
    display: block;
    bottom: 100%;
    right: 0;

    background: #eef;
    color: black;
    border: grey;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    width: 3rem;
    height: 3rem;
    box-shadow: 0 0 1rem 0 #000;
    cursor: pointer;
  }

  button.inner {
    bottom: auto;
    top: 0;
  }
</style>
