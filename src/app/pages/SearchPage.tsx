import { useSearchParams } from "react-router-dom";
import FilterSidebar from "@/components/FilterSidebar";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { useSearchContent } from "@/hooks/useSearchContent";

type SearchType = "movie" | "tv";

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const type = (searchParams.get("type") as SearchType) || "movie";
  const page = Number(searchParams.get("page") ?? "1");
  const genresParam = searchParams.get("genres");
  const yearParam = searchParams.get("year");
  const ratingParam = searchParams.get("rating");
  const { data, isLoading, isFetching } = useSearchContent({
    query,
    type,
    page,
  });

  const results = (data?.results ?? []) as SearchResult[];
  const totalPages = data?.total_pages ?? 1;

  const GENRE_MAP: Record<string, number> = {
    Action: 28,
    Adventure: 12,
    Drama: 18,
    "Sci-Fi": 878,
  };

  const selectedGenreIds =
    genresParam
      ?.split(",")
      .map((genre) => GENRE_MAP[genre])
      .filter(Boolean) || [];

  const filteredResults = results.filter((item) => {
    if (ratingParam && !isNaN(Number(ratingParam))) {
      if (item.vote_average < Number(ratingParam)) return false;
    }

    if (yearParam && yearParam !== "All Years") {
      const [start, end] = yearParam.split("-").map(Number);

      const date = item.release_date || item.first_air_date;

      if (date) {
        const year = Number(date.split("-")[0]);
        if (year < start || year > end) return false;
      }
    }

    if (selectedGenreIds.length > 0) {
      const genreIds = item.genre_ids;
      if (!genreIds) return false;

      const matchesGenre = selectedGenreIds.some((id) =>
        genreIds.includes(id)
      );

      if (!matchesGenre) return false;
    }

    return true;
  });

  const handleTypeChange = (newType: SearchType) => {
    setSearchParams({
      query,
      type: newType,
      page: "1",
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      query,
      type,
      page: String(newPage),
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 md:py-8 min-h-screen text-white flex flex-col lg:flex-row gap-8">
      
      <div className="lg:fixed self-start w-full lg:w-auto shrink-0">
        <FilterSidebar />
      </div>

      <div className="md:pt-6 md:pl-75 w-full">
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#94A3B8] mb-2">
            <span>Home</span>
            <span>›</span>
            <span className="text-white">Search</span>
          </div>

          <div className="mb-4 md:mb-8">
            <h1 className="text-[22px] md:text-4xl font-bold">
              Results for{" "}
              <span className="text-[#0D59F2]">
                "{query}"
              </span>
            </h1>

            <p className="text-[#94A3B8] text-[12px] md:text-[16px] mt-2">
              {isLoading
                ? "Searching..."
                : `Found ${filteredResults.length} results`}
            </p>
          </div>
        </div>

        <div className="flex border-b border-[#1E293B] mb-6">
          {[
            { label: "Movies", value: "movie" },
            { label: "Series", value: "tv" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTypeChange(tab.value as SearchType)}
              className={`px-6 py-4 text-xs md:text-sm font-medium border-b-2 transition-colors ${
                type === tab.value
                  ? "border-blue-500 text-[#0D59F2]"
                  : "border-transparent text-[#94A3B8] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
          {filteredResults.map((item) => (
            <MovieCard
              key={item.id}
              movie={{
                ...item,
                title: item.title || item.name,
              }}
            />
          ))}
        </div>

        {!isLoading && filteredResults.length === 0 && (
          <p className="text-center text-[#94A3B8] mt-10">
            No results found.
          </p>
        )}

        {filteredResults.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {isFetching && !isLoading && (
          <p className="text-center text-sm text-[#94A3B8] mt-4">
            Updating results...
          </p>
        )}
      </div>
    </div>
  );
}
