"use client";

import Greeting from "@/components/Greeting";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const userData = useSelector((state: any) => state.user?.user);
  console.log(userData);

  return (
    <div className="h-full w-full pt-3 pb-10">
      <Greeting name={userData?.first_name} />
    </div>
  );
};

export default page;
