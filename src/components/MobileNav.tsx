import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgMenuRight } from "react-icons/cg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { AiOutlineCaretDown } from "react-icons/ai";
import {
  ArrowDown,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Loader2,
} from "lucide-react";
import { FiCheck } from "react-icons/fi";
import { AllStoresTypes } from "@/types/dashboard/store.types";
import { menuItems, storeMenuItems } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeCode, storeID } from "@/redux/reducers/userReducer";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeStore: string;
  isLoading: boolean;
  setActiveStore: (store: string) => void;
  StoreData: AllStoresTypes[];
  setOpenNav: (open: boolean) => void;
  openNav: boolean;
}
const MobileNav = ({
  activeStore,
  isLoading,
  setActiveStore,
  StoreData,
  setOpenNav,
  openNav,
}: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const navigate = useRouter();

  return (
    <>
      <Sheet open={openNav} onOpenChange={setOpenNav}>
        <SheetContent
          side="left"
          className="no-scrollbar h-dvh w-full overflow-y-auto bg-white"
        >
          <SheetHeader>
            <SheetTitle>
              <img src="/icons/logo.png" alt="logo" className="w-40" />
            </SheetTitle>
          </SheetHeader>

          <div className="w-full space-y-3 border-b px-3 pb-6">
            <SheetClose asChild>
              <button
                onClick={() => navigate.push("/dashboard/store/information")}
                className="text-baseColor border-baseColor h-12 w-full cursor-pointer rounded-md border text-sm font-medium"
              >
                View Store
              </button>
            </SheetClose>

            {/* Showing Store Data */}
            <div className="flex w-full flex-col gap-2">
              <Popover>
                <PopoverTrigger asChild className="w-full">
                  <Button
                    variant="outline"
                    className="h-12 w-full cursor-pointer rounded-md bg-gray-200/50 p-2 px-3 text-sm font-semibold text-gray-800"
                  >
                    <p className="">
                      Active Service:{" "}
                      <span className="text-baseColor ml-1 font-normal">
                        {activeStore}
                      </span>
                    </p>

                    <AiOutlineCaretDown className="size-3 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                  </Button>
                </PopoverTrigger>{" "}
                <PopoverContent className="max-h-[300px] w-full">
                  <div className="flex h-full flex-col gap-4">
                    <div className="space-y-2">
                      <h4 className="leading-none font-medium">All Stores</h4>
                      <p className="text-muted-foreground text-sm">
                        View and manage all your registered stores
                      </p>
                    </div>

                    <div className="h-full">
                      {isLoading ? (
                        <div className="flex h-full items-center justify-center">
                          <Loader2
                            size={30}
                            className="animate-spin text-gray-600"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {StoreData?.map((store) => (
                            <div
                              key={store.id}
                              className={`flex cursor-pointer items-center justify-between rounded-md bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200 ${
                                activeStore === store.store_name
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                              onClick={() => {
                                setActiveStore(store.store_name);
                                dispatch(storeID(store.id));
                                dispatch(storeCode(store.store_code));
                              }}
                            >
                              <p>{store.store_name}</p>

                              {activeStore === store.store_name && (
                                <FiCheck className="text-green-600" size={16} />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-3">
            <p className="text-sm font-medium">Platform</p>

            {menuItems.map((item) => (
              <SheetClose asChild key={item.title}>
                <Link
                  href={item.link}
                  className={`flex cursor-pointer items-center gap-3 rounded-sm p-2 transition-all duration-200 hover:bg-gray-100 ${
                    pathname === item.link ? "bg-baseColor/10" : ""
                  }`}
                >
                  <item.icon
                    size={24}
                    className={`${pathname === item.link ? "text-baseColor" : "text-gray-600"}`}
                  />
                  <span
                    className={`text-sm font-normal ${pathname === item.link ? "text-baseColor font-semibold" : "text-gray-600"}`}
                  >
                    {item.title}
                  </span>
                </Link>
              </SheetClose>
            ))}
          </div>

          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2 border-y px-3 py-3"
          >
            <CollapsibleTrigger asChild>
              <div className="flex cursor-pointer items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">
                  My Storefront
                </h4>

                <ChevronRight
                  size={16}
                  className={cn(
                    "text-gray-700 transition-transform duration-200 ease-in-out",
                    {
                      "rotate-90": isOpen,
                    },
                  )}
                />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-2">
              {storeMenuItems.map((item) => (
                <SheetClose asChild key={item.title}>
                  <Link
                    href={item.link}
                    className={`flex cursor-pointer items-center gap-3 rounded-sm p-2 transition-all duration-200 hover:bg-gray-100 ${
                      pathname === item.link ? "bg-baseColor/10" : ""
                    }`}
                  >
                    <item.icon
                      size={24}
                      className={`${pathname === item.link ? "text-baseColor" : "text-gray-600"}`}
                    />
                    <span
                      className={`text-sm font-normal ${pathname === item.link ? "text-baseColor font-semibold" : "text-gray-600"}`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SheetClose>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
