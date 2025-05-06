import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: { className: string }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
