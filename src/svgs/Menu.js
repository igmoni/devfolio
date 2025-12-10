import React from "react";
import { cn } from "@/lib/utils";

export default function Menu({ className }) {
  return (
    <svg
      className={cn('w-6 h-6',className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M216,80H40a8,8,0,0,1,0-16H216a8,8,0,0,1,0,16Zm0,56H40a8,8,0,0,1,0-16H216a8,8,0,0,1,0,16Zm0,56H40a8,8,0,0,1,0-16H216a8,8,0,0,1,0,16Z" />
    </svg>
  );
}
