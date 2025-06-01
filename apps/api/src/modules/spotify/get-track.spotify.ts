import * as Spotdl from "spottydl";
import { Cover, Track } from "@spotiloader/models";
import { ITrackDoc } from "@spotiloader/types";
import { ApiError, httpStatus } from "~/utils";

/**
 *
 * @param url the URL of the track to get
 * @param searchId the ID of the search that this track belongs to
 * @returns
 */
export const getTrack = async (url: string) => {
  let track: ITrackDoc | null = null;

  // 1. in case already in database, return the track
  track = await Track.findOne({ trackUrl: url });
  if (track) {
    return track;
  }

  // 2. get the track info
  const trackInfo = await Spotdl.getTrack(url);

  // 3. check if the track info is valid
  if (typeof trackInfo === "string") {
    throw new ApiError("Could not find track", httpStatus.NOT_FOUND);
  }
  // 4. create the cover
  const cover = await Cover.create({
    url: trackInfo.albumCoverURL,
    width: 500,
    height: 500,
  });

  // 5. create the track
  track = await Track.create({
    trackUrl: url,
    title: trackInfo.title,
    year: trackInfo.year,
    meta: trackInfo,
  });

  // 6. add the cover to the track, & connect the track to the search
  track.covers.push(cover.id);
  await track.save();

  // 7. return the track
  return track;
};
