import { UserModel } from '../models/user.model';
import type { UpdateUserPassword, UpdateUserProfile } from '../types/user.type';
import { ApiError } from '../utils/ApiError';
import { status as httpStatus } from 'http-status';

const UserService = {
  updateProfile: (data: UpdateUserProfile) => {
    return UserModel.update(data);
  },
  updatePassword: async (data: UpdateUserPassword) => {
    const isPasswordMatch = await UserModel.isPasswordMatch(data.oldPassword, data.currentPassword);

    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password incorrect!');
    }

    if (data.newPassword !== data.passwordConfirmation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
    }

    const hashedPassword = await UserModel.hashPassword(data.newPassword);
    return UserModel.updatePassword({ email: data.email, password: hashedPassword });
  },
};

export default UserService;
