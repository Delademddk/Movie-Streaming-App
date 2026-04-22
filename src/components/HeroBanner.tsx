import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";
import { getImageUrl } from "@/api/tmdb";

type Movie = {
  id: number;
  title: string;
  backdrop: string;
  overview: string;
};

export default function HeroBanner() {
  const { data, isLoading } = useTrendingMovies();

  const movies: Movie[] =
    data?.results
      ?.filter((movie) => movie.backdrop_path) 
      ?.slice(2, 8) 
      ?.map((movie) => ({
        id: movie.id,
        title: movie.title ?? "Untitled",
        backdrop: getImageUrl(movie.backdrop_path ?? null),
        overview: movie.overview ?? "No description available",
      })) || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const prevSlide = () => {
    if (movies.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const nextSlide = () => {
    if (movies.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (isLoading || movies.length === 0) {
    return (
      <section className="relative w-full h-[75vh] rounded-[14px] bg-[#1E293B] flex items-center justify-center mb-4">
        <p className="text-white text-sm">Loading trending movies...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[75vh] rounded-[14px] flex items-end overflow-hidden mb-4">
      <div className="absolute inset-0">
        {movies.map((movie, index) => (
          <img
            key={movie.id}
            src={movie.backdrop}
            alt={movie.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-transparent" />

      <div className="relative z-10 w-full px-6 md:px-18 pb-12 max-w-screen-2xl mx-auto flex items-end justify-between">
        <div className="max-w-xl">
          <h1 className="text-white text-3xl md:text-6xl font-extrabold mb-4 leading-tight">
            {movies[currentIndex].title}
          </h1>

          <p className="text-[#CBD5E1] text-sm md:text-[18px] mb-6 line-clamp-3">
            {movies[currentIndex].overview}
          </p>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => {}}
              text={
                <>
                  <Play className="mr-2 inline w-4 h-4" />
                  Watch Now
                </>
              }
              className="bg-[#0D59F2] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(13,89,242,0.6)]"
            />
            <Button
              onClick={() => {}}
              text={
                <>
                  <Info className="mr-2 inline w-4 h-4" />
                  Details
                </>
              }
              className="bg-white/10 hover:bg-white/20 hover:ring-1 hover:ring-white/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 self-end">
          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/30 border-2 text-white p-3 md:p-4 rounded-full transition-all duration-200 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-10 h-10 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/30 border-2 text-white p-3 md:p-4 rounded-full transition-all duration-200 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-10 h-10 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}