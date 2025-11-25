'use client'
import React from "react";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import ArrowLeft from "@/svgs/ArrowLeft";

const BackButton = () => {
  return (
    <div>
      <Button variant="ghost" asChild className="group">
        <Link href="/blog" className="flex items-center space-x-2">
          <ArrowLeft className="size-4" />
          <span>Back to Blog</span>
        </Link>
      </Button>
    </div>
  );
};

export default BackButton;
