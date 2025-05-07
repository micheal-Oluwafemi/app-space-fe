"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
type ChatProviderSelectionProps = {
  type: string;
  register: any;
  errors: any;
};

type ChatProvider = "whatsapp" | "chatbot";

export default function ChatProviderSelection({
  type,
  register,
  errors,
}: ChatProviderSelectionProps) {
  const [selectedProvider, setSelectedProvider] =
    useState<ChatProvider>("chatbot");

  return (
    <div className="mt-7 w-full">
      <AnimatePresence>
        {type === "active" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <h2 className="mb-3 font-semibold">Chat Provider:</h2>
            <div className="space-y-4">
              <div
                className={cn(
                  "flex cursor-pointer items-center rounded-lg border p-4 transition-colors",
                  selectedProvider === "whatsapp"
                    ? "border-green-300"
                    : "border-green-200",
                )}
                onClick={() => setSelectedProvider("whatsapp")}
              >
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="h-6 w-6"
                  >
                    <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5723 2.37892 15.0721 3.06513 16.3915L2.0332 21.1252C1.94156 21.5344 2.30144 21.9154 2.71576 21.8489L7.6084 21.0146C8.87369 21.6411 10.3042 22 11.8078 22H12.001C17.5238 22 22.001 17.5228 22.001 12C22.001 6.47715 17.5238 2 12.001 2ZM8.00156 14C7.4493 14 7.00156 13.5523 7.00156 13C7.00156 12.4477 7.4493 12 8.00156 12C8.55384 12 9.00156 12.4477 9.00156 13C9.00156 13.5523 8.55384 14 8.00156 14ZM12.001 14C11.4487 14 11.001 13.5523 11.001 13C11.001 12.4477 11.4487 12 12.001 12C12.5532 12 13.001 12.4477 13.001 13C13.001 13.5523 12.5532 14 12.001 14ZM16.001 14C15.4487 14 15.001 13.5523 15.001 13C15.001 12.4477 15.4487 12 16.001 12C16.5532 12 17.001 12.4477 17.001 13C17.001 13.5523 16.5532 14 16.001 14Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">WhatsApp</h3>
                  <p className="text-gray-600">
                    Connect with customers via WhatsApp
                  </p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300">
                  {selectedProvider === "whatsapp" && (
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "flex cursor-pointer items-center rounded-lg border p-4 transition-colors",
                  selectedProvider === "chatbot"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200",
                )}
                onClick={() => setSelectedProvider("chatbot")}
              >
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="h-6 w-6"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 14.136 2.76511 16.0877 4.02424 17.5737C4.11617 17.6839 4.18065 17.8185 4.2 17.962L4.5 21.398C4.552 22.006 5.17 22.428 5.766 22.234L9.13 21.166C9.159 21.156 9.189 21.146 9.22 21.138C9.33048 21.1127 9.4451 21.1227 9.55 21.168C10.3184 21.3883 11.1359 21.5 12 21.5C17.523 21.5 22 17.023 22 11.5C22 5.977 17.523 2 12 2ZM8 13.75C7.31 13.75 6.75 13.19 6.75 12.5C6.75 11.81 7.31 11.25 8 11.25C8.69 11.25 9.25 11.81 9.25 12.5C9.25 13.19 8.69 13.75 8 13.75ZM12 13.75C11.31 13.75 10.75 13.19 10.75 12.5C10.75 11.81 11.31 11.25 12 11.25C12.69 11.25 13.25 11.81 13.25 12.5C13.25 13.19 12.69 13.75 12 13.75ZM16 13.75C15.31 13.75 14.75 13.19 14.75 12.5C14.75 11.81 15.31 11.25 16 11.25C16.69 11.25 17.25 11.81 17.25 12.5C17.25 13.19 16.69 13.75 16 13.75Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Chatbot</h3>
                  <p className="text-gray-600">Use AI-powered chatbot</p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-500">
                  {selectedProvider === "chatbot" && (
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="display_name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Display Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="display_name"
                  type="text"
                  {...register("display_name", {
                    required: "The Field is required",
                  })}
                />

                {errors.display_name && (
                  <span className="text-sm text-red-500">
                    {errors.display_name.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="response_time_message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Response Time Message <span className="text-red-500">*</span>
                </label>
                <Input
                  id="response_time_message"
                  type="text"
                  {...register("response_time_message", {
                    required: "The Field is required",
                  })}
                />

                {errors.response_time_message && (
                  <span className="text-sm text-red-500">
                    {errors.response_time_message.message}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {""}
      <AnimatePresence mode="wait">
        {selectedProvider === "whatsapp" && type === "active" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-10 space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="whatsapp_number"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Whatsapp Number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="whatsapp_number"
                  type="text"
                  placeholder="e.g +2348012345678"
                  {...register("whatsapp_number", {
                    required: "The Field is required",
                  })}
                />

                <p className="text-xs text-gray-500">
                  Include country code (e.g +234 for Nigeria)
                </p>

                {errors.whatsapp_number && (
                  <span className="text-sm text-red-500">
                    {errors.whatsapp_number.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="default_whatsapp_message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Default Welcome Message{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="default_whatsapp_message"
                  rows={6}
                  type="text"
                  {...register("default_whatsapp_message", {
                    required: "The Field is required",
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2"
                ></textarea>

                {errors.default_whatsapp_message && (
                  <span className="text-sm text-red-500">
                    {errors.default_whatsapp_message.message}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {selectedProvider === "chatbot" && type === "active" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-10 space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="chatbot_Id"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Chatbot ID <span className="text-red-500">*</span>
                </label>
                <Input
                  id="chatbot_Id"
                  type="text"
                  placeholder="e.g +2348012345678"
                  {...register("chatbot_Id", {
                    required: "The Field is required",
                  })}
                />

                <p className="text-xs text-gray-500">
                  This ID is provided by your chatbot service
                </p>

                {errors.chatbot_Id && (
                  <span className="text-sm text-red-500">
                    {errors.chatbot_Id.message}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>{" "}
      {type === "active" && (
        <div className="mt-10">
          <h3 className="font-semibold">Chat Appearance</h3>

          <div></div>
        </div>
      )}
    </div>
  );
}
