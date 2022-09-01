<script lang="ts">
import { dateToString } from '../../../common/date';
import { createEventDispatcher } from 'svelte';
import Day from './Day.svelte';

export let events: Date[];
export let year: number;
export let month: number;

const monthEvents = events.filter(
  (date) => date.getFullYear() === year && date.getMonth() === month
);

const firstDate = new Date(year, month, 1);
firstDate.setDate(firstDate.getDate() - (firstDate.getDay() ? firstDate.getDay() - 1 : 6));

const monthDays = Array.from({ length: 35 }, (_, index): Date => {
  const date = new Date(firstDate);
  date.setDate(firstDate.getDate() + index);
  return date;
});

const monthDayClick = (date: Date) => () => dispatch('click', date);
const previousMonthClick = () => dispatch('previous');
const nextMonthClick = () => dispatch('next');

const dispatch = createEventDispatcher();

const displayPin = (date: Date) => {
  const matchDate = dateToString(date);
  return !!monthDays.find((ev) => dateToString(ev) === matchDate);
};

const getMonthName = (month: number) => {
  switch (month) {
    case 0:
      return 'Janvier';
    case 1:
      return 'Février';
    case 2:
      return 'Mars';
    case 3:
      return 'Avril';
    case 4:
      return 'Mai';
    case 5:
      return 'Juin';
    case 6:
      return 'Juillet';
    case 7:
      return 'Août';
    case 8:
      return 'Septembre';
    case 9:
      return 'Octobre';
    case 10:
      return 'Novembre';
    default:
      return 'Décembre';
  }
};

console.log({ events, year, month, firstDate });
</script>

<div class="month">
  <div class="year-selector" on:click="{() => dispatch('edityear')}">{year}</div>
  <div class="month-selector" on:click="{() => dispatch('editmonth')}">{getMonthName(month)}</div>
  <div class="week-days">
    <span title="Lundi">L</span>
    <span title="Mardi">Ma</span>
    <span title="Mercredi">Me</span>
    <span title="Jeudi">J</span>
    <span title="Vendredi">V</span>
    <span class="weak" title="Samedi">S</span>
    <span class="weak" title="Dimanche">D</span>
  </div>
  <div class="weeks">
    {#each monthDays as date}
      <div>
        {#if date.getFullYear() < year || date.getMonth() < month}
          <Day
            number="{date.getDate()}"
            pin="{displayPin(date)}"
            on:click="{previousMonthClick}"
            weak />
        {:else if date.getFullYear() > year || date.getMonth() > month}
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
  justify-content: stretch;
  align-items: stretch;
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
  margin-right: 0.5em;
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
