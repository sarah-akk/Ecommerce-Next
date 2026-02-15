"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar } from "@heroui/react";
import { ProductReviewsProps } from "@/types/types";

export function ProductReviews({
  reviews,
  maxReviews = 3,
}: ProductReviewsProps) {
  if (!reviews?.length) return null;

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        Customer Reviews
      </h4>

      <div
        className="space-y-3 max-h-48 overflow-y-auto pr-1"
        tabIndex={0}
        role="region"
        aria-label="Customer reviews"
      >
        {reviews.slice(0, maxReviews).map((review, i) => (
          <motion.div
            key={i}
            className="rounded-lg border border-gray-400 bg-muted/50 p-3"
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

              <div
                className="flex items-center gap-0.5"
                role="img"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-3 w-3 ${
                      j < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                    aria-hidden="true"
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
  );
}
