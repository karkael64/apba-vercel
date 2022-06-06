import type { RequestHandler } from '@sveltejs/kit';
import type { prisma } from '$lib/db';
import { client } from '$lib/db';
import { objectPick } from '$lib/object';

const userPickAttributes = (
  object: prisma.User & Record<string, unknown>
): Omit<prisma.User, 'id'> => objectPick(object, ['email', 'levelId', 'name']);

export const get: RequestHandler<never, { user: prisma.User | null }> = async ({
  params: { uid }
}) => ({
  body: { user: await client.user.findUnique({ where: { id: parseInt(uid) } }) }
});

export const patch: RequestHandler<{ uid: string }, { user: prisma.User }> = async ({
  params: { uid },
  request
}) => ({
  body: {
    user: await client.user.update({
      where: { id: parseInt(uid) },
      data: userPickAttributes((await request.json()) as prisma.User)
    })
  }
});

export const del: RequestHandler<{ uid: string }, { user: prisma.User }> = async ({
  params: { uid }
}) => ({
  body: { user: await client.user.delete({ where: { id: parseInt(uid) } }) }
});
