import type { NextFunction, Request, Response } from "express";
import { ApiError, httpStatus } from "~/utils";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new ApiError("Not Found", httpStatus.NOT_FOUND);
};
