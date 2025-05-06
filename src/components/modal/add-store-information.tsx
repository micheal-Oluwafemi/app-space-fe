"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type React from "react";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";

type FormData = {
  storeName: string;
  businessName?: string;
  businessSector: string;
  storeTagLine?: string;
  storeDescription?: string;
  storeCurrency: string;
  contactPhone: string;
  address?: string;
  country: string;
  state: string;
  city: string;
  zipCode?: string;
};

const AddStoreInformation = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      storeName: "Big Ray",
      businessName: "Big Ray",
      storeCurrency: "Nigerian Naira",
      contactPhone: "+2348024747446",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data, selectedImage);
    // Handle form submission
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-dvh w-full">
        <div className="mx-auto h-full max-w-3xl overflow-y-auto border border-red-500 bg-white">
          <div className="flex items-center border-b p-4">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="ml-4 text-xl font-medium">Store Information</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-50 p-4 md:p-6"
          >
            <div className="mb-4 rounded-md bg-white p-4 shadow-sm md:p-6">
              <h2 className="mb-2 text-lg font-medium text-gray-700">
                Store Logo
              </h2>
              <p className="mb-3 text-sm text-gray-500">Upload Store Logo</p>

              <div
                onClick={handleImageClick}
                className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-green-500"
              >
                {selectedImage ? (
                  <>
                    <Image
                      src={selectedImage || "/placeholder.svg"}
                      alt="Store Logo"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-1 right-1 rounded-full bg-white p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="absolute top-1 right-1 rounded-full bg-white p-1">
                      <X className="h-4 w-4" />
                    </div>
                    <div className="bg-opacity-60 absolute right-0 bottom-0 left-0 bg-black py-1 text-center text-xs text-white">
                      Change Image
                    </div>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="rounded-md bg-white p-4 shadow-sm md:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-700">
                Store Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="storeName"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Store Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="storeName"
                    {...register("storeName", { required: true })}
                    className="w-full rounded-md border p-2"
                  />
                  {errors.storeName && (
                    <p className="mt-1 text-xs text-red-500">
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="businessName"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Business Name (Optional)
                  </label>
                  <input
                    id="businessName"
                    {...register("businessName")}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessSector"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Business Sector <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="businessSector"
                    {...register("businessSector", { required: true })}
                    className="w-full appearance-none rounded-md border p-2"
                  >
                    <option value="">Select</option>
                    <option value="retail">Retail</option>
                    <option value="food">Food & Beverage</option>
                    <option value="tech">Technology</option>
                    <option value="fashion">Fashion</option>
                    <option value="health">Health & Wellness</option>
                  </select>
                  {errors.businessSector && (
                    <p className="mt-1 text-xs text-red-500">
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="storeTagLine"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Store Tag Line (Optional)
                  </label>
                  <input
                    id="storeTagLine"
                    {...register("storeTagLine")}
                    placeholder="Your business slogan e.g. Peak: It's in You"
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="storeDescription"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Store Description (Optional)
                  </label>
                  <textarea
                    id="storeDescription"
                    {...register("storeDescription")}
                    rows={4}
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="storeCurrency"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Store Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="storeCurrency"
                    {...register("storeCurrency", { required: true })}
                    className="w-full appearance-none rounded-md border p-2"
                  >
                    <option value="Nigerian Naira">Nigerian Naira</option>
                    <option value="US Dollar">US Dollar</option>
                    <option value="Euro">Euro</option>
                    <option value="British Pound">British Pound</option>
                  </select>
                  {errors.storeCurrency && (
                    <p className="mt-1 text-xs text-red-500">
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contactPhone"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center overflow-hidden rounded-md border">
                    <div className="border-r bg-white px-2 py-2">
                      <span className="flex items-center">
                        <span className="relative mr-1 inline-block h-3 w-5 overflow-hidden bg-green-600">
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="h-3 w-3 translate-x-1 rotate-45 transform bg-white"></span>
                          </span>
                        </span>
                        +234
                      </span>
                    </div>
                    <input
                      id="contactPhone"
                      {...register("contactPhone", { required: true })}
                      className="flex-1 p-2 outline-none"
                    />
                  </div>
                  {errors.contactPhone && (
                    <p className="mt-1 text-xs text-red-500">
                      This field is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-1 block text-sm text-gray-600"
                  >
                    Address (Optional)
                  </label>
                  <input
                    id="address"
                    {...register("address")}
                    placeholder="Enter address"
                    className="w-full rounded-md border p-2"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="country"
                      className="mb-1 block text-sm text-gray-600"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      {...register("country", { required: true })}
                      className="w-full appearance-none rounded-md border p-2"
                    >
                      <option value="">Select</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="ghana">Ghana</option>
                      <option value="kenya">Kenya</option>
                      <option value="southAfrica">South Africa</option>
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-500">
                        This field is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-1 block text-sm text-gray-600"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      {...register("state", { required: true })}
                      className="w-full appearance-none rounded-md border p-2"
                    >
                      <option value="">Select</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="rivers">Rivers</option>
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-500">
                        This field is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1 block text-sm text-gray-600"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      {...register("city", { required: true })}
                      className="w-full rounded-md border p-2"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">
                        This field is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="mb-1 block text-sm text-gray-600"
                    >
                      Zip Code (Optional)
                    </label>
                    <input
                      id="zipCode"
                      {...register("zipCode")}
                      className="w-full rounded-md border p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddStoreInformation;
