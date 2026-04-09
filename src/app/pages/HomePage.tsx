import NavBar from "@/components/NavBar";
import MovieCard from "@/components/MovieCard";
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";
import { useState } from "react";
import { mockMovies, type Movie } from "@/data/mockMovies";

export default function HomePage() {
  const [filters, setFilters] = useState({
    genre: "All Genres",
    year: "2024",
    rating: "8.0+",
    sort: "Popularity",
  });
  const displayedMovies = mockMovies;
  return (
    <div>
      <NavBar />
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
      </div>
    </div>
  );
}
