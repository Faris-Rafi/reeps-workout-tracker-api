import { TokenModel } from '../models/token.model.ts';
import { UserModel } from '../models/user.model.ts';
import type { LoginType, RegisterType } from '../types/auth.type.ts';
import { ApiError } from '../utils/ApiError.ts';
import { status as httpStatus } from 'http-status';
import { TokenService } from './token.service.ts';
import { tokenTypes } from '../config/tokens.ts';

export const AuthService = {
  register: async (data: RegisterType) => {
    if (data.password !== data.password_confirmation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
    }

    if (await UserModel.isEmailTaken(data.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    const hashedPassword = await UserModel.hashPassword(data.password);
    return UserModel.create({ name: data.name, email: data.email, password: hashedPassword });
  },
  login: async (data: LoginType) => {
    const user = await UserModel.findByEmail(data.email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
    }

    if (!UserModel.isPasswordMatch(data.password, user.password)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
    }

    return user;
  },
  logout: async (data: { userId: string }) => {
    const userToken = await TokenModel.finTokenByUserId({ userId: data.userId });
    if (!userToken) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Token not Found');
    }
    return TokenModel.delete({ token: userToken.token, type: userToken.type });
  },
  refreshTokens: async (refreshToken: string) => {
    try {
      const refreshTokenDoc = await TokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
      await TokenModel.delete({ token: refreshTokenDoc.token, type: refreshTokenDoc.type });
      const tokens = await TokenService.generateAuthTokens(refreshTokenDoc.userId);
      return tokens;
    } catch {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
  },
};
