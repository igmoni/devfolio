"use client";
import { useState } from "react";
import Copied from "@/svgs/Copied";
import Copy from "@/svgs/Copy";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CodeCopyButton = ({ code, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-5 right-5 rounded-md opacity-0 transition-all duration-200 group-hover:opacity-100 cursor-pointer"
    >
      {isCopied ? (
        <Tooltip>
          <TooltipTrigger className="cursor-pointer" asChild>
            <Copied className="h-4 w-4 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>Copied to clipboard!</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger className="cursor-pointer" asChild>
            <Copy className="h-4 w-4 text-secondary" />
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      )}
    </button>
  );
};

export default CodeCopyButton;
