import { ITrackDoc } from "@spotiloader/types";
import * as Spotdl from "spottydl";

export const downloadTrack = async (track: ITrackDoc) => {
  // download the track to cache
  console.log(JSON.stringify(track.meta, null, 2));
  const trackinfo = await Spotdl.getTrack(track.trackUrl);
  if (typeof trackinfo === "string") {
    return;
  }
  const results = await Spotdl.downloadTrack(trackinfo, "./cache");

  // check if the download was successful
  if (typeof results === "string") {
    console.error(`Download failed: ${results}`);
    throw new Error(`download failed: ${results}`);
  }

  // return the results
  return results;
};
