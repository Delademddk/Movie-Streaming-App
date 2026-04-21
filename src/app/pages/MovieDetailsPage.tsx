import { useParams } from "react-router-dom";
import { Play, Plus, Star } from "lucide-react";
import Button from "@/components/Button";
import {
  castAndCrew,
  detailedMovies,
  mockMovies,
  popularMovies,
} from "@/data/mockMovies";

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
    ? (mockMovies.find((m) => m.id === movieId) ??
      popularMovies.find((m) => m.id === movieId))
    : undefined;

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pb-12">
        <div className="relative h-96 bg-linear-to-b from-black/90 to-zinc-950">
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
    <div>
      <div>
        <div className="relative h-170 flex items-end overflow-hidden">
          {/* Background Image */}
          <img
            src="https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />

          {/* Dark linear overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/70 to-zinc-950" />

          <div className="max-w-screen-2xl mx-auto px-6 pb-12 relative z-10 w-full">
            <div className="flex flex-col md:flex-row items-end gap-10">
              {/* Poster */}
              <div className="relative w-full max-w-55 p-4 rounded-xl overflow-hidden bg-white border border-white/10 hover:border-white/20 transition">
                <img
                  src={posterSrc}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 pt-8 md:pt-12">
                {/* Genres */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#0D59F2] mb-2">
                  <span>SCI-FI</span>
                  <span className="text-white/40">•</span>
                  <span>ADVENTURE</span>
                  <span className="text-white/40">•</span>
                  <span>{genreLabel.toUpperCase()}</span>
                </div>

                {/* Title */}
                <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none mb-2">
                  {movie.title.toUpperCase()}
                </h1>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-[16px] text-[#999b9c] font-medium mb-8">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-[#EAB308] " />
                    <span className="font-bold text-white">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span>(1.2M)</span>
                  </div>
                  <span>{releaseYear}</span>
                  <span>{details.runtime}</span>
                  <span className="px-3 py-1 text-xs border border-white/30 rounded-[6px]">
                    PG-13
                  </span>
                </div>

                {/* Buttons */}
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
                        <Plus className="mr-2 inline w-4 h-4" />
                        Details
                      </>
                    }
                    className="bg-white/10 hover:bg-white/20 hover:ring-1 hover:ring-white/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-white">
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-l-4 pl-4 border-[#0D59F2]">
                  Synopsis
                </h2>
                <p className="text-[#94A3B8] leading-relaxed text-[15.5px]">
                  {details.overview}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-l-4 pl-4 border-[#0D59F2]">
                    Official Trailer
                  </h2>
                  <a
                    href="#"
                    className="text-[#0D59F2] hover:underline text-sm flex items-center gap-1"
                  >
                    View All Media <span className="text-lg">›</span>
                  </a>
                </div>

                <div className="relative rounded-[8px] overflow-hidden border border-white/10 aspect-video">
                  <img
                    src="https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                    alt="Official Trailer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xl">
                      <Play className="w-7 h-7 text-white ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-l-4 pl-4 border-[#0D59F2]">
                    Cast & Crew
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {castAndCrew.map((person) => (
                      <div key={person.id}>
                        <div className="mx-auto w-55 h-55 rounded-[6px] overflow-hidden border border-white/10 mb-3">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-bold text-sm">{person.name}</p>
                        <p className="text-xs text-[#64748B]">{person.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col">
              <div className="bg-none border border-white/10 rounded-3xl p-6  ">
                <h3 className="text-xl font-semibold mb-6">Movie Info</h3>

                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Status</span>
                    <span className="text-green-400 font-medium">
                      {details.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Language</span>
                    <span className="font-medium">{details.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Budget</span>
                    <span className="font-medium">{details.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Revenue</span>
                    <span className="font-medium">{details.revenue}</span>
                  </div>

                  <div>
                    <p className="text-zinc-400 text-sm mb-3">GENRES</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-600/20 text-blue-400 text-xs px-4 py-1.5 rounded-3xl">
                        {genreLabel}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-zinc-400 text-sm mb-3">
                      RATING DISTRIBUTION
                    </p>
                    <div className="space-y-4">
                      {[5, 4, 3, 2].map((star) => (
                        <div
                          key={star}
                          className="flex items-center gap-4 text-sm"
                        >
                          <span className="w-3">{star}</span>
                          <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{
                                width:
                                  star === 5
                                    ? "80%"
                                    : star === 4
                                      ? "12%"
                                      : star === 3
                                        ? "5%"
                                        : "2%",
                              }}
                            />
                          </div>
                          <span className="text-xs text-[#64748B] w-8">
                            {star === 5
                              ? "80%"
                              : star === 4
                                ? "12%"
                                : star === 3
                                  ? "5%"
                                  : "2%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 bg-blue-600 rounded-3xl p-6 text-center">
                <p className="font-medium mb-3">Want to see more?</p>
                <p className="text-sm text-blue-100 mb-6">
                  Join our club for exclusive behind-the-scenes content and
                  early screenings.
                </p>
                <button className="w-full bg-white text-zinc-900 font-semibold py-4 rounded-2xl hover:bg-white/90 transition-colors">
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
