"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Divider, ScrollShadow, Skeleton } from "@heroui/react";
import {
  LayoutGrid,
  Smartphone,
  Shirt,
  Gem,
  Sofa,
  Car,
  Dumbbell,
  BookOpen,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { formatCategoryLabel } from "@/lib/utils";
import { CategorySidebarProps } from "@/types/types";
import { CategoryItem } from "../UI/CategoryItem";

// Map category slugs to icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  smartphones: <Smartphone className="h-4 w-4" />,
  laptops: <Smartphone className="h-4 w-4" />,
  fragrances: <Sparkles className="h-4 w-4" />,
  skincare: <Gem className="h-4 w-4" />,
  groceries: <BookOpen className="h-4 w-4" />,
  "home-decoration": <Sofa className="h-4 w-4" />,
  furniture: <Sofa className="h-4 w-4" />,
  tops: <Shirt className="h-4 w-4" />,
  "womens-dresses": <Shirt className="h-4 w-4" />,
  "womens-shoes": <Gem className="h-4 w-4" />,
  "mens-shirts": <Shirt className="h-4 w-4" />,
  "mens-shoes": <Dumbbell className="h-4 w-4" />,
  "mens-watches": <Gem className="h-4 w-4" />,
  "womens-watches": <Gem className="h-4 w-4" />,
  "womens-bags": <Gem className="h-4 w-4" />,
  "womens-jewellery": <Gem className="h-4 w-4" />,
  sunglasses: <Gem className="h-4 w-4" />,
  automotive: <Car className="h-4 w-4" />,
  motorcycle: <Car className="h-4 w-4" />,
  lighting: <Sparkles className="h-4 w-4" />,
  "sports-accessories": <Dumbbell className="h-4 w-4" />,
};

const DEFAULT_ICON = <LayoutGrid className="h-4 w-4" />;

function getCategoryIcon(slug: string) {
  return CATEGORY_ICONS[slug] ?? DEFAULT_ICON;
}

export function CategorySidebar({
  selected,
  onSelect,
  productCounts,
}: CategorySidebarProps) {
  const { data: categories, isLoading } = useCategories();

  return (
    <motion.aside
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex h-full flex-col rounded-2xl border border-divider bg-content1 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 min-h-[60px]">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-foreground tracking-wide">
              Categories
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <Divider />

      {/* Category List */}
      <ScrollShadow className="flex-1 overflow-y-auto py-3">
        <ul className="flex flex-col gap-1 px-2">
          {/* All */}
          <CategoryItem
            icon={<LayoutGrid className="h-4 w-4" />}
            label="All Products"
            isSelected={selected === ""}
            collapsed={false}
            onPress={() => onSelect("")}
            count={productCounts?.["all"]}
          />

          <li className="px-2 py-1">
            <Divider className="opacity-50" />
          </li>

          {/* Skeleton while loading */}
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="px-2 py-1">
                <Skeleton className="h-9 w-full rounded-xl" />
              </li>
            ))}

          {/* Real categories */}
          {!isLoading &&
            categories?.map((cat) => {
              const slug = typeof cat === "string" ? cat : cat.slug;
              const label = formatCategoryLabel(slug);
              return (
                <CategoryItem
                  key={slug}
                  icon={getCategoryIcon(slug)}
                  label={label}
                  isSelected={selected === slug}
                  collapsed={false}
                  onPress={() => onSelect(slug === selected ? "" : slug)}
                  count={productCounts?.[slug]}
                />
              );
            })}
        </ul>
      </ScrollShadow>

      {/* Footer hint */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="px-4 py-3 border-t border-divider"
        >
          <p className="text-xs text-default-400 text-center">
            {categories?.length ?? 0} categories available
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.aside>
  );
}
