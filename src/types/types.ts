import type { ReactNode } from "react";

// API / Domain
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  tags: string[];
  minimumOrderQuantity: number;
  returnPolicy: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

// Cart
export interface CartItem {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

export interface CartContextValue {
  items: CartItem[];
  count: number;
  addToCart: (item: CartItem) => void;
}

// Component props
export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  resultCount?: number;
}

export interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export interface ProductDetailModalProps {
  productId: number | null;
  onClose: () => void;
}

export interface SortSelectProps {
  selected: string;
  onSelect: (value: string) => void;
}

export interface StarRatingProps {
  rating: number;
}

export interface UseProductsParams {
  search: string;
  category: string;
  sortBy?: string;
  order?: "asc" | "desc";
  skip?: number;
  limit?: number;
}
