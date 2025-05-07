"use client";

import { Suspense } from "react";
import React from "react";
import { useWindowSize } from "react-use";
import Link from "next/link";
import { AutoConfetti } from "@/components/ui/confetti";
import { useSearchParams } from "next/navigation";

const SearchParamsWrapper = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  return type;
};

const Page = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <AutoConfetti />
      <Suspense fallback={<div className="loader"></div>}>
        <SearchParamsWrapperContent />
      </Suspense>
    </div>
  );
};

const SearchParamsWrapperContent = () => {
  const type = SearchParamsWrapper();
  return type === "welcome" ? (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-5xl">🎉</h1>
      </div>

      <div className="mt-3 w-full space-y-2">
        <h2 className="text-center text-2xl font-semibold text-black/80 lg:text-3xl">
          Congratulations
        </h2>
        <p className="text-center">
          You've successfully created your AppSpace Account{" "}
        </p>
      </div>

      <Link
        href="/"
        className="bg-baseColor hover:bg-baseColor-light w-fit rounded-md px-4 py-2 text-center font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        Continue
      </Link>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-5xl">🎉</h1>
      </div>

      <div className="mt-3 w-full space-y-2">
        <h2 className="text-center text-3xl font-semibold text-black/80">
          All done
        </h2>
        <p className="text-center">Your password has been reset.</p>
      </div>

      <Link
        href="/"
        className="bg-baseColor hover:bg-baseColor-light w-full rounded-md px-4 py-3 text-center font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        Continue to Login
      </Link>
    </div>
  );
};

export default Page;
