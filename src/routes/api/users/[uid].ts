import {
  client,
  type prisma,
  handleRequest,
  HttpCode,
  isEmail,
  isString,
  objectRemoveUndefined,
  stringToHashPepper,
  type BadRequestParam
} from '$lib/server';

export type UserLight = {
  id: number;
  email: string;
  name: string | null;
  level: prisma.UserLevel;
};

export const checkUserParam = (
  user: Partial<{ email: string; name: string; password: string; levelId: number }>,
  partial: boolean
) => {
  const { email, name, password, levelId } = user;

  const errors: BadRequestParam[] = [];

  if (!partial || email !== undefined) {
    if (!isString(email)) {
      errors.push({
        location: 'body',
        field: 'email',
        value: email,
        message: 'email should be a string'
      });
    } else if (!email.length) {
      errors.push({
        location: 'body',
        field: 'email',
        value: email,
        message: 'email should not be empty'
      });
    } else if (!isEmail(email)) {
      errors.push({
        location: 'body',
        field: 'email',
        value: email,
        message: 'invalid email syntax'
      });
    }
  }

  if (!partial || name !== undefined) {
    if (!isString(name)) {
      errors.push({
        location: 'body',
        field: 'name',
        value: name,
        message: 'name should be a string'
      });
    } else if (!name.length) {
      errors.push({
        location: 'body',
        field: 'name',
        value: name,
        message: 'name should not be empty'
      });
    }
  }

  if (!partial || password !== undefined) {
    if (!isString(password)) {
      errors.push({
        location: 'body',
        field: 'password',
        value: password,
        message: 'password should be a string'
      });
    } else if (!password.length) {
      errors.push({
        location: 'body',
        field: 'password',
        value: password,
        message: 'password should not be empty'
      });
    }
  }

  if (!partial || levelId !== undefined) {
    if (levelId === undefined) {
      errors.push({
        location: 'body',
        field: 'levelId',
        value: levelId,
        message: 'levelId should not be empty'
      });
    } else if (!isFinite(levelId)) {
      errors.push({
        location: 'body',
        field: 'levelId',
        value: levelId,
        message: 'levelId should be a number'
      });
    }
  }

  return errors;
};

export const get = handleRequest<{ uid: string }, never, UserLight | null>(
  'self',
  async ({ params: { uid } }) => ({
    body: await client.user.findUnique({
      where: { id: parseInt(uid) },
      select: { id: true, email: true, name: true, level: true }
    })
  })
);

export const patch = handleRequest<
  { uid: string },
  { user: Partial<{ email: string; name: string; password: string; levelId: number }> },
  UserLight
>('self', async ({ params: { uid }, request }) => {
  const {
    user: { email, name, password, levelId }
  } = await request.json();

  const errors = checkUserParam({ email, name, password, levelId }, true);

  if (errors.length) {
    throw HttpCode.badRequest(errors);
  }

  const encodedPassword = password && stringToHashPepper(password);
  const data = objectRemoveUndefined({ email, levelId, name, password: encodedPassword });

  return {
    body: await client.user.update({
      where: { id: parseInt(uid) },
      data,
      select: { id: true, email: true, name: true, level: true }
    })
  };
});

export const del = handleRequest<{ uid: string }>('admin', async ({ params: { uid } }) => {
  await client.user.delete({ where: { id: parseInt(uid) } });
  throw HttpCode.noContent();
});
