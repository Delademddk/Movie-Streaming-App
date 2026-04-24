import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  // =============================
  // 🔹 READ FROM URL
  // =============================
  const query = searchParams.get("query") ?? "";
  const type = searchParams.get("type") ?? "movie";

  const urlGenres = searchParams.get("genres")?.split(",") || [];
  const urlYear = searchParams.get("year") ?? "All Years";
  const urlRating = Number(searchParams.get("rating") ?? 0);

  // =============================
  // 🔹 LOCAL STATE (UI CONTROL)
  // =============================
  const [selectedGenres, setSelectedGenres] = useState<string[]>(urlGenres);
  const [yearRange, setYearRange] = useState(urlYear);
  const [minRating, setMinRating] = useState([urlRating]);

  // keep UI in sync if URL changes (important!)
  useEffect(() => {
    setSelectedGenres(urlGenres);
    setYearRange(urlYear);
    setMinRating([urlRating]);
  }, [searchParams]);

  const genresList = ["Sci-Fi", "Action", "Drama", "Adventure"];

  // =============================
  // 🔹 HANDLERS
  // =============================

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleApply = () => {
    setSearchParams({
      query,
      type,
      page: "1",
      genres: selectedGenres.join(","),
      year: yearRange,
      rating: String(minRating[0]),
    });
  };

  const handleClear = () => {
    setSelectedGenres([]);
    setYearRange("All Years");
    setMinRating([0]);

    setSearchParams({
      query,
      type,
      page: "1",
    });
  };

  // =============================
  // 🔹 UI
  // =============================

  return (
    <div className="w-64 pt-6 pl-20 flex flex-col h-fit">
      <div className="flex items-center gap-1.5 mb-4">
        <SlidersHorizontal className="text-[#0D59F2] w-4.5 h-4.5" />
        <h2 className="text-white font-semibold text-lg">Filters</h2>
      </div>

      {/* GENRE */}
      <div className="mb-6">
        <h3 className="text-[#94A3B8] text-sm font-medium mb-3">GENRE</h3>
        <div className="space-y-3">
          {genresList.map((genre) => (
            <div key={genre} className="flex items-center gap-3">
              <Checkbox
                id={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => handleGenreChange(genre)}
                className="rounded-[5px] h-4.5 w-4.5 bg-[#334155] cursor-pointer hover:brightness-130 data-[state=checked]:bg-[#334155] border data-[state=checked]:border-[#475569] border-[#475569]"
              />
              <label
                htmlFor={genre}
                className="text-white text-sm cursor-pointer"
              >
                {genre}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* YEAR */}
      <div className="mb-6">
        <h3 className="text-[#94A3B8] text-sm font-medium mb-3">
          RELEASE YEAR
        </h3>
        <Select value={yearRange} onValueChange={setYearRange}>
          <SelectTrigger className="bg-[#1E293B] border-none rounded-[5px] w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1E293B] border-none text-sm text-white rounded-[5px]">
            <SelectItem value="All Years">All Years</SelectItem>
            <SelectItem value="2010-2019">2010 - 2019</SelectItem>
            <SelectItem value="2020-2024">2020 - 2024</SelectItem>
            <SelectItem value="2000-2009">2000 - 2009</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* RATING */}
      <div className="mb-6">
        <h3 className="text-[#94A3B8] text-sm font-medium mb-3">
          MINIMUM RATING
        </h3>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-[#EAB308]" />

          <Slider
            value={minRating}
            onValueChange={setMinRating}
            max={10}
            step={0.1}
            className="h-2 w-27"
          />

          <span className="text-white text-sm font-bold">
            {minRating[0].toFixed(1)}
          </span>
        </div>
      </div>

      {/* APPLY */}
      <Button
        onClick={handleApply}
        className="w-full bg-blue-600 rounded-[5px] text-[16px] font-bold p-3 cursor-pointer hover:bg-blue-700 mb-6"
      >
        Apply Changes
      </Button>

      {/* CLEAR */}
      <button
        onClick={handleClear}
        className="text-[#94A3B8] hover:text-blue-400 text-sm font-medium cursor-pointer p-3 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
