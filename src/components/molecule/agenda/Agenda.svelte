<script lang="ts">
import SelectDateByMonth from './selectDateByMonthView/Month.svelte';
type View = 'date' | 'week' | 'month' | 'year';

// export let precisionTargeted: View = 'date';
export let originView: View = 'date';
export let date: Date = new Date();
export let events: Date[] = [];

let currentView = originView;
let currentDate = date;

const onPreviousMonthClick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
};

const onNextMonthClick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
};

const onChangeView = (view: View, newDate: Date) => () => {
  currentView = view;
  date = newDate;
};
</script>

<div class="agenda">
  {#if currentView === 'year'}
    <span>Year view</span>
  {:else if currentView === 'month'}
    <span>Month view</span>
  {:else if currentView === 'week'}
    <span>Week view</span>
  {:else if currentView === 'date'}
    <SelectDateByMonth
      events="{events}"
      year="{date.getFullYear()}"
      month="{date.getMonth()}"
      on:click
      on:previous="{onPreviousMonthClick}"
      on:next="{onNextMonthClick}"
      on:editmonth="{onChangeView('month', date)}"
      on:edityear="{onChangeView('year', date)}" />
  {/if}
</div>

<style>
.agenda {
  width: 20em;
  padding: 1em;
  border: 1px solid var(--minus);
  border-radius: 0.5em;
}
</style>
