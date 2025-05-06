import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const PageHeaders = ({ pageType }: { pageType: string }) => {
  const navigate = useRouter();

  return (
    <div className="flex items-center gap-3">
      <div
        onClick={() => navigate.back()}
        className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-gray-100"
      >
        <HiOutlineArrowLongLeft size={25} />
      </div>

      <h1 className="text-3xl font-bold text-black/80">{pageType}</h1>
    </div>
  );
};

export default PageHeaders;
