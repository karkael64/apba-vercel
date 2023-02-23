import {
  client,
  handleRequest,
  HttpCode,
  objectRemoveUndefined,
  stringToHashPepper
} from '$lib/server';
import { checkUserParam, type UserLight } from './[uid]';

export const get = handleRequest<never, never, { users: UserLight[] }>('self', async () => ({
  body: {
    users: await client.user.findMany({
      select: { id: true, email: true, name: true, level: true }
    })
  }
}));

export const post = handleRequest<
  never,
  { user: Partial<{ email: string; name: string; password: string; levelId: number }> },
  UserLight
>('admin', async ({ request }) => {
  const {
    user: { email, name, password, levelId }
  } = await request.json();

  const errors = checkUserParam({ email, name, password }, false);
  if (errors.length) {
    throw HttpCode.badRequest(errors);
  }

  const encodedPassword = password && stringToHashPepper(password);
  const data = objectRemoveUndefined({ email, levelId, name, password: encodedPassword });

  const user = await client.user.create({ data });

  throw HttpCode.redirect(`/api/users/${user.id}`);
});
