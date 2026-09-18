import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.ts';
import { status as httpStatus } from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      error.message || 'Internal Server Error',
      false,
      err.stack
    );
  }
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
