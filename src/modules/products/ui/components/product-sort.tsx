"use client";

import React from "react";
import { useProductFilters } from "../../hooks/use-product-filters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "curated", label: "Curated" },
  { value: "trending", label: "Trending" },
  { value: "hot_and_new", label: "Hot & New" },
] as const;

const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          size="sm"
          className={cn(
            "rounded-full bg-white hover:bg-white",
            filters.sort !== option.value &&
              "bg-transparent border-transparent hover:border-border hover:bg-transparent"
          )}
          variant="secondary"
          onClick={() => setFilters({ sort: option.value })}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ProductSort;
