"use client";

import PageHeaders from "@/components/PageHeaders";
import React, { useState } from "react";
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
import { orderMockData, transactionMockData } from "@/constants";
import { formatter } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import OrderCards from "./order-cards";
import OrderFilters from "./order-filters";

const page = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [filters, setFilters] = useState<{ status: string | null }>({
    status: "All",
  });

  const statuses = {
    pending: <Badge className={"bg-amber-500"}>Pending</Badge>,
    success: <Badge className={"bg-green-700"}>Success</Badge>,
    failed: <Badge className="bg-red-500">Failed</Badge>,
  };

  return (
    <div className="h-full w-full pt-5 pb-10">
      <PageHeaders pageType="Orders" />
      <div>
        <OrderCards isFetching={isFetching} />
        <OrderFilters setFilters={setFilters} filters={filters} />
        <div className="mt-14 rounded-lg bg-gray-50 p-3 shadow-none">
          <div className="mb-3">
            <h2 className="text-xl font-bold">
              {filters.status == "All" || !filters.status
                ? "Recent Orders"
                : `${filters.status} Orders`}
            </h2>
          </div>
          <Table>
            <TableCaption>View and manage transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium">Order ID</TableHead>
                <TableHead className="text-xs font-medium">Customer</TableHead>
                <TableHead className="text-xs font-medium">Products</TableHead>
                <TableHead className="text-xs font-medium">
                  Delivery Method
                </TableHead>
                <TableHead className="text-xs font-medium">Total</TableHead>
                <TableHead className="text-xs font-medium">Channel</TableHead>
                <TableHead className="text-xs font-medium">Date</TableHead>
                <TableHead className="text-xs font-medium">
                  Payment Status
                </TableHead>
                <TableHead className="text-xs font-medium">
                  Fulfillment Status
                </TableHead>
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
                orderMockData.map((order, index) => (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell>{order.order_number}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.products}</TableCell>
                    <TableCell>{order.delivery_method}</TableCell>
                    <TableCell>₦{formatter.format(order.total)}</TableCell>
                    <TableCell>{order.channel}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      {statuses[order.payment_status as keyof typeof statuses]}
                    </TableCell>
                    <TableCell>
                      {
                        statuses[
                          order.fulfillment_status as keyof typeof statuses
                        ]
                      }
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  {/* <Paginator currentPage={paginationSettings.currentPage} maxPage={paginationSettings.maxPage} onNavigate={getTransactions} /> */}
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
