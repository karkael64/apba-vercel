<script lang="ts">
  import { dateToString, getMonthName, today, daysCountBetween } from '../../../../util/common';
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
  const goToday = () => dispatch('today');

  const displayPin = (date: Date) => {
    const matchDate = dateToString(date);
    return !!monthEvents.find((ev) => dateToString(ev) === matchDate);
  };
</script>

<div class="month">
  <div class="year-selector">
    <span on:click="{() => dispatch('editYear')}">{year}</span>
  </div>
  <div class="month-selector">
    <button class="button" on:click="{previousMonthClick}">&larr;</button>
    <span on:click="{() => dispatch('editMonth')}">{getMonthName(month)}</span>
    <button class="button" on:click="{nextMonthClick}">&rarr;</button>
  </div>
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
            on:click="{monthDayClick(date)}"
            today="{daysCountBetween(date, today) === 0}" />
        {/if}
      </div>
    {/each}
  </div>
  <button class="button" on:click="{goToday}">↪ aller à ajourd'hui</button>
</div>

<style>
  .month {
    display: flex;
    flex-direction: column;
  }

  .year-selector,
  .month-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    text-align: center;
  }

  .year-selector > span,
  .month-selector > span {
    cursor: pointer;
    margin: 0 0.5rem;
    opacity: 0.8;
  }

  .button {
    border: none;
    background: none;
    color: var(--positive);
    cursor: pointer;
    opacity: 0.8;
    font-weight: bold;
  }

  .year-selector > span:hover,
  .month-selector > span:hover,
  .button:hover {
    opacity: 1;
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
