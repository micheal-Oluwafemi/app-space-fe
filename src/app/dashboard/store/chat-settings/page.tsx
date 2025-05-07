import PageHeaders from "@/components/PageHeaders";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      status: "active",
    },
  });

  return (
    <div className="h-full w-full pt-3 pb-10">
      <div className="flex w-full flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <PageHeaders pageType="Chat Integration Settings" />

        <div className="mr-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h1>Enable Chat Integration</h1>

            <Switch
              id="status"
              checked={watch("status") === "active"}
              onCheckedChange={(checked) =>
                setValue("status", checked ? "active" : "inactive")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
