import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Track } from "@spotiloader/models";
import { ISearchDoc } from "@spotiloader/types";
import { Worker } from "bullmq";
import { config } from "~/config";
import { CONSTS } from "~/CONSTS";
import { redis, s3Client } from "~/libs";
import { logger } from "~/utils";

/**
 * Upload Worker
 * This worker is responsible for processing upload jobs.
 * It validates the job, retrieves the track from the database,
 * updates the track status, and uploads the track to s3.
 */
export const uploadWorker = new Worker(
  CONSTS.QUEUES.UPLOAD,
  async (job) => {
    const { name, data } = job as {
      name: string;
      data: { trackId: string };
    }; // destructure the job to get the name and data

    // 1. run a validation on the job
    if (!data || !data.trackId) {
      throw new Error(
        `Invalid job data: ${JSON.stringify(
          data
        )}. Expected: { trackId: string }`
      );
    }

    // 2. check if the job is a valid upload job
    if (name !== CONSTS.JOBS.UPLOAD_TRACK) {
      throw new Error(
        `Invalid job name: ${name}. Expected: ${CONSTS.JOBS.UPLOAD_TRACK}`
      );
    }

    // 3. retrieve the track from the database
    const track = await Track.findById(data.trackId).populate("search");
    if (!track) {
      throw new Error(`track with ID ${data.trackId} not found`);
    }

    // 4. check if the track is already uploaded
    if (track.cached.on_s3) {
      return {
        success: true,
        message: `track ${track.id} is already uploaded to S3`,
      };
    }

    // 5. upload the track to s3
    const { platform } = track.search as ISearchDoc;
    const path = track.cached.disk_path;
    if (!path) {
      return { success: false, message: "Track path not found" };
    }
    const putObjectCommand = new PutObjectCommand({
      Bucket: config.S3_BUCKET,
      Key: `/${platform}/${track.id}.${path.split(".").pop()}`,
      Body: path,
      ContentType: "audio/mpeg", // assuming the track is an mp3 file ##FIXME: handle other file types
    });

    try {
      await s3Client.send(putObjectCommand);

      // 6. update the track status
      track.cached.on_s3 = true; // update the track status
      await track.save(); // save the updated track

      // 7. inform cleanup worker to delete the local file
      // ##TODO: inform cleanup worker to delete the local file

      return {
        success: true,
        message: `track ${track.id} uploaded to S3 successfully`,
      };
    } catch (error: any) {
      throw new Error(
        `Failed to upload track ${track.id} to S3: ${error.message}`
      );
    }
  },
  {
    connection: redis,
    concurrency: 10, // number of jobs to process concurrently
  }
);

// === Event listeners for the upload worker ===
uploadWorker.on("active", (job) => {
  logger.info(
    `${CONSTS.QUEUES.UPLOAD} worker started processing job ${job.id}`
  );
});

uploadWorker.on("completed", (job) => {
  logger.info(`${CONSTS.QUEUES.UPLOAD} worker completed job ${job.id}`);
});

uploadWorker.on("ready", () => {
  logger.info(`${CONSTS.QUEUES.UPLOAD} worker is ready`);
});

uploadWorker.on("failed", (job, error) => {
  logger.error(`${CONSTS.QUEUES.UPLOAD} worker failed job ${job?.id}:`, error);
});
