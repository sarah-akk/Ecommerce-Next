import { UseProductModalKeyboardProps } from "@/types/types";
import { useEffect } from "react";


export function useProductModalKeyboard({
  enabled,
  onClose,
  onNext,
  onPrev,
  onAddToCart,
  canAddToCart = false,
}: UseProductModalKeyboardProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowLeft":
          e.preventDefault();
          onPrev?.();
          break;

        case "ArrowRight":
          e.preventDefault();
          onNext?.();
          break;

        case "a":
        case "A":
          if (e.ctrlKey || e.metaKey) return;
          if (!canAddToCart) return;
          e.preventDefault();
          onAddToCart?.();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    enabled,
    onClose,
    onNext,
    onPrev,
    onAddToCart,
    canAddToCart,
  ]);
}