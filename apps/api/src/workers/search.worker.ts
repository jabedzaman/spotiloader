import { Worker } from "bullmq";
import { CONSTS } from "~/CONSTS";
import { redis } from "~/libs";
import { spotify } from "~/modules";
import { logger } from "~/utils";
import { Search } from "@spotiloader/models";
import { SearchStatus } from "@spotiloader/types";

/**
 * Search Worker
 * This worker is responsible for processing search jobs.
 * It validates the job, retrieves the search from the database,
 * updates the search status, and performs the search based on the platform.
 */
export const searchWorker = new Worker(
  CONSTS.QUEUES.SEARCH,
  async (job) => {
    const { name, data } = job as { name: string; data: { searchId: string } }; // destructure the job to get the name and data

    // 1. run a validation on the job
    if (!data || !data.searchId) {
      return { success: false, message: "Invalid job" };
    }

    // 2. skip if the job is not for this worker
    if (name !== CONSTS.QUEUES.SEARCH) {
      return { success: false, message: "Job not for this worker" };
    }

    // 3. get the search from the database
    const search = await Search.findById(data.searchId);
    if (!search) {
      return { success: false, message: "Search not found" };
    }

    // 4. update the search status to "PROCESSING"
    search.status = SearchStatus.PROCESSING;

    // 5. based on the platform, run the search
    switch (search.platform) {
      case "SPOTIFY":
        await spotify.search(search.url, search);
        break;
      case "YOUTUBE":
        break;
      default:
        return { success: false, message: "Invalid platform" };
    }

    // 5. update the search status
    search.status = SearchStatus.COMPLETED;
    await search.save();
    return { success: true };
  },
  {
    connection: redis,
    concurrency: 10, // number of jobs to process concurrently
  }
);

// === Event listeners for the search worker ===
searchWorker.on("active", (job) => {
  logger.info(
    `${CONSTS.QUEUES.SEARCH} worker started processing job ${job.id}`
  );
});

searchWorker.on("completed", (job) => {
  logger.info(`${CONSTS.QUEUES.SEARCH} worker completed job ${job.id}`);
});

searchWorker.on("ready", () => {
  logger.info(`${CONSTS.QUEUES.SEARCH} worker is ready`);
});

searchWorker.on("failed", (job, error) => {
  logger.error(`${CONSTS.QUEUES.SEARCH} worker failed job ${job?.id}:`, error);
});
