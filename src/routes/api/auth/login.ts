import {
  client,
  createUserAuth,
  handleRequest,
  HttpCode,
  stringToHashPepper,
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

export const post = handleRequest<never, { username: string; password: string }, ConnectedUser>(
  null,
  async (event) => {
    const { username, password } = await event.request.json();
    const cookie = event.request.headers.get('cookie');

    if (!cookie) {
      return { status: 403 };
    }

    const encodedPassword = stringToHashPepper(password);

    const user = await client.user.findFirst({
      where: {
        OR: [
          { name: username, password: encodedPassword },
          { email: username, password: encodedPassword }
        ]
      }
    });
    if (user) {
      return {
        status: 200,
        body: await createUserAuth(event, user.id)
      };
    }
    throw HttpCode.notFound();
  }
);
