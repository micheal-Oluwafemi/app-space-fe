"use client";

import { useState, useEffect } from "react";
import moment from "moment-timezone";

const getGreeting = (hours: any) => {
  if (hours >= 0 && hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 16) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const Greeting = ({ name }: { name: string }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const nigeriaTime = moment().tz("Africa/Lagos");
    const hours = nigeriaTime.hour();
    const newGreeting = getGreeting(hours);
    setGreeting(newGreeting);
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl leading-[1.2] font-bold text-black/80 lg:text-4xl">
        {greeting}! {name}
      </h1>
    </div>
  );
};

export default Greeting;
