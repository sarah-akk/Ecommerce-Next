import { Select, SelectItem } from "@heroui/react";
import { useCategories } from "@/hooks/useCategories";
import type { CategoryFilterProps } from "@/types/types";

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { data: categories = [] } = useCategories();

  const items = [{ slug: "", name: "All Categories" }, ...categories];

  return (
    <Select
      label="Category"
      selectedKeys={new Set([selected])}
      onSelectionChange={(keys) => {
        const val = Array.from(keys)[0] as string;
        onSelect(val ?? "");
      }}
      classNames={{
        trigger: "bg-card shadow-sm",
      }}
      aria-label="Filter by category"
    >
      {items.map((cat) => (
        <SelectItem key={cat.slug}>{cat.name}</SelectItem>
      ))}
    </Select>
  );
}
