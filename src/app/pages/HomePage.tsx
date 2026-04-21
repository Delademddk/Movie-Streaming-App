import { useState, useEffect } from 'react';
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";
import MovieCard from "@/components/MovieCard";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

import { usePopularMovies, useDiscoverMovies } from "@/hooks/queryHooks";

type HomeFilters = {
  genre: string;
  year: string;
  rating: string;
  sort: string;
};

export default function HomePage() {
  const [filters, setFilters] = useState<HomeFilters>({
    genre: 'All Genres',
    year: 'All Years',
    rating: 'All Ratings',
    sort: 'Popularity',
  });

  const [currentPage, setCurrentPage] = useState(1);

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
    genre: filters.genre !== "All Genres" ? genreMap[filters.genre] : undefined,
    minRating: parseFloat(filters.rating) || undefined,
    year: filters.year !== "All Years" ? Number(filters.year) : undefined,
    sortBy: sortMap[filters.sort as keyof typeof sortMap],
  };

  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
    error: popularErrorDetails,
  } = usePopularMovies();
  const {
    data: discoverData,
    isLoading: discoverLoading,
    isError: discoverError,
    error: discoverErrorDetails,
  } = useDiscoverMovies(apiFilters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 ">
      <HeroBanner />

      <FilterBar onFiltersChange={setFilters} />

      <div className="px-8 py-6 max-w-screen-2xl mx-auto">
        
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Popular Movies</h2>
            <a
              href="#"
              className="text-blue-400 hover:underline flex items-center gap-1 text-sm"
            >
              View All 
            </a>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {popularLoading && <Loader />}
            {popularError && (
              <p className="text-sm text-red-400">
                {(popularErrorDetails as Error).message}
              </p>
            )}

            {popularData?.results?.map((movie) => (
              <div key={movie.id} className="flex-none min-w-55">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Movies</h2>

          {discoverLoading && <Loader />}
          {discoverError && (
            <p className="mb-4 text-sm text-red-400">
              {(discoverErrorDetails as Error).message}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {discoverData?.results?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.min(discoverData?.total_pages ?? 1, 12)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
