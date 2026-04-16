'use client';

import { useState, useEffect } from 'react';
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";
import MovieCard from "@/components/MovieCard";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { mockMovies, popularMovies, type Movie } from "@/data/mockMovies";

export default function HomePage() {
  const [filters, setFilters] = useState({
    genre: 'All Genres',
    year: '2024',
    rating: '8.0+',
    sort: 'Popularity',
  });

  // Bottom section (mockMovies) - filtered + paginated
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const MOVIES_PER_PAGE = 6;

  // Filter + sort logic for the bottom section only
  const getFilteredMoviesForPage = (page: number) => {
    let filtered = [...mockMovies];

    // Genre filter
    if (filters.genre !== 'All Genres') {
      filtered = filtered.filter((m) => m.genre === filters.genre);
    }

    // Year filter
    if (filters.year !== 'All Years' && filters.year !== '2024') {
      filtered = filtered.filter((m) => m.release_date.startsWith(filters.year));
    }

    // Rating filter
    const minRating = parseFloat(filters.rating) || 0;
    if (minRating > 0) {
      filtered = filtered.filter((m) => m.vote_average >= minRating);
    }

    // Sort
    if (filters.sort === 'Rating') {
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    } else if (filters.sort === 'Newest First') {
      filtered.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (filters.sort === 'Oldest First') {
      filtered.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    const start = (page - 1) * MOVIES_PER_PAGE;
    return filtered.slice(start, start + MOVIES_PER_PAGE);
  };

  // Reset bottom section when filters change + show loader
  useEffect(() => {
    setIsLoading(true);
    setDisplayedMovies([]);

    setTimeout(() => {
      const firstPage = getFilteredMoviesForPage(1);
      setDisplayedMovies(firstPage);
      setCurrentPage(1);
      setIsLoading(false);
    }, 900);
  }, [filters]);

  // Load more (append) when pagination is clicked
  const handlePageChange = (page: number) => {
    setIsLoading(true);

    setTimeout(() => {
      const newMovies = getFilteredMoviesForPage(page);
      setDisplayedMovies((prev) => [...prev, ...newMovies]);
      setCurrentPage(page);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-4 ">
      {/* HERO BANNER */}
      <HeroBanner />

      {/* FILTER BAR - only affects bottom section */}
      <FilterBar onFiltersChange={setFilters} />

      <div className="px-8 py-6 max-w-screen-2xl mx-auto">
        
        {/* ==================== POPULAR MOVIES (Top - Horizontal Scroll) ==================== */}
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

          {/* Horizontal scroll - same card size as bottom */}
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="flex-none min-w-55">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        {/* ==================== MOCK MOVIES (Bottom - Filtered Grid + Pagination) ==================== */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Movies</h2>

          {/* Grid - same card size as popular section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Loader */}
          {isLoading && <Loader />}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={12}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}