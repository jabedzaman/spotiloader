import { ITrackDoc } from "@spotiloader/types";
import * as Spotdl from "spottydl";

export const downloadTrack = async (track: ITrackDoc) => {
  // 1. set status to downloading
  track.cached.status = "downloading";
  await track.save();

  // 2. get the track info from spottydl
  const trackinfo = await Spotdl.getTrack(track.trackUrl);
  if (typeof trackinfo === "string") {
    throw new Error(`failed to get track info: ${trackinfo}`);
  }

  // 3. download the track
  const results = await Spotdl.downloadTrack(trackinfo, "./cache/spotify");

  // 4. check if the download was successful
  if (typeof results === "string") {
    throw new Error(`download failed: ${results}`);
  }

  // 5. set status to downloaded
  track.cached.status = "done";
  await track.save();

  // 6. return the results
  return results[0]; // return the filename of the downloaded track
};
