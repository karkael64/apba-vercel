<script lang="ts">
import { dateToString, getMonthName } from '../../../common/date';
import { createEventDispatcher } from 'svelte';
import Day from './Day.svelte';

export let events: Date[];
export let year: number;
export let month: number;
export let isWeekStartingWithSunday = false;

let monthEvents: Date[];
let firstDate: Date;
let monthDays: Date[];
$: {
  monthEvents = events.filter((date) => date.getFullYear() === year && date.getMonth() === month);

  firstDate = new Date(year, month, 1);
  firstDate.setDate(
    firstDate.getDate() -
      (firstDate.getDay() ? firstDate.getDay() : 7) +
      (isWeekStartingWithSunday ? 0 : 1)
  );
  if (firstDate.getDate() === 1) firstDate.setDate(-6);

  monthDays = Array.from({ length: 42 }, (_, index): Date => {
    const date = new Date(firstDate);
    date.setDate(firstDate.getDate() + index);
    return date;
  });
}

const dispatch = createEventDispatcher();

const monthDayClick = (date: Date) => () => dispatch('click', date);
const previousMonthClick = () => dispatch('previous');
const nextMonthClick = () => dispatch('next');

const displayPin = (date: Date) => {
  const matchDate = dateToString(date);
  return !!monthEvents.find((ev) => dateToString(ev) === matchDate);
};
</script>

<div class="month">
  <div class="year-selector" on:click="{() => dispatch('edityear')}">{year}</div>
  <div class="month-selector" on:click="{() => dispatch('editmonth')}">{getMonthName(month)}</div>
  <div class="week-days">
    {#if isWeekStartingWithSunday}
      <span class="weak" title="Dimanche">D</span>
    {/if}
    <span title="Lundi">L</span>
    <span title="Mardi">Ma</span>
    <span title="Mercredi">Me</span>
    <span title="Jeudi">J</span>
    <span title="Vendredi">V</span>
    <span class="weak" title="Samedi">S</span>
    {#if !isWeekStartingWithSunday}
      <span class="weak" title="Dimanche">D</span>
    {/if}
  </div>
  <div class="weeks">
    {#each monthDays as date}
      {@const dateYear = date.getFullYear()}
      <div>
        {#if dateYear < year || (dateYear === year && date.getMonth() < month)}
          <Day
            number="{date.getDate()}"
            pin="{displayPin(date)}"
            on:click="{previousMonthClick}"
            weak />
        {:else if dateYear > year || (dateYear === year && date.getMonth() > month)}
          <Day
            number="{date.getDate()}"
            pin="{displayPin(date)}"
            on:click="{nextMonthClick}"
            weak />
        {:else}
          <Day
            number="{date.getDate()}"
            pin="{displayPin(date)}"
            on:click="{monthDayClick(date)}" />
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
.month {
  display: flex;
  flex-direction: column;
}

.year-selector {
  font-size: 1.5em;
  text-align: center;
  cursor: pointer;
  opacity: 1;
}
.year-selector:hover {
  opacity: 0.8;
}

.month-selector {
  font-size: 1.5em;
  text-align: center;
  cursor: pointer;
  opacity: 1;
}
.month-selector:hover {
  opacity: 0.8;
}

.week-days {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.week-days > span {
  margin-top: 0.5em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: calc(100% / 7 - 0.5em);
  text-align: center;
}

.weeks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.weeks > div {
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: calc(100% / 7 - 0.5em);
}
</style>
