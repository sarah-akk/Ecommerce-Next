"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="flat"
        size="sm"
        aria-label="Toggle theme"
        className="bg-card shadow-sm"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      isIconOnly
      variant="flat"
      size="sm"
      onPress={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="bg-card shadow-sm"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
