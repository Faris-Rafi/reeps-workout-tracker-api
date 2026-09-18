import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.ts';
import { UserModel } from '../models/user.model.ts';
import type { User } from '../types/user.type.ts';
import { status as httpStatus } from 'http-status';
import { tokenTypes } from '../config/tokens.ts';

export interface AuthedRequest extends Request {
  user?: User;
  token?: string;
}

const authenticate = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header?.startsWith('Bearer ')) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Missing or invalid token' });
  }

  try {
    // eslint-disable-next-line import-x/no-named-as-default-member
    const payload = jwt.verify(header.split(' ')[1] || '', config.jwt.secret) as {
      type: string;
      sub: string;
    };

    if (payload.type !== tokenTypes.ACCESS) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token type' });
    }

    const user = (await UserModel.findById(payload.sub)) as User;
    req.user = user;
    req.token = header.split(' ')[1] || '';

    return next();
  } catch (error) {
    return next(error);
  }
};

export default authenticate;
