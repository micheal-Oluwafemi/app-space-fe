"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PostRequest } from "@/lib/http";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { globalUserLogin } from "@/redux/userReducer";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();

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
      url: "/api/verify-account",
      body: formatted,
      setState: setLoading,
    });

    if (!err) {
      dispatch(globalUserLogin(data.data.user));
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
    const { data, err } = await PostRequest({
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
    <div className="flex size-full flex-col gap-5">
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
  );
};
export default VerifyEmail;
