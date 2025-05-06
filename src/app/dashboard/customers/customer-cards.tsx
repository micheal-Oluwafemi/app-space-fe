import { Skeleton } from "@/components/ui/skeleton";
import { formatter } from "@/lib/utils";
import { CheckCheckIcon, ShoppingBag, Tag } from "lucide-react";
import React from "react";
import { CgFileDocument, CgShoppingBag } from "react-icons/cg";
import {
  HiMiniExclamationTriangle,
  HiShoppingBag,
  HiUserGroup,
} from "react-icons/hi2";

interface TransactionCardsProps {
  isFetching: boolean;
}

const CustomerCards = ({ isFetching }: TransactionCardsProps) => {
  return (
    <div className="mt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex h-[120px] flex-col justify-between rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-700">
              Total Customers
            </h4>

            <div className="flex size-7 items-center justify-center rounded-sm bg-green-100">
              <HiUserGroup size={20} className="text-green-500" />
            </div>
          </div>

          {isFetching ? (
            <div className="flex items-center gap-2 text-2xl">
              ₦<Skeleton className="h-10 w-full lg:h-10 lg:w-fit lg:px-30" />
            </div>
          ) : (
            <h2 className="text-2xl font-semibold">{formatter.format(4000)}</h2>
          )}
        </div>

        <div className="flex h-[120px] flex-col justify-between rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-700">Active</h4>

            <div className="flex size-7 items-center justify-center rounded-sm bg-blue-100">
              <HiUserGroup className="text-blue-500" />
            </div>
          </div>
          {isFetching ? (
            <div className="flex items-center gap-2 text-2xl">
              <Skeleton className="h-10 w-full lg:h-14 lg:w-fit lg:px-30" />
            </div>
          ) : (
            // ${salesData.total_profits < 0 ? "text-red-600" : ""}
            <h2 className={`text-2xl font-semibold`}>
              {formatter.format(3000)}
            </h2>
          )}
        </div>

        <div className="flex h-[120px] flex-col justify-between rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-700">Inactive</h4>

            <div className="flex size-7 items-center justify-center rounded-sm bg-red-100">
              <HiUserGroup className="text-red-500" />
            </div>
          </div>

          {isFetching ? (
            <div className="flex items-center gap-2 text-2xl">
              <Skeleton className="h-10 w-full lg:h-14 lg:w-fit lg:px-30" />
            </div>
          ) : (
            <h2 className="text-2xl font-semibold">{32}</h2>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default CustomerCards;
