import { useState } from 'react';
import FilterSidebar from '@/components/FilterSidebar';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { mockMovies, type Movie } from '@/data/mockMovies';

interface SearchPageProps {
  query: string;         
}

export default function SearchPage({ query }: SearchPageProps) {
  const [filters, setFilters] = useState({
    genres: ['Sci-Fi', 'Drama'] as string[],
    yearRange: '2010-2019',
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
          <span>Home</span>
          <span>›</span>
          <span className="text-white">Search</span>
        </div>

        {/* Dynamic Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold">
            Results for <span className="text-blue-400">"{query || 'your search'}"</span>
          </h1>
          <p className="text-zinc-400 mt-2">
            Found {displayedMovies.length} titles matching your search criteria
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar onApply={handleApplyFilters} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex border-b border-zinc-800 mb-6">
              {['Movies', 'Series', 'Cast & Crew', 'Collections'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    tab === 'Movies'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
              {displayedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}