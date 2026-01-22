"use client";
import { useState } from "react";
import Copied from "@/svgs/Copied";
import Copy from "@/svgs/Copy";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CodeCopyButton = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false, 2000));
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  return (
    <form
      className="absolute top-5 right-5 rounded-md oapcity transition-all duration-200 group-hover:oapcity-10 cursor-pointer"
      title={isCopied ? "Copied!" : "Copy code"}
      action={copyToClipboard}
    >
      {isCopied ? (
        <Tooltip>
          <TooltipTrigger className="cursor-pointer">
            <Copied className="h-4 w-4 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>Copied to clipboard!</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger className="cursor-pointer">
            <Copy className="h-4 w-4 text-secondary" />
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
      )}
    </form>
  );
};

export default CodeCopyButton;
