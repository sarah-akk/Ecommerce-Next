"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Skeleton,
  Divider,
  addToast,
} from "@heroui/react";
import {
  Package,
  Truck,
  Shield,
  Ruler,
  Weight,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import {
  formatDiscountedPrice,
  formatPrice,
  getStockStatus,
} from "@/lib/utils";
import { StarRating } from "../Reviews/StarRating";
import type { ProductDetailModalProps } from "@/types/types";
import { ProductReviews } from "../Reviews/ProductReviews";
import { ProductImageGallery } from "../Sliders/ProductImageGallery";
import { CloseModalButton } from "../Buttons/CloseModalButton";
import { AddToCartButton } from "../Buttons/AddToCartButton";
import { modalvariants } from "@/lib/variants";
import { useProductModalKeyboard } from "@/hooks/useProductModalKeyboard";

export function ProductDetailModal({
  productId,
  onClose,
  onNavigate,
  hasNext,
  hasPrevious,
}: ProductDetailModalProps) {
  const { addToCart, items } = useCart();
  const { data: product, isLoading } = useProduct(productId);

  const isInCart = items.some((item) => item.id === productId);
  const [isAdding, setIsAdding] = useState(false);

  const addToCartButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = () => {
    setIsAdding(true);
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
    });
    addToast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart`,
      color: "success",
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  // Navigate to next/previous product
  const nextProduct = useCallback(() => {
    if (hasNext && onNavigate) {
      onNavigate("next");
    }
  }, [hasNext, onNavigate]);

  const prevProduct = useCallback(() => {
    if (hasPrevious && onNavigate) {
      onNavigate("previous");
    }
  }, [hasPrevious, onNavigate]);

  useProductModalKeyboard({
    enabled: productId !== null,
    onClose,
    onNext: hasNext ? nextProduct : undefined,
    onPrev: hasPrevious ? prevProduct : undefined,
    onAddToCart: handleAddToCart,
    canAddToCart: !!product && product.stock > 0,
  });

  const discountedPrice = product ? formatDiscountedPrice(product) : 0;
  const stockStatus = product ? getStockStatus(product.stock) : null;

  return (
    <Modal
      isOpen={productId !== null}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      backdrop="blur"
      motionProps={modalvariants}
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {isLoading ? (
                  <Skeleton className="h-6 w-48 rounded" />
                ) : (
                  <>
                    <span className="text-foreground">{product?.title}</span>
                    {product?.brand && (
                      <Chip size="sm" variant="flat" color="secondary">
                        {product.brand}
                      </Chip>
                    )}
                  </>
                )}
              </div>

              {/* Product navigation buttons */}
              <div className="flex items-center gap-2 px-5">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={prevProduct}
                  isDisabled={!hasPrevious}
                  aria-label="Previous product"
                  className="min-w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={nextProduct}
                  isDisabled={!hasNext}
                  aria-label="Next product"
                  className="min-w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </ModalHeader>
            <ModalBody>
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-20 w-full rounded" />
                    <Skeleton className="h-8 w-1/2 rounded" />
                  </div>
                </div>
              ) : product ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Image Gallery */}
                  <ProductImageGallery
                    productId={product.id}
                    title={product.title}
                    images={product.images}
                    thumbnail={product.thumbnail}
                  />

                  {/* Details */}
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-secondary">
                        {formatPrice(discountedPrice)}
                      </span>
                      {product.discountPercentage >= 1 && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price)}
                          </span>
                          <Chip size="sm" color="danger" variant="solid">
                            -{Math.round(product.discountPercentage)}%
                          </Chip>
                        </>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                      <StarRating rating={product.rating} />
                      {stockStatus && (
                        <Chip
                          size="sm"
                          color={stockStatus.color}
                          variant="flat"
                        >
                          {stockStatus.label}
                        </Chip>
                      )}
                    </div>

                    <Divider />

                    {/* Specs */}
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Tag className="h-4 w-4" aria-hidden="true" /> SKU:
                        <span className="text-foreground">{product.sku}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Weight className="h-4 w-4" aria-hidden="true" />{" "}
                        Weight:
                        <span className="text-foreground">
                          {product.weight}g
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Ruler className="h-4 w-4" aria-hidden="true" /> Dims:
                        <span className="text-foreground">
                          {product.dimensions.width}×{product.dimensions.height}
                          ×{product.dimensions.depth} cm
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" aria-hidden="true" /> Min
                        Order:
                        <span className="text-foreground">
                          {product.minimumOrderQuantity}
                        </span>
                      </div>
                    </div>

                    <Divider />

                    {/* Warranty & Shipping */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4" aria-hidden="true" />
                        <span className="text-foreground">
                          {product.warrantyInformation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Truck className="h-4 w-4" aria-hidden="true" />
                        <span className="text-foreground">
                          {product.shippingInformation}
                        </span>
                      </div>
                    </div>

                    <Divider />

                    {/* Reviews */}
                    <ProductReviews reviews={product.reviews} maxReviews={5} />
                  </div>
                </div>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <div className="ml-auto flex items-center gap-2">
                <CloseModalButton onClose={onCloseModal} ref={closeButtonRef} />
                <AddToCartButton
                  ref={addToCartButtonRef}
                  isInCart={isInCart}
                  isAdding={isAdding}
                  onAddToCart={handleAddToCart}
                  isDisabled={!product || product.stock === 0}
                />
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
