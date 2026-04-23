import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@/api/tmdb";

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
}