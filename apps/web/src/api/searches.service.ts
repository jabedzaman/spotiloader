import { ISearch } from "@spotiloader/types";
import { http } from "~/lib/axios";

export const searches = {
  create: async ({ url }: { url: string }) => {
    try {
      const { data } = await http.post<{
        search: ISearch;
      }>("/searches", {
        url,
      });
      return data.search;
    } catch (error) {
      console.error("failed to create search:", error);
      throw error;
    }
  },

  list: async () => {
    try {
      const { data } = await http.get<ISearch[]>("/searches");
      return data;
    } catch (error) {
      console.error("failed to list searches:", error);
      throw error;
    }
  },
};
