import { Star } from "lucide-react";
import type { StarRatingProps } from "@/types/types";

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
