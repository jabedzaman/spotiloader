import { z } from "zod";

export const createSearchPayload = z.object({
  url: z.string().url({ message: "Invalid URL" }),
});

export type CreateSearchPayload = z.infer<typeof createSearchPayload>;

export const createSearchSchema = z.object({
  body: createSearchPayload,
});
