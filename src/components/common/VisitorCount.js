"use client";

import Eye from "@/svgs/Eye";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
    fetch(`/api/visitors?path=${pathname}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setVisitors(data.visitors))
      .catch(() => setVisitors(0));
  }, [pathname]);

  return (
    <div className="flex mx-auto w-fit gap-5 items-center p-3 rounded-md border border-secondary/20">
      <div className="w-10 h-10 p-2 rounded-md bg-gray-200 dark:bg-gray-800">
        <Eye />
      </div>

      <p>
        You are the{" "}
        <span className="font-semibold">
          {visitors ?? "..."}
          {visitors && <sup>{getOrdinalSuffix(visitors)}</sup>}
        </span>{" "}
        visitor
      </p>
    </div>
  );
}
