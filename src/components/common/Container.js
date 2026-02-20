import React from "react";

import { cn } from "@/lib/utils";

const Container = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("animate-fade-in-blur mx-auto w-full max-w-5xl", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
