"use client";

import "../globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import { GetRequest } from "@/lib/http";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { globalUserLogin } from "@/redux/reducers/userReducer";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("user-token"));
    }
  }, []);

  const getCurrentUser = async () => {
    setLoggedIn(false);
    const { data, err } = await GetRequest({
      url: "/api/profile",
      setState: setIsLoading,
    });

    if (err || !data?.user || !token) {
      setLoggedIn(true);
      navigate.push("/");
      return;
    }

    dispatch(globalUserLogin(data.user));
    setLoggedIn(true);
  };

  // useEffect(() => {
  //   getCurrentUser();
  // }, []);

  // useEffect(() => {
  //   if (!token) {
  //     navigate.push("/");
  //   }
  // }, []);

  if (isLoading) {
    return (
      <div className="bg-baseColor-light/20 flex h-dvh flex-col items-center justify-center">
        <div className="loader animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="font-geist relative flex h-dvh w-full flex-col">
      <div className="flex flex-1 items-start justify-between overflow-hidden">
        <div
          className={cn(
            "flex h-dvh items-start justify-start overflow-hidden border-r border-gray-200 bg-white transition-all duration-300",
            {
              "w-[250px]": closeSidebar,
              "w-[65px]": !closeSidebar,
              hidden: isMobile && closeSidebar,
            },
          )}
        >
          <Sidebar
            closeSidebar={closeSidebar}
            setCloseSidebar={setCloseSidebar}
          />
        </div>

        <main className="no-scrollbar z-30 ml-auto max-h-dvh flex-1 overflow-y-auto bg-white">
          <TopNavbar setCloseSidebar={setCloseSidebar} />

          <div className="p-3 lg:px-5">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <DashboardContent>{children}</DashboardContent>
    </Provider>
  );
}
