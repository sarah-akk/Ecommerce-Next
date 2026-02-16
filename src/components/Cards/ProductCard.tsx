"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Button,
  addToast,
  PressEvent,
} from "@heroui/react";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import {
  formatDiscountedPrice,
  formatPrice,
  getStockStatus,
} from "@/lib/utils";
import type { ProductCardProps } from "@/types/types";
import { AddToCartButton } from "../Buttons/AddToCartButton";

export function ProductCard({ product, onPress }: ProductCardProps) {
  const stockStatus = getStockStatus(product.stock);
  const discountedPrice = product ? formatDiscountedPrice(product) : 0;
  const { addToCart, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: discountedPrice,
    });

    addToast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart`,
      color: "success",
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Card
      shadow="md"
      isPressable
      onPress={onPress}
      className="group min-h-[420px] w-full transition-shadow hover:shadow-lg"
    >
      <CardBody className="relative flex-shrink-0 overflow-hidden p-0">
        <div className="relative">
          <Image
            alt={product.title}
            className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
            src={product.thumbnail}
            width="100%"
            radius="none"
          />
          {product.discountPercentage >= 1 && (
            <Chip
              size="sm"
              color="danger"
              variant="solid"
              className="absolute left-2 top-2 z-10 font-semibold"
            >
              -{Math.round(product.discountPercentage)}%
            </Chip>
          )}
          <Chip
            size="sm"
            color={stockStatus.color}
            variant="flat"
            className="absolute right-2 top-2 z-10"
          >
            {stockStatus.label}
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <Chip size="sm" variant="flat" color="default" className="capitalize">
          {product.category}
        </Chip>
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
          {product.title}
        </h3>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-secondary">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage >= 1 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-muted-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <AddToCartButton
          isInCart={isInCart}
          isAdding={isAdding}
          onAddToCart={handleAddToCart}
          isDisabled={!product || product.stock === 0}
        />
      </CardFooter>
    </Card>
  );
}
