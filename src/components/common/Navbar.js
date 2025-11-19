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

const Navbar = () => {
  const navItems = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
  ];

  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/assets/mon-y.png" : "/assets/mon-b.png";

  const professions = ['Web Developer', 'UI/UX Designer', 'Frontend Developer']

  const [hover, setHover] = useState(null);

  const [index, setIndex] = useState(0)

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


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % professions.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [professions.length])

  return (
    <motion.Container className="bg-white">
      <motion.nav
        style={{
          boxShadow: scrolled ? "var(--shadow-acternity) " : "none",
          boxShadow: scrolled && theme === 'dark' ? 'var(--shadow-acternity-white)' : 'none',
          width,
          y,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="w-full fixed top-0 inset-x-0 z-50 max-w-6xl mx-auto flex items-center justify-between px-3 py-2 rounded-full"
      >
        <div className="flex gap-2 items-center ">

          <Link href={"/"}>
            <Image
              src={logoSrc}
              height={100}
              width={100}
              alt="Avatar"
              className={`h-12 w-12  ${scrolled ? 'rounded-full' : 'rounded-lg'}`}
            />
          </Link>
          <div className="flex flex-col" >

            <h1 className="font-semibold text-[18px] lg:text-[20px] text-shadow-md tracking-tighter  text-primary dark:text-white  ">Mohan</h1>

            <div className="overflow-hidden h-6 w-[150px] transition duration-300" style={{ display: scrolled ? "none" : '' }}>
              <AnimatePresence mode="wait">
                <motion.p key={index} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} className="text-base tracking-tight text-secondary ">
                  {professions[index]}
                </motion.p>
              </AnimatePresence>
            </div>


          </div>
        </div>
        <div className="flex rounded-md   items-center">
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
              <span className=" text-primary text-base dark:text-white  relative z-10 ">{item.title}</span>
            </Link>
          ))}
        </div>
        {/* <div className="w-10 h-10 bg-red-500 rounded-full"></div> */}
        <ThemeToggleButton variant="circle" start="top-right" blur className={`shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 ${scrolled ? 'rounded-full' : ''}`} />
      </motion.nav>
    </motion.Container>
  );
};

export default Navbar;
