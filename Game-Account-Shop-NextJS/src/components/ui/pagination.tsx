import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 5 pages at a time
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", ...pages.slice(totalPages - 5)];
    }

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

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
      {/* Info */}
      <div className="text-sm text-gray-400">
        {totalItems && itemsPerPage && (
          <span>
            Hiển thị{" "}
            <span className="font-medium text-white">
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
            </span>{" "}
            đến{" "}
            <span className="font-medium text-white">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-medium text-white">{totalItems}</span> kết quả
          </span>
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`min-w-[2.5rem] px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                currentPage === page
                  ? "bg-[#3f9ced] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
