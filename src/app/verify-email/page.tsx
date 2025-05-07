"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PostRequest } from "@/lib/http";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { globalUserLogin } from "@/redux/reducers/userReducer";
import { useMediaQuery } from "react-responsive";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

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
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const otp = watch("code");

  useEffect(() => {
    const storedEmail = localStorage.getItem("user-email");
    setEmailAddress(storedEmail);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (formData: Record<string, any>) => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const formatted = { ...formData, email: emailAddress };

    const { data, err } = await PostRequest({
      url: "/api/auth/verify-account",
      body: formatted,
      setState: setLoading,
    });

    if (!err) {
      localStorage.removeItem("user-email");
      localStorage.setItem("user-token", data.data.token.access_token);
      toast.success("Email verified successfully");
      router.push("/auth/setup-store");
    } else {
      toast.error(err);
    }
  };

  const resendCode = async () => {
    if (countdown > 0) return;

    setResending(true);
    const { err } = await PostRequest({
      url: "/api/auth/resend-code",
      body: { email: emailAddress },
      setState: setResending,
    });

    if (!err) {
      toast.success("Email verification code resent successfully");
      setCountdown(60);
    } else {
      toast.error(err);
    }
    setResending(false);
  };

  return (
    <div
      className={`grid w-full items-center p-4 md:p-20 lg:grid-cols-3 lg:gap-10 lg:p-10 ${pathname === "/setup-store" ? "h-full" : "h-dvh"}`}
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

      <div className={`flex w-full flex-col gap-5 pt-8 lg:col-span-2 lg:pt-0`}>
        {" "}
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-black/80 lg:text-4xl">
            Verify your email address
          </h1>

          <p className="max-w-sm text-sm text-gray-600 md:text-base">
            Please check your mail for a code and input the code here to proceed
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[632px] space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification code <span className="text-red-500">*</span>
            </label>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={watch("code")}
              onChange={(value: string) => setValue("code", value)}
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

            {errors.code && (
              <span className="text-sm text-red-500">
                {errors.code.message?.toString()}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700">
            Didn't receive any email?{" "}
            <button
              type="button"
              onClick={resendCode}
              disabled={countdown > 0 || resending}
              className={`font-medium ${
                countdown > 0 || resending
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer text-blue-500 hover:underline"
              }`}
            >
              {resending
                ? "Resending..."
                : countdown > 0
                  ? `Resend code in ${countdown}s`
                  : "Resend verification code"}
            </button>
          </p>

          <Button
            type="submit"
            size="lg"
            disabled={Object.keys(errors).length > 0 || loading || resending}
            className="bg-baseColor hover:bg-baseColor-light w-fit rounded-md px-9 py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" />
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default VerifyEmail;
