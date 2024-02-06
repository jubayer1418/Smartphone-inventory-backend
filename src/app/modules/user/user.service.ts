import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes'
import config from '../../config';
import { User } from "./user.model";
import { TLogin, TRegister } from "./user.interface";
import AppError from '../../error/AppError';
import { createToken, verifyToken } from './user.utils';
export const createRegister = async (payload: TRegister) => {
    if (await User.isUserExistsByEmail(payload.email)) {
        throw new AppError(httpStatus.BAD_REQUEST, "This email already used");
      }
    
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!payload.email.match(regex)) {
        throw new AppError(httpStatus.BAD_REQUEST,"Please provide valid email")
    }
    payload.role = 'user'
    const result = await User.create(payload)
    return result
}
export const createLogin = async (payload: TLogin) => {
  
    const user = await User.isUserExistsByEmail(payload.email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.UNAUTHORIZED, "Password do not matched");
    const jwtPayload = {
        name: user?.name,
        email: user?.email,
        role: user?.role
    }
    const token = createToken(
        jwtPayload,
        config.secret as string,
        config.jwtexpire as string
      );
    const refreshToken = createToken(
        jwtPayload,
        config.refreshsecret as string,
        config.jwtexpirerefresh as string
      );
    return {
        user, token,refreshToken
    }
}
export const refreshTokenIntoDb = async (accessToken: string) => {

    const decoded = verifyToken(accessToken,config.refreshsecret as string)
    const { email } = decoded

    const user = await User.isUserExistsByEmail(email)

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }
    const jwtPayload = {
        name: user?.name,
        email: user?.email,
        role: user?.role
    }
    const token = createToken(
        jwtPayload,
        config.refreshsecret as string,
        config.jwtexpirerefresh as string
      );
    return {
        user,
        token
    }
}