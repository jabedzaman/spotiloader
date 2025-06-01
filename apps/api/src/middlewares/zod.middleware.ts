import type { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ApiError, httpStatus } from "~/utils";

/**
 *
 * @param schema Zod schema to validate the request against
 * @returns Middleware function that validates the request body, query, and params
 */
export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // parse the request body, query, and params using the Zod schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      // in case of a ZodError, we can log the error or handle it differently
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((err) => {
            if (err.code === "invalid_type") {
              return `Field '${err.path.join(".")}' is required. Expected: ${
                err.expected
              }, Received: ${err.received}`;
            }
            return `Field '${err.path.join(".")}' - ${err.message}`;
          })
          .join(", "); // join all error messages into a single string
        return next(new ApiError(errorMessage, httpStatus.BAD_REQUEST));
      }
      return next(error);
    }
  };
