import { UserModel } from '../models/user.model.ts';
import type { RegisterType } from '../types/auth.type.ts';
import { ApiError } from '../utils/ApiError.ts';
import { status as httpStatus } from 'http-status';

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
};
