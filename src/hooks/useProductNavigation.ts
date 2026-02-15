import { useCallback, useMemo } from "react";

type Direction = "next" | "previous";

export function useProductNavigation<T extends { id: number }>(
  products: T[],
  selectedProductId: number | null,
  setSelectedProductId: (id: number | null) => void,
) {
  const selectedIndex = useMemo(() => {
    if (selectedProductId === null) return -1;
    return products.findIndex((p) => p.id === selectedProductId);
  }, [products, selectedProductId]);

  const hasNext = selectedIndex >= 0 && selectedIndex < products.length - 1;
  const hasPrevious = selectedIndex > 0;

  const handleNavigate = useCallback(
    (direction: Direction) => {
      if (selectedIndex === -1) return;

      if (direction === "next" && hasNext) {
        setSelectedProductId(products[selectedIndex + 1].id);
      }

      if (direction === "previous" && hasPrevious) {
        setSelectedProductId(products[selectedIndex - 1].id);
      }
    },
    [selectedIndex, hasNext, hasPrevious, products, setSelectedProductId],
  );

  return {
    selectedIndex,
    hasNext,
    hasPrevious,
    handleNavigate,
  };
}