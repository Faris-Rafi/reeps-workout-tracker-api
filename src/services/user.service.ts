import { fileTypeFromBuffer } from 'file-type';
import { UserModel } from '../models/user.model.ts';
import type { UpdateUserPassword, UpdateUserProfile } from '../types/user.type.ts';
import { ApiError } from '../utils/ApiError.ts';
import { status as httpStatus } from 'http-status';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const UPLOAD_ROOT = path.resolve(process.cwd(), 'uploaded-image');
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

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
  updateAvatar: async (userId: string, file: Express.Multer.File) => {
    const type = await fileTypeFromBuffer(file.buffer);
    if (!type || !ALLOWED_MIME.has(type.mime)) {
      throw new ApiError(
        httpStatus.UNSUPPORTED_MEDIA_TYPE,
        'Only JPEG, PNG, or WebP images are allowed'
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    const dir = path.join(UPLOAD_ROOT, userId);
    const filename = `${randomUUID()}.webp`; // server-generated name, no path traversal
    const fullPath = path.join(dir, filename);
    const relativePath = `${userId}/${filename}`;

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.mkdir(dir, { recursive: true });

    // Re-encode: normalizes format, applies EXIF rotation, strips metadata, caps size
    await sharp(file.buffer)
      .rotate()
      .resize(512, 512, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(fullPath);

    try {
      const updated = await UserModel.updateAvatar(userId, relativePath);

      // Remove the old photo only after the DB update succeeded
      if (user.avatarPath) {
        await fs.rm(path.join(UPLOAD_ROOT, user.avatarPath), { force: true }).catch(() => {});
      }
      return updated;
    } catch (err) {
      await fs.rm(fullPath, { force: true }).catch(() => {}); // roll back the orphan file
      throw err;
    }
  },
};

export default UserService;
