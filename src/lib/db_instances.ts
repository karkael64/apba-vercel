import * as prismaBuild from '@prisma/client';

const { PrismaClient } = prismaBuild;

export const client = new PrismaClient();
