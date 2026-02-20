import type { ReactNode } from "react";


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
  onNavigate?: (direction: "next" | "previous") => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
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


export type ProductReviewsProps = {
  reviews: Review[];
  maxReviews?: number;
};

export type ProductImageGalleryProps = {
  productId: number | string;
  title: string;
  images: string[];
  thumbnail?: string;
};

export type AddToCartButtonProps = {
  isInCart: boolean;
  isAdding: boolean;
  onAddToCart: () => void;
  isDisabled?: boolean;
};

export type UseProductModalKeyboardProps = {
  enabled: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onAddToCart?: () => void;
  canAddToCart?: boolean;
};

export interface LogoProps {
  size?: number; 
  onClick?: () => void;
}


export interface CategorySidebarProps {
  selected: string;
  onSelect: (category: string) => void;
  productCounts?: Record<string, number>;
}

export interface CategoryItemProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  collapsed: boolean;
  onPress: () => void;
  count?: number;
}