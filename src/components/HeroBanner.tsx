import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

type Movie = {
  id: number;
  title: string;
  backdrop: string;
  overview: string;
};

export default function HeroBanner() {
  const movies: Movie[] = [
    {
      id: 1,
      title: "Interstellar",
      backdrop:
        "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      overview:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      id: 2,
      title: "Inception",
      backdrop:
        "https://m.media-amazon.com/images/S/pv-target-images/21b2db2dbd1ecefe8e6d6578dd6f8c054da0cfc801d008b54167c81a7eaa0356.jpg",
      overview:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    },
    {
      id: 3,
      title: "The Dark Knight",
      backdrop:
        "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      overview:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    },
    {
      id: 4,
      title: "Dune: Part Two",
      backdrop:
        "https://miro.medium.com/1*SvqveyU-E2RAHPwHykl5YQ.jpeg",
      overview:
        "Paul Atreides unites Chani and the Fremen people of Arrakis in a war for the galaxy's most valuable asset while seeking revenge for his father's death.",
    },
    {
      id: 5,
      title: "Oppenheimer",
      backdrop:
        "https://storage.ghost.io/c/cc/38/cc38d485-3f83-4ed4-95ed-586b53e0b5c5/content/images/2023/07/oppenheimer-header.jpg",
      overview:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

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