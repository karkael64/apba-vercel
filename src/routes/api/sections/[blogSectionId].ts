import type { RequestHandler } from '@sveltejs/kit';
import type { prisma } from '$lib/db';
import { client } from '$lib/db';

export const get: RequestHandler<{ id: string }, { blog: prisma.BlogSection | null }> = async ({
  params: { id }
}) => ({
  body: { blog: await client.blogSection.findUnique({ where: { id: parseInt(id) } }) }
});

export const patch: RequestHandler<
  { blogSectionId: string },
  { blogSection: prisma.BlogSection }
> = async ({ params: { blogSectionId }, request }) => {
  const { order, model, json } = await request.json();
  return {
    body: {
      blogSection: await client.blogSection.update({
        where: { id: parseInt(blogSectionId) },
        data: { order, model, json }
      })
    }
  };
};

export const del: RequestHandler<{ blogSectionId: string }, { blog: prisma.BlogSection }> = async ({
  params: { blogSectionId }
}) => ({
  body: { blog: await client.blogSection.delete({ where: { id: parseInt(blogSectionId) } }) }
});
