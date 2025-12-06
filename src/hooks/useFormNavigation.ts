import { useState } from "react";

export function useFormNavigation(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return {
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    isFirstPage,
    isLastPage,
  };
}
