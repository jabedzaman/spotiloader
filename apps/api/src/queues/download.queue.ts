import { Queue } from "bullmq";
import { CONSTS } from "~/CONSTS";
import { redis } from "~/libs";

/**
 * Download Queue
 * This queue is used to handle download jobs in the application.
 * It is responsible for managing the download of tacks to cache.
 */
export const downloadQueue = new Queue(CONSTS.QUEUES.DOWNLOAD, {
  connection: redis,
});

/**
 * Download Queue Handler
 * This handler provides methods to add download jobs to the queue.
 */
export const downloadQueueHandler = {
  // add a download to the queue
  add: async (data: { trackId: string }) => {
    await downloadQueue.add(CONSTS.JOBS.DOWNLOAD_TRACK, data, {
      attempts: 3, // retry up to 3 times if the job fails
      backoff: { type: "exponential", delay: 1000 }, // retry with exponential backoff
    });
  },
};
