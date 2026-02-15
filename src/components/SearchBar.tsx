"use client";
import { Input } from "@heroui/react";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { SearchBarProps } from "@/types/types";

export function SearchBar({ onSearch, resultCount }: SearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="flex flex-col gap-1">
      <Input
        placeholder="Search products..."
        value={value}
        onValueChange={setValue}
        startContent={<Search className="h-4 w-4 text-muted-foreground" />}
        endContent={
          value ? (
            <button
              onClick={() => setValue("")}
              className="rounded-full p-0.5 hover:bg-muted"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : null
        }
        classNames={{
          inputWrapper: `
            bg-card shadow-sm
            focus-within:ring-0
            focus-within:ring-offset-0
            focus-within:border-transparent
          `,
          input: "focus:outline-none focus:ring-0",
        }}
        aria-label="Search products"
      />
      {value.trim() && resultCount !== undefined && (
        <p className="text-xs text-muted-foreground">
          {resultCount} result{resultCount !== 1 ? "s" : ""} found
        </p>
      )}
    </div>
  );
}
