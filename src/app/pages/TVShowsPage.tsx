import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import FilterBar from "@/components/FilterBar";
import { useDiscoverTV } from "@/hooks/useDiscoverTV";

type Filters = {
  genre: string;
  year: string;
  rating: string;
  sort: string;
};

export default function TVShowsPage() {
  const [filters, setFilters] = useState<Filters>({
    genre: "All Genres",
    year: "All Years",
    rating: "All Ratings",
    sort: "Popularity",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const genreMap: Record<string, number> = {
    Action: 10759,
    Comedy: 35,
    Drama: 18,
    "Sci-Fi": 10765,
    Adventure: 10759,
    Crime: 80,
    Thriller: 9648,
  };

  const sortMap = {
    Popularity: "popularity.desc",
    Rating: "vote_average.desc",
    "Newest First": "first_air_date.desc",
    "Oldest First": "first_air_date.asc",
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
  } = useDiscoverTV(apiFilters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen text-white px-6 md:px-10 py-8 max-w-screen-2xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          TV Shows
        </h1>
        <p className="text-[#94A3B8] mt-2 text-sm md:text-base">
          Explore trending and popular TV series
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="mb-8">
        <FilterBar onFiltersChange={setFilters} />
      </div>

      {/* ERROR */}
      {isError && (
        <p className="text-red-400 mb-4">
          {(error as Error).message}
        </p>
      )}

      {isLoading && <Loader />}

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data?.results?.map((show) => (
          <MovieCard
            key={show.id}
            movie={{
              ...show,
              id: show.id,
              title: show.name, 
              release_date: show.first_air_date, 
            }}
          />
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