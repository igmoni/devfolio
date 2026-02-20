"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import Eye from "@/svgs/Eye";

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
    <div className="border-secondary/20 mx-auto flex w-fit items-center gap-5 rounded-md border p-3">
      <div className="bg-accent dark:bg-accent h-10 w-10 rounded-md p-2">
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
