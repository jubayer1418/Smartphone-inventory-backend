import { NextFunction, Request, Response } from "express";
import http from "http-status-codes";
import {
  createSmartphoneToDb,
  deleteManyProductsIntoDB,
  deleteSmartphoneToDb,
  getSingleProductIntoDB,
  getSmartphoneToDb,
  patchSmartphoneToDb,
} from "./smartphone.service";
import { AsyncFun } from "../../../utils/AsyncFun";
import sendResponse from "../../../utils/sendResponse";
export const createSmartphone = AsyncFun(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await createSmartphoneToDb(req.body);
    sendResponse(res, {
      success: true,
      statusCode: http.OK,
      message: "Smartphone create successfully!",
      data: result,
    });
  }
);
export const getSmartphone = AsyncFun(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getSmartphoneToDb();
    console.log(result)
    sendResponse(res, {
      success: true,
      statusCode: http.OK,
      message: "Smartphone retrieve successfully!",
      data: result,
    });
  }
);
export const getSingleProduct = AsyncFun(async (req, res,next) => {
    const { id } = req.params;
    const result = await getSingleProductIntoDB(id);
    //   send response
    sendResponse(res, {
      success: true,
      statusCode: http.OK,
      message: "Single product retrieved successfully",
      data: result,
    });
  });
export const patchSmartphone = AsyncFun(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await patchSmartphoneToDb(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: http.OK,
      message: "Smartphone update successfully!",
      data: result,
    });
  }
);
export const deleteSmartphone = AsyncFun(
  async (req: Request, res: Response, next: NextFunction) => {
    deleteSmartphoneToDb(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: http.OK,
      message: "Smartphone deleted successfully!",
      data: [],
    });
  }
);
export const deleteManyProduct = AsyncFun(async (req, res,next) => {
    const ids = req.body;
    const result = await deleteManyProductsIntoDB(ids);
    //   send response
    sendResponse(res, {
      success: true,
      statusCode: http.OK,
      message: "All Products deleted successfully",
      data: result,
    });
  });
