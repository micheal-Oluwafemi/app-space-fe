"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TransactionFilters = ({ setFilters, filters }) => {
  const [active, setActive] = useState("All");

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        {["All", "Completed", "Pending"].map((item) => (
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

export default TransactionFilters;
