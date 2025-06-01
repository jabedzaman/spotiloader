import { CreateSearchPayload } from "~/validators";
import { urlService } from "./url.service";
import { ApiError, httpStatus } from "~/utils";
import { searchQueueHandler } from "~/queues";
import { ISearchDoc } from "@spotiloader/types";
import { Search } from "@spotiloader/models";
import { CONSTS } from "~/CONSTS";

/**
 * Search Service
 * This service handles the creation and management of searches in the application.
 * It interacts with the database to create, list, and manage search records.
 */
export const searchService = {
  // create a search
  create: async (data: CreateSearchPayload) => {
    // 1. parse the URL to ensure it's valid
    const platform = await urlService.parseUrl(data.url);
    if (!platform) {
      throw new ApiError("Invalid URL", httpStatus.BAD_REQUEST);
    }

    let search: ISearchDoc | null = null;

    // 2. check if the search already exists
    search = await Search.findOne({ url: data.url });
    if (search) {
      // if the search already exists, return it
      return search;
    }

    // 3. create the search in the database
    search = await Search.create({
      url: data.url,
      platform,
      status: "PENDING",
    });

    // 4. add the search to the search queue
    await searchQueueHandler.add({ searchId: search.id });

    // 5. return the created search
    await search.save();
    return search;
  },

  // list all searches with pagination
  list: async (filter: any = {}, options: any = {}) => {
    const searches = await Search.find(filter)
      .populate({
        path: CONSTS.COLLECTIONS.TRACKS,
        populate: { path: CONSTS.COLLECTIONS.COVERS },
      })
      .populate(CONSTS.COLLECTIONS.ALBUMS)
      .sort({ createdAt: -1 }); // sort by createdAt in descending order
    return searches;
  },
};
