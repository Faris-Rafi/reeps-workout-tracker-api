import { status as httpStatus } from 'http-status';
import type { Response } from 'express';
import UserService from '../services/user.service.ts';
import type { ReqUpdateUserPassword, ReqUpdateUserProfile } from '../types/user.type.ts';
import type { AuthedRequest } from '../middlewares/authenticate.ts';

const UserController = {
  updateProfile: async (req: ReqUpdateUserProfile, res: Response) => {
    const user = await UserService.updateProfile({ ...req.body, email: req.user?.email || '' });
    res.status(httpStatus.OK).send({ user });
  },
  updatePassword: async (req: ReqUpdateUserPassword, res: Response) => {
    const user = await UserService.updatePassword({
      ...req.body,
      email: req.user?.email || '',
      currentPassword: req.user?.password || '',
    });
    res.status(httpStatus.OK).send({ user });
  },
  updateAvatar: async (req: AuthedRequest, res: Response) => {
    if (!req.file) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Image file is required (field: "avatar")' });
      return;
    }
    const user = await UserService.updateAvatar(req.user!.id, req.file);
    res.status(httpStatus.OK).send({ user });
  },
};

export default UserController;
