import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "@/api/tmdb";

export function useMovieVideos(id: number) {
  return useQuery({
    queryKey: ["movie-videos", id],
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
  });
}