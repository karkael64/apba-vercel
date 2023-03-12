<script lang="ts">
  import type { AnyObject } from '$lib/server';
  import { createEventDispatcher } from 'svelte';

  export let formatValue: undefined | ((selectedOptions: AnyObject<string, string>) => string) =
    undefined;
  export let label: string | undefined = undefined;
  export let multiple: boolean = false;
  export let options: AnyObject<string, string>;
  export let placeholder: string | undefined = undefined;
  export let value: string | string[] | undefined = undefined;

  let open = false;
  let listValue: string[] = [];
  let mapValue: AnyObject<string, string> = {};
  let valueDisplay: string = '';

  $: {
    listValue = Array.isArray(value) ? value : value === undefined ? [] : [value];
    mapValue = listValue.reduce((acc, value) => {
      acc[value] = options[value];
      return acc;
    }, {} as AnyObject<string, string>);
    valueDisplay = formatValue ? formatValue(mapValue) : Object.values(mapValue).join(', ');
  }

  const dispatch = createEventDispatcher();

  const handleClick = (optionValue: string) => () => {
    if (multiple) {
      const newList = listValue.slice();
      const index = newList.indexOf(optionValue);
      if (index >= 0) {
        newList.splice(index, 1);
      } else {
        newList.push(optionValue);
      }
      value = newList;
      dispatch('click', newList);
    } else {
      value = optionValue;
      dispatch('click', optionValue);
      open = false;
    }
  };

  const handleOpen = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
    open = true;
  };

  const handleClose = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
    open = false;
  };

  let shrink: boolean;
  $: {
    shrink = placeholder === undefined && listValue.length <= 0;
  }
</script>

<div class="select" on:click="{handleOpen}">
  {#if label !== undefined}
    <span class="label-placeholder">&nbsp;</span>
    <span class="{`label-text${shrink ? ' inner' : ''}`}">{label}</span>
  {/if}
  <div class="box">
    <div class="{`display${!valueDisplay && placeholder ? ' placeholder' : ''}`}">
      {valueDisplay || placeholder}
    </div>
    <div class="{`caret${open ? ' open' : ''}`}">▲</div>
  </div>
  {#if open}
    <div class="dropdown">
      {#each Object.entries(options) as [optionValue, optionLabel] (optionValue)}
        <div
          class="{`item${listValue.includes(optionValue) ? ' selected' : ''}`}"
          on:click="{handleClick(optionValue)}">
          {optionLabel}
        </div>
      {/each}
    </div>
  {/if}
</div>

<svelte:body on:click="{handleClose}" />

<style>
  .select {
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
  }

  .box {
    position: relative;
    display: flex;
    border: none;
    outline: 1px solid var(--medium);
    background-color: var(--negative);
    color: var(--positive);
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    border-radius: 0.25rem;
    text-overflow: ellipsis;
    user-select: none;
    width: 16rem;
    cursor: pointer;
  }

  .box:focus {
    outline: 2px solid var(--primary);
  }

  span.label-placeholder {
    opacity: 0;
  }
  span.label-text {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.2s all ease;
    pointer-events: none;
    color: var(--medium);
    width: 100%;
  }
  span.label-text.inner {
    top: 1.75rem;
    left: 1rem;
    width: calc(100% - 2rem);
  }
  span.label-placeholder,
  span.label-text {
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .display {
    flex: 1 1 auto;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: none;
  }

  .display.placeholder {
    z-index: 2;
    color: var(--medium);
  }

  .caret {
    flex: 0 0 auto;
    animation: 0.2s ease all;
    margin-left: 0.5rem;
  }

  .caret.open {
    transform: rotate(180deg);
  }

  .dropdown {
    z-index: 1;
    position: absolute;
    min-width: 100%;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);

    margin: 0.25rem 0;

    border: none;
    border-radius: 0.25rem;
    outline: 1px solid var(--medium);
    background-color: var(--negative);
  }

  .item {
    padding: 0.5rem 1rem;
  }

  .item.selected {
    background-color: var(--minus);
  }

  .item:hover {
    background-color: var(--medium);
  }
</style>
