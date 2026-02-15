"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import type { Category } from "@/types/types";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
}
