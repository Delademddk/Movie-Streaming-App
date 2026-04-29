import { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";
import MovieCard from "@/components/MovieCard";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { usePopularMovies } from "@/hooks/usePopularMovies";
import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

type HomeFilters = {
  genre: string;
  year: string;
  rating: string;
  sort: string;
};

export default function HomePage() {
  const [filters, setFilters] = useState<HomeFilters>({
    genre: "All Genres",
    year: "All Years",
    rating: "All Ratings",
    sort: "Popularity",
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

    const navigate = useNavigate();

  return (
    <div className="p-2 md:p-4">
      <HeroBanner />

      <FilterBar onFiltersChange={setFilters} />

      <div className="px-3 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6 max-w-screen-2xl mx-auto">
        <div className="mb-[clamp(1.5rem,4vw,3rem)]">
          <div className="flex items-center justify-between mb-[clamp(0.75rem,2vw,1rem)]">
            <h2 className="text-white font-semibold text-[clamp(1rem,2.5vw,1.5rem)]">
              Popular Movies
            </h2>
            <button onClick={() => navigate("/movies")} className="text-blue-400 hover:underline flex items-center gap-1 text-[clamp(0.65rem,1.2vw,0.875rem)]">
              View All
            </button>
          </div>

          <ScrollArea className="pb-4">
            <div className="flex gap-[clamp(0.75rem,2vw,1.5rem)]">
              {popularLoading && <Loader />}
              {popularError && (
                <p className="text-sm text-red-400">
                  {(popularErrorDetails as Error).message}
                </p>
              )}

              {popularData?.results?.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-none w-[clamp(7rem,18vw,13.75rem)]"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
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
            {discoverData?.results?.slice(0, 12).map((movie) => (
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
