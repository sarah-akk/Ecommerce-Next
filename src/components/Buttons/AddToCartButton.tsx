"use client";

import { forwardRef } from "react";
import { Button } from "@heroui/react";
import { Check, ShoppingCart } from "lucide-react";
import { AddToCartButtonProps } from "@/types/types";

export const AddToCartButton = forwardRef<
  HTMLButtonElement,
  AddToCartButtonProps
>(function AddToCartButton(
  { isInCart, isAdding, onAddToCart, isDisabled },
  ref,
) {
  return (
    <Button
      as="div"
      ref={ref}
      color={isInCart ? "success" : "secondary"}
      variant="flat"
      className="font-bold w-full"
      startContent={
        isAdding ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <ShoppingCart className="h-3.5 w-3.5" />
        )
      }
      onPress={onAddToCart}
      isDisabled={isDisabled}
    >
      {isAdding ? "Added!" : isInCart ? "In Cart" : "Add to Cart"}
    </Button>
  );
});
