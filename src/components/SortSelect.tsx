import { Select, SelectItem } from "@heroui/react";
import { SORT_OPTIONS } from "@/lib/utils";
import type { SortSelectProps } from "@/types/types";

export function SortSelect({ selected, onSelect }: SortSelectProps) {
  return (
    <Select
      label="Sort by"
      selectedKeys={new Set([selected])}
      onSelectionChange={(keys) => {
        const val = Array.from(keys)[0] as string;
        onSelect(val ?? "default");
      }}
      classNames={{
        trigger: "bg-card shadow-sm",
      }}
      aria-label="Sort products"
    >
      {SORT_OPTIONS.map((opt) => (
        <SelectItem key={opt.key}>{opt.label}</SelectItem>
      ))}
    </Select>
  );
}
