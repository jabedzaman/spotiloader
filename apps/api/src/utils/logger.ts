import { createLogger, format, transports } from "winston";

const { combine, timestamp, errors, splat, printf } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // so error.stack works
    splat(),
    logFormat // <-- custom string format instead of json
  ),
  transports: [new transports.Console()],
});
