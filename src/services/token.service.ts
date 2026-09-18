import moment, { type Moment } from 'moment';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.ts';
import { tokenTypes } from '../config/tokens.ts';
import { TokenModel } from '../models/token.model.ts';

const generateToken = (
  userId: string,
  expires: Moment,
  type: string,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  // eslint-disable-next-line import-x/no-named-as-default-member
  return jwt.sign(payload, secret);
};

const saveToken = async (token: string, userId: string, expires: Moment, type: string) =>
  TokenModel.create({ token, userId, type, expiresAt: expires });

export const TokenService = {
  generateAuthTokens: async (userId: string) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, userId, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toISOString(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toISOString(),
      },
    };
  },
  verifyToken: async (token: string, type: string) => {
    // eslint-disable-next-line import-x/no-named-as-default-member
    const payload = jwt.verify(token, config.jwt.secret) as { type: string; sub: string };
    const tokenDoc = await TokenModel.findToken({ token, userId: payload.sub, type });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
  },
};
