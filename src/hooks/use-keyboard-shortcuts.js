"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { keyboardShortcuts } from "@/config/KeyboardShortcut";
import { heroConfig, socialLinks } from "@/config/Hero";
import { githubConfig } from "@/config/Github";

const EMAIL_LINK =
  socialLinks.find((link) => link.name === "Email")?.href ??
  "mailto:mohansp119@gmail.com";

const GITHUB_PROFILE_URL =
  socialLinks.find((link) => link.name === "Github")?.href ??
  `https://github.com/${githubConfig.username}`;

const SOURCE_CODE_URL = "https://github.com/igmoni/devfolio";
const SPOTIFY_URL = "https://open.spotify.com";

function isTextInput(target) {
  if (!target) return false;
  const tag = target.tagName?.toLowerCase();
  const editable =
    target.isContentEditable ||
    target.getAttribute?.("contenteditable") === "true";

  return (
    editable ||
    tag === "input" ||
    tag === "textarea" ||
    target.type === "text" ||
    target.type === "search" ||
    target.type === "email" ||
    target.type === "url"
  );
}

function keybindFromEvent(event) {
  const parts = [];

  if (event.ctrlKey || event.metaKey) {
    parts.push("Ctrl");
  }
  if (event.shiftKey) {
    parts.push("Shift");
  }

  let key = event.key;

  if (key === "ArrowUp") key = "↑";
  else if (key === ",") key = ",";
  else if (key.length === 1) key = key.toUpperCase();

  parts.push(key);

  return parts.join(" + ");
}

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [recentShortcuts, setRecentShortcuts] = useState([]);

  const shortcutGroups = useMemo(() => {
    const goTo = (href) => {
      if (!href) return;
      router.push(href);
    };

    const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };

    const toggleChat = () => {
      // Placeholder: hook into chat widget when available
      const event = new CustomEvent("toggle-chat");
      window.dispatchEvent(event);
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const copyEmail = async () => {
      try {
        const emailUrl = new URL(EMAIL_LINK);
        const email =
          emailUrl.pathname.replace("/", "") || "mohansp119@gmail.com";
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
        }
      } catch {
        // Fallback: just copy full mailto link
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(EMAIL_LINK);
        }
      }
    };

    const sharePage = async () => {
      const url = typeof window !== "undefined" ? window.location.href : "";
      const title =
        typeof document !== "undefined"
          ? document.title
          : heroConfig?.title ?? "Mohan - Devfolio";

      if (navigator.share) {
        try {
          await navigator.share({ url, title });
          return;
        } catch (_) {
          // ignore and fall back to clipboard
        }
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    };

    const openGitHub = () => {
      window.open(GITHUB_PROFILE_URL, "_blank", "noopener,noreferrer");
    };

    const openSource = () => {
      window.open(SOURCE_CODE_URL, "_blank", "noopener,noreferrer");
    };

    const openSpotify = () => {
      window.open(SPOTIFY_URL, "_blank", "noopener,noreferrer");
    };

    const toggleOnekoSleep = () => {
      window.dispatchEvent(new CustomEvent("oneko-toggle-sleep"));
    };

    const toggleOnekoAvatar = () => {
      window.dispatchEvent(new CustomEvent("oneko-toggle-avatar"));
    };

    const openHelp = () => {
      setIsHelpOpen(true);
    };

    const groups = keyboardShortcuts({
      goTo,
      toggleTheme,
      toggleChat,
      scrollToTop,
      copyEmail,
      sharePage,
      openGitHub,
      openSource,
      openSpotify,
      toggleOnekoSleep,
      toggleOnekoAvatar,
      openHelp,
    });

    // Annotate each shortcut with its category
    return {
      navigation: (groups.navigation || []).map((s) => ({
        ...s,
        category: "navigation",
      })),
      features: (groups.features || []).map((s) => ({
        ...s,
        category: "features",
      })),
      actions: (groups.actions || []).map((s) => ({
        ...s,
        category: "actions",
      })),
      help: (groups.help || []).map((s) => ({
        ...s,
        category: "help",
      })),
    };
  }, [router, theme, setTheme]);

  const allShortcuts = useMemo(
    () => [
      ...shortcutGroups.navigation,
      ...shortcutGroups.features,
      ...shortcutGroups.actions,
      ...shortcutGroups.help,
    ],
    [shortcutGroups]
  );

  const runShortcut = useCallback((shortcut) => {
    if (!shortcut) return;
    if (typeof shortcut.onSelect === "function") {
      shortcut.onSelect();
    }

    setRecentShortcuts((prev) => {
      const existing = prev.filter(
        (item) =>
          !(
            item.name === shortcut.name &&
            item.keybind === shortcut.keybind &&
            item.category === shortcut.category
          )
      );
      return [shortcut, ...existing].slice(0, 6);
    });
  }, []);

  useEffect(() => {
    let lastKey = null;
    let lastTime = 0;

    const handleKeyDown = (event) => {
      if (isTextInput(event.target)) return;

      // Let focused cmdk input handle its own keys, except Escape
      const isInsideCommand =
        event.target?.closest?.("[data-slot='command']") !== null;

      if ((isPaletteOpen || isHelpOpen) && event.key === "Escape") {
        setIsPaletteOpen(false);
        setIsHelpOpen(false);
        return;
      }

      if (isInsideCommand && !event.ctrlKey && !event.metaKey) {
        return;
      }

      const keybind = keybindFromEvent(event);

      // Open / close global overlays
      if (keybind === "Ctrl + K") {
        event.preventDefault();
        setIsPaletteOpen((open) => !open);
        return;
      }

      if (keybind === "Ctrl + ,") {
        event.preventDefault();
        setIsHelpOpen((open) => !open);
        return;
      }

      // If any overlay is open, do not trigger other shortcuts
      if (isPaletteOpen || isHelpOpen) return;

      const shortcut = allShortcuts.find((s) => s.keybind === keybind);

      if (shortcut) {
        event.preventDefault();
        runShortcut(shortcut);
      } else {
        // Sequential shortcut example: G then H
        const now = Date.now();
        if (lastKey === "G" && keybind === "H" && now - lastTime <= 1000) {
          event.preventDefault();
          const githubShortcut = allShortcuts.find(
            (s) => s.name === "GitHub Profile"
          );
          if (githubShortcut) {
            runShortcut(githubShortcut);
          }
        }
        lastKey = keybind;
        lastTime = now;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allShortcuts, isPaletteOpen, isHelpOpen, runShortcut]);

  return {
    shortcuts: shortcutGroups,
    allShortcuts,
    recentShortcuts,
    isPaletteOpen,
    setIsPaletteOpen,
    isHelpOpen,
    setIsHelpOpen,
    runShortcut,
  };
}
