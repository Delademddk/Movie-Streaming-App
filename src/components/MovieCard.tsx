import { Star } from "lucide-react";
// import Image from 'next/image';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre: string; // ← added for subtitle (matches screenshot)
};

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date.split("-")[0];

  return (
    <div className="group cursor-pointer">
      {/* Poster Container */}

      <div className="relative   w-full max-w-55 p-4  rounded-xl overflow-hidden bg-[#0F2026] border border-white/10 hover:border-white/20 transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Rating Badge - top right (exactly like screenshot) */}
        <div className="flex items-center  gap-1 backdrop-blur-md rounded-[5px] absolute top-2  h-6 right-2 px-5 py-4 ">
          <Star className="w-3 h-3 text-[#FACC15] " />
          <p className="text-white text-[10px] font-bold">
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
      {/* Info below poster */}
      <div className="mt-3 px-1">
        <h3 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-[#94A3B8] text-[13px] mt-1">
          {year} • {movie.genre}
        </p>
      </div>
    </div>
  );
}
