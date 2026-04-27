import { useState, useEffect } from "react";
import { ChevronDown, Funnel } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  onFiltersChange: (filters: {
    genre: string;
    year: string;
    rating: string;
    sort: string;
  }) => void;
}

export default function FilterBar({ onFiltersChange }: FilterBarProps) {
  const [genre, setGenre] = useState("All Genres");
  const [year, setYear] = useState("2024");
  const [rating, setRating] = useState("8.0+");
  const [sort, setSort] = useState("Popularity");

  const genres = [
    "All Genres",
    "Action",
    "Sci-Fi",
    "Drama",
    "Adventure",
    "Crime",
    "Thriller",
  ];
  const years = ["All Years", "2024", "2023", "2022", "2021", "2020", "2019"];
  const ratings = ["All Ratings", "8.0+", "7.5+", "7.0+", "6.5+", "6.0+"];
  const sorts = ["Popularity", "Rating", "Newest First", "Oldest First"];

  useEffect(() => {
    onFiltersChange({ genre, year, rating, sort });
  }, [genre, year, rating, sort, onFiltersChange]);

  return (
    <div className="p-3 sm:p-4 border rounded-[12px] border-zinc-800 bg-[#171D29] overflow-hidden">
      <div className="relative max-w-screen-2xl mx-auto">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-6 z-10 bg-linear-to-r from-[#171D29] to-transparent sm:hidden" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-6 z-10 bg-linear-to-l from-[#171D29] to-transparent sm:hidden" />

        <div
          className={`
        flex items-center gap-2 sm:gap-3
        overflow-x-auto sm:overflow-x-visible
        scroll-smooth snap-x snap-mandatory
        whitespace-nowrap
        px-1 sm:px-0
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        sm:justify-between
      `}
        >
          {/* Left filters group */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Genre */}
            <div className="shrink-0 snap-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 text-sm"
                  >
                    <Funnel className="h-4 w-4" />
                    <span className="hidden xs:inline sm:inline">{genre}</span>
                    <span className="xs:hidden sm:hidden inline">
                      {genre === "All Genres" ? "Genre" : genre}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="min-w-40 bg-zinc-900/90 text-[#b7b6b6] border-zinc-700"
                >
                  {genres.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setGenre(option)}
                      className="cursor-pointer hover:text-white"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Year */}
            <div className="shrink-0 snap-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-[8px] bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white px-3 sm:px-4 py-2 text-sm"
                  >
                    <span className="hidden sm:inline">
                      {year === "All Years" ? "All Years" : `Year ${year}`}
                    </span>
                    <span className="sm:hidden inline">
                      {year === "All Years" ? "Year" : year}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="min-w-40 bg-zinc-900/90 text-[#b7b6b6] border-zinc-700"
                >
                  {years.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setYear(option)}
                      className="cursor-pointer"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Rating */}
            <div className="shrink-0 snap-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-[8px] bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white px-3 sm:px-4 py-2 text-sm"
                  >
                    <span className="hidden sm:inline">
                      {rating === "All Ratings"
                        ? "All Ratings"
                        : `Rating ${rating}`}
                    </span>
                    <span className="sm:hidden inline">
                      {rating === "All Ratings" ? "Rating" : rating}
                    </span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="min-w-40 bg-zinc-900/90 text-[#b7b6b6] border-zinc-700"
                >
                  {ratings.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setRating(option)}
                      className="cursor-pointer"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="shrink-0 snap-start sm:ml-auto flex items-center">
            <p className="text-[#94A3B8] text-sm hidden sm:block">Sort by:</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-none flex items-center gap-2 hover:text-white cursor-pointer text-[#b7b6b6] px-3 sm:px-4 py-2 text-sm">
                  <span className="hidden sm:inline">{sort}</span>
                  <span className="sm:hidden inline">Sort</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-40 bg-zinc-900/90 text-[#b7b6b6] border-zinc-700"
              >
                {sorts.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSort(option)}
                    className="cursor-pointer hover:text-white"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
