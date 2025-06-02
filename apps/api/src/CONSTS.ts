import { CONSTS as MODEL_CONSTS } from "@spotiloader/models";

export const CONSTS = {
  // bullmq queues
  QUEUES: {
    SEARCH: "search",
    DOWNLOAD: "download",
    UPLOAD: "upload",
  },

  // bullmq jobs
  JOBS: {
    SEARCH: "search",
    DOWNLOAD_TRACK: "download_track",
    UPLOAD_TRACK: "upload_track",
  },

  // regex
  REGEX: {
    YOUTUBE: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
    SPOTIFY:
      /^(https?:\/\/)?(open\.spotify\.com\/)(track|album|playlist)\/[a-zA-Z0-9]+(\?.*)?$/,
  },

  // collections
  COLLECTIONS: MODEL_CONSTS.COLLECTIONS,
};
