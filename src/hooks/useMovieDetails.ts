import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/api/tmdb";

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });
}