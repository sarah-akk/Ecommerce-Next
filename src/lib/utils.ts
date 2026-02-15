export function parseSortKey(key: string) {
  if (key === "default") return { sortBy: undefined, order: undefined };
  const [sortBy, order] = key.split("-");
  return { sortBy, order: order as "asc" | "desc" };
}

export function getStockStatus(stock: number) {
  if (stock === 0) return { label: "Out of Stock", color: "danger" as const };
  if (stock <= 10) return { label: "Low Stock", color: "warning" as const };
  return { label: "In Stock", color: "success" as const };
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "title-asc", label: "Title: A–Z" },
  { key: "title-desc", label: "Title: Z–A" },
  { key: "rating-desc", label: "Rating: Highest" },
];
