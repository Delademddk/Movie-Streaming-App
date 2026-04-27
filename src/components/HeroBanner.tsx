import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";
import { getImageUrl } from "@/api/tmdb";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

type Movie = {
  id: number;
  title: string;
  backdrop: string;
  overview: string;
};

export default function HeroBanner() {
  const { data, isLoading } = useTrendingMovies();
  const navigate = useNavigate();

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

  // ✅ CURRENT MOVIE
  const currentMovie = movies[currentIndex];

  // ✅ NAVIGATION HANDLER
  const goToDetails = () => {
    if (!currentMovie) return;
    navigate(`/movie/${currentMovie.id}`);
  };

  if (isLoading || movies.length === 0) {
    return (
      <section className="relative w-full h-[75vh] rounded-[14px] bg-[#101622] flex items-center justify-center mb-4">
        <Loader />
      </section>
    );
  }

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] rounded-[14px] flex items-end overflow-hidden mb-4">
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

<div className="relative z-10 w-full px-[clamp(1rem,5vw,4.5rem)] pb-[clamp(1.5rem,4vw,3rem)] max-w-screen-2xl mx-auto flex items-end justify-between">
  <div className="max-w-[clamp(16rem,50vw,36rem)]">
    <h1 className="text-white font-extrabold mb-[clamp(0.5rem,1.5vw,1rem)] leading-tight text-[clamp(1.25rem,5vw,3.75rem)]">
      {currentMovie.title}
    </h1>

    <p className="text-[#CBD5E1] mb-[clamp(0.75rem,2vw,1.5rem)] line-clamp-3 text-[clamp(0.7rem,1.8vw,1.125rem)]">
      {currentMovie.overview}
    </p>

    <div className="flex items-center gap-[clamp(0.5rem,2vw,1rem)]">
      <Button
        onClick={goToDetails}
        text={
          <>
            <Play className="mr-2 inline w-[clamp(0.65rem,1.5vw,1rem)] h-[clamp(0.65rem,1.5vw,1rem)]" />
            Watch Now
          </>
        }
        className="bg-[#0D59F2] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(13,89,242,0.6)] text-[clamp(0.65rem,1.5vw,1rem)] px-[clamp(0.5rem,2vw,1.25rem)] py-[clamp(0.3rem,1vw,0.625rem)]"
      />
      <Button
        onClick={goToDetails}
        text={
          <>
            <Info className="mr-2 inline w-[clamp(0.65rem,1.5vw,1rem)] h-[clamp(0.65rem,1.5vw,1rem)]" />
            Details
          </>
        }
        className="bg-white/10 hover:bg-white/20 hover:ring-1 hover:ring-white/30 text-[clamp(0.65rem,1.5vw,1rem)] px-[clamp(0.5rem,2vw,1.25rem)] py-[clamp(0.3rem,1vw,0.625rem)]"
      />
    </div>
  </div>

  <div className="flex items-center gap-[clamp(0.375rem,1.5vw,0.75rem)] self-end">
    <button
      onClick={prevSlide}
      className="bg-white/10 hover:bg-white/30 border-2 text-white rounded-full transition-all duration-200 active:scale-95 p-[clamp(0.4rem,1.2vw,1rem)]"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-[clamp(0.75rem,2.5vw,1.5rem)] h-[clamp(0.75rem,2.5vw,1.5rem)]" />
    </button>

    <button
      onClick={nextSlide}
      className="bg-white/10 hover:bg-white/30 border-2 text-white rounded-full transition-all duration-200 active:scale-95 p-[clamp(0.4rem,1.2vw,1rem)]"
      aria-label="Next slide"
    >
      <ChevronRight className="w-[clamp(0.75rem,2.5vw,1.5rem)] h-[clamp(0.75rem,2.5vw,1.5rem)]" />
    </button>
  </div>
</div>    </section>
  );
}