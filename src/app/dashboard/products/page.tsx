"use client";

import PageHeaders from "@/components/PageHeaders";
import ProductCards from "./product-cards";
import { useState } from "react";
import ProductFilters from "./product-filters";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { productMockData } from "@/constants";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const page = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [filters, setFilters] = useState<{ status: string | null }>({
    status: "All",
  });

  const statuses = {
    Pending: <Badge className={"bg-amber-500"}>Pending</Badge>,
    Success: <Badge className={"bg-green-700"}>Success</Badge>,
    Failed: <Badge className="bg-red-500">Failed</Badge>,
  };

  return (
    <div className="h-full w-full pt-3 pb-10">
      <div className="flex w-full flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <PageHeaders pageType="Products" />

        <Button className="w-fit cursor-pointer font-medium text-white">
          Create Product
        </Button>
      </div>

      <div>
        <ProductCards isFetching={isFetching} />
        <ProductFilters setFilters={setFilters} filters={filters} />
      </div>

      <div className="mt-14 rounded-lg bg-gray-50 p-2 shadow-sm">
        <div className="mb-3">
          <h2 className="text-xl font-bold">
            {filters.status == "All" || !filters.status
              ? "Products"
              : `${filters.status} Products`}
          </h2>
        </div>

        <Table>
          <TableCaption>View and manage products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-medium">S/N</TableHead>
              <TableHead className="text-xs font-medium">
                Primary Name
              </TableHead>
              <TableHead className="text-xs font-medium">Collection</TableHead>
              <TableHead className="text-xs font-medium">Variations</TableHead>
              <TableHead className="text-xs font-medium">In Stock</TableHead>
              <TableHead className="text-xs font-medium">Price</TableHead>
              <TableHead className="text-xs font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              productMockData.map((product, index) => (
                <TableRow className="cursor-pointer" key={index}>
                  <TableCell>{product.ref}</TableCell>
                  <TableCell>{product.primary_name}</TableCell>
                  <TableCell>{product.collection}</TableCell>
                  <TableCell>{product.variation}</TableCell>
                  <TableCell>{product.in_stock}</TableCell>
                  <TableCell>₦{formatter.format(product.price)}</TableCell>
                  <TableCell>{statuses["Success"]}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                {/* <Paginator
                    currentPage={paginationSettings.currentPage}
                    maxPage={paginationSettings.maxPage}
                    onNavigate={getTransactions}
                  /> */}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default page;
