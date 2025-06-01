import { Queue } from "bullmq";
import { CONSTS } from "~/CONSTS";
import { redis } from "~/libs";

/**
 * Search Queue
 * This queue is used to handle search jobs in the application.
 */
const searchQueue = new Queue(CONSTS.QUEUES.SEARCH, {
  connection: redis,
});

/**
 * Search Queue Handler
 * This handler provides methods to add search jobs to the queue.
 */
export const searchQueueHandler = {
  // add a search to the queue
  add: async (data: { searchId: string }) => {
    await searchQueue.add(CONSTS.JOBS.SEARCH, data, {
      attempts: 3, // retry up to 3 times if the job fails
      backoff: { type: "exponential", delay: 1000 }, // retry with exponential backoff
    });
  },
};
