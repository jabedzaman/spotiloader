import http from "http";
import { createHttpServer } from "./app";
import { logger } from "./utils";

const HTTP_PORT = 8080;
const HTTP_HOST = "127.0.0.1";

let server: http.Server | null = null;

/**
 * @description
 * Main entry point for the API server.
 * Initializes the server and sets up graceful shutdown handling.
 * @returns {Promise<void>}
 */
const main = async (): Promise<void> => {
  server = createHttpServer();

  server.listen(HTTP_PORT, HTTP_HOST, () => {
    logger.info(`Server is running at http://${HTTP_HOST}:${HTTP_PORT}`);
  });

  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
};

/**
 * Handles graceful shutdown
 */
const handleShutdown = () => {
  server?.close(() => {
    process.exit(0);
  });

  // Force exit after 10 seconds if not gracefully shutdown
  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
};

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
