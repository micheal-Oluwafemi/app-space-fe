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
import { toast } from "sonner";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const { isLoggedIn } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const getCurrentUser = async () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user: UserDataTypes = JSON.parse(storedUser);
      dispatch(globalUserLogin(user));
      return;
    }

    const { data, err } = await GetRequest({
      url: "/api/profile",
      setState: setIsLoading,
    });

    if (!err) {
      dispatch(globalUserLogin(data.user));
    } else {
      toast.error(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/auth/login");
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <div className="bg-baseColor-light/20 flex h-dvh flex-col items-center justify-center">
        <div className="loader animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="font-geist relative h-dvh w-full">
      <div className="fixed top-0 z-50 w-full">
        <TopNavbar setCloseSidebar={setCloseSidebar} />
      </div>

      <div className="flex h-full items-start justify-between">
        <div
          className={cn(
            "flex h-full items-start justify-start overflow-hidden border-r border-gray-200 transition-all duration-300",
            {
              "w-[250px]": closeSidebar,
              "w-[65px]": !closeSidebar,
              hidden: isMobile && closeSidebar,
            },
          )}
        >
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        <main className="no-scrollbar z-30 mt-[21px] max-h-dvh flex-1 overflow-y-auto bg-white p-3 pt-10 lg:px-5">
          {children}
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
