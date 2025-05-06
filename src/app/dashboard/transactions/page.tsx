"use client";

import PageHeaders from "@/components/PageHeaders";
import React, { useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import TransactionCards from "./transaction-cards";
import TransactionFilters from "./transaction-filters";
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
import { Loader2 } from "lucide-react";
import { transactionMockData } from "@/constants";
import { formatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
      <PageHeaders pageType="Transactions" />

      <div>
        <TransactionCards isFetching={isFetching} />
        <TransactionFilters setFilters={setFilters} filters={filters} />

        <div className="mt-14 rounded-lg bg-gray-50 p-3 shadow-none">
          <div className="mb-3">
            <h2 className="text-xl font-bold">
              {filters.status == "All" || !filters.status
                ? "Transactions"
                : `${filters.status} Transactions`}
            </h2>
          </div>

          <Table>
            <TableCaption>View and manage transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium">Ref ID</TableHead>
                <TableHead className="text-xs font-medium">
                  Fulfillment Status
                </TableHead>
                <TableHead className="text-xs font-medium">
                  Payment Status
                </TableHead>
                <TableHead className="text-xs font-medium">Total</TableHead>
                <TableHead className="text-xs font-medium">
                  Delivery Method
                </TableHead>
                <TableHead className="text-xs font-medium">Channel</TableHead>
                <TableHead className="text-xs font-medium">Date</TableHead>
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
                transactionMockData.map((transaction, index) => {
                  return (
                    <TableRow key={index} className="cursor-pointer">
                      <TableCell>{transaction.ref}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{statuses["Pending"]}</TableCell>
                      <TableCell>{statuses["Success"]}</TableCell>{" "}
                      <TableCell>
                        ₦{formatter.format(transaction.total)}
                      </TableCell>
                      <TableCell>{transaction.channel}</TableCell>
                      <TableCell>{transaction.delivery_method}</TableCell>
                    </TableRow>
                  );
                })
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
    </div>
  );
};

export default page;
