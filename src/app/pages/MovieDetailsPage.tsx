import { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Plus, Star } from "lucide-react";
import Button from "@/components/Button";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { getImageUrl } from "@/api/tmdb";
import { useMovieCredits } from "@/hooks/useMovieCredits";
import { useMovieVideos } from "@/hooks/useMovieVideos";
import Loader from "@/components/Loader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type MovieDetails = {
  runtime: string;
  overview: string;
  budget: string;
  revenue: string;
  language: string;
  status: string;
  cast: any[];
};

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
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const { data, isLoading } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);

  if (!isValidMovieId || (!isLoading && !data)) {
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
              The requested movie could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const movie = {
    id: data.id,
    title: data.title ?? "Untitled",
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    vote_average: data.vote_average ?? 0,
    release_date: data.release_date,
    genre: data.genres?.[0]?.name ?? "Unknown",
  };

  const details: MovieDetails = {
    runtime: data.runtime ? `${data.runtime} min` : "Unknown",
    overview: data.overview ?? fallbackDetails.overview,
    budget: data.budget ? `$${data.budget.toLocaleString()}` : "Unknown",
    revenue: data.revenue ? `$${data.revenue.toLocaleString()}` : "Unknown",
    language: data.original_language?.toUpperCase() ?? "Unknown",
    status: data.status ?? "Unknown",
    cast: [],
  };

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";

  const posterSrc = movie.poster_path
    ? getImageUrl(movie.poster_path)
    : "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg";

  const backdropSrc = movie.backdrop_path
    ? getImageUrl(movie.backdrop_path)
    : "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg";

  const genreLabel = movie.genre || "Unknown";

  const trailer = videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

  return (
    <div>
      <div>
        <div className="relative h-[75vh] md:h-[85vh]  flex items-end overflow-hidden">
          {/* Background Image */}
          <img
            src={backdropSrc}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />

          {/* Dark linear overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/70 to-zinc-950" />

          <div className="max-w-screen-2xl mx-auto px-5 md:px-6 pb-8 md:pb-12 relative z-10 w-full">
            <div className="flex flex-col md:flex-row items-end gap-10">
              {/* Poster */}
              <div className="relative w-full max-w-55 p-4 rounded-xl hidden md:block overflow-hidden bg-white border border-white/10 hover:border-white/20 transition">
                <img
                  src={posterSrc}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 pt-8 md:pt-12">
                {/* Genres */}
                <div className="flex items-center gap-2 text-[clamp(0.5rem,1.8vw,0.8rem)] font-bold text-[#0D59F2] mb-2">
                  <span>SCI-FI</span>
                  <span className="text-white/40">•</span>
                  <span>ADVENTURE</span>
                  <span className="text-white/40">•</span>
                  <span>{genreLabel.toUpperCase()}</span>
                </div>

                {/* Title */}
                <h1 className="text-[clamp(1.6rem,5vw,3.75rem)] items-start font-black text-white tracking-tighter leading-none mb-2">
                  {movie.title.toUpperCase()}
                </h1>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-[clamp(0.7rem,1.8vw,1rem)] text-[#999b9c] font-medium mb-5 md:mb-8">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 md:w-5 h-3 md:h-5 text-[#EAB308] " />
                    <span className="font-bold text-white">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span>(1.2M)</span>
                  </div>
                  <span>{releaseYear}</span>
                  <span>{details.runtime}</span>
                  <span className="px-3 py-1 text-[7px] md:text-xs border border-white/30 rounded-[6px]">
                    PG-13
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => {}}
                    text={
                      <>
                        <Play className="mr-2 inline w-3 md:w-4 h-3 md:h-4" />
                        Watch Now
                      </>
                    }
                    className="bg-[#0D59F2] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(13,89,242,0.6)] text-[clamp(0.65rem,1.5vw,1rem)]"
                  />
                  <Button
                    onClick={() => {}}
                    text={
                      <>
                        <Plus className="mr-2 inline w-3 md:w-4 h-3 md:h-4" />
                        Add to List
                      </>
                    }
                    className="bg-white/10 hover:bg-white/20 hover:ring-1 hover:ring-white/30 text-[clamp(0.65rem,1.5vw,1rem)]"
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
                <h2 className="text-[clamp(1rem,1.5vw,1.65rem)] font-bold mb-4 flex items-center gap-2 border-l-4 pl-4 border-[#0D59F2]">
                  Synopsis
                </h2>
                <p className="text-[#94A3B8] leading-relaxed text-[clamp(0.7rem,1.5vw,1rem)]">
                  {details.overview}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[clamp(1rem,1.5vw,1.65rem)] font-bold mb-4 flex items-center gap-2 border-l-4 pl-4 border-[#0D59F2]">
                    Official Trailer
                  </h2>
                  <a
                    href="#"
                    className="text-[#0D59F2] hover:underline text-[clamp(0.7rem,1.5vw,1rem)] flex items-center gap-1"
                  >
                    View All Media <span className="text-lg">›</span>
                  </a>
                </div>

                <div className="relative rounded-[8px] overflow-hidden border border-white/10 aspect-video">
                  <img
                    src={backdropSrc}
                    alt="Official Trailer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsTrailerOpen(true)}
                      className="w-15 md:w-20 h-15 md:h-20 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-2xl"
                    >
                      <Play className="w-7 h-7 text-white ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[clamp(1rem,1.5vw,1.65rem)] font-bold mb-4 flex items-center gap-2 border-l-4 pl-4 border-[#0D59F2]">
                  Cast & Crew
                </h2>

                <ScrollArea className="pb-1.5 md:pb-4">
                  <div className="flex gap-6">
                    {credits?.cast?.map((person) => (
                      <div key={person.id}>
                        <div className="mx-auto w-25 md:w-30 h-30 md:h-35 rounded-[6px] overflow-hidden border border-white/10 mb-3">
                          <img
                            src={
                              person.profile_path
                                ? getImageUrl(person.profile_path)
                                : "https://via.placeholder.com/300x300?text=No+Image"
                            }
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-bold text-sm">{person.name}</p>
                        <p className="text-xs text-[#64748B]">
                          {person.character ?? "Unknown Role"}
                        </p>
                      </div>
                    ))}{" "}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col">
              <div className="bg-none border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-6">Movie Info</h3>

                <div className="space-y-6 text-sm md:text-lg">
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
                          <span className="text-[10px] md:text-xs text-[#64748B] w-8">
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
      {isTrailerOpen && trailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setIsTrailerOpen(false)}
        >
          <div
            className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-3 right-3 text-white text-xl z-10"
            >
              ✕
            </button>

            {/* YOUTUBE PLAYER */}
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}{" "}
    </div>
  );
}
