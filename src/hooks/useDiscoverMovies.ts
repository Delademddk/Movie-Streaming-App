import { discoverMovies, type DiscoverParams } from "@/api/tmdb";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useDiscoverMovies(filters: DiscoverParams) {
  return useQuery({
    queryKey: ["discover-movies", filters],
    queryFn: () => discoverMovies(filters),
    placeholderData: keepPreviousData,
  });
}
