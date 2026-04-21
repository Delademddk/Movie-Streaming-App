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


  
export function getPopularMovies(page = 1) {
  return fetchFromTMDB<PopularMoviesResponse>(
    `/3/movie/popular?page=${page}`
  );
}

export type DiscoverParams = {
  page?: number;
  genre?: number;
  minRating?: number;
  year?: number;
  sortBy?: "popularity.desc" | "vote_average.desc" | "release_date.desc" | "release_date.asc";
};

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
    `/3/discover/movie?${query.toString()}`
  );
}


export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function getImageUrl(path: string | null) {
  if (!path) return "/favicon.svg";
  return `${IMAGE_BASE}${path}`;
}