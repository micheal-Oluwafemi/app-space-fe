"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TbCameraPlus } from "react-icons/tb";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { FiLock, FiUnlock } from "react-icons/fi";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { GetRequest, PostRequest } from "@/lib/http";
import { useRouter } from "next/navigation";
import { AllStoresTypes } from "@/types/dashboard/store.types";
import PageHeaders from "@/components/PageHeaders";

const SetupStore = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [storeData, setStoreData] = useState<AllStoresTypes>();
  const storeCode = useSelector((state: any) => state.user.setSelectedStore);
  const dispatch = useDispatch();
  const router = useRouter();

  // Add state for form editing
  const [isEditable, setIsEditable] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      store_name: "",
      industry_type: "",
      product_type: "",
      store_abbreviation: "",
      store_description: "",
      store_location: "",
    },
  });

  // Watched Form Fields
  const storeName = watch("store_name");
  const industry = watch("industry_type");
  const product = watch("product_type");

  const fetchStoreData = async () => {
    if (storeCode) {
      const { data, err } = await GetRequest({
        url: `/api/store/${storeCode}/getOne`,
        setState: setIsLoading,
      });

      if (!err) {
        setStoreData(data.store);
        // Set form values from store data
        populateFormWithStoreData(data.store);
        // Set preview image if store logo exists
        if (data.store.store_logo) {
          setPreview(data.store.store_logo);
        }
      } else {
        toast.error(err);
      }
    }
    setIsLoading(false);
  };

  // Function to populate form with store data
  const populateFormWithStoreData = (data: AllStoresTypes) => {
    if (!data) return;

    setValue("store_name", data.store_name || "");
    setValue("industry_type", data.industry_type || "");
    setValue("product_type", data.product_type || "");
    setValue("store_abbreviation", data.store_abbreviation || "");
    setValue("store_description", data.store_description || "");
    setValue("store_location", data.store_location || "");
  };

  useEffect(() => {
    fetchStoreData();
  }, [storeCode]);

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      toast.info("Form is now editable");
    } else {
      // Reset form to original values if canceling edit
      populateFormWithStoreData(storeData as AllStoresTypes);
      toast.info("Changes discarded");
    }
  };

  const onSubmit = async (formData: any) => {
    // Only proceed if form is editable
    if (!isEditable) {
      toast.info("Please enable editing first");
      return;
    }

    // Check if image is selected or already exists
    if (!selectedImage && !preview) {
      setImageError("Business logo is required");
      toast.error("Please upload a business logo");
      return;
    }

    // Check required fields
    if (!industry || !product) {
      toast.info("Form Error", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    // Using formAppend because of file Upload
    const submitData = new FormData();

    // Add the file to FormData if a new image was selected
    if (selectedImage) {
      submitData.append("store_logo", selectedImage);
    }

    // Add other form fields to FormData
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }

    // Use update endpoint if store already exists
    const endpoint = storeData
      ? `/api/store/${storeCode}/update`
      : "/api/store/create";

    const { data, err } = await PostRequest({
      url: endpoint,
      body: submitData,
      setState: setIsSubmitting,
    });

    if (!err) {
      toast.success(
        storeData ? "Store updated successfully" : "Store created successfully",
      );
      setIsEditable(false);
      fetchStoreData();
    } else {
      toast.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow image change if form is editable
    if (!isEditable) {
      toast.info("Please enable editing first");
      return;
    }

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

  return (
    <div className="w-full pt-5 pb-10 lg:flex lg:items-center lg:justify-center lg:pb-0">
      <div className="">
        <div className="flex w-full items-center justify-between">
          <PageHeaders pageType="Store Information" />

          <button
            onClick={toggleEditMode}
            className={`flex cursor-pointer items-center gap-2 rounded-md border-[1.4px] p-2 px-3 ${
              isEditable
                ? "border-orange-500 text-orange-500"
                : "border-baseColor text-baseColor"
            }`}
          >
            {isEditable ? (
              <>
                <FiUnlock size={20} />
                Cancel Editing
              </>
            ) : (
              <>
                <TbEdit size={20} />
                Edit Store Information
              </>
            )}
          </button>
        </div>
        <div className="mt-8 lg:w-[700px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="mr-2 animate-spin" />
              <span>Loading store information...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3">
                <label
                  htmlFor="logo"
                  className="block text-base font-medium text-gray-700"
                >
                  Business Logo <span className="text-red-500">*</span>
                </label>
                <div className="flex items-end gap-4">
                  <label
                    htmlFor="logo"
                    className={`${isEditable ? "cursor-pointer" : "cursor-not-allowed"} relative`}
                  >
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
                      {!isEditable && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/10">
                          <FiLock size={24} className="text-white" />
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
                    disabled={!isEditable}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("logo")?.click()}
                    className={`rounded-md px-4 py-2 text-sm font-medium ${
                      isEditable
                        ? "bg-gray-800 text-white"
                        : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                    disabled={!isEditable}
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
                <div className="relative space-y-1">
                  <label
                    htmlFor="store_name"
                    className="block text-base font-medium text-gray-700"
                  >
                    Store Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="e.g. Acme Corporation"
                      {...register("store_name", {
                        required: "This Field is required",
                      })}
                      className="pr-8 text-sm placeholder:text-sm"
                      disabled={!isEditable}
                    />
                    {!isEditable && (
                      <FiLock
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
                        size={16}
                      />
                    )}
                  </div>
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
                  <div className="relative">
                    <Input
                      placeholder="e.g. ACME"
                      {...register("store_abbreviation", {
                        required: "This Field is required",
                      })}
                      className="pr-8 text-sm placeholder:text-sm"
                      disabled={!isEditable}
                    />
                    {!isEditable && (
                      <FiLock
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
                        size={16}
                      />
                    )}
                  </div>
                  {errors.store_abbreviation && (
                    <p className="text-xs text-red-500">
                      {errors.store_abbreviation.message?.toString()}
                    </p>
                  )}
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
                  <div className="relative">
                    <Select
                      value={watch("industry_type")}
                      onValueChange={(value) =>
                        isEditable && setValue("industry_type", value)
                      }
                      disabled={!isEditable}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                        {!isEditable && (
                          <FiLock
                            className="absolute right-8 text-gray-400"
                            size={16}
                          />
                        )}
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
                  </div>
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
                  <div className="relative">
                    <Select
                      value={watch("product_type")}
                      onValueChange={(value) =>
                        isEditable && setValue("product_type", value)
                      }
                      disabled={!isEditable}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                        {!isEditable && (
                          <FiLock
                            className="absolute right-8 text-gray-400"
                            size={16}
                          />
                        )}
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
                  </div>
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
                  <div className="relative">
                    <Input
                      {...register("store_location")}
                      className="pr-8 text-sm placeholder:text-sm"
                      disabled={!isEditable}
                    />
                    {!isEditable && (
                      <FiLock
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
                        size={16}
                      />
                    )}
                  </div>
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
                  <div className="relative">
                    <textarea
                      {...register("store_description")}
                      id=""
                      rows={5}
                      disabled={!isEditable}
                      className={`file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-12 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base ${!isEditable ? "bg-gray-50" : ""}`}
                    ></textarea>
                    {!isEditable && (
                      <FiLock
                        className="absolute top-3 right-3 text-gray-400"
                        size={16}
                      />
                    )}
                  </div>
                </div>

                {isEditable && (
                  <Button
                    type="submit"
                    className="bg-baseColor hover:bg-baseColor-light h-[44px] w-full cursor-pointer lg:col-span-2 lg:h-12"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-1">
                        <Loader2 className="animate-spin" />
                        {storeData
                          ? "Updating store..."
                          : "Setting up store..."}
                      </div>
                    ) : (
                      <span>{storeData ? "Update Store" : "Proceed"}</span>
                    )}
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupStore;
