"use client";

import { useEffect } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export default function UmamiClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SRC; 

  useEffect(() => {
    if (window.umami) {
      const url =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");

      window.umami.track(url);
    }
  }, [pathname, searchParams]);

  if (!websiteId || !scriptUrl) return null;

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
