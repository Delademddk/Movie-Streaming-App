import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getImageUrl } from "@/api/tmdb";

type MovieCardMovie = {
  id: number;
  title?: string;
  poster_path?: string | null;
  vote_average: number;
  release_date?: string;
  genre_ids?: number[];
  genre?: string;
};

interface MovieCardProps {
  movie: MovieCardMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const year = movie.release_date?.split("-")[0] || "N/A";

  const genreMap: Record<number, string> = {
    28: "Action",
    35: "Comedy",
    18: "Drama",
    27: "Horror",
    10749: "Romance",
    878: "Sci-Fi",
    12: "Adventure",
    80: "Crime",
    53: "Thriller",
  };

  const genreName =
    movie.genre ||
    (movie.genre_ids?.length
      ? genreMap[movie.genre_ids[0]] || "Unknown"
      : "Unknown");

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full max-w-55 p-4 rounded-xl overflow-hidden bg-[#0F2026] border border-white/10 hover:border-white/20 transition">
        <img
          src={getImageUrl(movie.poster_path ?? null)}
          alt={movie.title ?? "Movie poster"}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="flex items-center gap-1 backdrop-blur-md rounded-[5px] absolute top-2 h-6 right-2 px-5 py-4">
          <Star className="w-3 h-3 text-[#FACC15]" />
          <p className="text-white text-[10px] font-bold">
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
          {movie.title ?? "Untitled"}
        </h3>
        <p className="text-[#94A3B8] text-[13px] mt-1">
          {year} • {genreName}
        </p>
      </div>
    </div>
  );
}
