import {
  client,
  createUserAuth,
  handleRequest,
  HttpCode,
  isString,
  stringToHashPepper,
  stringToHashSalt,
  type BadRequestParam,
  type ConnectedUser
} from '$lib/server';

export const get = handleRequest<{ Output: ConnectedUser }>('self', async (_, userAuth) => {
  if (!userAuth) {
    throw HttpCode.forbidden();
  }

  return {
    status: 200,
    body: userAuth
  };
});

export const post = handleRequest<{
  Body: Partial<{ username: string; password: string }>;
  Output: ConnectedUser;
}>(null, async (event) => {
  const { username, password } = await event.request.json();

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

  const pepperPassword = stringToHashPepper(password);
  const saltPepperPassword = stringToHashPepper(stringToHashSalt(password));

  const user = await client.user.findFirst({
    where: {
      OR: [
        { name: username, password: pepperPassword },
        { email: username, password: pepperPassword },
        { name: username, password: saltPepperPassword },
        { email: username, password: saltPepperPassword }
      ]
    },
    include: { level: true }
  });
  if (user) {
    return {
      status: 200,
      body: await createUserAuth(event, user.id)
    };
  }
  throw HttpCode.notFound();
});
