"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { PostRequest } from "@/lib/http";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

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
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");
  const otp = watch("token");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("OTPEmail");
      setEmailAddress(storedEmail);
      setValue("email", storedEmail || "");
    }
  }, [setValue]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendCode = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (resendLoading) return;

    setResendLoading(true);

    const { data, err } = await PostRequest({
      url: "/api/auth/resend-code",
      body: { email: emailAddress },
    });

    if (!err) {
      toast.success(data.message || "OTP sent successfully");
      setCountdown(60);
      setIsResendDisabled(true);
      setResendLoading(false);
      reset({
        token: "",
      });
    } else {
      toast.error(err || "Failed to resend OTP");
      setResendLoading(false);
    }
  };

  const onSubmit = async (formData: any) => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const { err } = await PostRequest({
      url: "/api/auth/reset-password",
      body: formData,
      setState: setIsLoading,
    });

    if (!err) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("OTPEmail");
      }
      navigate.push("/congratulations");
    } else {
      toast.error(err);
    }
  };

  return (
    <div
      className={`grid w-full items-center p-3 md:p-20 lg:grid-cols-3 lg:gap-10 lg:p-10`}
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

      <div className={`w-full pt-8 lg:col-span-2 lg:pt-0`}>
        <div className={`${pathname === "/auth/setup-store" && "hidden"}`}>
          <img src="/icons/logo.png" alt="logo" className="w-48" />
        </div>

        <div className="flex size-full flex-col gap-5">
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-black/80 lg:text-4xl">
              Password Reset
            </h1>

            <p className="max-w-lg text-sm text-gray-600 md:text-base">
              We have sent a verification code to your registered email address.
              Please enter the code below to verify your account.{" "}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[632px] space-y-4"
          >
            <div className="space-y-1">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                One-Time Password <span className="text-red-500">*</span>
              </label>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={watch("token") || ""}
                onChange={(value: string) => setValue("token", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              {errors.token && (
                <span className="text-sm text-red-500">
                  {errors.token.message?.toString()}
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
                <span className="text-sm text-red-500">
                  {errors.password.message?.toString()}
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
                    validate: (value) =>
                      value === password || "Passwords do not match",
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
                <span className="text-sm text-red-500">
                  {errors.password_confirmation.message?.toString()}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={
                Object.keys(errors).length > 0 || isLoading || resendLoading
              }
              className="bg-baseColor hover:bg-baseColor-light w-full rounded-md px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Validating...
                </div>
              ) : (
                "Validate OTP"
              )}
            </button>

            <p className="text-sm text-gray-600">
              {isResendDisabled ? (
                <span>
                  Didn't receive any email?{" "}
                  <span className="font-semibold">Resend in {countdown}s</span>
                </span>
              ) : (
                <>
                  Didn't receive any email?{" "}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendLoading}
                    className="text-baseColor cursor-pointer font-semibold hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {resendLoading ? "Sending..." : "Click here to resend code"}
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
