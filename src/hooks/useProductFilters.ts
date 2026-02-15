import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { paramsToFilters, updateURL, type ProductFilters } from "@/lib/url-params";


export function useProductFilters() {
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<ProductFilters>(() => {
    return paramsToFilters(searchParams);
  });

  useEffect(() => {
    const handlePopState = () => {
      setFilters(paramsToFilters(new URLSearchParams(window.location.search)));
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);


  const updateFilters = useCallback((updates: Partial<ProductFilters>) => {
    setFilters((prev) => {
      const newFilters = { ...prev, ...updates };
      updateURL(newFilters);
      return newFilters;
    });
  }, []);

  const setSearch = useCallback(
    (search: string) => {
      updateFilters({ search, page: 1 });
    },
    [updateFilters]
  );

  const setCategory = useCallback(
    (category: string) => {
      updateFilters({ category, search: "", page: 1 });
    },
    [updateFilters]
  );

  const setSortKey = useCallback(
    (sortKey: string) => {
      updateFilters({ sortKey, page: 1 });
    },
    [updateFilters]
  );

  const setPage = useCallback(
    (page: number) => {
      updateFilters({ page });
    },
    [updateFilters]
  );

  const resetFilters = useCallback(() => {
    updateFilters({ search: "", category: "", sortKey: "default", page: 1 });
  }, [updateFilters]);

  return {
    search: filters.search || "",
    category: filters.category || "",
    sortKey: filters.sortKey || "default",
    page: filters.page || 1,
    setSearch,
    setCategory,
    setSortKey,
    setPage,
    resetFilters,
    filters,
  };
}
