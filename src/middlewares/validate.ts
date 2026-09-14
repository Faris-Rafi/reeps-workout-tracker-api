import type { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { ApiError } from '../utils/ApiError.ts';
import { status as httpStatus } from 'http-status';

interface ValidationSchema {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
}

const validate =
  (schema: ValidationSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.params) {
        req.params = (await schema.params.parseAsync(req.params)) as typeof req.params;
      }
      if (schema.query) {
        req.query = (await schema.query.parseAsync(req.query)) as typeof req.query;
      }
      if (schema.body) req.body = await schema.body.parseAsync(req.body);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
      return next(error);
    }
  };

export default validate;
