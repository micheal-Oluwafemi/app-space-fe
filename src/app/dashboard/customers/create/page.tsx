"use client";

import PageHeaders from "@/components/PageHeaders";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PostRequest } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState<string | null>("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      username: "",
      password: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCode(localStorage.getItem("storeCode"));
    }
  }, []);

  const onSubmit = async (FormData: any) => {
    const { err } = await PostRequest({
      url: `/api/${code}/customers/create`,
      body: FormData,
      setState: setIsLoading,
    });

    if (!err) {
      reset();
      toast.success("Customer created successfully");
      navigate.push("/dashboard/customers");
    } else {
      toast.error(err);
    }
  };

  return (
    <div className="h-full w-full pb-10">
      <PageHeaders pageType="Create Customer" />

      <div className="mr-auto max-w-5xl">
        <div className="mt-7 h-full w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 lg:grid-cols-2"
          >
            <div className="space-y-1">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="first_name"
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {errors.first_name && (
                <span className="text-sm text-red-500">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="last_name"
                type="text"
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {errors.last_name && (
                <span className="text-sm text-red-500">
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
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <Input
                id="phone_number"
                type="tel"
                {...register("phone_number", {
                  required: "This Field is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Phone number must be 11 digits e.g 09123456789",
                  },
                })}
              />

              {errors.phone_number && (
                <span className="text-sm text-red-500">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
              />

              {errors.username && (
                <span className="text-sm text-red-500">
                  {errors.username.message}
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
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={watch("status") === "active"}
                  onCheckedChange={(checked) =>
                    setValue("status", checked ? "active" : "inactive")
                  }
                />
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-baseColor hover:bg-baseColor-light w-fit rounded-md font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              >
                {isLoading ? "Creating..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
