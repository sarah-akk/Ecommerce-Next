import { ReadonlyURLSearchParams } from "next/navigation";


export interface ProductFilters {
  search?: string;
  category?: string;
  sortKey?: string;
  page?: number;
}

export function filtersToParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();
  
  if (filters.search) params.set("q", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.sortKey && filters.sortKey !== "default") {
    params.set("sort", filters.sortKey);
  }
  if (filters.page && filters.page > 1) {
    params.set("page", String(filters.page));
  }
  
  return params;
}

export function paramsToFilters(
  params: URLSearchParams | ReadonlyURLSearchParams
): ProductFilters {
  return {
    search: params.get("q") || "",
    category: params.get("category") || "",
    sortKey: params.get("sort") || "default",
    page: Number(params.get("page")) || 1,
  };
}

export function updateURL(filters: ProductFilters) {
  const params = filtersToParams(filters);
  const url = params.toString() 
    ? `${window.location.pathname}?${params}` 
    : window.location.pathname;
  
  window.history.pushState({}, "", url);
}

export function getFiltersFromURL(): ProductFilters {
  if (typeof window === "undefined") return {};
  return paramsToFilters(new URLSearchParams(window.location.search));
}
