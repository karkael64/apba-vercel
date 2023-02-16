import { client, type prisma, handleRequest } from '$lib/server';

export const post = handleRequest<never, { blog: prisma.Blog }, { blog: prisma.Blog }>(
  'admin',
  async ({ request }) => {
    const {
      blog: { authorId, body, slug, title }
    } = await request.json();
    return { body: { blog: await client.blog.create({ data: { authorId, body, slug, title } }) } };
  }
);
