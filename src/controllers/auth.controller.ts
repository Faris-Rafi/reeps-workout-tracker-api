import { AuthService } from '../services/auth.service.ts';
import { TokenService } from '../services/token.service.ts';
import { status as httpStatus } from 'http-status';
import type { LoginType, RefreshTokenType, RegisterType } from '../types/auth.type.ts';
import type { Response } from 'express';
import type { AuthedRequest } from '../middlewares/authenticate.ts';

const AuthController = {
  register: async (req: { body: RegisterType }, res: Response) => {
    const user = await AuthService.register(req.body);
    const tokens = await TokenService.generateAuthTokens(user.id);

    res.status(httpStatus.CREATED).send({ user, tokens });
  },
  login: async (req: { body: LoginType }, res: Response) => {
    const user = await AuthService.login(req.body);
    const tokens = await TokenService.generateAuthTokens(user.id);

    res.status(httpStatus.OK).send({ user, tokens });
  },
  logout: async (req: AuthedRequest, res: Response) => {
    await AuthService.logout({
      userId: req.user?.id || '',
    });

    res.status(httpStatus.OK).send({ message: 'Logout successfully!' });
  },
  refreshTokens: async (req: { body: RefreshTokenType }, res: Response) => {
    const tokens = await AuthService.refreshTokens(req.body.refreshToken);
    res.status(httpStatus.OK).send({ ...tokens });
  },
};

export default AuthController;
