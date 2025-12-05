"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";

// 👉 CHANGE THESE TO YOUR REAL LINKS

const GlobalShortcuts = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const goTo = (path) => router.push(path);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const toggelChat = () => {
    window.dispatchEvent(new CustomEvent("toggle-chat"));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(process.env.EMAIL);
      toast.success("Email Copied");
    } catch (e) {
      console.error("Clipboard error", e);
      toast.error("Clipboard error");
    }
  };

  const sharePage = async () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Page URL Copied!");
      } catch (err) {
        console.error(err);
        toast.error("Couldn't copy URL");
      }
    }
  };

  const openGithub = () => window.open(process.env.GITHUB_URL, "_blank");
  const openSource = () => window.open(process.env.SOURCE_CODE_URL, "_blank");
  const openSpotify = () => window.open(process.env.SPOTIFY_URL, "_blank");

  const toggleOnekoSleep = () =>
    window.dispatchEvent(new CustomEvent("oneko-toggle-sleep"));

  const toggleOnekoAvatar = () =>
    window.dispatchEvent(new CustomEvent("oneko-toggle-avatar"));

  useKeyboardShortcuts([
    { combo: "h", callback: () => goTo("/") },
    { combo: "a", callback: () => goTo("/about") },
    { combo: "p", callback: () => goTo("/projects") },
    { combo: "b", callback: () => goTo("/blog") },
    { combo: "c", callback: () => goTo("/contact") },

    { combo: "t", callback: toggleTheme },
    { combo: "q", callback: toggleChat },
    { combo: "ctrl+k", callback: () => setCommandOpen((o) => !o) },
    { combo: "shift+arrowup", callback: scrollToTop },

    { combo: "shift+e", callback: copyEmail },
    { combo: "shift+s", callback: sharePage },
    { combo: "shift+g", callback: openGitHub },
    { combo: "shift+v", callback: openSource },
    { combo: "shift+m", callback: openSpotify },
    { combo: "shift+z", callback: toggleOnekoSleep },
    { combo: "shift+x", callback: toggleOnekoAvatar },

    { combo: "ctrl+,", callback: () => setHelpOpen(true) },

    {
      combo: "escape",
      callback: () => {
        setCommandOpen(false);
        setHelpOpen(false);
      },
    },
  ]);
  return( 
  <>
  <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
    <CommandInput placeholder="Search ommands or sections" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>

      <COmmandGroup heading="Navigation"></COmmandGroup>
    </CommandList>
  </CommandDialog>
  </>
  );
};

export default GlobalShortcuts;
