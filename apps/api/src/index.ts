import http from "http";
import mongoose from "mongoose";
import { config } from "~/config";
import { createHttpServer } from "./app";
import { logger } from "./utils";
import { shutdownWorkers } from "./workers";

const { HTTP_PORT, HTTP_HOST, MONGO_URI } = config;

/**
 * @description server instance
 * This variable holds the instance of the HTTP server.
 */
let server: http.Server | null = null;

/**
 * @description
 * Connects to the MongoDB database using Mongoose.
 * @returns {Promise<void>}
 */
const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {});
    logger.info("connected to mongodb successfully");
  } catch (error) {
    logger.error("failed to connect to mongodb:", error);
    throw error; // re-throw the error to be handled by the main function
  }
};

/**
 * @description
 * Main entry point for the API server.
 * Initializes the server and sets up graceful shutdown handling.
 * @returns {Promise<void>}
 */
const main = async (): Promise<void> => {
  await connectToDatabase();
  server = createHttpServer();

  server.listen(HTTP_PORT, HTTP_HOST, () => {
    logger.info(`server is running at http://${HTTP_HOST}:${HTTP_PORT}`);
  });

  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
};

/**
 * Handles graceful shutdown
 */
const handleShutdown = () => {
  shutdownWorkers()
    .then(() => {
      logger.info("workers shut down gracefully.");
    })
    .catch((error) => {
      logger.error("error shutting down workers:", error);
    });

  server?.close(() => {
    process.exit(0);
  });

  // Force exit after 10 seconds if not gracefully shutdown
  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
};

main().catch((error) => {
  console.error("error starting server:", error);
  process.exit(1);
});
