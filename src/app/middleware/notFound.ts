import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
export const notFound =()=>{
    (req: Request, res: Response, next: NextFunction) => {
        res.status(httpStatus.NOT_FOUND).json({
          success: false,
          statusCode: 404,
          message: "api not found",
          data: [],
        });
      }
}