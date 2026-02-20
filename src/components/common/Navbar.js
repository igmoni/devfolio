"use client";
import { useEffect, useState } from "react";
import React from "react";

import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import Menu from "@/svgs/Menu";

import { Button } from "../ui/button";
import { ThemeToggleButton } from "./ThemeSwitch";

const Navbar = () => {
  // ---------------- HOOKS MUST BE AT TOP ----------------
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(null);
  const [index, setIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [screen, setScreen] = useState("desktop");

  const { theme } = useTheme();
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 480) setScreen("small");
      else if (width < 768) setScreen("medium");
      else if (width < 1024) setScreen("tablet");
      else if (width >= 2560)
        setScreen("ultrawide"); // ✅ moved up
      else if (width === 1024) setScreen("small-laptop");
      else setScreen("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const width = useTransform(
    scrollY,
    [0, 50, 100],
    (() => {
      switch (screen) {
        case "small":
          return ["100%", "97%", "94%"];

        case "medium":
          return ["100%", "92%", "85%"];

        case "tablet":
          return ["100%", "85%", "75%"];

        case "small-laptop":
          return ["100%", "85%", "70%"];

        case "ultrawide":
          return ["100%", "70%", "50%"];

        default:
          return ["100%", "70%", "50%"];
      }
    })()
  );

  const y = useTransform(scrollY, [0, 100], [0, 10]);

  // Scroll shadow toggle
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 25);
  });

  // Professions auto-rotate
  const professions = ["Full Stack Developer", "UI/UX Designer", "Freelancer"];
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % professions.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  // Mounted fix for hydration
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const navItems = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Blogs", href: "/blog" },
  ];

  // ---------------- RETURN JSX ----------------
  return (
    <motion.div>
      <motion.nav
        style={{
          boxShadow: scrolled
            ? theme === "dark"
              ? "var(--shadow-acternity-white)"
              : "var(--shadow-acternity)"
            : "none",
          width,
          y,
          borderRadius: scrolled ? "50px" : "0",
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-5xl items-center justify-between bg-transparent px-3 py-2 backdrop-blur-lg"
      >
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={`${scrolled ? "rounded-full" : "rounded-lg"} h-full w-full bg-[#8EC0E8] transition-all duration-200 dark:bg-[#EEDA66]`}
          >
            <Image
              src={"/assets/logo.png"}
              height={100}
              width={100}
              alt="Avatar"
              className={`aspect-square h-12 w-12 shrink-0 object-cover ${
                scrolled ? "rounded-full" : "rounded-lg"
              } shadow-acternity dark:shadow-acternity-white transition-all duration-200 hover:scale-95`}
            />
          </Link>

          <div className="flex flex-col">
            <h1
              className={`${
                scrolled ? "hidden" : "block"
              } text-primary text-[18px] font-semibold tracking-tighter lg:block lg:text-[20px] dark:text-white`}
            >
              Mohan
            </h1>

            <div
              className="hidden h-6 w-[170px] overflow-hidden transition duration-300 md:block"
              style={{ display: scrolled ? "none" : "" }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="text-secondary text-base tracking-tight"
                >
                  {professions[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden items-center rounded-md lg:flex">
          {navItems.map((item, idx) => (
            <Link
              href={item.href}
              key={item.title}
              className="relative px-2 py-1 text-sm"
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
            >
              {hover === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="shadow-acternity dark:shadow-acternity-white dark:bg-primary absolute inset-0 h-full w-full rounded-md bg-neutral-100"
                />
              )}

              <span className="text-primary relative z-10 text-base dark:text-white">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* SEARCH BUTTON */}
          <button
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
              )
            }
            className="hidden h-10 cursor-pointer items-center gap-2 rounded-md bg-transparent px-3 text-sm font-medium shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] transition lg:flex dark:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.3)]"
          >
            <span>Search</span>
            <span className="flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px]">
              Ctrl <span className="text-[10px]">+</span> K
            </span>
          </button>

          {/* MOBILE MENU BUTTON */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] lg:hidden"
          >
            <Menu className="size-6" />
          </Button>

          {/* THEME SWITCH */}
          <ThemeToggleButton
            variant="circle"
            start="center"
            blur
            className={`bg-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 ${
              scrolled ? "rounded-full" : ""
            }`}
          />
        </div>
      </motion.nav>

      {/* --------------- MOBILE MENU (FIXED) --------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-primary shadow-acternity border-secondary/20 fixed top-20 right-4 z-60 flex w-40 flex-col gap-3 rounded-lg border bg-white p-4 lg:hidden"
          >
            {navItems.map((item, idx) => (
              <React.Fragment key={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-primary rounded-md px-2 py-1 text-base transition hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
                >
                  {item.title}
                </Link>

                {idx !== navItems.length - 1 && (
                  <div className="h-px w-full bg-neutral-300 opacity-60 dark:bg-neutral-700" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
