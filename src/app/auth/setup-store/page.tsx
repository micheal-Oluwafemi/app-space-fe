"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TbCameraPlus } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { businessTypes, productType } from "@/constants";
import { Button } from "@/components/ui/button";
import { Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PostRequest } from "@/lib/http";
import { useRouter } from "next/navigation";

const SetupStore = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const router = useRouter();

  // Watched Form Fields
  const storeName = watch("store_name");
  const industry = watch("industry_type");
  const product = watch("product_type");

  const onSubmit = async (formData: any) => {
    if (!selectedImage) {
      setImageError("Business logo is required");
      toast.error("Please upload a business logo");
      return;
    }

    if (!industry || !product) {
      toast.info("Form Error", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    // Using formAppend because of file Upload
    const submitData = new FormData();

    // Add the file to FormData
    submitData.append("store_logo", selectedImage);

    // Add other form fields to FormData
    const { store_url, ...otherFormData } = formData;

    for (const key in otherFormData) {
      submitData.append(key, otherFormData[key]);
    }

    const { err } = await PostRequest({
      url: "/api/store/create",
      body: submitData,
      setState: setIsSubmitting,
    });

    if (!err) {
      toast.success("Store created successfully");
      router.push("/congratulations?type=welcome");
    } else {
      toast.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);

    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setImageError("The store logo must be a JPEG, PNG, or JPG image.");
        setSelectedImage(null);
        setPreview(null);
        return;
      }

      // Validate file size (optional, e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image size should be less than 5MB");
        setSelectedImage(null);
        setPreview(null);
        return;
      }

      // If validation passes, set the selected image
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (storeName) {
      const formattedUrl = storeName.toLowerCase().replace(/[^a-z0-9-]/g, "");
      setValue("store_url", formattedUrl);
    }
  }, [storeName, setValue]);

  return (
    <div className="w-full pb-10 lg:flex lg:items-center lg:justify-center lg:pb-0">
      <div className="">
        <div className="flex w-full justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl leading-[1] font-bold text-black/75 md:text-[32px]">
              Just a Step Away!
            </h1>
            <p className="text-sm text-gray-500">
              Provide Some Insights About Your Business.
            </p>
          </div>
          <img
            src="/icons/logoIcon.png"
            alt="logo-icon"
            className="h-9 w-12 md:h-14 md:w-20"
          />
        </div>
        <div className="mt-8 lg:w-[700px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <label
                htmlFor="logo"
                className="block text-base font-medium text-gray-700"
              >
                Business Logo <span className="text-red-500">*</span>
              </label>
              <div className="flex items-end gap-4">
                <label htmlFor="logo" className="cursor-pointer">
                  <div className="flex size-32 flex-col items-center justify-center overflow-hidden rounded-full border border-dashed border-gray-300 bg-gray-50 p-1">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <TbCameraPlus size={30} className="text-black" />
                      </div>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="logo"
                  accept="image/jpeg, image/png, image/jpg"
                  className="hidden"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("logo")?.click()}
                  className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white"
                >
                  Change Image
                </button>
              </div>
              {imageError && (
                <p className="text-xs text-red-500">{imageError}</p>
              )}
            </div>

            <div className="mt-7 grid w-full gap-3 gap-y-5 lg:grid-cols-2">
              {/* Store Name */}
              <div className="space-y-1">
                <label
                  htmlFor="store_name"
                  className="block text-base font-medium text-gray-700"
                >
                  Store Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Acme Corporation"
                  {...register("store_name", {
                    required: "This Field is required",
                  })}
                  className="text-sm placeholder:text-sm"
                />
                {errors.store_name && (
                  <p className="text-xs text-red-500">
                    {errors.store_name.message?.toString()}
                  </p>
                )}
              </div>

              {/* Store Abbreviation */}
              <div className="space-y-1">
                <label
                  htmlFor="store_abbreviation"
                  className="block text-base font-medium text-gray-700"
                >
                  Store Abbreviation
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  placeholder="e.g. ACME"
                  {...register("store_abbreviation", {
                    required: "This Field is required",
                  })}
                  className="text-sm placeholder:text-sm"
                />
                {errors.store_abbreviation && (
                  <p className="text-xs text-red-500">
                    {errors.store_abbreviation.message?.toString()}
                  </p>
                )}
              </div>

              {/* Store URL */}
              <div className="space-y-1 lg:col-span-2">
                <label
                  htmlFor="store_url"
                  className="block text-base font-medium text-gray-700"
                >
                  Store URL
                  <span className="text-red-500"> *</span>
                </label>
                <div className="flex h-[44px] items-center rounded-md border bg-gray-100 lg:h-12">
                  <Input
                    placeholder="e.g. acme"
                    {...register("store_url", {
                      required: "This Field is required",
                      pattern: {
                        value: /^[a-zA-Z0-9-]+$/,
                        message:
                          "The domain may only contain letters, numbers, and dashes are allowed",
                      },
                    })}
                    className="rounded-r-none bg-white text-sm placeholder:text-sm"
                  />
                  <div className="">
                    <p className="px-3 font-medium">.appstore.shop</p>
                  </div>
                </div>
                {errors.store_url && !storeName && (
                  <p className="text-xs text-red-500">
                    {errors.store_url.message?.toString()}
                  </p>
                )}
                <p className="flex items-center gap-1 pt-0.5 pl-2 text-xs text-gray-500">
                  <Info className="size-3" />
                  You can upgrade your website domain to{" "}
                  <span className="font-semibold">.com</span>,{" "}
                  <span className="font-semibold">.com.ng</span> or any domain
                  of your choice later.
                </p>
              </div>

              {/* Store Industry Type */}
              <div className="space-y-1">
                <label
                  htmlFor="industry_type"
                  className="block text-base font-medium text-gray-700"
                >
                  Industry Type
                  <span className="text-red-500"> *</span>
                </label>
                <Select
                  value={watch("industry_type")}
                  onValueChange={(value) => setValue("industry_type", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      {businessTypes.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.industry_type && (
                  <p className="text-xs text-red-500">
                    {errors.industry_type.message?.toString()}
                  </p>
                )}
              </div>

              {/* Store Product Type */}
              <div className="space-y-1">
                <label
                  htmlFor="product_type"
                  className="block text-base font-medium text-gray-700"
                >
                  Product Type
                  <span className="text-red-500"> *</span>
                </label>
                <Select
                  value={watch("product_type")}
                  onValueChange={(value) => setValue("product_type", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      {productType.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.product_type && (
                  <p className="text-xs text-red-500">
                    {errors.product_type.message?.toString()}
                  </p>
                )}
              </div>

              {/* Store Location*/}
              <div className="space-y-1 lg:col-span-2">
                <label
                  htmlFor="store_location"
                  className="block text-base font-medium text-gray-700"
                >
                  Store Location
                  <span className="text-xs font-normal text-gray-400">
                    {" "}
                    (optional)
                  </span>
                </label>
                <Input
                  {...register("store_location")}
                  className="text-sm placeholder:text-sm"
                />
              </div>

              {/* Store Description */}
              <div className="space-y-1 lg:col-span-2">
                <label
                  htmlFor="store_description"
                  className="block text-base font-medium text-gray-700"
                >
                  Store Description
                  <span className="text-xs font-normal text-gray-400">
                    {" "}
                    (optional)
                  </span>
                </label>
                <textarea
                  {...register("store_description")}
                  id=""
                  rows={5}
                  className="file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-12 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                ></textarea>
              </div>
              <Button
                type="submit"
                className="bg-baseColor hover:bg-baseColor-light h-[44px] w-full cursor-pointer lg:col-span-2 lg:h-12"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-1">
                    <Loader2 className="animate-spin" />
                    Setting up store...
                  </div>
                ) : (
                  <span>Proceed</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupStore;
