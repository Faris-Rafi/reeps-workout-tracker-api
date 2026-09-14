import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(30),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error('Invalid environment variables — check your .env file');
}

const env = parsed.data;

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  database: { url: env.DATABASE_URL },
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
