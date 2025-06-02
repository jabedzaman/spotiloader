import { Track } from "@spotiloader/models";
import { ISearchDoc, Platform } from "@spotiloader/types";
import { Worker } from "bullmq";
import { CONSTS } from "~/CONSTS";
import { redis } from "~/libs";
import { spotify } from "~/modules";
import { logger } from "~/utils";

/**
 * Search Worker
 * This worker is responsible for processing search jobs.
 * It validates the job, retrieves the search from the database,
 * updates the search status, and performs the search based on the platform.
 */
export const downlaodWorker = new Worker(
  CONSTS.QUEUES.DOWNLOAD,
  async (job) => {
    const { name, data } = job as { name: string; data: { trackId: string } }; // destructure the job to get the name and data

    // 1. run a validation on the job
    if (!data || !data.trackId) {
      return { success: false, message: "Invalid job" };
    }

    // 2. get the track from the database
    const track = await Track.findById(data.trackId).populate("search"); // find the track by ID and convert it to a plain object
    console.log(JSON.stringify(track, null, 2));
    if (!track) {
      return { success: false, message: "Track not found" };
    }

    // 3. check already cached on s3
    if (track.cached.on_s3) {
      return { success: true, message: "Track already cached on S3" };
    }

    // 4. check already cached on disk
    if (track.cached.on_disk) {
      // ##TODO: upload to s3 && update track.cached.on_s3
      // inform the s3 uploader to upload the track to s3
    }

    // 5. download based on platform
    const { platform } = track.search as ISearchDoc;
    try {
      switch (platform) {
        case Platform.SPOTIFY:
          await spotify.downloadTrack(track);
          break;
        // Add other platforms here as needed
        default:
          return { success: false, message: "Unsupported platform" };
      }

      // 6. update the track status to downloaded
      track.cached.on_disk = true; // Mark as cached on disk
      // inform the s3 uploader to upload the track to s3
    } catch (error) {
      logger.error(
        `error downloading track ${track.id} from platform ${platform}:`,
        error
      );
      return { success: false, message: "Error downloading track" };
    }
  },
  {
    connection: redis,
    concurrency: 10, // number of jobs to process concurrently
  }
);

// === Event listeners for the search worker ===
downlaodWorker.on("completed", (job) => {
  logger.info(`${CONSTS.QUEUES.SEARCH} worker completed job ${job.id}`);
});

downlaodWorker.on("ready", () => {
  logger.info(`${CONSTS.QUEUES.SEARCH} worker is ready`);
});

downlaodWorker.on("failed", (job, error) => {
  logger.error(`${CONSTS.QUEUES.SEARCH} worker failed job ${job?.id}:`, error);
});
