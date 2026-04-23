import type { paths } from "@/api/generated";

const BASE_URL = "https://api.themoviedb.org";

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("Missing VITE_TMDB_TOKEN. Check your .env file.");
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status}`);
  }

  return res.json();
}

export type PopularMoviesResponse =
  paths["/3/movie/popular"]["get"]["responses"]["200"]["content"]["application/json"];

export type DiscoverMoviesResponse =
  paths["/3/discover/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export type SearchMoviesResponse =
  paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export type SearchTVResponse =
  paths["/3/search/tv"]["get"]["responses"]["200"]["content"]["application/json"];

export type TrendingMoviesResponse =
  paths["/3/trending/movie/{time_window}"]["get"]["responses"]["200"]["content"]["application/json"];

export type DiscoverParams = {
  page?: number;
  genre?: number;
  minRating?: number;
  year?: number;
  sortBy?:
    | "popularity.desc"
    | "vote_average.desc"
    | "release_date.desc"
    | "release_date.asc";
};

export type MovieDetailsResponse =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type MovieCreditsResponse =
  paths["/3/movie/{movie_id}/credits"]["get"]["responses"]["200"]["content"]["application/json"];

export type MovieVideosResponse =
  paths["/3/movie/{movie_id}/videos"]["get"]["responses"]["200"]["content"]["application/json"];

export function getPopularMovies(page = 1) {
  return fetchFromTMDB<PopularMoviesResponse>(`/3/movie/popular?page=${page}`);
}

export function discoverMovies({
  page = 1,
  genre,
  minRating,
  year,
  sortBy = "popularity.desc",
}: DiscoverParams) {
  const query = new URLSearchParams({
    page: String(page),
    sort_by: sortBy,
  });

  if (genre) {
    query.append("with_genres", String(genre));
  }

  if (minRating) {
    query.append("vote_average.gte", String(minRating));
  }

  if (year) {
    query.append("primary_release_year", String(year));
  }

  return fetchFromTMDB<DiscoverMoviesResponse>(
    `/3/discover/movie?${query.toString()}`,
  );
}

export function searchMovies(query: string, page = 1) {
  const params = new URLSearchParams({
    query,
    page: String(page),
  });

  return fetchFromTMDB<SearchMoviesResponse>(
    `/3/search/movie?${params.toString()}`,
  );
}

export function searchTV(query: string, page = 1) {
  const params = new URLSearchParams({
    query,
    page: String(page),
  });

  return fetchFromTMDB<SearchTVResponse>(`/3/search/tv?${params.toString()}`);
}

export function getTrendingMovies() {
  return fetchFromTMDB<TrendingMoviesResponse>("/3/trending/movie/day");
}

export function getMovieDetails(id: number) {
  return fetchFromTMDB<MovieDetailsResponse>(`/3/movie/${id}`);
}

export function getMovieCredits(id: number) {
  return fetchFromTMDB<MovieCreditsResponse>(`/3/movie/${id}/credits`);
}

export function getMovieVideos(id: number) {
  return fetchFromTMDB<MovieVideosResponse>(`/3/movie/${id}/videos`);
}

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function getImageUrl(path: string | null) {
  if (!path) return "/favicon.svg";
  return `${IMAGE_BASE}${path}`;
}
