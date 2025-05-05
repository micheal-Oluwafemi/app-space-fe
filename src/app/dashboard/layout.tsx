"use client";

import "../globals.css";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Toaster } from "sonner";
import { Loader, Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";

function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-geist flex h-dvh">
      <Sidebar />

      <main className="dark:bg-darkBg no-scrollbar z-30 max-h-dvh flex-1 overflow-y-auto bg-white pt-10 md:pt-0">
        {children}
      </main>
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
