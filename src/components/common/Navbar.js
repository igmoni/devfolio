"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Container from "./Container";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const Navbar = () => {
  const navItems = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
  ];

  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/assets/mon-y.png" : "/assets/mon-b.png";

  const [hover, setHover] = useState(null);

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  const y = useTransform(scrollY, [0, 100], [0, 10]);
  const width = useTransform(scrollY, [0, 50, 100], ["100%", "70%", "50%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 25) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.Container className="bg-white">
      <motion.nav
        style={{
          boxShadow: scrolled ? "var(--shadow-acternity)" : "none",
          width,
          y,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="w-full fixed top-0 inset-x-0 z-50 max-w-6xl mx-auto flex items-center justify-between px-3 py-2 rounded-full"
      >
        <Link href={"/"}>
          <Image
            src={logoSrc}
            height={100}
            width={100}
            alt="Avatar"
            className="h-10 w-10 rounded-lg"
          />
        </Link>
        <div className="flex rounded-md  items-center">
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
                  className="h-full w-full absolute inset-0 rounded-md bg-neutral-100 dark:bg-neutral-600"
                ></motion.span>
              )}
              <span  className=" text-primary  relative z-10 ">{item.title}</span>
            </Link>
          ))}
        </div>
        <div className="w-10 h-10 bg-red-500 rounded-full"></div>
      </motion.nav>
    </motion.Container>
  );
};

export default Navbar;
