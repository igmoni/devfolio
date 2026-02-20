"use client";

import React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import ShortcutAbout from "@/svgs/ShortcutAbout";
import ShortcutBlog from "@/svgs/ShortcutBlog";
import ShortcutChat from "@/svgs/ShortcutChat";
import ShortcutCode from "@/svgs/ShortcutCode";
import ShortcutContact from "@/svgs/ShortcutContact";
import ShortcutEmail from "@/svgs/ShortcutEmail";
import ShortcutGithub from "@/svgs/ShortcutGithub";
// Dedicated shortcut icons (do not reuse existing icons)
import ShortcutHome from "@/svgs/ShortcutHome";
import ShortcutOnekoAvatar from "@/svgs/ShortcutOnekoAvatar";
import ShortcutOnekoSleep from "@/svgs/ShortcutOnekoSleep";
import ShortcutPalette from "@/svgs/ShortcutPalette";
import ShortcutProjects from "@/svgs/ShortcutProjects";
import ShortcutScrollTop from "@/svgs/ShortcutScrollTop";
import ShortcutShare from "@/svgs/ShortcutShare";
import ShortcutSpotify from "@/svgs/ShortcutSpotify";
import ShortcutTheme from "@/svgs/ShortcutTheme";

const iconMap = {
  home: ShortcutHome,
  about: ShortcutAbout,
  projects: ShortcutProjects,
  blog: ShortcutBlog,
  contact: ShortcutContact,
  theme: ShortcutTheme,
  code: ShortcutCode,
  "arrow-up": ShortcutScrollTop,
  email: ShortcutEmail,
  share: ShortcutShare,
  github: ShortcutGithub,
  spotify: ShortcutSpotify,
  sleep: ShortcutOnekoSleep,
  avatar: ShortcutOnekoAvatar,
  help: ShortcutPalette,
  chat: ShortcutChat,
};

function ShortcutIcon({ name }) {
  const IconComponent = name && iconMap[name] ? iconMap[name] : ShortcutPalette;
  return <IconComponent className="text-muted-foreground size-4 shrink-0" />;
}

function ShortcutChip({ label }) {
  return (
    <kbd className="border-border/60 bg-background text-foreground inline-flex items-center justify-center rounded border px-1.5 py-0.5 font-mono text-[11px] leading-none">
      {label}
    </kbd>
  );
}

function ShortcutRow({ shortcut, onRun }) {
  if (!shortcut) return null;

  return (
    <CommandItem
      key={`${shortcut.category}-${shortcut.name}-${shortcut.keybind}`}
      onSelect={() => onRun(shortcut)}
      className="flex items-center gap-3"
    >
      <ShortcutIcon name={shortcut.icon} />
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{shortcut.name}</span>
        <span className="text-muted-foreground text-[11px]">
          {shortcut.desc}
        </span>
      </div>
      <CommandShortcut>
        <ShortcutChip label={shortcut.keybind} className="ml-auto" />
      </CommandShortcut>
    </CommandItem>
  );
}

export default function KeyboardShortcutsLayer() {
  const {
    shortcuts,
    recentShortcuts,
    isPaletteOpen,
    setIsPaletteOpen,
    isHelpOpen,
    setIsHelpOpen,
    runShortcut,
  } = useKeyboardShortcuts();

  const hasRecent = recentShortcuts && recentShortcuts.length > 0;

  const renderGroup = (label, items, emptyMessage) => {
    if (!items || items.length === 0) return null;
    return (
      <CommandGroup heading={label}>
        {items.map((item) => (
          <ShortcutRow
            key={`${label}-${item.name}-${item.keybind}`}
            shortcut={item}
            onRun={(shortcut) => {
              runShortcut(shortcut);
              setIsPaletteOpen(false);
            }}
          />
        ))}
        {emptyMessage && items.length === 0 && (
          <CommandEmpty>{emptyMessage}</CommandEmpty>
        )}
      </CommandGroup>
    );
  };

  const allShortcuts = [
    ...(shortcuts.navigation || []),
    ...(shortcuts.features || []),
    ...(shortcuts.actions || []),
    ...(shortcuts.help || []),
  ];

  return (
    <>
      {/* Command Palette */}
      <CommandDialog
        open={isPaletteOpen}
        onOpenChange={setIsPaletteOpen}
        title="Command Palette"
        description="Search for a command to run..."
        className="max-w-lg"
      >
        <CommandInput placeholder="Search commands, pages, and actions..." />
        <CommandList>
          <CommandEmpty>No command found.</CommandEmpty>

          {hasRecent && (
            <>
              <CommandGroup heading="Recent">
                {recentShortcuts.map((shortcut) => (
                  <ShortcutRow
                    key={`recent-${shortcut.name}-${shortcut.keybind}`}
                    shortcut={shortcut}
                    onRun={(cmd) => {
                      runShortcut(cmd);
                      setIsPaletteOpen(false);
                    }}
                  />
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {renderGroup("Navigation", shortcuts.navigation)}
          {renderGroup("Features", shortcuts.features)}
          {renderGroup("Actions", shortcuts.actions)}
          {renderGroup("Help", shortcuts.help)}
        </CommandList>
      </CommandDialog>

      {/* Keyboard Shortcuts Help */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="w-0 p-0 md:min-w-2xl">
          <div className="flex max-h-[80vh] flex-col">
            <DialogHeader className="space-y-1 px-6 pt-6 pb-3">
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
              <DialogDescription>
                A quick overview of all navigation, feature and action
                shortcuts.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 overflow-y-auto px-6 pb-6">
              {/* Shortcuts grouped by type */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Navigation
                  </h3>
                  <div className="divide-border border-border/70 bg-muted/30 divide-y overflow-hidden rounded-md border">
                    {(shortcuts.navigation || []).map((shortcut) => (
                      <button
                        key={`help-nav-${shortcut.name}-${shortcut.keybind}`}
                        type="button"
                        onClick={() => runShortcut(shortcut)}
                        className="hover:bg-background/80 flex w-full items-center gap-3 px-3 py-2 text-left"
                      >
                        <ShortcutIcon name={shortcut.icon} />
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {shortcut.name}
                          </span>
                          <span className="text-muted-foreground text-[11px]">
                            {shortcut.desc}
                          </span>
                        </div>
                        <ShortcutChip label={shortcut.keybind} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Features
                  </h3>
                  <div className="divide-border border-border/70 bg-muted/30 divide-y overflow-hidden rounded-md border">
                    {(shortcuts.features || []).map((shortcut) => (
                      <button
                        key={`help-feat-${shortcut.name}-${shortcut.keybind}`}
                        type="button"
                        onClick={() => runShortcut(shortcut)}
                        className="hover:bg-background/80 flex w-full items-center gap-3 px-3 py-2 text-left"
                      >
                        <ShortcutIcon name={shortcut.icon} />
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {shortcut.name}
                          </span>
                          <span className="text-muted-foreground text-[11px]">
                            {shortcut.desc}
                          </span>
                        </div>
                        <ShortcutChip label={shortcut.keybind} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Actions & Help
                  </h3>
                  <div className="divide-border border-border/70 bg-muted/30 divide-y overflow-hidden rounded-md border">
                    {[
                      ...(shortcuts.actions || []),
                      ...(shortcuts.help || []),
                    ].map((shortcut) => (
                      <button
                        key={`help-act-${shortcut.name}-${shortcut.keybind}`}
                        type="button"
                        onClick={() => runShortcut(shortcut)}
                        className="hover:bg-background/80 flex w-full items-center gap-3 px-3 py-2 text-left"
                      >
                        <ShortcutIcon name={shortcut.icon} />
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {shortcut.name}
                          </span>
                          <span className="text-muted-foreground text-[11px]">
                            {shortcut.desc}
                          </span>
                        </div>
                        <ShortcutChip label={shortcut.keybind} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tips at the bottom */}
              <div className="border-border/60 space-y-2 rounded-md border p-4">
                <h3 className="text-foreground text-sm font-semibold">Tips</h3>

                <ul className="text-muted-foreground list-disc space-y-2 pl-4 text-sm">
                  <li>
                    <span className="flex items-start gap-2">
                      Press <ShortcutChip label="Ctrl + K" /> to open the
                      command palette and search for any command
                    </span>
                  </li>

                  <li>
                    <span>
                      Keyboard shortcuts are disabled when typing in input
                      fields
                    </span>
                  </li>

                  <li>
                    <span className="flex items-start gap-2">
                      Press <ShortcutChip label="Esc" /> to close any modal or
                      dialog
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
