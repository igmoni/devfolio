"use client";

import React from "react";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dedicated shortcut icons (do not reuse existing icons)
import ShortcutHome from "@/svgs/ShortcutHome";
import ShortcutAbout from "@/svgs/ShortcutAbout";
import ShortcutProjects from "@/svgs/ShortcutProjects";
import ShortcutBlog from "@/svgs/ShortcutBlog";
import ShortcutContact from "@/svgs/ShortcutContact";
import ShortcutTheme from "@/svgs/ShortcutTheme";
import ShortcutPalette from "@/svgs/ShortcutPalette";
import ShortcutScrollTop from "@/svgs/ShortcutScrollTop";
import ShortcutShare from "@/svgs/ShortcutShare";
import ShortcutCode from "@/svgs/ShortcutCode";
import ShortcutSpotify from "@/svgs/ShortcutSpotify";
import ShortcutOnekoSleep from "@/svgs/ShortcutOnekoSleep";
import ShortcutOnekoAvatar from "@/svgs/ShortcutOnekoAvatar";
import ShortcutChat from "@/svgs/ShortcutChat";
import ShortcutGithub from "@/svgs/ShortcutGithub";
import ShortcutEmail from "@/svgs/ShortcutEmail";

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
  return <IconComponent className="size-4 shrink-0 text-muted-foreground" />;
}

function ShortcutChip({ label }) {
  return (
    <kbd
      className="
        inline-flex items-center justify-center
        rounded border border-border/60
        bg-background px-1.5 py-0.5
        font-mono text-[11px] leading-none
        text-foreground
      "
    >
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
        <span className="text-[11px] text-muted-foreground">
          {shortcut.desc}
        </span>
      </div>
      <CommandShortcut >
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
        <DialogContent className="w-0 md:min-w-2xl  p-0">
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
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Navigation
                  </h3>
                  <div className="divide-y divide-border overflow-hidden rounded-md border border-border/70 bg-muted/30">
                    {(shortcuts.navigation || []).map((shortcut) => (
                      <button
                        key={`help-nav-${shortcut.name}-${shortcut.keybind}`}
                        type="button"
                        onClick={() => runShortcut(shortcut)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-background/80"
                      >
                        <ShortcutIcon name={shortcut.icon} />
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {shortcut.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {shortcut.desc}
                          </span>
                        </div>
                        <ShortcutChip label={shortcut.keybind} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Features
                  </h3>
                  <div className="divide-y divide-border overflow-hidden rounded-md border border-border/70 bg-muted/30">
                    {(shortcuts.features || []).map((shortcut) => (
                      <button
                        key={`help-feat-${shortcut.name}-${shortcut.keybind}`}
                        type="button"
                        onClick={() => runShortcut(shortcut)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-background/80"
                      >
                        <ShortcutIcon name={shortcut.icon} />
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {shortcut.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {shortcut.desc}
                          </span>
                        </div>
                        <ShortcutChip label={shortcut.keybind} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Actions & Help
                  </h3>
                  <div className="divide-y divide-border overflow-hidden rounded-md border border-border/70 bg-muted/30">
                    {[
                      ...(shortcuts.actions || []),
                      ...(shortcuts.help || []),
                    ].map((shortcut) => (
                      <button
                        key={`help-act-${shortcut.name}-${shortcut.keybind}`}
                        type="button"
                        onClick={() => runShortcut(shortcut)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-background/80"
                      >
                        <ShortcutIcon name={shortcut.icon} />
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-sm font-medium">
                            {shortcut.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
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
              <div className="space-y-2 rounded-md border border-border/60 p-4">
                <h3 className="text-sm font-semibold text-foreground">Tips</h3>

                <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
  <li>
    <span className="flex items-start gap-2">
      Press <ShortcutChip label="Ctrl + K" /> to open the command palette and search for any command
    </span>
  </li>

  <li>
    <span>
      Keyboard shortcuts are disabled when typing in input fields
    </span>
  </li>

  <li>
    <span className="flex items-start gap-2">
      Press <ShortcutChip label="Esc" /> to close any modal or dialog
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
