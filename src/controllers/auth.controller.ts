import { AuthService } from '../services/auth.service.ts';
import { TokenService } from '../services/token.service.ts';
import { status as httpStatus } from 'http-status';
import type { RegisterType } from '../types/auth.type.ts';
import type { Response } from 'express';

const AuthController = {
  register: async (req: { body: RegisterType }, res: Response) => {
    const user = await AuthService.register(req.body);
    const tokens = await TokenService.generateAuthTokens(user.id);

    res.status(httpStatus.CREATED).send({ user, tokens });
  },
};

export default AuthController;
