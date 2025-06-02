import { Track } from "@spotiloader/models";
import { ISearch, Platform, SearchType } from "@spotiloader/types";
import { ApiError, httpStatus } from "~/utils";
import { CreatePresignedUrlQuery } from "~/validators";

/**
 * Download Service
 * This service handles the downloading of files from a given URL.
 * It supports both direct downloads and streaming downloads.
 */
export const downloadService = {
  // create a download
  create: async (data: CreatePresignedUrlQuery) => {
    const { type, id } = data; // Better DX
    // bassed on the type, we can determine the download method
    switch (type) {
      case SearchType.TRACK:
        const track = await Track.findById(id);
        if (!track) {
          throw new ApiError("Track not found", httpStatus.NOT_FOUND);
        }
        const search = track.search as ISearch;
        switch (search.platform) {
          case Platform.SPOTIFY:
            break;
          default:
            throw new ApiError("Unsupported platform", httpStatus.BAD_REQUEST);
        }
        break;
      default:
        throw new ApiError("Invalid search type", httpStatus.BAD_REQUEST);
    }
  },
};
