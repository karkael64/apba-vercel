<script lang="ts">
import {
  dateToString,
  getDayName,
  getMonthName,
  getWeek,
  getWeekFirstDay
} from '../../common/date';
import type { Event, Occurence } from './Agenda.svelte';
import AgendaItem from './AgendaItem.svelte';

type EventsTree = {
  week: number;
  firstDay: Date;
  lastDay: Date;
  dates: { date: Date; dateString: string; singleEvents: Event[]; occurenceEvents: Occurence[] }[];
};

export let events: (Event | Occurence)[] = [];
export let isWeekStartingWithSunday = false;

const isOccurence = (el: Event | Occurence): el is Occurence =>
  'event' in el && el.event && typeof el.event === 'object';

let groupedEvents: EventsTree[];
$: groupedEvents =
  events
    ?.sort((eventA, eventB) => eventA.date.valueOf() - eventB.date.valueOf())
    .reduce((acc, event) => {
      const week = getWeek(event.date, isWeekStartingWithSunday);
      const date = dateToString(event.date);

      let weekRange = acc.find((item) => item.week === week);
      if (!weekRange) {
        const weekFirstDay = getWeekFirstDay(event.date, isWeekStartingWithSunday);
        const weekLastDay = new Date(weekFirstDay);
        weekLastDay.setDate(weekLastDay.getDate() + 6);

        weekRange = { week, firstDay: weekFirstDay, lastDay: weekLastDay, dates: [] };
        acc.push(weekRange);
      }

      let dateRange = weekRange.dates.find((item) => item.dateString === date);
      if (!dateRange) {
        dateRange = { date: event.date, dateString: date, singleEvents: [], occurenceEvents: [] };
        weekRange.dates.push(dateRange);
      }

      if (isOccurence(event)) {
        dateRange.occurenceEvents.push(event);
      } else {
        dateRange.singleEvents.push(event);
      }

      return acc;
    }, [] as EventsTree[]) ?? [];
</script>

<div class="agenda">
  {#each groupedEvents as weekRange}
    <div class="week">
      <h2>
        Semaine du {weekRange.firstDay.getDate()}
        {weekRange.firstDay.getMonth() === weekRange.lastDay.getMonth()
          ? ''
          : getMonthName(weekRange.firstDay.getMonth())} au {weekRange.lastDay.getDate()}
        {getMonthName(weekRange.lastDay.getMonth())}
        {weekRange.lastDay.getFullYear()}
      </h2>
      {#each weekRange.dates as dateRange}
        <div class="date" data-date="{dateToString(dateRange.date)}">
          <h3 class="day-name">
            {getDayName(dateRange.date.getDay())} <br />
            {dateRange.date.getDate()}
          </h3>
          <div class="occurences">
            {#each dateRange.occurenceEvents as occurence}
              <AgendaItem event="{occurence}" />
            {/each}
          </div>
          <div class="singles">
            {#each dateRange.singleEvents as single}
              <AgendaItem event="{single}" />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
.agenda {
  width: 100%;
  max-width: 80vw;
}
.week {
  display: flex;
  flex-direction: column;
}
.date {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px solid var(--minus);
}
.day-name {
  flex: 0 0 5em;
  width: 5em;
  height: 5em;
  border: 1px solid var(--medium);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.occurences {
  flex: 1 1 50%;
}
.singles {
  flex: 1 1 50%;
}

@media (max-width: 999px) {
  .date {
    flex-direction: column;
    justify-content: center;
  }
  .day-name {
    align-self: center;
  }
  .occurences,
  .singles {
    align-self: stretch;
  }
}
</style>
