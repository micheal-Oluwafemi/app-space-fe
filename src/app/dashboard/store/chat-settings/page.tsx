"use client";

import PageHeaders from "@/components/PageHeaders";
import React from "react";
import { useForm } from "react-hook-form";
import ChatProviderSelection from "./chat-provider-selection";

const page = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "active",
      selectedProvider: "chatbot",
      display_name: "Customer Support",
      response_time_message: "Typically replies within 10 minutes",
      whatsapp_number: "",
      default_whatsapp_message:
        "Hi, Welcome to our store! How can we help you today?",
    },
  });

  const toggle = watch("status");

  return (
    <div className="h-full w-full pt-3 pb-10">
      <PageHeaders pageType="Chat Integration Settings" />

      <div className="mt-6 mr-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Enable Chat Integration</h1>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={watch("status") === "active"}
              onChange={(e) =>
                setValue("status", e.target.checked ? "active" : "inactive")
              }
              className="peer sr-only"
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>

            {toggle === "active" ? (
              <span className="absolute inset-0 ml-3 flex items-center justify-center text-xs font-medium text-white">
                Enabled
              </span>
            ) : (
              <span className="absolute inset-0 ml-3 flex items-center justify-center text-xs font-medium text-white">
                Disabled
              </span>
            )}
          </label>
        </div>

        <div>
          <ChatProviderSelection
            type={toggle}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
