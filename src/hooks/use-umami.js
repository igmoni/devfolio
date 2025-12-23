"use client";
import { useCallback } from "react";

export function useUmami() {
  const trackEvent = useCallback((name, data = {}) => {
    if (typeof window === "undefined") return;

    if (window.umami?.track) {
      window.umami.track(name, data);
    } else if (process.env.NODE_ENV === "development") {
      console.warn("[Umami] track skipped:", name, data);
    }
  }, []);

  return { trackEvent };
}
