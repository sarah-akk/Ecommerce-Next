"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  searchProducts,
  fetchProductsByCategory,
} from "@/lib/api";
import type { ProductsResponse, UseProductsParams } from "@/types/types";

const DEFAULT_LIMIT = 12;

export function useProducts({
  search,
  category,
  sortBy,
  order,
  skip = 0,
  limit = DEFAULT_LIMIT,
}: UseProductsParams) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", { search, category, sortBy, order, skip, limit }],
    queryFn: () => {
      if (search) return searchProducts(search, limit, skip);
      if (category) return fetchProductsByCategory(category, limit, skip);
      return fetchProducts(limit, skip, sortBy, order);
    },
    staleTime: 1000 * 60 * 5,
  });
}
