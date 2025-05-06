"use client";

import PageHeaders from "@/components/PageHeaders";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CustomerCards from "./customer-cards";
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
import { customerMockData } from "@/constants";
import { Badge } from "@/components/ui/badge";
const page = () => {
  const [isFetching, setIsFetching] = useState(false);

  const statuses = {
    Active: <Badge className={"bg-green-700"}>Active</Badge>,
    Inactive: <Badge className="bg-red-500">Inactive</Badge>,
  };

  return (
    <div className="h-full w-full pt-3 pb-10">
      <div className="flex w-full flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <PageHeaders pageType="Customers" />

        <Button className="w-fit cursor-pointer font-medium text-white">
          Add Customer
        </Button>
      </div>

      <CustomerCards isFetching={isFetching} />
      <div>
        <div className="mt-14 rounded-lg bg-gray-50 p-2 shadow-sm">
          <div className="mb-3">
            <h2 className="text-xl font-bold">All Customers</h2>
          </div>
          <Table>
            <TableCaption>View and manage products</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium">
                  Customer Name
                </TableHead>
                <TableHead className="text-xs font-medium">Username</TableHead>
                <TableHead className="text-xs font-medium">Email</TableHead>
                <TableHead className="text-xs font-medium">
                  Phone Number
                </TableHead>
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
                customerMockData.map((customer, index) => (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.username}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      {statuses[customer.status as keyof typeof statuses]}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
