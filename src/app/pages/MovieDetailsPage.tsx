import { useParams } from "react-router-dom";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { detailedMovies, mockMovies, popularMovies } from "@/data/mockMovies";

type MovieDetails = (typeof detailedMovies)[number];

const fallbackDetails: MovieDetails = {
  runtime: "Unknown",
  overview:
    "Movie details are not available for this title yet. More information will appear here when the full data source is connected.",
  budget: "Unknown",
  revenue: "Unknown",
  language: "Unknown",
  status: "Unknown",
  cast: [],
};

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movie = isValidMovieId
    ? mockMovies.find((m) => m.id === movieId) ??
      popularMovies.find((m) => m.id === movieId)
    : undefined;

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pb-12">
        {/* Background */}
        <div className="relative h-96 bg-gradient-to-b from-black/90 to-zinc-950">
          <img
            src="https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 -mt-32 relative z-10">
          <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-10">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              Movie Not Found
            </h1>
            <p className="text-zinc-300 leading-relaxed text-[15.5px]">
              The requested movie could not be found in the current mock data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const details = detailedMovies[movieId] ?? fallbackDetails;
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg";
  const genreLabel = movie.genre || "Unknown";

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-12">
      {/* Background */}
      <div className="relative h-96 bg-gradient-to-b from-black/90 to-zinc-950">
        <img
          src="https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT SIDE */}
          <div className="lg:w-2/3">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0 w-64 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src={posterSrc}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 text-sm text-zinc-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    {movie.vote_average}
                  </span>
                  <span>&bull;</span>
                  <span>{releaseYear}</span>
                  <span>&bull;</span>
                  <span>{details.runtime}</span>
                  <span className="px-3 py-1 bg-zinc-800 text-xs rounded-3xl">
                    PG-13
                  </span>
                </div>

                <h1 className="text-5xl font-bold tracking-tighter mb-4">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-zinc-900 px-5 py-2 rounded-3xl text-sm">
                    {genreLabel}
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    &#9654; Watch Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 hover:bg-white/10"
                  >
                    + Add to List
                  </Button>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
              <p className="text-zinc-300 leading-relaxed text-[15.5px]">
                {details.overview}
              </p>
            </div>

            {/* Official Trailer */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Official Trailer</h2>
                <a href="#" className="text-blue-400 text-sm hover:underline">
                  View All Media &rarr;
                </a>
              </div>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video">
                <img
                  src="https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                  alt="Trailer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all active:scale-95">
                    <Play className="w-9 h-9 text-white ml-1" fill="white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cast & Crew */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6">Cast & Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {details.cast.map((person, index: number) => (
                  <div key={index} className="text-center">
                    <div className="mx-auto w-28 h-28 rounded-2xl overflow-hidden border border-white/10 mb-3">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm">{person.name}</p>
                    <p className="text-xs text-zinc-400">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:w-1/3">
            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sticky top-8">
              <h3 className="font-semibold text-lg mb-6">Movie Info</h3>

              <div className="space-y-6 text-sm">
                <div>
                  <p className="text-xs text-zinc-400">Status</p>
                  <p className="font-medium">{details.status}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Language</p>
                  <p className="font-medium">{details.language}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Budget</p>
                  <p className="font-medium">{details.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Revenue</p>
                  <p className="font-medium">{details.revenue}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-400 mb-3">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-zinc-800 px-4 py-2 rounded-3xl">
                      {genreLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-blue-600/10 border border-blue-500/30 rounded-3xl p-6 text-center">
                <p className="font-medium mb-4">Want to see more?</p>
                <p className="text-sm text-zinc-400 mb-6">
                  Join our community behind the scenes and get early access.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign Up Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
