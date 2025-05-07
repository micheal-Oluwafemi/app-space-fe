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
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [closeSidebar, setCloseSidebar] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndGetUser = async () => {
      // Check if token exists
      const token = localStorage.getItem("user-token");

      if (!token) {
        // No token found, redirect to login
        router.push("/");
        return;
      }

      // Token exists, fetch user data
      const { data, err } = await GetRequest({
        url: "/api/profile",
        setState: setIsLoading,
      });

      if (err || !data?.user) {
        // Error fetching user or user not found
        localStorage.removeItem("user-token"); // Clear invalid token
        router.push("/");
        return;
      }

      // Success! User is authenticated
      dispatch(globalUserLogin(data.user));
      setIsLoading(false);
    };

    checkAuthAndGetUser();
  }, [dispatch, router]);

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
