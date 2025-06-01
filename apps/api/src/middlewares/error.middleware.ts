import { Request, Response, NextFunction } from "express";
import { httpStatus } from "~/utils";
import moment from "moment";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    err.status || err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  const now = new Date().toISOString();

  res.status(statusCode).json({
    statusCode,
    error: err.message || "Internal Server Error",
    timestamp: moment(now).format("YYYY-MM-DD HH:mm:ss"),
  });
};
