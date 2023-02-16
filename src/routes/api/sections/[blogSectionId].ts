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

export const get = handleRequest<
  { blogSectionId: string },
  never,
  { blog: prisma.BlogSection | null }
>(null, async ({ params: { blogSectionId } }) => ({
  body: { blog: await client.blogSection.findUnique({ where: { id: parseInt(blogSectionId) } }) }
}));

export const patch = handleRequest<
  { blogSectionId: string },
  { blogSection: Partial<prisma.BlogSection> },
  { blogSection: prisma.BlogSection }
>('admin', async ({ params: { blogSectionId }, request }) => {
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
});

export const del = handleRequest<{ blogSectionId: string }>(
  'admin',
  async ({ params: { blogSectionId } }) => {
    await client.blogSection.delete({ where: { id: parseInt(blogSectionId) } });
    throw HttpCode.noContent();
  }
);
