import type {ProductDetail, ProductsResponse, Category } from "@/types/types";

const BASE_URL = "https://dummyjson.com";


export async function fetchProducts(
  limit = 12,
  skip = 0,
  sortBy?: string,
  order?: "asc" | "desc"
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);
  const res = await fetch(`${BASE_URL}/products?${params}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function searchProducts(query: string, limit = 12, skip = 0): Promise<ProductsResponse> {
  const params = new URLSearchParams({ q: query, limit: String(limit), skip: String(skip) });
  const res = await fetch(`${BASE_URL}/products/search?${params}`);
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchProductsByCategory(
  categorySlug: string,
  limit = 12,
  skip = 0
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  const res = await fetch(`${BASE_URL}/products/category/${categorySlug}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

export async function fetchProductById(id: number): Promise<ProductDetail> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
}
