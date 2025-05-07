"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { Input } from "@/components/ui/input";
import { PostRequest } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const slides = [
    "/images/auth/authImage1.svg",
    "/images/auth/authImage2.svg",
    "/images/auth/authImage3.svg",
  ];

  const pathname = usePathname();
  useEffect(() => {}, [pathname]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const emailAddress = watch("email");

  const onSubmit = async (formData: any) => {
    const { data, err } = await PostRequest({
      url: "/api/auth/forgot-password",
      body: formData,
      setState: setIsLoading,
    });

    if (!err) {
      localStorage.setItem("OTPEmail", emailAddress);
      toast.success(data.message || "Reset token sent successfully");
      navigate.push("/otp-verification");
    } else {
      toast.error(err);
    }
    console.log(formData);
  };

  return (
    <div
      className={`grid w-full items-center p-3 md:p-20 lg:grid-cols-3 lg:gap-10 lg:p-10`}
    >
      {pathname !== "/setup-store" && (
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

      <div className={`w-full pt-8 lg:col-span-2 lg:pt-0`}>
        <div className={`${pathname === "/setup-store" && "hidden"}`}>
          <img src="/icons/logo.png" alt="logo" className="w-48" />
        </div>

        <div className="flex size-full flex-col gap-5">
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-black/80 lg:text-4xl">
              Forgot Password
            </h1>

            <p className="text-sm text-gray-600 md:text-base">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 flex max-w-[632px] flex-col gap-5 lg:mt-7"
          >
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message?.toString()}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || isLoading}
              className="bg-baseColor hover:bg-baseColor-light w-full rounded-md px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Sending...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
