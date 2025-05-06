"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-2">
      <h1>Coming Soon: Landing page</h1>
      <Button
        type="button"
        onClick={() => navigate.push("/auth/login")}
        className="cursor-pointer"
      >
        Go to Login
      </Button>
    </div>
  );
}
