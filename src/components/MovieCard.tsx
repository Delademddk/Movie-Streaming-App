import { Star } from "lucide-react";
// import { Link } from "react-router-dom";
import DogImage from "../assets/goldenRetriever.png";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    vote_average: 8.6,
    release_date: "2014-11-07",
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    vote_average: 8.8,
    release_date: "2010-07-16",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    vote_average: 9.04,
    release_date: "2008-07-18",
  },
  {
    id: 4,
    title: "Dune",
    poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    vote_average: 8.1,
    release_date: "2021-10-22",
  },
  {
    id: 4,
    title: "Dune",
    poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    vote_average: 8.1,
    release_date: "2021-10-22",
  },
  {
    id: 4,
    title: "Dune",
    poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    vote_average: 8.1,
    release_date: "2021-10-22",
  },
  {
    id: 4,
    title: "Dune",
    poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    vote_average: 8.1,
    release_date: "2021-10-22",
  },
];

export default function MovieCard() {
  return (
    <div className="p-6">
      {/* Grid */}
      <div className="flex gap-6">
        {mockMovies.map((movie) => {
          return (
            <div className="space-y-3">
              <div className="relative h-71.25 w-47.5 p-5 rounded-xl overflow-hidden bg-[#2B5049] border border-white/10 hover:border-white/20 transition">
                <img
                  src={DogImage}
                  alt={movie.title}
                  className="w-full h-full object-fit group-hover:scale-105 transition duration-300"
                />
                <div className="flex items-center  gap-1 backdrop-blur-md rounded-[5px] absolute top-2 h-6 right-2 px-5 py-4 ">
                  <Star className="w-3 h-3 text-[#FACC15] " />
                  <p className="text-white font-bold">{movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
              <div className="">
                <h3 className="text-white text-sm font-bold">
                  {movie.title}
                </h3>
                <p className="text-[#94A3B8] text-[13px] ">
                  {movie.release_date.split('-')[0]} • {movie.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
