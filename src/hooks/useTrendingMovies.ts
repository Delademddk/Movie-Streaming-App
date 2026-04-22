import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/api/tmdb";

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["trending-movies"],
    queryFn: getTrendingMovies,
  });
}