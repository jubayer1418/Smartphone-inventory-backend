import { NextFunction, Request, Response } from "express";
import http from "http-status-codes";
import { AsyncFun } from "../../../utils/AsyncFun";
import sendResponse from "../../../utils/sendResponse";
import { createSalesToDb, getSalesToDb } from "./sales.service";
export const createSales = AsyncFun(async (req, res, next) => {
  const result = await createSalesToDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "Sales create successfully!",
    data: result,
  });
});
export const getSales = AsyncFun(async (req, res, next) => {
  const result = await getSalesToDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: http.OK,
    message: "Sales retrieve successfully!",
    data: result,
  });
});
