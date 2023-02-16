import { type prisma, client, handleRequest, HttpCode, objectRemoveUndefined } from '$lib/server';
import { checkBlogSectionParam } from '../../../sections/[blogSectionId]';

export const get = handleRequest<{ blogId: string }, never, { blogSections: prisma.BlogSection[] }>(
  null,
  async ({ params: { blogId } }) => ({
    body: {
      blogSections: await client.blogSection.findMany({ where: { blogId: parseInt(blogId) } })
    }
  })
);

export const post = handleRequest<
  { blogId: string },
  { blogSection: prisma.BlogSection },
  { blogSection: prisma.BlogSection }
>('admin', async ({ params: { blogId: slug }, request }) => {
  const blogId = parseInt(slug);
  const {
    blogSection: { json, model, order }
  } = await request.json();

  const errors = checkBlogSectionParam({ blogId, json, model, order }, false);

  if (errors.length) {
    throw HttpCode.badRequest(errors);
  }

  const data = objectRemoveUndefined({ blogId, json, model, order });

  return {
    body: {
      blogSection: await client.blogSection.create({ data })
    }
  };
});
