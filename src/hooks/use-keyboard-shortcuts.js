"use client";

import { useEffect } from "react";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768;
}

function normalizeCombo(event) {
  const parts = [];

  if (event.ctrlKey || event.metaKey) parts.push("ctrl");
  if (event.shiftKey) parts.push("shift");
  if (event.altKey) parts.push("alt");

  let key = event.key.toLowerCase();

  if (key === "arrowup") key = "arrowup";
  if (key === "arrowdown") key = "arrowdown";
  if (key === "arrowleft") key = "arrowleft";
  if (key === "arrowright") key = "arrowright";

  parts.push(key);
  return parts.join("+");
}

export function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    if (isMobile()) return;

    const handler = (event) => {
      const active = document.activeElement;

      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
      ) {
        return;
      }

      const combo = normalizeCombo(event);

      for (const sc of shortcuts) {
        if (sc.combo === combo) {
          event.preventDefault();
          sc.callback(event);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}
