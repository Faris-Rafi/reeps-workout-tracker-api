import { db } from '../prisma/db.ts';
import type { Char } from '@prisma/orm-postgres/target/codec-types';
import { hash, compare } from 'bcrypt';

const prisma = db.orm.public;
const DEFAULT_STATUS_ID = '01a08d61-f678-750d-a0d1-d4fef2266e08' as Char<36>; // Neea update profile
const UPDATED_STATUS_ID = '01a08d61-ab7c-745c-9fd4-015b19b109b7' as Char<36>; // Active

export const UserModel = {
  hashPassword: async (password: string): Promise<string> => {
    const saltRounds = await prisma.Sysconf.select('valueconf').first({
      sysconf: 'PASSWORD_SALT_ROUNDS',
    });
    return hash(password, Number(saltRounds?.valueconf || 10));
  },

  isPasswordMatch: (password: string, hashedPassword: string): Promise<boolean> =>
    compare(password, hashedPassword),

  isEmailTaken: async (email: string): Promise<boolean> => {
    const existing = await prisma.User.first({ email });
    return existing !== null;
  },

  findByEmail: (email: string) => prisma.User.first({ email }),

  findById: (id: string) => {
    const userId = id as Char<36>;
    return prisma.User.first({ id: userId });
  },

  create: (data: { name: string; email: string; password: string }) =>
    prisma.User.create({ ...data, statusId: DEFAULT_STATUS_ID }),

  update: (data: { email: string; name: string; weight: string; height: string }) =>
    prisma.User.where({ email: data.email }).update({ ...data, statusId: UPDATED_STATUS_ID }),
};
