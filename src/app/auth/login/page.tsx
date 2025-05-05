"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import { PostRequest } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { globalUserLogin } from "@/redux/userReducer";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const hasOnboarded = useSelector(
    (state: any) => state.user.hasOnboarded.storeUrl,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (formData: any) => {
    const { data, err } = await PostRequest({
      url: "/api/auth/login",
      body: formData,
      setState: setLoading,
    });

    if (!err) {
      console.log(data);
      dispatch(globalUserLogin(data.data.user));
      toast.success("Successfully logged in");
      localStorage.setItem("user-token", data.data.token.access_token);
      // router.push("/auth/verify-email");
    } else {
      toast.error(err);
    }
  };

  return (
    <div className="flex size-full flex-col gap-5">
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-black/80 lg:text-4xl">
          Access Your Account
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          Welcome back! Enhance your business performance with expert precision.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[632px] space-y-4"
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
            {...register("login", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.login && (
            <span className="text-sm text-red-500">{errors.login.message}</span>
          )}
        </div>

        <div className="space-y-2">
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
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <Link
            href="/auth/forgot-password"
            className="text-baseColor hover:text-baseColor-light text-sm font-semibold"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-baseColor hover:bg-baseColor-light w-full rounded-md px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" />
              Authenticating...
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="text-sm md:text-base">
        Don't have MyAppSpace account?{" "}
        <Link href="/auth/signup" className="text-baseColor font-medium">
          Sign up
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
  );
};

export default Page;
