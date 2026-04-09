import MovieCard from "@/components/MovieCard";
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";
import { useState } from "react";
import { mockMovies, type Movie } from "@/data/mockMovies";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  const [filters, setFilters] = useState({
    genre: 'All Genres',
    year: '2024',
    rating: '8.0+',
    sort: 'Popularity',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const displayedMovies = mockMovies;

  const totalPages = 12; 

  // Handle page change 
  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);

    // Simulate API delay (remove this when you connect real TMDB)
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  // const displayedMovies = mockMovies;
  return (
    <div>
      <div className="p-4">
        <HeroBanner />
        <FilterBar onFiltersChange={setFilters} />
        <div className="px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white">
              Popular Movies
            </h2>
            <a
              href="#"
              className="text-blue-400  flex items-center gap-1 text-sm"
            >
              <span className="hover:underline">View All</span>
              <span className="text-xl  leading-none">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
        {isLoading && <Loader />}

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
