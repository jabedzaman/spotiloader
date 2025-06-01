import useSWR from "swr";
import { api } from "~/api";

const fetcher = () => api.searches.list().then((res) => res);

const useSearches = () => useSWR("/searches", fetcher);

export const searches = {
  list: useSearches,
};
