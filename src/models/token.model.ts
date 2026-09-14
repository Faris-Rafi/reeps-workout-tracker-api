import type { Moment } from 'moment';
import { db } from '../prisma/db.ts';
import type { Char } from '@prisma/orm-postgres/target/codec-types';

const prisma = db.orm.public;

export const TokenModel = {
  create: (data: { userId: string; token: string; type: string; expiresAt: Moment }) => {
    const userId = data.userId as Char<36>;
    const expiresAt = Temporal.Instant.from(data.expiresAt.toISOString());

    return prisma.PersonalAccessToken.create({ ...data, userId, expiresAt });
  },
};
