import {
  client,
  type prisma,
  handleRequest,
  HttpCode,
  isString,
  objectRemoveUndefined,
  type BadRequestParam
} from '$lib/server';

export const getBlogSlug = async (slug: string) => {
  const blogId = parseInt(slug);
  if (isFinite(blogId)) {
    const blog = await client.blog.findFirst({
      where: { id: blogId },
      include: { sections: true }
    });
    if (blog) {
      return blog.slug;
    }
    throw new Error('Unexpected blog slug');
  } else {
    return slug;
  }
};

export const checkSectionParam = (
  blog: Partial<Pick<prisma.Blog, 'body' | 'title'>>,
  partial: boolean
) => {
  const { body, title } = blog;

  const errors: BadRequestParam[] = [];

  if (!partial || body !== undefined) {
    if (!isString(body)) {
      errors.push({
        location: 'body',
        field: 'body',
        value: body,
        message: 'body should be a string'
      });
    } else if (!body.length) {
      errors.push({
        location: 'body',
        field: 'body',
        value: body,
        message: 'body should not be empty'
      });
    }
  }

  if (!partial || title !== undefined) {
    if (!isString(title)) {
      errors.push({
        location: 'body',
        field: 'title',
        value: title,
        message: 'title should be a string'
      });
    } else if (!title.length) {
      errors.push({
        location: 'body',
        field: 'title',
        value: title,
        message: 'title should not be empty'
      });
    }
  }

  return errors;
};

export const get = handleRequest<{
  PathParams: { blogId: string };
  Output: { blog: null | (prisma.Blog & { sections: prisma.BlogSection[] }) };
  CacheField: 'slug';
}>(
  null,
  async ({ params: { blogId: slug } }) => {
    const id = parseInt(slug);
    return {
      body: {
        blog: await client.blog.findFirst({
          where: isFinite(id) ? { id } : { slug },
          include: { sections: true }
        })
      }
    };
  },
  {
    action: 'read',
    outputType: 'blogs',
    fields: ['slug'],
    getCacheProps: async ({ params: { blogId: slug } }) => ({ slug: await getBlogSlug(slug) })
  }
);

export const patch = handleRequest<{
  PathParams: { blogId: string };
  Body: { blog: Partial<prisma.Blog> };
  Output: { blog: prisma.Blog };
  CacheField: 'slug';
}>(
  'admin',
  async ({ params: { blogId: id }, request }) => {
    const {
      blog: { body, title }
    } = await request.json();

    const errors = checkSectionParam({ body, title }, true);

    if (errors.length) {
      throw HttpCode.badRequest(errors);
    }

    const data = objectRemoveUndefined({ body, title });

    return {
      body: {
        blog: await client.blog.update({
          where: { id: parseInt(id) },
          data,
          include: { sections: true }
        })
      }
    };
  },
  {
    action: 'replace',
    outputType: 'blogs',
    fields: ['slug'],
    getCacheProps: async ({ params: { blogId: slug } }) => ({ slug: await getBlogSlug(slug) })
  }
);

export const del = handleRequest<{ PathParams: { blogId: string }; CacheField: 'slug' }>(
  'admin',
  async ({ params: { blogId: id } }) => {
    await client.blog.delete({ where: { id: parseInt(id) } });
    throw HttpCode.noContent();
  },
  {
    action: 'remove',
    outputType: 'blogs',
    fields: ['slug'],
    getCacheProps: async ({ params: { blogId: slug } }) => ({ slug: await getBlogSlug(slug) })
  }
);
