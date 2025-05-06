import { Skeleton } from "@/components/ui/skeleton";
import { formatter } from "@/lib/utils";
import {
  ArrowLeftRight,
  BadgeDollarSign,
  ChartNoAxesCombined,
  CheckCheckIcon,
  File,
  History,
  Tag,
} from "lucide-react";
import React from "react";
import { CgFileDocument } from "react-icons/cg";
import { HiDocument, HiMiniExclamationTriangle } from "react-icons/hi2";
import { RiPriceTagFill } from "react-icons/ri";

interface TransactionCardsProps {
  isFetching: boolean;
}

const TransactionCards = ({ isFetching }: TransactionCardsProps) => {
  return (
    <div className="mt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex h-[120px] flex-col justify-between rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-700 uppercase">
              Total Transactions
            </h4>

            <CgFileDocument className="text-green-500" />
          </div>

          {isFetching ? (
            <div className="flex items-center gap-2 text-2xl">
              ₦<Skeleton className="h-10 w-full lg:h-10 lg:w-fit lg:px-30" />
            </div>
          ) : (
            <h2 className="text-2xl font-semibold">
              ₦{formatter.format(32000)}
            </h2>
          )}
        </div>

        <div className="flex h-[120px] flex-col justify-between rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-700 uppercase">
              Returns (NGN)
            </h4>

            <Tag className="text-blue-500" />
          </div>
          {isFetching ? (
            <div className="flex items-center gap-2 text-2xl">
              ₦<Skeleton className="h-10 w-full lg:h-14 lg:w-fit lg:px-30" />
            </div>
          ) : (
            // ${salesData.total_profits < 0 ? "text-red-600" : ""}
            <h2 className={`text-2xl font-semibold`}>
              ₦{formatter.format(3000)}
            </h2>
          )}
        </div>

        <div className="flex h-[120px] flex-col justify-between rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-700 uppercase">
              Fulfilled
            </h4>

            <CheckCheckIcon className="text-orange-700" />
          </div>

          {isFetching ? (
            <div className="flex items-center gap-2 text-2xl">
              <Skeleton className="h-10 w-full lg:h-14 lg:w-fit lg:px-30" />
            </div>
          ) : (
            <h2 className="text-2xl font-semibold">{54}</h2>
          )}
        </div>

        <div className="flex h-[120px] flex-col justify-between rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-gray-700 uppercase">
              Unpaid
            </h4>

            <HiMiniExclamationTriangle className="text-orange-700" />
          </div>

          {isFetching ? (
            <div className="flex items-center gap-2 text-2xl">
              <Skeleton className="h-10 w-full lg:h-14 lg:w-fit lg:px-30" />
            </div>
          ) : (
            <h2 className="text-2xl font-semibold">{54}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCards;
