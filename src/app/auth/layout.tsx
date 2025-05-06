"use client";

import { Toaster } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { useMediaQuery } from "react-responsive";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const slides = [
    "/images/auth/authImage1.svg",
    "/images/auth/authImage2.svg",
    "/images/auth/authImage3.svg",
  ];

  const pathname = usePathname();
  useEffect(() => {}, [pathname]);

  return (
    <div
      className={`grid w-full items-center p-4 md:p-20 lg:grid-cols-3 lg:gap-10 lg:p-10 ${pathname === "/auth/setup-store" ? "h-full" : "h-dvh"}`}
    >
      {pathname !== "/auth/setup-store" && (
        <div className="hidden lg:col-span-1 lg:block">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={15}
            grabCursor={true}
            mousewheel={true}
            keyboard={{
              enabled: true,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            modules={[Mousewheel, Keyboard, Autoplay]}
            className="relative h-1/2 w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "99%",
                  height: isMobile ? "100px" : "100%",
                }}
              >
                <img
                  src={slide}
                  alt="Auth illustration"
                  className={`w-full ${isMobile ? "h-[100px]" : "h-full"} rounded-lg object-cover`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div
        className={`w-full pt-8 lg:col-span-2 lg:pt-0 ${pathname === "/auth/setup-store" && "w-full lg:col-span-3"}`}
      >
        <div className={`${pathname === "/auth/setup-store" && "hidden"}`}>
          <img src="/icons/logo.png" alt="logo" className="w-48" />
        </div>

        {children}
      </div>

      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          duration: 2000,
          classNames: { default: "toastClassName" },
        }}
      />
    </div>
  );
}
