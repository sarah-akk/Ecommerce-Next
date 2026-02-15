"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Badge,
  Divider,
  ScrollShadow,
  Chip,
} from "@heroui/react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  X,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function CartButton() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const isEmpty = items.length === 0;

  return (
    <Popover placement="bottom-end" offset={10}>
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          aria-label="Shopping cart"
          className="relative bg-card shadow-sm overflow-visible"
        >
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge
              content={totalItems}
              color="secondary"
              size="sm"
              className="absolute -right-1 -top-2"
            >
              {""}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[500px] p-0">
        <div className="w-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-divider">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-semibold text-foreground">
                Shopping Cart
              </h3>
            </div>
            {!isEmpty && (
              <Chip size="sm" color="secondary" variant="flat">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </Chip>
            )}
          </div>

          {/* Cart Items */}
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="rounded-full bg-secondary/10 p-6 mb-4">
                <ShoppingCart className="h-12 w-12 text-secondary/50" />
              </div>
              <p className="text-lg font-medium text-foreground mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Add some products to get started
              </p>
            </div>
          ) : (
            <>
              <ScrollShadow className="max-h-96">
                <div className="px-4 py-3 space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3 rounded-lg border border-divider p-3 bg-content2/50 hover:bg-content2 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="relative flex-shrink-0">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="rounded-md object-cover aspect-square"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2 mb-2">
                            <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                              {item.title}
                            </h4>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="danger"
                              onPress={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                              className="flex-shrink-0 min-w-6 w-6 h-6"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                onPress={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                isDisabled={item.quantity <= 1}
                                className="min-w-7 w-7 h-7"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium text-foreground min-w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                onPress={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="min-w-7 w-7 h-7"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-sm font-bold text-secondary">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  {formatPrice(item.price)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollShadow>

              <Divider />

              {/* Footer - Total & Checkout */}
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-secondary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Button
                  color="secondary"
                  size="lg"
                  className="w-full font-semibold"
                  startContent={<ShoppingBag className="h-4 w-4" />}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
