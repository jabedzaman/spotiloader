import { searchWorker } from "./search.worker";
import { downlaodWorker } from "./download.worker";

/**
 * Shutdown Workers
 * This function gracefully shuts down the search worker.
 * It ensures that all jobs are completed before closing the worker.
 */
export const shutdownWorkers = async () => {
  Promise.all([searchWorker.close(), downlaodWorker.close()]);
};
