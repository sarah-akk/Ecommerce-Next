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
  Avatar,
  addToast,
} from "@heroui/react";
import {
  Star,
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Ruler,
  Weight,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import { formatPrice, getStockStatus } from "@/lib/utils";
import { StarRating } from "./StarRating";
import type { ProductDetailModalProps } from "@/types/types";

export function ProductDetailModal({
  productId,
  onClose,
}: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const { data: product, isLoading } = useProduct(productId);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
    });
    addToast({
      title: "Add to card !",
      description: "Add to card successfully",
      color: "default",
    });
  };

  const discountedPrice = product
    ? product.price * (1 - product.discountPercentage / 100)
    : 0;
  const stockStatus = product ? getStockStatus(product.stock) : null;

  return (
    <Modal
      isOpen={productId !== null}
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
      backdrop="blur"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" as const },
          },
          exit: {
            opacity: 0,
            y: 20,
            scale: 0.95,
            transition: { duration: 0.2 },
          },
        },
      }}
    >
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex items-center gap-3">
              {isLoading ? (
                <Skeleton className="h-6 w-48 rounded" />
              ) : (
                <>
                  <span className="text-foreground">{product?.title}</span>
                  {product?.brand && (
                    <Chip size="sm" variant="flat" color="primary">
                      {product.brand}
                    </Chip>
                  )}
                </>
              )}
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
                  <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        src={product.images[selectedImage] || product.thumbnail}
                        alt={product.title}
                        className="aspect-square w-full rounded-lg border border-border object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </AnimatePresence>
                    {product.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {product.images.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedImage(i)}
                            className={`flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                              i === selectedImage
                                ? "border-primary"
                                : "border-border"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${product.title} ${i + 1}`}
                              className="h-16 w-16 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(discountedPrice)}
                      </span>
                      {product.discountPercentage > 5 && (
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
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Tag className="h-4 w-4" /> SKU:
                        <span className="text-foreground">{product.sku}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Weight className="h-4 w-4" /> Weight:
                        <span className="text-foreground">
                          {product.weight}g
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Ruler className="h-4 w-4" /> Dims:
                        <span className="text-foreground">
                          {product.dimensions.width}×{product.dimensions.height}
                          ×{product.dimensions.depth} cm
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" /> Min Order:
                        <span className="text-foreground">
                          {product.minimumOrderQuantity}
                        </span>
                      </div>
                    </div>

                    <Divider />

                    {/* Warranty & Shipping */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span className="text-foreground">
                          {product.warrantyInformation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Truck className="h-4 w-4" />
                        <span className="text-foreground">
                          {product.shippingInformation}
                        </span>
                      </div>
                    </div>

                    <Divider />

                    {/* Reviews */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-foreground">
                        Customer Reviews
                      </h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {product.reviews.slice(0, 3).map((review, i) => (
                          <motion.div
                            key={i}
                            className="rounded-lg border border-border bg-muted/50 p-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar name={review.reviewerName} size="sm" />
                                <span className="text-sm font-medium text-foreground">
                                  {review.reviewerName}
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                              {review.comment}
                            </p>
                            <p className="mt-1 text-[10px] text-muted-foreground/60">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onCloseModal}>
                Close
              </Button>
              <Button
                color="primary"
                startContent={<ShoppingCart className="h-4 w-4" />}
                onPress={handleAddToCart}
                isDisabled={!product || product.stock === 0}
              >
                Add to Cart
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
