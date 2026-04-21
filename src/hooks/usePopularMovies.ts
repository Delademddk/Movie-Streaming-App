import {  useQuery } from "@tanstack/react-query";
import {  getPopularMovies } from "@/api/tmdb";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["popular-movies", page],
    queryFn: () => getPopularMovies(page),
  });
}

