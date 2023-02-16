import {
  client,
  createUserAuth,
  handleRequest,
  HttpCode,
  isString,
  stringToHashPepper,
  type BadRequestParam,
  type ConnectedUser
} from '$lib/server';

export const get = handleRequest<never, never, ConnectedUser>('self', async (event, userAuth) => {
  if (userAuth) {
    return {
      status: 200,
      body: userAuth
    };
  }
  throw HttpCode.unauthorized();
});

export const post = handleRequest<
  never,
  Partial<{ username: string; password: string }>,
  ConnectedUser
>(null, async (event) => {
  const { username, password } = await event.request.json();
  const cookie = event.request.headers.get('cookie');

  if (!cookie) {
    throw HttpCode.forbidden();
  }

  const errors: BadRequestParam[] = [];

  if (!isString(username)) {
    errors.push({
      location: 'body',
      field: 'username',
      message: 'username should be a string',
      value: username
    });
  } else if (!username.length) {
    errors.push({
      location: 'body',
      field: 'username',
      message: 'username should not be empty',
      value: username
    });
  }

  if (!isString(password)) {
    errors.push({
      location: 'body',
      field: 'password',
      message: 'password should be a string',
      value: password
    });
  } else if (!password.length) {
    errors.push({
      location: 'body',
      field: 'password',
      message: 'password should not be empty',
      value: password
    });
  }

  if (errors.length || !password) {
    throw HttpCode.badRequest(errors);
  }

  const encodedPassword = stringToHashPepper(password);

  const user = await client.user.findFirst({
    where: {
      OR: [
        { name: username, password: encodedPassword },
        { email: username, password: encodedPassword }
      ]
    },
    include: { level: true }
  });
  if (user) {
    return {
      status: 200,
      body: await createUserAuth(event, user.id),
      headers: {
        'Set-Cookie': `connected=true; group=${user.level.name}`
      }
    };
  }
  throw HttpCode.notFound();
});
