import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "@/components/FilterSidebar";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { mockMovies } from "@/data/mockMovies";

type SearchFilters = {
  genres: string[];
  yearRange: string;
  minRating: number;
};

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<SearchFilters>({
    genres: ["Sci-Fi", "Drama"] as string[],
    yearRange: "2010-2019",
    minRating: 8.0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const displayedMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return mockMovies.filter((movie) => {
      const matchesQuery =
        normalizedQuery === "" ||
        movie.title.toLowerCase().includes(normalizedQuery);
      const matchesGenre =
        filters.genres.length === 0 || filters.genres.includes(movie.genre);
      const matchesRating = movie.vote_average >= filters.minRating;

      const matchesYearRange =
        filters.yearRange === "All Years" ||
        (() => {
          const [startYear, endYear] = filters.yearRange
            .split("-")
            .map((value) => Number(value));
          const releaseYear = Number(movie.release_date.split("-")[0]);

          if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) {
            return true;
          }

          return releaseYear >= startYear && releaseYear <= endYear;
        })();

      return matchesQuery && matchesGenre && matchesRating && matchesYearRange;
    });
  }, [filters, query]);

  const totalPages = 12;

  const handleApplyFilters = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 min-h-screen  text-white flex flex-col lg:flex-row gap-8">
        <div className="lg:fixed  self-start w-full lg:w-auto  shrink-0">
          <FilterSidebar onApply={handleApplyFilters} />
        </div>
        <div className="pt-6 pl-75 ">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-2">
              <span>Home</span>
              <span>›</span>
              <span className="text-white">Search</span>
            </div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold">
                Results for{" "}
                <span className="text-[#0D59F2]">
                  "{query || "your search"}"
                </span>
              </h1>
              <p className="text-[#94A3B8] text-[16px] mt-2">
                Found {displayedMovies.length} titles matching your search
                criteria
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex border-b border-[#1E293B] mb-6">
              {["Movies", "Series", "Cast & Crew", "Collections"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    tab === "Movies"
                      ? "border-blue-500 text-[#0D59F2]"
                      : "border-transparent text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
              {displayedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      
    </div>
  );
}
