import { client } from '$lib/db_instances';
import { handleRequest, HttpCode, isDate, type JsonOutput, type prisma } from '$lib/server';

type QueryParams = {
  start: string;
  end: string;
};

type EventFull = prisma.Event & {
  files: prisma.MapEventFile[];
};

export const get = handleRequest<{
  SearchParams: Partial<QueryParams>;
  Output: { events: EventFull[] };
  CacheField: 'start' | 'end';
}>(
  null,
  async ({ searchParams: { start, end } }) => {
    const startDate = isDate(start) ? new Date(start) : undefined;
    const endDate = isDate(end) ? new Date(end) : undefined;

    return {
      body: {
        events: await client.event.findMany({
          select: {
            id: true,
            title: true,
            body: true,
            start: true,
            end: true,
            authorId: true,
            files: true
          },
          where: { start: { gte: startDate }, end: { lte: endDate } }
        })
      }
    };
  },
  {
    outputType: 'events',
    fields: ['start', 'end'],
    getCacheProps: (_, { searchParams: { end, start } }) => ({
      start: isDate(start) ? new Date(start).toJSON() : 'all',
      end: isDate(end) ? new Date(end).toJSON() : 'all'
    })
  }
);

export const post = handleRequest<{
  Body: { event: Pick<JsonOutput<prisma.Event>, 'title' | 'body' | 'start' | 'end'> };
}>('admin', async ({ request }, userAuth) => {
  if (!userAuth) {
    throw HttpCode.forbidden();
  }

  const {
    event: { title, body, start, end }
  } = await request.json();

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (!isDate(startDate) || !isDate(endDate) || !title || !body) {
    throw HttpCode.badRequest([]);
  }

  const { id } = await client.event.create({
    data: { title, body, start: startDate, end: endDate, authorId: userAuth.user.id },
    select: { id: true }
  });
  throw HttpCode.redirect(`/api/events/${id}`);
});
