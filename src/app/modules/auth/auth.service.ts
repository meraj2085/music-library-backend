import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../utils/jwtHelper';
import bcrypt from 'bcrypt';
import {
  ILoginResponse,
  IRefreshTokenResponse,
} from '../../../interfaces/common';
import { IArtists } from '../artists/artists.interface';
import DB from '../../../server';
import { isUserExist } from '../../../utils/isUserExists';
import { isPasswordMatch } from '../../../utils/isPasswordMatch';

const signUp = async (userData: IArtists) => {
  const password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );
  const dataToSave = {
    ...userData,
    password,
  };
  const query = `INSERT INTO artists (first_name, last_name, email, password) VALUES ('${dataToSave.first_name}', '${dataToSave.last_name}', '${dataToSave.email}', '${dataToSave.password}') RETURNING first_name, last_name, email, id`;
  const result = DB.query(query).then(res => res.rows[0]);

  return result;
};

const login = async (payload: IArtists): Promise<ILoginResponse> => {
  const { email, password } = payload;
  const user = await isUserExist(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if password is correct
  const passwordMatch = await isPasswordMatch(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { id: userId } = user;
  const accessToken = jwtHelpers.createToken(
    { userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const user = await DB.query(
    `SELECT * FROM artists WHERE id = '${userId}'`
  ).then(res => res.rows[0]);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Generate a new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: user.id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  signUp,
  login,
  refreshToken,
};
