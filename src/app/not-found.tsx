"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const navigate = useRouter();

  return (
    <div className="bg-baseColor-light/20 flex min-h-dvh items-center justify-center">
      <div className="space-y-10 text-center">
        {/* 404 Number */}
        <h1 className="text-8xl font-extrabold text-gray-800 md:text-9xl">
          404
        </h1>

        {/* Face */}
        <div className="relative mt-10 space-y-10">
          {/* Eyebrows */}
          <div className="flex justify-center space-x-10">
            <div className="h-5 w-12 -rotate-12 transform rounded-t-full bg-gray-800"></div>
            <div className="h-5 w-12 rotate-12 transform rounded-t-full bg-gray-800"></div>
          </div>

          {/* Eyes */}
          <div className="mt-4 flex justify-center space-x-16">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-gray-800 bg-white">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="h-7 w-7 rounded-full bg-gray-800"
              ></motion.div>
            </div>
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-gray-800 bg-white">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="h-7 w-7 rounded-full bg-gray-800"
              ></motion.div>
            </div>
          </div>

          {/* Mouth */}
          <div className="mt-6 flex justify-center">
            <div className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-b-full bg-black">
              <div className="h-8 w-12 rounded-t-full bg-red-500"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600">
            Sorry, the page you're looking for doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-6">
          <button
            onClick={() => navigate.push("/")}
            className="rounded-md bg-gray-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-900"
          >
            Go Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
