"use client";
import { useState } from "react";
import { Pagination, Skeleton } from "@heroui/react";
import { PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useProductFilters } from "@/hooks/useProductFilters";
import { parseSortKey } from "@/lib/utils";
import { containerVariants, itemVariants } from "@/lib/variants";
import { CartButton } from "./Buttons/CartButton";
import { ThemeToggle } from "./Buttons/ThemeToggle";
import { SearchBar } from "./Filters/SearchBar";
import { SortSelect } from "./Filters/SortSelect";
import { ProductCard } from "./Cards/ProductCard";
import { ProductDetailModal } from "./Modals/ProductDetailModal";
import { useProductNavigation } from "@/hooks/useProductNavigation";
import { Logo } from "./UI/Logo";
import { CategorySidebar } from "./Layout/Categorysidebar ";
import { CategoryFilter } from "./Filters/CategoryFilter";

const LIMIT = 12;

export function ProductDashboard() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const {
    search,
    category,
    sortKey,
    page,
    setSearch,
    setCategory,
    setSortKey,
    setPage,
  } = useProductFilters();

  const { sortBy, order } = parseSortKey(sortKey);
  const skip = (page - 1) * LIMIT;

  const { data, isLoading, isError, error } = useProducts({
    search,
    category,
    sortBy,
    order,
    skip,
    limit: LIMIT,
  });

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;
  const currentProducts = data?.products || [];

  const { selectedIndex, hasNext, hasPrevious, handleNavigate } =
    useProductNavigation(
      currentProducts,
      selectedProductId,
      setSelectedProductId,
    );

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 ltr">
      {/* Header */}
      <motion.header
        className="mb-8 flex items-start justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex max-md:flex-col gap-10">
          <div>
            <Logo onClick={() => (window.location.href = "/")} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              ShopWave
            </h1>
            <p className="mt-1 text-muted-foreground">
              Browse, search, and filter through our catalog
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CartButton />
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Main layout: Sidebar + Content */}
      <div className="flex gap-6 items-start">
        {/* Sidebar */}
        <motion.div
          className="hidden md:block sticky top-4 self-start"
          style={{ height: "calc(100vh - 8rem)" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CategorySidebar
            selected={category}
            onSelect={(cat) => {
              setCategory(cat);
              setPage(1);
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Controls */}
          <motion.section
            className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <SearchBar
              onSearch={setSearch}
              resultCount={search ? data?.total : undefined}
            />
            <CategoryFilter selected={category} onSelect={setCategory} />
            <SortSelect selected={sortKey} onSelect={setSortKey} />
          </motion.section>

          {/* Mobile category filter (visible on small screens) */}
          <motion.div
            className="mb-4 flex gap-2 overflow-x-auto pb-2 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* on mobile, keep the old CategoryFilter or a horizontal chip list */}
          </motion.div>

          {/* Active filters summary */}
          <AnimatePresence>
            {(search || category) && data ? (
              <motion.p
                key="filters-summary"
                className="mb-4 text-sm text-muted-foreground"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                Showing {data.products.length} of {data.total} products
                {search && (
                  <>
                    {" "}
                    for &quot;<strong>{search}</strong>&quot;
                  </>
                )}
                {category && (
                  <>
                    {" "}
                    in <strong className="capitalize">{category}</strong>
                  </>
                )}
              </motion.p>
            ) : null}
          </AnimatePresence>

          {/* Error */}
          {isError && (
            <motion.div
              className="flex min-h-[300px] items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-destructive">{(error as Error).message}</p>
            </motion.div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: LIMIT }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {!isLoading && data && data.products.length > 0 && (
            <motion.section
              className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${search}-${category}-${sortKey}-${page}`}
            >
              {data.products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard
                    product={product}
                    onPress={() => setSelectedProductId(product.id)}
                  />
                </motion.div>
              ))}
            </motion.section>
          )}

          {/* Empty */}
          {!isLoading && data && data.products.length === 0 && (
            <motion.div
              className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-muted-foreground"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <PackageOpen className="h-12 w-12" />
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {data && totalPages > 1 && (
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Pagination
                initialPage={1}
                total={totalPages}
                page={page}
                onChange={setPage}
                showControls
                color="secondary"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <ProductDetailModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
        onNavigate={handleNavigate}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
}
