import {
  handleRequest,
  HttpCode,
  isString,
  objectRemoveUndefined,
  type BadRequestParam,
  type prisma,
  client
} from '$lib/server';
import { isModelName, modelErrors } from '$lib/client';

const getBlogSlugByBlogSectionId = async (blogSectionId: string) => {
  const slug = (
    await client.blogSection.findUnique({
      where: { id: parseInt(blogSectionId) },
      include: { blog: true }
    })
  )?.blog.slug;
  if (slug) {
    return slug;
  }
  throw new Error('Unexpected blogSection relation');
};

export const checkBlogSectionParam = (blog: Partial<prisma.BlogSection>, partial: boolean) => {
  const { blogId, json, model, order } = blog;

  const errors: BadRequestParam[] = [];

  if (!partial || json !== undefined) {
    if (!isString(json)) {
      errors.push({
        location: 'body',
        field: 'json',
        value: json,
        message: 'json should be a string'
      });
    } else if (!json.length) {
      errors.push({
        location: 'body',
        field: 'json',
        value: json,
        message: 'json should not be empty'
      });
    } else {
      try {
        const data = JSON.parse(json);
        const verif = modelErrors[model as keyof typeof modelErrors];
        const jsonErrors = verif(data);
        if (jsonErrors) {
          errors.push(
            ...jsonErrors.map(
              (jsonError): BadRequestParam => ({
                location: 'body',
                field: jsonError.property,
                message: jsonError.message,
                value: json
              })
            )
          );
        }
      } catch {
        errors.push({
          location: 'body',
          field: 'json',
          value: json,
          message: 'invalid json syntax'
        });
      }
    }
  }

  if (!partial || model !== undefined) {
    if (!isString(model)) {
      errors.push({
        location: 'body',
        field: 'model',
        value: model,
        message: 'model should be a string'
      });
    } else if (!model.length) {
      errors.push({
        location: 'body',
        field: 'model',
        value: model,
        message: 'model should not be empty'
      });
    } else if (!isModelName(model)) {
      errors.push({
        location: 'body',
        field: 'model',
        value: model,
        message: 'model does not exist'
      });
    }
  }

  if (!partial || blogId !== undefined) {
    if (blogId === undefined) {
      errors.push({
        location: 'body',
        field: 'blogId',
        value: blogId,
        message: 'blogId should not be empty'
      });
    } else if (!isFinite(blogId)) {
      errors.push({
        location: 'body',
        field: 'blogId',
        value: blogId,
        message: 'blogId should be a number'
      });
    }
  }

  if (!partial || order !== undefined) {
    if (order === undefined) {
      errors.push({
        location: 'body',
        field: 'order',
        value: order,
        message: 'order should not be empty'
      });
    } else if (!isFinite(order)) {
      errors.push({
        location: 'body',
        field: 'order',
        value: order,
        message: 'order should be a number'
      });
    }
  }

  return errors;
};

export const get = handleRequest<{
  PathParams: { blogSectionId: string };
  Output: { blog: prisma.BlogSection | null };
  CacheField: 'blogSectionId';
}>(
  null,
  async ({ params: { blogSectionId } }) => ({
    body: { blog: await client.blogSection.findUnique({ where: { id: parseInt(blogSectionId) } }) }
  }),
  {
    action: 'read',
    outputType: 'sections',
    fields: ['blogSectionId'],
    getCacheProps: (event) => ({ blogSectionId: event.params.blogSectionId })
  }
);

export const patch = handleRequest<{
  PathParams: { blogSectionId: string };
  Body: { blogSection: Partial<prisma.BlogSection> };
  Output: { blogSection: prisma.BlogSection };
  CacheField: 'blogSectionId';
}>(
  'admin',
  async ({ params: { blogSectionId }, request }) => {
    const {
      blogSection: { blogId, order, model, json }
    } = await request.json();

    const errors = checkBlogSectionParam({ blogId, order, model, json }, true);

    if (errors.length) {
      throw HttpCode.badRequest(errors);
    }

    const data = objectRemoveUndefined({ blogId, order, model, json });

    return {
      body: {
        blogSection: await client.blogSection.update({
          where: { id: parseInt(blogSectionId) },
          data: data
        })
      }
    };
  },
  {
    action: 'replace',
    outputType: 'sections',
    fields: ['blogSectionId'],
    getCacheProps: (event) => ({ blogSectionId: event.params.blogSectionId }),
    invalidateCaches: async ({ params: { blogSectionId } }) => [
      { outputType: 'blogs', props: { slug: await getBlogSlugByBlogSectionId(blogSectionId) } }
    ]
  }
);

export const del = handleRequest<{
  PathParams: { blogSectionId: string };
  CacheField: 'blogSectionId';
}>(
  'admin',
  async ({ params: { blogSectionId } }) => {
    await client.blogSection.delete({ where: { id: parseInt(blogSectionId) } });
    throw HttpCode.noContent();
  },
  {
    action: 'remove',
    outputType: 'sections',
    fields: ['blogSectionId'],
    getCacheProps: (event) => ({ blogSectionId: event.params.blogSectionId }),
    invalidateCaches: async ({ params: { blogSectionId } }) => [
      { outputType: 'blogs', props: { slug: await getBlogSlugByBlogSectionId(blogSectionId) } }
    ]
  }
);
