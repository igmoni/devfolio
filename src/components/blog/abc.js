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

// 👉 CHANGE THESE TO YOUR REAL LINKS
const EMAIL = "mohansp119@example.com";
const GITHUB_URL = "https://github.com/igmoni";
const SOURCE_CODE_URL = "https://github.com/igmoni/devfolio";
const SPOTIFY_URL = "https://open.spotify.com/track/xxxxxxxxxxxx";



export function GlobalShortcuts() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // 🔧 Actual actions
  const goTo = (path) => router.push(path);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleChat = () => {
    // You can listen for this event in your chat component
    window.dispatchEvent(new CustomEvent("toggle-chat"));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch (err) {
      console.error("Clipboard error", err);
    }
  };

  const sharePage = async () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.error("Share cancelled or failed", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch (err) {
        console.error("Clipboard error", err);
      }
    }
  };

  const openGitHub = () => {
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
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

  // 🎹 All shortcuts
  useKeyboardShortcuts([
    // Navigation
    { combo: "h", callback: () => goTo("/") },
    { combo: "a", callback: () => goTo("/about") },
    { combo: "p", callback: () => goTo("/projects") },
    { combo: "b", callback: () => goTo("/blog") },
    { combo: "c", callback: () => goTo("/contact") },

    // Features
    { combo: "t", callback: toggleTheme },
    { combo: "q", callback: toggleChat },
    { combo: "ctrl+k", callback: () => setCommandOpen((o) => !o) },
    { combo: "shift+arrowup", callback: scrollToTop },

    // Actions
    { combo: "shift+e", callback: copyEmail },
    { combo: "shift+s", callback: sharePage },
    { combo: "shift+g", callback: openGitHub },
    { combo: "shift+v", callback: openSource },
    { combo: "shift+m", callback: openSpotify },
    { combo: "shift+z", callback: toggleOnekoSleep },
    { combo: "shift+x", callback: toggleOnekoAvatar },

    // Help
    { combo: "ctrl+,", callback: () => setHelpOpen(true) },

    // Escape closes things
    {
      combo: "escape",
      callback: () => {
        setCommandOpen(false);
        setHelpOpen(false);
      },
    },
  ]);

  return (
    <>
      {/* 🧭 COMMAND PALETTE (Ctrl + K) */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search commands or sections..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => {
                goTo("/");
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>🏠</span>
                <div>
                  <p className="font-medium">Home</p>
                  <p className="text-xs opacity-70">
                    Navigate to the homepage
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">H</kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                goTo("/about");
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>👤</span>
                <div>
                  <p className="font-medium">About</p>
                  <p className="text-xs opacity-70">
                    Learn more about who I am
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">A</kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                goTo("/projects");
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>💡</span>
                <div>
                  <p className="font-medium">Projects</p>
                  <p className="text-xs opacity-70">View all projects</p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">P</kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                goTo("/blog");
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>✍️</span>
                <div>
                  <p className="font-medium">Blog</p>
                  <p className="text-xs opacity-70">
                    Browse all blog posts
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">B</kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                goTo("/contact");
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>📬</span>
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-xs opacity-70">Get in touch</p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">C</kbd>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Features">
            <CommandItem
              onSelect={() => {
                toggleTheme();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>🌗</span>
                <div>
                  <p className="font-medium">Toggle Theme</p>
                  <p className="text-xs opacity-70">
                    Switch between light & dark
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">T</kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                toggleChat();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>💬</span>
                <div>
                  <p className="font-medium">Toggle Chat</p>
                  <p className="text-xs opacity-70">
                    Open or close the chat bubble
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">Q</kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                scrollToTop();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>⬆️</span>
                <div>
                  <p className="font-medium">Scroll to Top</p>
                  <p className="text-xs opacity-70">
                    Scroll to top of the page
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+↑
              </kbd>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                copyEmail();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>📧</span>
                <div>
                  <p className="font-medium">Copy Email</p>
                  <p className="text-xs opacity-70">
                    Copy email address to clipboard
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+E
              </kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                sharePage();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>🔗</span>
                <div>
                  <p className="font-medium">Share Page</p>
                  <p className="text-xs opacity-70">
                    Share the current page
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+S
              </kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                openGitHub();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>🐙</span>
                <div>
                  <p className="font-medium">View GitHub Profile</p>
                  <p className="text-xs opacity-70">
                    Open GitHub in new tab
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+G
              </kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                openSource();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>📂</span>
                <div>
                  <p className="font-medium">View Source Code</p>
                  <p className="text-xs opacity-70">
                    View this website's code
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+V
              </kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                openSpotify();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>🎵</span>
                <div>
                  <p className="font-medium">Open Spotify Song</p>
                  <p className="text-xs opacity-70">
                    Open the linked Spotify track
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+M
              </kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                toggleOnekoSleep();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>😴</span>
                <div>
                  <p className="font-medium">Toggle Oneko Sleep</p>
                  <p className="text-xs opacity-70">
                    Put Oneko to sleep or wake it
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+Z
              </kbd>
            </CommandItem>

            <CommandItem
              onSelect={() => {
                toggleOnekoAvatar();
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>🐾</span>
                <div>
                  <p className="font-medium">Change Oneko Avatar</p>
                  <p className="text-xs opacity-70">
                    Cycle through different avatars
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Shift+X
              </kbd>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Help">
            <CommandItem
              onSelect={() => {
                setHelpOpen(true);
                setCommandOpen(false);
              }}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <span>❓</span>
                <div>
                  <p className="font-medium">Show Keyboard Shortcuts</p>
                  <p className="text-xs opacity-70">
                    View all available shortcuts
                  </p>
                </div>
              </div>
              <kbd className="text-[10px] border px-2 py-1 rounded">
                Ctrl+,
              </kbd>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* 🆘 HELP MODAL (Ctrl + ,) */}
      <ShortcutHelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}

// ⛑ FULL HELP MODAL (Option A, Ram-style)
function ShortcutHelpModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div className="relative max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 text-neutral-900 shadow-2xl dark:bg-neutral-950 dark:text-neutral-50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-10 top-10 rounded-md border px-2 py-1 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Esc
        </button>

        <div className="grid gap-8 md:grid-cols-[1.6fr,1.4fr]">
          {/* RIGHT SIDE – SHORTCUT TABLE */}
          <div className="space-y-6 rounded-2xl border bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div>
              <h2 className="text-base font-semibold">
                Keyboard Shortcuts
              </h2>
              <p className="mt-1 text-xs text-neutral-500">
                Use these keyboard shortcuts to navigate and interact with
                the website faster.
              </p>
            </div>

            <ShortcutSection
              title="Navigation"
              items={[
                [
                  "Go to Home",
                  "Navigate to the homepage",
                  "H",
                ],
                [
                  "Go to About",
                  "View about page",
                  "A",
                ],
                [
                  "Go to Projects",
                  "View all projects and portfolio work",
                  "P",
                ],
                [
                  "Go to Blog",
                  "Browse all blog posts",
                  "B",
                ],
                [
                  "Go to Contact",
                  "Get in touch and send a message",
                  "C",
                ],
              ]}
            />

            <ShortcutSection
              title="Features"
              items={[
                [
                  "Toggle Theme",
                  "Switch between light and dark mode",
                  "T",
                ],
                [
                  "Toggle Chat",
                  "Open or close the chat bubble",
                  "Q",
                ],
                [
                  "Command Palette",
                  "Open the command palette",
                  "Ctrl + K",
                ],
                [
                  "Scroll to Top",
                  "Scroll to the top of the page",
                  "Shift + ↑",
                ],
              ]}
            />

            <ShortcutSection
              title="Actions"
              items={[
                [
                  "Copy Email",
                  "Copy email address to clipboard",
                  "Shift + E",
                ],
                [
                  "Share Page",
                  "Share the current page",
                  "Shift + S",
                ],
                [
                  "View GitHub Profile",
                  "Open the GitHub profile in a new tab",
                  "Shift + G",
                ],
                [
                  "View Source Code",
                  "View the source code of this website",
                  "Shift + V",
                ],
                [
                  "Open Spotify Song",
                  "Open the linked Spotify song",
                  "Shift + M",
                ],
                [
                  "Toggle Oneko Sleep",
                  "Put Oneko to sleep or wake it up",
                  "Shift + Z",
                ],
                [
                  "Change Oneko Avatar",
                  "Cycle through different Oneko avatars",
                  "Shift + X",
                ],
              ]}
            />

            <ShortcutSection
              title="Help"
              items={[
                [
                  "Show Keyboard Shortcuts",
                  "View all available keyboard shortcuts",
                  "Ctrl + ,",
                ],
              ]}
            />

            {/* Tips */}
            <div className="space-y-2 border-t pt-3 text-xs text-neutral-500 dark:border-neutral-800">
              <p className="font-semibold uppercase tracking-wide">
                Tips
              </p>
              <ul className="space-y-1 list-disc pl-4">
                <li>
                  Press <span className="font-mono">Ctrl + K</span> to
                  open the command palette and search for any command.
                </li>
                <li>
                  Sequential shortcuts (like future <span className="font-mono">G then H</span>) must be pressed in order within a short time.
                </li>
                <li>
                  Keyboard shortcuts are disabled when typing in input
                  fields.
                </li>
                <li>
                  Press <span className="font-mono">Esc</span> to close
                  any modal or dialog.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShortcutSection({ title, items }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {title}
      </h3>
      <div className="space-y-1.5">
        {items.map(([label, desc, keyText]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <div>
              <p className="text-xs font-medium">{label}</p>
              <p className="text-[11px] text-neutral-500">{desc}</p>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              {keyText.split(" ").includes("+") || keyText.includes("+") ? (
                // render combos like "Ctrl + K"
                keyText.split("+").map((part, idx) => {
                  const trimmed = part.trim();
                  if (trimmed === "") return null;
                  if (idx > 0) {
                    return (
                      <span key={part + idx} className="px-0.5">
                        +
                      </span>
                    );
                  }
                  return null;
                })
              ) : null}
              <span className="rounded border px-2 py-0.5">
                {keyText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const GlobalShortcuts = () => {
  return (
    <div>
      
    </div>
  )
}

export default GlobalShortcuts
