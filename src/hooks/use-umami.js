"use client";
import { useCallback } from "react";

export function useUmami() {
  const trackEvent = useCallback((name, data = {}) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track(name, data);
    }
  }, []);

  return { trackEvent };
}
