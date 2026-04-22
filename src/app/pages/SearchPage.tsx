import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FilterSidebar from "@/components/FilterSidebar";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

import { useSearchContent } from "@/hooks/useSearchContent";
import { useDebounce } from "@/hooks/useDebounce";

type SearchType = "movie" | "tv";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const type = (searchParams.get("type") as SearchType) || "movie";
  const page = Number(searchParams.get("page") ?? "1");

  const genresParam = searchParams.get("genres");
  const yearParam = searchParams.get("year");
  const ratingParam = searchParams.get("rating");

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const debouncedQuery = useDebounce(inputValue, 400);

  useEffect(() => {
    if (debouncedQuery !== query) {
      setSearchParams({
        q: debouncedQuery,
        type,
        page: "1",
      });
    }
  }, [debouncedQuery, query, type, setSearchParams]);

  const { data, isLoading, isFetching } = useSearchContent({
    query,
    type,
    page,
  });

  const results = data?.results ?? [];
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
      .map((g) => GENRE_MAP[g])
      .filter(Boolean) || [];

  const filteredResults = results.filter((item: any) => {
    // ⭐ Rating
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
      if (!item.genre_ids) return false;

      const matchesGenre = selectedGenreIds.some((id) =>
        item.genre_ids.includes(id)
      );

      if (!matchesGenre) return false;
    }

    return true;
  });

  const handleTypeChange = (newType: SearchType) => {
    setSearchParams({
      q: query,
      type: newType,
      page: "1",
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      q: query,
      type,
      page: String(newPage),
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 min-h-screen text-white flex flex-col lg:flex-row gap-8">
      
      <div className="lg:fixed self-start w-full lg:w-auto shrink-0">
        <FilterSidebar />
      </div>

      <div className="pt-6 pl-75 w-full">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-2">
            <span>Home</span>
            <span>›</span>
            <span className="text-white">Search</span>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              Results for{" "}
              <span className="text-[#0D59F2]">
                "{query || "your search"}"
              </span>
            </h1>

            <p className="text-[#94A3B8] text-[16px] mt-2">
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
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
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
          {filteredResults.map((item: any) => (
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