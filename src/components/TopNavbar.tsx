"use client";

import React, { useEffect, useRef, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { GetRequest, PostRequest } from "@/lib/http";
import { toast } from "sonner";
import { AllStoresTypes } from "@/types/dashboard/store.types";
import { BadgeCheck, Bell, Loader2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import MobileNav from "./MobileNav";
import { setSelectedStore } from "@/redux/reducers/userReducer";
import { BiSolidUserPin } from "react-icons/bi";

interface TopNavbarProps {
  setCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNavbar = ({ setCloseSidebar }: TopNavbarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stores, setStores] = useState<AllStoresTypes[]>([]);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [recallFn, setRecallFn] = useState<boolean>(false);

  const [activeStore, setActiveStore] = useState<string>("Select Store");
  const [isOpen, setIsOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const navigate = useRouter();

  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const userData = useSelector((state: any) => state?.user?.user);

  const fetchAllStores = async () => {
    const { data, err } = await GetRequest({
      url: "/api/store/allStores",
      setState: setIsLoading,
      errorMessage: "Unable to fetch stores at the moment",
    });

    if (!err) {
      setStores(data.data.data);
      // Set the first store as active by default if stores exist
      if (data.data.data.length > 0) {
        const firstStore = data.data.data[0];
        setActiveStore(firstStore.store_name);
        localStorage.setItem("selectedStore", firstStore.id);
        dispatch(setSelectedStore(firstStore.id));
      }
    } else {
      setRefetch(true);
      toast.error(err);
    }
  };

  const logOut = async () => {
    const { err } = await PostRequest({
      url: "/api/auth/logout",
      body: {
        Accept: "application/json",
      },
      setState: setIsLoggedOut,
    });

    if (!err) {
      toast.success("Logged out successfully");
      localStorage.removeItem("user-token");
      localStorage.removeItem("selectedStore");
      navigate.push("/login");
    } else {
      toast.error(err);
    }
  };
  useEffect(() => {
    fetchAllStores();
  }, [recallFn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both the dropdown and the avatar
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node) &&
        avatarRef.current &&
        !(avatarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, avatarRef]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsOpen((prevState) => !prevState);
  };

  // Animation variants for the dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: -20, // Start slightly to the left
      transformOrigin: "top right",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transformOrigin: "top right",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -20,
      transformOrigin: "top right",
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="relative bg-white">
      {isMobile ? (
        <div className="flex w-full items-center justify-between border-b pr-4">
          <div className="flex items-center gap-4 py-4 lg:p-3">
            <MobileNav
              StoreData={stores}
              activeStore={activeStore}
              setActiveStore={setActiveStore}
              isLoading={isLoading}
              openNav={openNav}
              setOpenNav={setOpenNav}
            />

            <div
              onClick={() => setOpenNav((prev) => !prev)}
              className="flex cursor-pointer items-center justify-center rounded bg-gray-200/60 p-1"
            >
              <CgMenuRight size={20} />
            </div>

            <img src="/icons/logo.png" alt="logo" className="w-40" />
          </div>

          <div className="flex items-center gap-x-2">
            <div
              className="flex cursor-pointer items-center justify-center rounded-sm bg-gray-200 p-2 transition-colors duration-300 dark:bg-gray-800"
              title="Toggle Theme"
            >
              <Bell size={20} />
            </div>

            <div
              ref={avatarRef}
              onClick={toggleDropdown}
              className="cursor-pointer"
            >
              <img
                src={"/icons/logoIcon.png"}
                alt="avatar"
                className="size-10 rounded-full object-cover"
              />
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                className="absolute top-14 right-4 z-50 my-2 w-52 rounded-lg border bg-white p-2 py-1 shadow-lg"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
              >
                <Link
                  href="/dashboard/profile"
                  className="group flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <BiSolidUserPin
                    size={25}
                    className="group-hover:text-baseColor text-gray-600"
                  />
                  <span className="group-hover:text-baseColor font-medium text-gray-600">
                    Profile
                  </span>
                </Link>

                <button
                  onClick={logOut}
                  className="flex w-full items-center justify-between gap-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <LogOut size={18} className="text-red-500" />
                    <span>Logout</span>
                  </div>

                  {isLoggedOut && <Loader2 className="animate-spin" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex border-b">
          <div className="flex w-[250px] items-center justify-between border-r p-4">
            <img src="/icons/logo.png" alt="logo" className="h-6 w-40" />

            <div
              onClick={() => setCloseSidebar((prev) => !prev)}
              className="flex cursor-pointer items-center justify-center rounded bg-gray-200/60 p-1"
            >
              <CgMenuRight size={20} />
            </div>
          </div>

          <div className="flex flex-1 justify-between px-5">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-md bg-gray-200/50 p-2 px-3 text-sm font-semibold text-gray-800"
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
                <PopoverContent className="max-h-[300px] w-80">
                  <div className="flex h-full flex-col gap-4">
                    <div className="space-y-2">
                      <h4 className="leading-none font-medium">All Stores</h4>
                      <p className="text-muted-foreground text-sm">
                        View and manage all your registered stores
                      </p>
                    </div>

                    <div className="h-full">
                      {!refetch ? (
                        <Button
                          onClick={() => setRecallFn(!recallFn)}
                          className=""
                        >
                          Refetch
                        </Button>
                      ) : (
                        ""
                      )}

                      {isLoading ? (
                        <div className="flex h-full items-center justify-center">
                          <Loader2
                            size={30}
                            className="animate-spin text-gray-600"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {stores?.map((store) => (
                            <div
                              key={store.id}
                              className={`flex cursor-pointer items-center justify-between rounded-md bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200 ${
                                activeStore === store.store_name
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                              onClick={() => {
                                setActiveStore(store.store_name);
                                dispatch(setSelectedStore(store.id));
                                localStorage.setItem("selectedStore", store.id);
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

            <div className="flex items-center gap-5">
              <button className="bg-baseColor flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-sm text-white">
                <BadgeCheck size={20} />
                Upgrade
              </button>

              <div
                className="flex cursor-pointer items-center justify-center rounded-sm bg-gray-200 p-2 transition-colors duration-300 dark:bg-gray-800"
                title="Toggle Theme"
              >
                <Bell size={20} />
              </div>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <div className="flex items-center gap-3">
                        <img
                          src="/icons/logoIcon.png"
                          alt="user-avatar"
                          className="w-12"
                        />

                        <div className="flex items-center gap-2 hover:cursor-pointer">
                          <h1 className="text-base font-medium">
                            {userData?.last_name}
                          </h1>
                        </div>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[250px] max-w-[250px]">
                      <div className="flex w-full flex-col gap-2">
                        <Link
                          href="/dashboard/profile"
                          className="group flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <BiSolidUserPin
                            size={25}
                            className="group-hover:text-baseColor text-gray-600"
                          />
                          <span className="group-hover:text-baseColor font-medium text-gray-600">
                            Profile
                          </span>
                        </Link>
                        <button
                          onClick={logOut}
                          className="flex items-center justify-between gap-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <div className="flex items-center gap-2">
                            <LogOut size={18} className="text-red-500" />
                            <span>Logout</span>
                          </div>

                          {isLoggedOut && <Loader2 className="animate-spin" />}
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
