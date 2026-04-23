import {
  searchMovies,
  searchTV,
  type SearchMoviesResponse,
  type SearchTVResponse,
} from "@/api/tmdb";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type SearchType = "movie" | "tv";

type UseSearchContentParams = {
  query: string;
  type: SearchType;
  page?: number;
};

type SearchResponse = SearchMoviesResponse | SearchTVResponse;

export function useSearchContent({
  query,
  type,
  page = 1,
}: UseSearchContentParams) {
  return useQuery<SearchResponse>({
    queryKey: ["search", type, query, page],

    queryFn: () => {
      if (type === "movie") {
        return searchMovies(query, page);
      }
      return searchTV(query, page);
    },

    enabled: query.length > 0,

    placeholderData: keepPreviousData,
  });
}