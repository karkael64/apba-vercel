import { client } from '$lib/db_instances';
import { handleRequest, HttpCode, type JsonOutput, type prisma } from '$lib/server';

export const get = handleRequest<never, never, { eventSeries: prisma.EventSerie[] }>(
  null,
  async () => ({
    body: {
      eventSeries: await client.eventSerie.findMany({
        select: {
          id: true,
          title: true,
          body: true,
          authorId: true,
          files: true
        }
      })
    }
  })
);

export const post = handleRequest<
  never,
  { eventSerie: Pick<JsonOutput<prisma.EventSerie>, 'title' | 'body'> },
  never
>('admin', async ({ request }, userAuth) => {
  if (!userAuth) {
    throw HttpCode.forbidden();
  }

  const {
    eventSerie: { title, body }
  } = await request.json();

  if (!title || !body) {
    throw HttpCode.badRequest([]);
  }

  const { id } = await client.eventSerie.create({
    data: { title, body, authorId: userAuth.user.id },
    select: { id: true }
  });
  throw HttpCode.redirect(`/api/events/series/${id}`);
});
