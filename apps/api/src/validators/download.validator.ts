import { SearchType } from "@spotiloader/types";
import { z } from "zod";

export const createPresignedUrlQuery = z.object({
  type: z.enum([SearchType.TRACK, SearchType.ALBUM, SearchType.PLAYLIST], {
    message: "Invalid type",
  }),
  id: z.string().uuid({ message: "Invalid ID" }),
});

export type CreatePresignedUrlQuery = z.infer<typeof createPresignedUrlQuery>;

export const createPresignedUrlSchema = z.object({
  query: createPresignedUrlQuery,
});
