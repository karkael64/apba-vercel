import { client, type prisma } from '$lib/server';
import type { RequestEvent } from '@sveltejs/kit';

const AUTH_DURATION = 36 * 60 * 60 * 1000; // 36 hours

export type ConnectedUser = {
  expire: Date;
  token: string;
  user: {
    id: number;
    email: string;
    name: string | null;
    level: prisma.UserLevel;
  };
};

export const getConnectedUser = async ({
  locals: { userid: token }
}: RequestEvent): Promise<ConnectedUser | null> => {
  if (token) {
    const userAuth = await client.userAuth.findFirst({
      where: { token },
      select: {
        expire: true,
        token: true,
        user: { select: { id: true, email: true, name: true, level: true } }
      }
    });
    if (userAuth?.expire && new Date(userAuth.expire).valueOf() > Date.now()) {
      return userAuth;
    }
  }
  return null;
};

export const createUserAuth = async (
  { locals: { userid: token }, clientAddress: ip }: RequestEvent,
  userId: number
): Promise<ConnectedUser> =>
  await client.userAuth.create({
    data: {
      userId,
      token,
      ip,
      expire: new Date(Date.now() + AUTH_DURATION).toJSON()
    },
    select: {
      expire: true,
      token: true,
      user: { select: { id: true, email: true, name: true, level: true } }
    }
  });
