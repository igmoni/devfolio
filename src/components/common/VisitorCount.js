"use client";

import Eye from "@/svgs/Eye";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// ordinal suffix function
function getOrdinalSuffix(n) {
  const j = n % 10;
  const k = n % 100;

  if (k >= 11 && k <= 13) return "th";
  if (j === 1) return "st";
  if (j === 2) return "nd";
  if (j === 3) return "rd";
  return "th";
}

export default function VisitorCount() {
  const pathname = usePathname();
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const res = await fetch(
          `/api/visitors?path=${encodeURIComponent(pathname)}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setVisitors(0);
          return;
        }

        const data = await res.json();
        const count =
          typeof data.visitors === "number"
            ? data.visitors
            : parseInt(data.visitors) || 0;

        setVisitors(count);
      } catch {
        setVisitors(0);
      }
    }

    fetchVisitors();
  }, [pathname]);

  const suffix = visitors ? getOrdinalSuffix(visitors) : "th";

  return (
    <div className="flex mx-auto w-fit border border-secondary/20 gap-5 items-center bg-[#fbfbfb] shadow-[inset_0_0_3px_1px_rgba(0,0,0,0.1)] dark:bg-[#121212] p-3 rounded-md">
      <div className="w-10 h-10 bg-[#e3e3e3] dark:bg-[#272727]/70 rounded-md p-2">
        <Eye />
      </div>

      <p className="text-base text-secondary">
        You are the{" "}
        <span className="text-primary font-semibold dark:text-white">
          {visitors !== null ? visitors : "..."}
          {visitors !== null && <sup>{suffix}</sup>}
        </span>{" "}
        visitor
      </p>
    </div>
  );
}
