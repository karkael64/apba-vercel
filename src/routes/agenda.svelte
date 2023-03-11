<script lang="ts">
  import {
    Agenda,
    Calendar,
    DatePicker,
    dateToString,
    type SvelteEvent,
    type Occurence,
    Button,
    type prisma
  } from '$lib/client';

  let today = new Date();
  let anchorDate = new Date(today);

  const generateId = () => Math.abs(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  const globalEvents = Array.from({ length: 3 }, (): Occurence['serie'] => ({
    body: '# markdown-it rulezz!\n\nthis is my body',
    authorId: 1,
    id: generateId(),
    title: 'Jardinage'
  }));

  const occurences = globalEvents.reduce((acc, ev) => {
    acc.push(
      ...Array.from(
        { length: 5 },
        (
          start: Date = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + Math.round(Math.random() * 30 - Math.random() * 30)
          )
        ): Occurence => ({
          body: '# markdown-it rulezz!\n\nthis is my body, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tempora facere, esse a enim hic animi ab, dolorum fugiat iste, maxime voluptate consequuntur saepe nemo iusto nam nihil id inventore! ',
          start,
          serie: ev,
          authorId: 1,
          end: new Date(start.valueOf() + 2 * 60 * 60 * 1000),
          id: generateId(),
          serieId: ev.id
        })
      )
    );
    return acc;
  }, [] as Occurence[]);

  const entries = Array.from(
    { length: 20 },
    (
      start: Date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + Math.round(Math.random() * 30 - Math.random() * 30)
      )
    ): prisma.Event => ({
      start: start,
      end: new Date(start.valueOf() + 2 * 60 * 60 * 1000),
      body: '# markdown-it rulezz!\n\nthis is my body, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tempora facere, esse a enim hic animi ab, dolorum fugiat iste, maxime voluptate consequuntur saepe nemo iusto nam nihil id inventore! ',
      authorId: 1,
      id: generateId(),
      title: 'Jardinage'
    })
  );

  const all = [...occurences, ...entries];
  const events = all.map((ev) => ev.start);

  const redirect = (ev: SvelteEvent<Date>) => {
    const node = document.querySelector(
      `[data-date=${JSON.stringify(dateToString(ev.detail))}]`
    ) as HTMLElement | null;
    if (node) {
      document.body.scrollTo({ top: node.offsetTop, behavior: 'smooth' });
    }
  };

  const onNextMonthClick = () => {
    const dt = new Date(anchorDate);
    dt.setDate(1);
    dt.setMonth(anchorDate.getMonth() + 1);
    anchorDate = dt;
  };
</script>

<DatePicker label="Date" name="date" />

<div class="agenda">
  <Calendar on:click="{redirect}" events="{events}" bind:anchorDate />
  <Agenda events="{all}" />
  <p>
    <Button on:click="{onNextMonthClick}">Mois suivant</Button>
  </p>
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
