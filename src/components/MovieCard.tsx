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
    16: "Animation",
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
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative w-full max-w-55 p-[clamp(0.4rem,1vw,1rem)] rounded-[clamp(0.5rem,2vw,1rem)] overflow-hidden bg-[#0F2026] border border-white/10 hover:border-white/20 transition">
        <img
          src={getImageUrl(movie.poster_path ?? null)}
          alt={movie.title ?? "Movie poster"}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="flex items-center gap-[clamp(0.1rem,0.4vw,0.25rem)] backdrop-blur-md rounded-[5px] absolute top-2 right-2 px-[clamp(0.25rem,1vw,0.75rem)] py-[clamp(0.15rem,0.6vw,0.5rem)]">
          <Star className="text-[#FACC15] w-[clamp(0.4rem,1vw,0.75rem)] h-[clamp(0.4rem,1vw,0.75rem)]" />
          <p className="text-white font-bold text-[clamp(0.6rem,1vw,0.625rem)]">
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(0.375rem,1vw,0.75rem)] px-1">
        <h3 className="text-white font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors text-[clamp(0.65rem,1.5vw,0.875rem)]">
          {movie.title ?? "Untitled"}
        </h3>
        <p className="text-[#94A3B8] mt-[clamp(0.125rem,0.5vw,0.25rem)] text-[clamp(0.6rem,1.2vw,0.8125rem)]">
          {year} • {genreName}
        </p>
      </div>
    </div>
  );
}
