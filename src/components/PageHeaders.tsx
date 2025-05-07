"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const PageHeaders = ({ pageType }: { pageType: string }) => {
  const navigate = useRouter();

  return (
    <div className="flex items-center gap-3">
      <div
        onClick={() => navigate.back()}
        className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-gray-100 lg:size-10"
      >
        <HiOutlineArrowLongLeft className="text-[20px] lg:text-[25px]" />
      </div>

      <h1 className="text-2xl font-bold text-black/80 lg:text-3xl">
        {pageType}
      </h1>
    </div>
  );
};

export default PageHeaders;
