<script lang="ts">
  import { dateToString } from '$lib/client';
  import { createEventDispatcher } from 'svelte';
  import Day from '../selectDateByMonthView/Day.svelte';

  export let events: Date[];
  export let year: number;
  export let month: number;
  export let firstWeekDate: Date;

  const weekDays = Array.from({ length: 7 }, (_, index): Date => {
    const date = new Date(firstWeekDate);
    date.setDate(firstWeekDate.getDate() + index);
    return date;
  });

  const dispatch = createEventDispatcher();

  const monthDayClick = (date: Date) => () => dispatch('click', date);
  const previousMonthClick = () => dispatch('previous');
  const nextMonthClick = () => dispatch('next');

  const displayPin = (date: Date) => {
    const matchDate = dateToString(date);
    return !!events.find((ev) => dateToString(ev) === matchDate);
  };
</script>

<div class="week">
  {#each weekDays as date}
    {#if date.getFullYear() < year || date.getMonth() < month}
      <Day
        number="{date.getDate()}"
        pin="{displayPin(date)}"
        on:click="{previousMonthClick}"
        weak />
    {:else if date.getFullYear() > year || date.getMonth() > month}
      <Day number="{date.getDate()}" pin="{displayPin(date)}" on:click="{nextMonthClick}" weak />
    {:else}
      <Day number="{date.getDate()}" pin="{displayPin(date)}" on:click="{monthDayClick(date)}" />
    {/if}
  {/each}
</div>

<style>
  .week {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }
</style>
