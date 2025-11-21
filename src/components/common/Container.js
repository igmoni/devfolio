import React from "react";
import { cn } from "@/lib/utils";

const Container = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("w-full max-w-5xl mx-auto animate-fade-in-blur", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
