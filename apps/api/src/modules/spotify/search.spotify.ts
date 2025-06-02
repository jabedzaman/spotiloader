import { ISearchDoc, ITrackDoc, SearchStatus } from "@spotiloader/types";
import { getTrack } from "./get-track.spotify";
import { Search } from "@spotiloader/models";

/**
 *
 * @param url the URL of the track to search
 * @param search the search document containing the search information
 * @returns {Promise<ITrackDoc>} the track information
 */
export const search = async (
  url: string,
  search: ISearchDoc
): Promise<ITrackDoc> => {
  // ##TODO: check url parsing and validation

  // 1. get the track info
  const trackInfo = await getTrack(url, search.id);

  // 2. update the search info with the track info
  // search.tracks.push(trackInfo.id); // ###FIXME: do we need to push the track info to the search?
  // temp use model to add track
  await Search.updateOne(
    { _id: search._id },
    { $push: { tracks: trackInfo.id } }
  );

  // 3. update the search status
  search.status = SearchStatus.COMPLETED;

  // 4. update the search with the track info
  await search.save();

  return trackInfo;
};
