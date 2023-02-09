<script lang="ts">
  import type { SvelteEvent } from 'src/components/common/ambient';

  import SelectDateByMonth from './selectDateByMonthView/Month.svelte';
  import SelectMonth from './selectMonth/SelectMonth.svelte';
  import SelectYear from './selectYear/SelectYear.svelte';
  type View = 'date' | 'week' | 'month' | 'year';

  // export let precisionTargeted: View = 'date';
  export let originView: View = 'date';
  export let date: Date = new Date();
  export let events: Date[] = [];

  let currentView = originView;
  let currentDate = new Date(date);

  const onPreviousMonthClick = () => {
    const dt = new Date(currentDate);
    dt.setMonth(currentDate.getMonth() - 1);
    currentDate = dt;
  };

  const onNextMonthClick = () => {
    const dt = new Date(currentDate);
    dt.setMonth(currentDate.getMonth() + 1);
    currentDate = dt;
  };

  const onMonthSelect = (month: SvelteEvent<number>) => {
    const dt = new Date(currentDate);
    dt.setMonth(month.detail);
    currentDate = dt;
    currentView = 'date';
  };

  const onYearSelect = (year: SvelteEvent<number>) => {
    const dt = new Date(currentDate);
    dt.setFullYear(year.detail);
    currentDate = dt;
    currentView = 'date';
  };

  const onChangeView = (view: View) => () => {
    currentView = view;
  };
</script>

<div class="calendar">
  {#if currentView === 'year'}
    <SelectYear year="{currentDate.getFullYear()}" on:select="{onYearSelect}" />
  {:else if currentView === 'month'}
    <SelectMonth month="{currentDate.getMonth()}" on:select="{onMonthSelect}" />
  {:else if currentView === 'week'}
    <span>Week view</span>
  {:else if currentView === 'date'}
    <SelectDateByMonth
      events="{events}"
      year="{currentDate.getFullYear()}"
      month="{currentDate.getMonth()}"
      on:click
      on:previous="{onPreviousMonthClick}"
      on:next="{onNextMonthClick}"
      on:editmonth="{onChangeView('month')}"
      on:edityear="{onChangeView('year')}"
    />
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
