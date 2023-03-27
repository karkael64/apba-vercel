import { client } from '$lib/db_instances';
import { handleRequest, HttpCode, type JsonOutput, type prisma } from '$lib/server';

type EventFull = prisma.Event & {
  files: prisma.MapEventFile[];
};

export const get = handleRequest<{
  PathParams: { id: string };
  Output: { event: EventFull | null };
  CacheField: 'id';
}>(
  null,
  async ({ params: { id } }) => ({
    body: {
      event: await client.event.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          title: true,
          body: true,
          start: true,
          end: true,
          authorId: true,
          files: true
        }
      })
    }
  }),
  {
    outputType: 'events',
    fields: ['id'],
    getCacheProps: (_, { params: { id } }) => ({ id })
  }
);

export const patch = handleRequest<{
  PathParams: { id: string };
  Body: { event: Partial<Pick<JsonOutput<prisma.Event>, 'title' | 'body' | 'start' | 'end'>> };
  Output: { event: EventFull };
}>('admin', async ({ params: { id }, request }) => {
  const { event: data } = await request.json();

  return {
    body: {
      event: await client.event.update({
        where: { id: parseInt(id) },
        data,
        select: {
          id: true,
          title: true,
          body: true,
          start: true,
          end: true,
          authorId: true,
          files: true
        }
      })
    }
  };
});

export const del = handleRequest<{ PathParams: { id: string } }>(
  'admin',
  async ({ params: { id } }) => {
    await client.event.delete({ where: { id: parseInt(id) } });
    throw HttpCode.noContent();
  }
);
