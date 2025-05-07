"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { PostRequest } from "@/lib/http";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (formData: any) => {
    const formattedData = {
      ...formData,
      phoneNumber: formData.phone_number?.startsWith("+")
        ? formData.phone_number
        : `+234${formData.phone_number}`,
    };

    const { err } = await PostRequest({
      url: "/api/auth/register",
      body: formattedData,
      setState: setLoading,
    });

    if (!err) {
      localStorage.setItem("user-email", formData.email);
      toast.success("Sign up Successful", {
        description: "OTP email has been sent to your email",
      });
      router.push("/verify-email");
    } else {
      toast.error(err);
    }
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

      <div
        className={`w-full pt-8 lg:col-span-2 lg:pt-0 ${pathname === "/setup-store" && "w-full lg:col-span-3"}`}
      >
        <div className={`${pathname === "/setup-store" && "hidden"}`}>
          <img src="/icons/logo.png" alt="logo" className="w-48" />
        </div>

        <div className="flex size-full flex-col gap-5 pb-20 md:pb-0">
          <div className="mt-4 space-y-1">
            <h1 className="text-2xl leading-[1.1] font-bold text-black/80 lg:text-4xl">
              Create MyAppSpace Account
            </h1>

            <p className="text-gray-600">
              Start your business management journey with MyAppSpace.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[632px] space-y-4"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Sarah"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                />
                {errors.first_name && (
                  <span className="text-xs text-red-500">
                    {errors.first_name.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Rachel"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                />
                {errors.last_name && (
                  <span className="text-xs text-red-500">
                    {errors.last_name.message}
                  </span>
                )}
              </div>

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
                  placeholder="example@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />

                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex h-6 w-6 items-center gap-2">
                    <img src="/icons/flag.png" alt="flag" className="h-4 w-4" />
                    <span className="border-r border-gray-400 pr-2 text-sm font-medium">
                      +234
                    </span>
                  </div>

                  <Input
                    id="phoneNumber"
                    type="tel"
                    className="pl-[90px]"
                    placeholder="Enter phone number"
                    {...register("phone_number", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message:
                          "Phone number must be 11 digits e.g 09123456789",
                      },
                      // onChange: (e) => {
                      //   let value = e.target.value;
                      //   if (value.startsWith("+234")) {
                      //     value = "0" + value.slice(4);
                      //     e.target.value = value;
                      //   }
                      //   const cleanNumber = value.replace(/[^0-9]/g, "");
                      // },
                    })}
                  />
                </div>{" "}
                {errors.phone_number && (
                  <span className="text-xs text-red-500">
                    {errors.phone_number.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "Password must contain at least one special character (@, $, !, %, *, ?, &)",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-sm leading-[1] text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("password_confirmation", {
                      required: "Please confirm your password",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <span className="text-xs text-red-500">
                    {errors.password_confirmation.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || loading}
              className="bg-baseColor hover:bg-baseColor-light w-full rounded-md px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Registering...
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          <p className="text-sm md:text-base">
            Already have a MyAppSpace account?{" "}
            <Link href="/" className="text-baseColor font-medium">
              Sign in
            </Link>
          </p>

          <p className="text-sm md:text-base">
            By Signing up, you agree to our{" "}
            <Link href="#" className="text-baseColor">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-baseColor">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
