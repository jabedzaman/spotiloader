import { Request, Response, NextFunction } from "express";
import { logger } from "~/utils";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  // log after response is finished
  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate duration in milliseconds
    const statusCode = res.statusCode; // Get the response status code
    const agent = req.headers["user-agent"] || "unknown"; // Get the User-Agent header
    const method = req.method; // Get the HTTP method
    const url = req.originalUrl; // Get the original URL of the request
    const logMessage = `${method} ${url} ${statusCode} - ${duration}ms ${
      process.env.NODE_ENV === "development" ? `- User-Agent: ${agent}` : ""
    }`;
    logger.info(logMessage);
  });

  next();
};
