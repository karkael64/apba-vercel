import { client } from '$lib/db_instances';
import { handleRequest, HttpCode, type JsonOutput, type prisma } from '$lib/server';

export const get = handleRequest<{
  PathParams: { id: string };
  Output: {
    eventSerie:
      | (prisma.EventSerie & {
          files: prisma.MapEventSerieFile[];
        })
      | null;
  };
}>(null, async ({ params: { id } }) => ({
  body: {
    eventSerie: await client.eventSerie.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        body: true,
        authorId: true,
        files: true
      }
    })
  }
}));

export const patch = handleRequest<{
  PathParams: { id: string };
  Body: { eventSerie: Partial<Pick<JsonOutput<prisma.EventSerie>, 'title' | 'body'>> };
  Output: { eventSerie: prisma.EventSerie & { files: prisma.MapEventSerieFile[] } };
}>('admin', async ({ params: { id }, request }) => {
  const { eventSerie: data } = await request.json();

  return {
    body: {
      eventSerie: await client.eventSerie.update({
        where: { id: parseInt(id) },
        data,
        select: {
          id: true,
          title: true,
          body: true,
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
    await client.eventSerie.delete({ where: { id: parseInt(id) } });
    throw HttpCode.noContent();
  }
);
