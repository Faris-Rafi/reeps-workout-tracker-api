// eslint-disable-next-line import-x/no-named-as-default
import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  message: { message: 'Too many login attempts, please try again later' },
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10,
  message: { message: 'Too many accounts created, please try again later' },
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
});
