"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/api";
import type { ProductDetail } from "@/types/types";

export function useProduct(productId: number | null) {
  return useQuery<ProductDetail>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
    enabled: productId !== null,
    staleTime: 1000 * 60 * 5,
  });
}
