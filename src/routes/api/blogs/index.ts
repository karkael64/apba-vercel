import { client, type prisma, handleRequest } from '$lib/server';

export const get = handleRequest<{
  Output: { blogs: Pick<prisma.Blog, 'id' | 'authorId' | 'title' | 'slug'>[] };
}>('admin', async () => ({
  body: {
    blogs: await client.blog.findMany({
      select: { id: true, authorId: true, title: true, slug: true }
    })
  }
}));

export const post = handleRequest<{ Body: { blog: prisma.Blog }; Output: { blog: prisma.Blog } }>(
  'admin',
  async ({ request }) => {
    const {
      blog: { authorId, body, slug, title }
    } = await request.json();
    return { body: { blog: await client.blog.create({ data: { authorId, body, slug, title } }) } };
  }
);
