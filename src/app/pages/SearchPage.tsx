import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { mockMovies, type Movie } from "@/data/mockMovies";

interface SearchPageProps {
  query: string;
}

export default function SearchPage({ query }: SearchPageProps) {
  const [filters, setFilters] = useState({
    genres: ["Sci-Fi", "Drama"] as string[],
    yearRange: "2010-2019",
    minRating: 8.0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const displayedMovies = mockMovies.slice(0, 8);

  const totalPages = 12;

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:sticky lg:top-8 self-start w-full lg:w-auto z-10 shrink-0">
            <FilterSidebar onApply={handleApplyFilters} />
          </div>
          <div className="pt-6 ">
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
                {["Movies", "Series", "Cast & Crew", "Collections"].map(
                  (tab) => (
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
                  ),
                )}
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
      </div>
    </div>
  );
}
