import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import FilterBar from "@/components/FilterBar";
import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";

type Filters = {
  genre: string;
  year: string;
  rating: string;
  sort: string;
};

export default function MoviesPage() {
  const [filters, setFilters] = useState<Filters>({
    genre: "All Genres",
    year: "All Years",
    rating: "All Ratings",
    sort: "Popularity",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 MAP UI → API
  const genreMap: Record<string, number> = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    "Sci-Fi": 878,
    Adventure: 12,
    Crime: 80,
    Thriller: 53,
  };

  const sortMap = {
    Popularity: "popularity.desc",
    Rating: "vote_average.desc",
    "Newest First": "release_date.desc",
    "Oldest First": "release_date.asc",
  } as const;

  const apiFilters = {
    page: currentPage,
    genre:
      filters.genre !== "All Genres"
        ? genreMap[filters.genre]
        : undefined,
    minRating: parseFloat(filters.rating) || undefined,
    year:
      filters.year !== "All Years"
        ? Number(filters.year)
        : undefined,
    sortBy: sortMap[filters.sort as keyof typeof sortMap],
  };

  const {
    data,
    isLoading,
    isError,
    error,
  } = useDiscoverMovies(apiFilters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen text-white px-6 md:px-10 py-8 max-w-screen-2xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Movies
        </h1>
        <p className="text-[#94A3B8] mt-2 text-sm md:text-base">
          Discover trending, popular and top-rated movies
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="mb-8">
        <FilterBar onFiltersChange={setFilters} />
      </div>

      {isError && (
        <p className="text-red-400 mb-4">
          {(error as Error).message}
        </p>
      )}

      {/* LOADING */}
      {isLoading && <Loader />}

      {/* MOVIE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.min(data?.total_pages ?? 1, 20)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}