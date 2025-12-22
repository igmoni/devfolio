"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeToggleButton } from "./ThemeSwitch";
import Menu from "@/svgs/Menu";
import React from "react";
import { Button } from "../ui/button";
import Coffee from "./Coffee";

const Navbar = () => {
  // ---------------- HOOKS MUST BE AT TOP ----------------
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(null);
  const [index, setIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { theme } = useTheme();
  const { scrollY } = useScroll();

  // Responsive width based on device
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const width = useTransform(
    scrollY,
    [0, 50, 100],
    isMobile ? ["100%", "90%", "85%"] : ["100%", "70%", "50%"]
  );

  const y = useTransform(scrollY, [0, 100], [0, 10]);

  // Scroll shadow toggle
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 25);
  });

  // Professions auto-rotate
  const professions = ["Web Developer", "UI/UX Designer", "Frontend Developer"];
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

  const logoSrc = theme === "dark" ? "/assets/mony.png" : "/assets/monb.png";
  const navItems = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
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
          borderRadius: scrolled ? "50px" : "0"
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="w-full bg-white dark:bg-primary fixed top-0 inset-x-0 z-50 
        max-w-5xl mx-auto flex items-center justify-between px-3 py-2 "
      >
        {/* LEFT */}
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Image
              src={logoSrc}
              height={100}
              width={100}
              alt="Avatar"
              className={`h-12 w-12 ${
                scrolled ? "rounded-full" : "rounded-lg"
              }`}
            />
          </Link>

          <div className="flex flex-col">
            <h1
              className={`${
                scrolled ? "hidden" : "block"
              } md:block font-semibold text-[18px] lg:text-[20px] tracking-tighter 
              text-primary dark:text-white`}
            >
              Mohan
            </h1>

            <div
              className="overflow-hidden h-6 w-[150px] transition duration-300 hidden md:block"
              style={{ display: scrolled ? "none" : "" }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="text-base tracking-tight text-secondary"
                >
                  {professions[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex rounded-md items-center">
          {navItems.map((item, idx) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-sm relative px-2 py-1"
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
            >
              {hover === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="h-full w-full shadow-acternity dark:shadow-acternity-white absolute inset-0 rounded-md 
                  bg-neutral-100 dark:bg-neutral-600"
                ></motion.span>
              )}

              <span className="text-primary text-base dark:text-white relative z-10">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex gap-5 items-center">
          {/* SEARCH BUTTON */}
          <button
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
              )
            }
            className="hidden sm:flex items-center gap-2 text-sm px-3 py-1.5 
            rounded-md bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 
            dark:hover:bg-neutral-600 transition font-medium"
          >
            <span>Search</span>
            <span className="flex items-center gap-1 border px-1.5 py-0.5 rounded text-[10px]">
              Ctrl <span className="text-[10px]">+</span> K
            </span>
          </button>

          {/* MOBILE MENU BUTTON */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden size-10 cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] 
            flex items-center justify-center rounded-md"
          >
            <Menu className="size-6" />
          </Button>

          {/* THEME SWITCH */}
          <ThemeToggleButton
            variant="circle"
            start="top-right"
            blur
            className={`shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 ${
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
            className="fixed w-40 top-20 right-4 bg-white dark:bg-primary shadow-acternity 
            border border-secondary/20 rounded-lg p-4 flex flex-col gap-3 
            md:hidden z-60"
          >
            {navItems.map((item, idx) => (
              <React.Fragment key={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-primary dark:text-white text-base px-2 py-1 
                  rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
                >
                  {item.title}
                </Link>

                {idx !== navItems.length - 1 && (
                  <div className="h-px w-full bg-neutral-300 dark:bg-neutral-700 opacity-60" />
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
