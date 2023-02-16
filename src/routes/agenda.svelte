<script lang="ts">
  import { Agenda, Calendar, dateToString, type SvelteEvent } from '$lib/client';
  import type { Event, Occurence } from 'src/components/molecule/agenda/Agenda.svelte';

  const today = new Date();

  const globalEvents = Array.from({ length: 3 }, (): Occurence['event'] => ({
    body: '# markdown-it rulezz!\n\nthis is my body'
  }));

  const occurences = globalEvents.reduce((acc, ev) => {
    acc.push(
      ...Array.from(
        { length: 3 },
        (): Occurence => ({
          body: '# markdown-it rulezz!\n\nthis is my body, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tempora facere, esse a enim hic animi ab, dolorum fugiat iste, maxime voluptate consequuntur saepe nemo iusto nam nihil id inventore! ',
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + Math.round(Math.random() * 30 - Math.random() * 30)
          ),
          event: ev
        })
      )
    );
    return acc;
  }, [] as Occurence[]);

  const entries = Array.from(
    { length: 10 },
    (): Event => ({
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + Math.round(Math.random() * 30 - Math.random() * 30)
      ),
      body: '# markdown-it rulezz!\n\nthis is my body, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tempora facere, esse a enim hic animi ab, dolorum fugiat iste, maxime voluptate consequuntur saepe nemo iusto nam nihil id inventore! '
    })
  );

  const all = [...occurences, ...entries];
  const events = all.map((ev) => ev.date);

  const redirect = (ev: SvelteEvent<Date>) => {
    const node = document.querySelector(
      `[data-date=${JSON.stringify(dateToString(ev.detail))}]`
    ) as HTMLElement | null;
    if (node) {
      document.body.scrollTo({ top: node.offsetTop, behavior: 'smooth' });
    }
  };
</script>

<div class="agenda">
  <Calendar on:click="{redirect}" events="{events}" />
  <Agenda events="{all}" />
</div>

<style>
  .agenda {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    padding: 2em;
  }
</style>
