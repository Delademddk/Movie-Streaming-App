import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Calculate which items to display
  const getPaginationItems = () => {
    // If there are 5 or fewer pages, just show all of them
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If near the beginning
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    // If near the end
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // If in the middle
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const items = getPaginationItems();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 border-t p-4 border-gray-500">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center rounded-[10px] md:rounded-xl bg-[#1E293B] hover:bg-[#2B3444] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 border border-white/5"
      >
        <ChevronLeft className="w-4 md:w-5 h-4 md:h-5 text-zinc-400" />
      </button>

      {/* Page Numbers & Ellipses */}
      {items.map((item, index) => {
        if (item === "...") {
          return (
            <div
              key={`ellipsis-${index}`}
              className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center text-zinc-400 select-none"
            >
              ...
            </div>
          );
        }

        // Render Page Numbers
        return (
          <button
            key={`page-${item}`}
            onClick={() => onPageChange(item as number)}
            className={`w-8 md:w-10 h-8 md:h-10 flex items-center justify-center rounded-[10px] md:rounded-xl text-sm font-semibold transition-all active:scale-95 border ${
              item === currentPage
                ? "bg-[#0D59F2] text-white border-transparent shadow-lg shadow-blue-500/20"
                : "bg-[#1E293B] hover:bg-[#2B3444] text-zinc-300 border-white/5"
            }`}
          >
            {item}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center rounded-[10px] md:rounded-xl bg-[#1E293B] hover:bg-[#2B3444] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 border border-white/5"
      >
        <ChevronRight className="w-4 md:w-5 h-4 md:h-5 text-zinc-400" />
      </button>
    </div>
  );
}
