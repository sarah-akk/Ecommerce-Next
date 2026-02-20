import { CategoryItemProps } from "@/types/types";
import { Button, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

export function CategoryItem({
  icon,
  label,
  isSelected,
  collapsed,
  onPress,
  count,
}: CategoryItemProps) {
  return (
    <li>
      <Button
        variant={isSelected ? "flat" : "light"}
        color={isSelected ? "secondary" : "default"}
        onPress={onPress}
        className={`
            w-full justify-start gap-3 h-9 rounded-xl px-3
            transition-all duration-150
            ${isSelected ? "font-semibold" : "font-normal text-default-600"}
            ${collapsed ? "justify-center px-0" : ""}
          `}
        title={collapsed ? label : undefined}
        aria-label={label}
        startContent={
          <span className={`shrink-0 ${isSelected ? "text-secondary" : ""}`}>
            {icon}
          </span>
        }
      >
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap"
            >
              <span className="truncate text-sm">{label}</span>
              {count !== undefined && (
                <Chip
                  size="sm"
                  variant="flat"
                  color={isSelected ? "secondary" : "default"}
                  classNames={{
                    base: "h-5 min-w-[22px]",
                    content: "text-[10px] font-semibold px-1",
                  }}
                >
                  {count}
                </Chip>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </li>
  );
}
