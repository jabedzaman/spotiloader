import { ISearchDoc, ITrackDoc, SearchStatus } from "@spotiloader/types";
import { getTrack } from "./get-track.spotify";

/**
 *
 * @param url the URL of the track to search
 * @param searchId the ID of the search that this track belongs to
 * @returns {Promise<ITrackDoc>} the track information
 */
export const search = async (
  url: string,
  search: ISearchDoc
): Promise<ITrackDoc> => {
  // ##TODO: check url parsing and validation

  // 1. get the track info
  const trackInfo = await getTrack(url);

  // 2. update the search info with the track info
  // search.tracks.push(trackInfo); // ###FIXME: do we need to push the track info to the search?

  // 3. update the search status
  search.status = SearchStatus.COMPLETED;

  // 4. return the track info
  await search.save();
  return trackInfo;
};
