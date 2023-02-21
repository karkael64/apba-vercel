<script lang="ts">
  import type { SvelteEvent } from '$lib/client';
  import { createEventDispatcher } from 'svelte';

  import SelectDateByMonth from './selectDateByMonthView/Month.svelte';
  import SelectMonth from './selectMonth/SelectMonth.svelte';
  import SelectYear from './selectYear/SelectYear.svelte';
  type View = 'date' | 'week' | 'month' | 'year';

  export let anchorDate: Date;
  export let view: View = 'date';
  export let events: Date[] = [];

  const dispatch = createEventDispatcher();

  const onPreviousMonthClick = () => {
    const dt = new Date(anchorDate);
    dt.setDate(1);
    dt.setMonth(anchorDate.getMonth() - 1);
    anchorDate = dt;
    dispatch('changeAnchorDate', dt);
  };

  const onNextMonthClick = () => {
    const dt = new Date(anchorDate);
    dt.setDate(1);
    dt.setMonth(anchorDate.getMonth() + 1);
    anchorDate = dt;
    dispatch('changeAnchorDate', dt);
  };

  const onMonthSelect = (month: SvelteEvent<number>) => {
    const dt = new Date(anchorDate);
    dt.setDate(1);
    dt.setMonth(month.detail);
    anchorDate = dt;
    view = 'date';
    dispatch('changeAnchorDate', dt);
  };

  const onYearSelect = (year: SvelteEvent<number>) => {
    const dt = new Date(anchorDate);
    dt.setDate(1);
    dt.setFullYear(year.detail);
    anchorDate = dt;
    view = 'date';
    dispatch('changeAnchorDate', dt);
  };

  const onChangeView = (newView: View) => () => {
    view = newView;
  };

  const onTodayClick = () => {
    anchorDate = new Date();
  };
</script>

<div class="calendar">
  {#if view === 'year'}
    <SelectYear year="{anchorDate.getFullYear()}" on:select="{onYearSelect}" />
  {:else if view === 'month'}
    <SelectMonth month="{anchorDate.getMonth()}" on:select="{onMonthSelect}" />
  {:else if view === 'week'}
    <span>Week view</span>
  {:else if view === 'date'}
    <SelectDateByMonth
      events="{events}"
      year="{anchorDate.getFullYear()}"
      month="{anchorDate.getMonth()}"
      on:click
      on:previous="{onPreviousMonthClick}"
      on:next="{onNextMonthClick}"
      on:editMonth="{onChangeView('month')}"
      on:editYear="{onChangeView('year')}"
      on:today="{onTodayClick}" />
  {/if}
</div>

<style>
  .calendar {
    font-size: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 20em;
    height: 18em;
    padding: 1em;
    border: 1px solid var(--minus);
    border-radius: 0.5em;

    user-select: none;
  }
</style>
