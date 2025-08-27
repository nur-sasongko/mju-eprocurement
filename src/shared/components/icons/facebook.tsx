import * as React from "react";
import { SVGProps } from "react";
import { cn } from "@/lib/cn";

export function FacebookIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6667 11.25H13.75L14.5834 7.91669H11.6667V6.25002C11.6667 5.39169 11.6667 4.58335 13.3334 4.58335H14.5834V1.78335C14.3117 1.74752 13.2859 1.66669 12.2025 1.66669C9.94004 1.66669 8.33337 3.04752 8.33337 5.58335V7.91669H5.83337V11.25H8.33337V18.3334H11.6667V11.25Z"
        fill="#525D69"
      />
    </svg>
  );
}
