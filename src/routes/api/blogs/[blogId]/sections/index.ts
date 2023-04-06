import { type prisma, client, handleRequest, HttpCode, objectRemoveUndefined } from '$lib/server';
import { getBlogSlug } from '../index';
import { checkBlogSectionParam } from '../../../sections/[blogSectionId]';

export const get = handleRequest<{
  PathParams: { blogId: string };
  Output: { blogSections: prisma.BlogSection[] };
}>(null, async ({ params: { blogId } }) => ({
  body: {
    blogSections: await client.blogSection.findMany({ where: { blogId: parseInt(blogId) } })
  }
}));

export const post = handleRequest<{
  PathParams: { blogId: string };
  Body: { blogSection: prisma.BlogSection };
  Output: { blogSection: prisma.BlogSection };
}>(
  'admin',
  async ({ params: { blogId: slug }, request }) => {
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
  },
  {
    invalidateCaches: async ({ params: { blogId: slug } }) => [
      {
        outputType: 'blogs',
        props: { slug: await getBlogSlug(slug) }
      }
    ]
  }
);
