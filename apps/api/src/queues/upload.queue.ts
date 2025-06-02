import { Queue } from "bullmq";
import { CONSTS } from "~/CONSTS";
import { redis } from "~/libs";

/**
 * Upload Queue
 * This queue is responsible for processing upload jobs.
 * It is used to upload tracks to S3.
 */
export const uploadQueue = new Queue(CONSTS.QUEUES.UPLOAD, {
  connection: redis,
});

/**
 * Upload Queue Handler
 * This handler provides methods to add upload jobs to the queue.
 */
export const uploadQueueHandler = {
  // add an upload job to the queue
  add: async (data: { trackId: string }) => {
    const job = await uploadQueue.add(CONSTS.JOBS.UPLOAD_TRACK, data);
    return job;
  },
};
