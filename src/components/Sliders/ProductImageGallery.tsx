"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductImageGalleryProps } from "@/types/types";

export function ProductImageGallery({
  productId,
  title,
  images,
  thumbnail,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const activeImage = images[selectedImage] || thumbnail;
  useEffect(() => {
    setSelectedImage(0);
  }, [productId]);
  
  if (!activeImage) return null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={`${productId}-${selectedImage}`}
          src={activeImage}
          alt={`${title} - Image ${selectedImage + 1} of ${images.length}`}
          className="aspect-square w-full rounded-lg border border-gray-300 object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div
          className="flex gap-5 overflow-x-auto p-2"
          role="tablist"
          aria-label="Product images"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              role="tab"
              aria-selected={i === selectedImage}
              aria-label={`View image ${i + 1}`}
              className={`flex-shrink-0 overflow-hidden rounded-md border-2 transition-all
                focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                ${
                  i === selectedImage
                    ? "border-secondary ring-2 ring-secondary"
                    : "border-gray-300 hover:border-secondary/50"
                }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${i + 1}`}
                className="h-16 w-16 object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Keyboard hints */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <p className="flex items-center gap-2">
          <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">←</kbd>
          <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">→</kbd>
          <span>Browse products</span>
        </p>
        <p className="flex items-center gap-2">
          <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">A</kbd>
          <span>Add to cart</span>
        </p>
        <p className="flex items-center gap-2">
          <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">Esc</kbd>
          <span>Close</span>
        </p>
      </div>
    </div>
  );
}
