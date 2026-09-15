import { AuthService } from '../services/auth.service.ts';
import { TokenService } from '../services/token.service.ts';
import { status as httpStatus } from 'http-status';
import type { LoginType, LogoutType, RefreshTokenType, RegisterType } from '../types/auth.type.ts';
import type { Response } from 'express';

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
  logout: async (req: { body: LogoutType }, res: Response) => {
    await AuthService.logout(req.body);

    res.status(httpStatus.OK).send({ message: 'Logout successfully!' });
  },
  refreshTokens: async (req: { body: RefreshTokenType }, res: Response) => {
    const response = await AuthService.refreshTokens(req.body.token);

    res.status(httpStatus.OK).send(response);
  },
};

export default AuthController;
