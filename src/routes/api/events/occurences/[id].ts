import { client } from '$lib/db_instances';
import { handleRequest, HttpCode, type JsonOutput, type prisma } from '$lib/server';

type EventOccurenceFull = prisma.EventOccurence & {
  files: prisma.MapEventOccurenceFile[];
  serie: prisma.EventSerie;
};

export const get = handleRequest<
  { id: string },
  never,
  { eventOccurence: EventOccurenceFull | null }
>(null, async ({ params: { id } }) => ({
  body: {
    eventOccurence: await client.eventOccurence.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        body: true,
        authorId: true,
        files: true,
        start: true,
        end: true,
        serieId: true,
        serie: true
      }
    })
  }
}));

export const patch = handleRequest<
  { id: string },
  {
    eventOccurence: Partial<
      Pick<JsonOutput<prisma.EventOccurence>, 'body' | 'start' | 'end' | 'serieId'>
    >;
  },
  { eventOccurence: EventOccurenceFull }
>('admin', async ({ params: { id }, request }) => {
  const { eventOccurence: data } = await request.json();

  return {
    body: {
      eventOccurence: await client.eventOccurence.update({
        where: { id: parseInt(id) },
        data,
        select: {
          id: true,
          body: true,
          authorId: true,
          files: true,
          start: true,
          end: true,
          serieId: true,
          serie: true
        }
      })
    }
  };
});

export const del = handleRequest<{ id: string }>('admin', async ({ params: { id } }) => {
  await client.eventOccurence.delete({ where: { id: parseInt(id) } });
  throw HttpCode.noContent();
});
