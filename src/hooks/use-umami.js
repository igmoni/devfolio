"use client";
import { useCallback } from "react";

export function useUmami() {
  const trackEvent = useCallback((event) => {
    try {
      if (typeof window !== "undefined" && window.umami) {
        window.umami.track(event.name, event.data);
      }
    } catch (error) {
      console.error("Error tracking Umami event:", error);
    }
  }, []);

  return { trackEvent };
}
