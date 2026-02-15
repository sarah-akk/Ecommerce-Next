import { Badge, Button } from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

export default  function CartButton() {
  const { count } = useCart();

  return (
    <Badge
      content={count}
      color="danger"
      size="sm"
      isInvisible={count === 0}
      shape="rectangle"
    >
      <Button
        isIconOnly
        variant="flat"
        size="sm"
        aria-label={`Shopping cart with ${count} items`}
        className="bg-card shadow-sm"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ShoppingCart className="h-4 w-4" />
          </motion.span>
        </AnimatePresence>
      </Button>
    </Badge>
  );
}
