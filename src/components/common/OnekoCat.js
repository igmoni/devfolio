"use client";

import { useEffect } from "react";

import { catConfig } from "@/config/Cat";

export default function OnekoCat() {
  useEffect(() => {
    if (!catConfig.enabled) return;

    // prevent duplicate loads
    if (window.__ONEKO_LOADED__) return;
    window.__ONEKO_LOADED__ = true;

    const script = document.createElement("script");
    script.src = "/oneko/Oneko.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
      window.__ONEKO_LOADED__ = false;
    };
  }, []);

  return null;
}
