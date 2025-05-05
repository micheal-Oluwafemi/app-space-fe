"use client";

import { Input } from "@/components/ui/input";
import { PostRequest } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();

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
      navigate.push("/auth/otp-verification");
    } else {
      toast.error(err);
    }
    console.log(formData);
  };

  return (
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
        <div className="space-y-2">
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
  );
};

export default page;
