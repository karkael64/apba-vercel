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

export const getConnectedUser = async (token: string): Promise<ConnectedUser | null> => {
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

export const createUserAuth = (
  { locals: { userid: token }, clientAddress: ip }: RequestEvent,
  userId: number
): Promise<ConnectedUser> =>
  client.userAuth.upsert({
    where: {
      token
    },
    update: {
      userId,
      ip,
      expire: new Date(Date.now() + AUTH_DURATION).toJSON()
    },
    create: {
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

export const expireUserAuth = async ({ locals: { userid: token } }: RequestEvent) => {
  await client.userAuth.delete({ where: { token } });
};
