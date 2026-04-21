import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { discoverMovies, getPopularMovies, type DiscoverParams } from "@/api/tmdb";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["popular-movies", page],
    queryFn: () => getPopularMovies(page),
  });
}

export function useDiscoverMovies(filters: DiscoverParams) {
  return useQuery({
    queryKey: ["discover-movies", filters],
    queryFn: () => discoverMovies(filters),
    placeholderData: keepPreviousData,
  });
}
