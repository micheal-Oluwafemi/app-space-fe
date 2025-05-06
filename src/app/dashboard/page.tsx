"use client";

import Greeting from "@/components/Greeting";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const userData = useSelector((state: any) => state.user?.user);
  console.log(userData);

  return (
    <div className="flex flex-col">
      <Greeting name={userData?.first_name} />
    </div>
  );
};

export default page;
