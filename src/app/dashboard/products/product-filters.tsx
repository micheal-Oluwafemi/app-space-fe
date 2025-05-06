"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TransactionFilerProps {
  setFilters: React.Dispatch<React.SetStateAction<{ status: string | null }>>;
  filters: {
    status: string | null;
  };
}

const ProductFilters = ({ setFilters, filters }: TransactionFilerProps) => {
  const [active, setActive] = useState("All");

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        {["All", "Inactive", "Flash Sales"].map((item) => (
          <Button
            size="sm"
            key={item}
            variant="outline"
            onClick={() => {
              setActive(item);
              if (item == "All") {
                return setFilters({ ...filters, status: null });
              }
              setFilters({ ...filters, status: item });
            }}
            className={cn(
              "cursor-pointer border bg-white px-5 text-black",
              active === item
                ? "bg-baseColor hover:bg-baseColor-light text-white hover:text-white"
                : "",
            )}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
