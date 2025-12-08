export function keyboardShortcuts({
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
}) {
  return {
    navigation: [
      { name: "Home", desc: "Go to homepage", keybind: "H", onSelect: () => goTo("/"), icon: "home" },
      { name: "About", desc: "Learn about me", keybind: "A", onSelect: () => goTo("/about"), icon: "user" },
      { name: "Projects", desc: "View my projects", keybind: "P", onSelect: () => goTo("/projects"), icon: "projects" },
      { name: "Blog", desc: "Browse articles", keybind: "B", onSelect: () => goTo("/blog"), icon: "blog" },
      { name: "Contact", desc: "Get in touch", keybind: "C", onSelect: () => goTo("/contact"), icon: "contact" },
    ],

    features: [
      { name: "Toggle Theme", desc: "Switch light / dark mode", keybind: "T", onSelect: toggleTheme, icon: "theme" },
      { name: "Toggle Chat", desc: "Open or close chat", keybind: "Q", onSelect: toggleChat, icon: "chat" },
      { name: "Command Palette", desc: "Open search panel", keybind: "Ctrl + K", onSelect: openHelp, icon: "code" },
      { name: "Scroll To Top", desc: "Scroll instantly to top", keybind: "Shift + ↑", onSelect: scrollToTop, icon: "arrow-up" },
    ],

    actions: [
      { name: "Copy Email", desc: "Copy email address", keybind: "Shift + E", onSelect: copyEmail, icon: "email" },
      { name: "Share Page", desc: "Share current page", keybind: "Shift + S", onSelect: sharePage, icon: "share" },
      { name: "GitHub Profile", desc: "View GitHub account", keybind: "Shift + G", onSelect: openGitHub, icon: "github" },
      { name: "Source Code", desc: "View website code", keybind: "Shift + V", onSelect: openSource, icon: "code" },
      { name: "Open Spotify", desc: "Open Spotify", keybind: "Shift + M", onSelect: openSpotify, icon: "spotify" },
      { name: "Oneko Sleep", desc: "Put oneko to sleep", keybind: "Shift + Z", onSelect: toggleOnekoSleep, icon: "sleep" },
      { name: "Oneko Avatar", desc: "Change oneko avatar", keybind: "Shift + X", onSelect: toggleOnekoAvatar, icon: "avatar" },
    ],

    help: [
      { name: "Keyboard Shortcuts", desc: "View all shortcuts", keybind: "Ctrl + ,", onSelect: openHelp, icon: "help" },
    ],
  };
}
