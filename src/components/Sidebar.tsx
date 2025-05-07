"use client";

import { menuItems, storeMenuItems } from "@/constants";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { CgMenuRight } from "react-icons/cg";

interface SidebarProps {
  closeSidebar: boolean;
  setCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ closeSidebar, setCloseSidebar }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isStoreItemActive = storeMenuItems.some(
    (item) => pathname === item.link,
  );

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-start justify-start gap-2 overflow-hidden",
      )}
    >
      <div className="w-full border-b py-3">
        <div className="flex w-full items-center justify-between px-3">
          <img
            src="/icons/logo.png"
            alt="logo"
            className={`h-6 w-40 ${!closeSidebar ? "hidden" : "block"}`}
          />

          <div
            onClick={() => setCloseSidebar((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center rounded bg-gray-200/60 p-1"
          >
            <CgMenuRight size={20} />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-start gap-2 px-3">
        {closeSidebar && <p className="px-2 text-sm font-medium">Platform</p>}

        {menuItems.map((item) => (
          <Link
            href={item.link}
            key={item.title}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-sm p-2 transition-all duration-200 hover:bg-gray-100 ${
              pathname === item.link ? "bg-baseColor/10" : ""
            }`}
          >
            <item.icon
              size={24}
              className={`${
                pathname === item.link ? "text-baseColor" : "text-gray-700"
              }`}
            />
            {closeSidebar && (
              <span
                className={`text-sm font-medium ${
                  pathname === item.link ? "text-baseColor" : "text-gray-700"
                }`}
              >
                {item.title}
              </span>
            )}
          </Link>
        ))}
      </div>

      <Collapsible
        open={isStoreItemActive || isOpen}
        onOpenChange={setIsOpen}
        className="w-full border-y py-3"
      >
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between px-3">
            {closeSidebar && (
              <h4 className="text-base font-medium text-gray-700">
                My Storefront
              </h4>
            )}

            <ChevronRight
              size={16}
              className={cn("text-gray-700 transition-transform duration-200", {
                "ml-3 rotate-90":
                  !closeSidebar && (isOpen || isStoreItemActive),
                "ml-3": !closeSidebar,
                "rotate-90": (isOpen || isStoreItemActive) && closeSidebar,
              })}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className={cn("space-y-2x mt-3 px-3")}>
          {storeMenuItems.map((item) => (
            <Link
              href={item.link}
              key={item.title}
              className={`flex cursor-pointer items-center gap-3 rounded-sm p-2 transition-all duration-200 hover:bg-gray-100 ${
                pathname === item.link ? "bg-baseColor/10" : ""
              }`}
            >
              <item.icon
                size={24}
                className={`${pathname === item.link ? "text-baseColor" : "text-gray-600"}`}
              />

              {closeSidebar && (
                <span
                  className={`text-sm font-medium ${
                    pathname === item.link ? "text-baseColor" : "text-gray-700"
                  }`}
                >
                  {item.title}
                </span>
              )}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Sidebar;
