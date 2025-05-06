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

const page = () => {
  const [filters, setFilters] = useState({
    status: null,
  });

  const [isFetching, setIsFetching] = useState(false);

  const statuses = {
    Pending: <p className={"bg-amber-500"}>Pending</p>,
    Success: <p className={"bg-green-700"}>Success</p>,
    Failed: <p className="bg-red-500">Failed</p>,
  };

  return (
    <div className="h-full w-full pt-5 pb-10">
      <PageHeaders pageType="Transactions" />

      <div>
        <TransactionCards isFetching={isFetching} />
        <TransactionFilters setFilters={setFilters} filters={filters} />

        <div className="mt-14 bg-white shadow-none">
          <Table>
            <TableCaption>View and manage customer transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Ref ID</TableHead>
                <TableHead>Fulfillment Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Delivery Method</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Date</TableHead>
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
                    <TableRow
                      className="cursor-pointer"
                      // onClick={() => setOpen(true)}
                    >
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
