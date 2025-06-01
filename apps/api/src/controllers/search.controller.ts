import type { Request, Response } from "express";
import { searchService } from "~/services";

export const searchController = {
  // track/video search
  create: async (req: Request, res: Response) => {
    const searchPayload = {
      url: req.body.url,
    };
    const search = await searchService.create(searchPayload);
    res.json({ search });
  },

  // list all searches
  list: async (req: Request, res: Response) => {
    const searches = await searchService.list();
    res.json(searches);
  },
};
