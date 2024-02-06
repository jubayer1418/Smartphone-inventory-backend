import { NextFunction, Request, Response } from "express";
import http from "http-status-codes";
import {
  createLogin,
  createRegister,
  refreshTokenIntoDb,
} from "./user.service";
import { AsyncFun } from "../../../utils/AsyncFun";
import sendResponse from "../../../utils/sendResponse";
export const userRegister = AsyncFun(async (req, res, next) => {
  const result = await createRegister(req.body);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "User created successfully",
    data: result,
  });
});
export const userLogin = AsyncFun(async (req, res, next) => {
  const { user, token, refreshToken } = await createLogin(req.body);
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "User Login successfully",
    data: {
      user,
      token,
    },
  });
});
export const refreshToken = AsyncFun(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenIntoDb(refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});
