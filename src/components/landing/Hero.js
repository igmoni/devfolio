"use client";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";

import { motion } from "motion/react";

import { coverVideos, heroConfig, links, socialLinks } from "@/config/Hero";
import Location from "@/svgs/Location";

import Avatar from "../common/Avatar";
import Coffee from "../common/Coffee";
import Container from "../common/Container";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import FreelanceText from "./FreelanceText";
import Spotify from "./Spotify";
import WakaTimeCard from "./WakaTimeCard";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const Hero = () => {
  const [image, setImage] = useState("/assets/logo.png");
  const { name, title, button } = heroConfig;
  const { theme } = useTheme();

  const parent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const [videoIndex, setVideoIndex] = useState(null);

  useEffect(() => {
    setVideoIndex(Math.floor(Math.random() * coverVideos.length));
  }, []);

  useEffect(() => {
    const handleToggle = () => {
      setVideoIndex((prev) =>
        prev === null ? 0 : (prev + 1) % coverVideos.length
      );
    };

    window.addEventListener("toggle-cover-video", handleToggle);
    return () => window.removeEventListener("toggle-cover-video", handleToggle);
  }, []);

  if (videoIndex === null) return null;

  const isBleach = coverVideos[videoIndex] === "assets/bleach.mp4";

  return (
    <Container className="flex flex-col items-center justify-center pt-6">
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="flex w-full flex-col gap-6"
      >
        {/* VIDEO */}
        <motion.div variants={child} className="relative">
          <div className="dark:shadow-acternoty-white relative h-[180px] w-full overflow-hidden rounded-3xl bg-black shadow-xl sm:h-[220px] md:h-[260px] lg:h-[300px]">
            <video
              key={coverVideos[videoIndex]}
              src={coverVideos[videoIndex]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={`h-full w-full object-cover ${
                isBleach ? "object-top" : ""
              }`}
            />
          </div>

          {/* AVATAR */}
          <div className="dark:bg-primary absolute top-[120px] left-1/2 z-20 -translate-x-1/2 rounded-full bg-white p-1 shadow-2xl sm:top-[140px] md:top-[200px] md:left-10 md:translate-x-0">
            <Avatar />

            <div className="absolute right-0.5 bottom-1 scale-75 sm:scale-90 md:right-2 md:bottom-2.5 md:scale-100">
              <WakaTimeCard />
            </div>
          </div>

          {/* FREELANCE TEXT (DESKTOP ONLY) */}
          <motion.div
            variants={child}
            className="absolute right-0 -bottom-10 hidden md:block"
          >
            <FreelanceText />
          </motion.div>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          variants={child}
          className="text-primary mt-20 flex flex-wrap justify-center text-center text-2xl font-bold tracking-tighter sm:mt-24 md:mt-20 md:block md:text-left md:text-[44px] dark:text-white"
        >
          Hi, Am {name} —{" "}
          <span
            className={`${instrumentSerif.className} text-muted-foreground italic`}
          >
            {title}
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.div variants={child}>
          <Description links={links} />
        </motion.div>

        {/* FREELANCE TEXT (DESKTOP ONLY) */}
        <motion.div
          variants={child}
          className="flex items-center justify-center md:hidden"
        >
          <FreelanceText />
        </motion.div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <motion.div
            variants={child}
            className="flex cursor-pointer items-center"
          >
            <Link href={button.href}>
              <Button className="bg-primary flex cursor-pointer items-center gap-2 dark:bg-white">
                {button.icon}
                {button.text}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={child}
            className="flex items-center justify-center"
          >
            <Coffee className="shadow-acternity dark:shadow-acternity-white size-9" />
          </motion.div>
        </div>

        {/* SOCIALS */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-2 md:justify-start md:gap-4"
        >
          {socialLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <motion.div whileHover={"animate"} whileTap={"animate"}>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="text-secondary flex items-center gap-2"
                  >
                    {/* 👇 EACH ICON IS A STAGGERED CHILD */}
                    <motion.span variants={child} className="size-7">
                      {link.icon}
                    </motion.span>
                  </Link>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>{link.name}</TooltipContent>
            </Tooltip>
          ))}
        </motion.div>

        <motion.div
          variants={child}
          className="text-muted-foreground hover:text-primary tracking-widest transition-all duration-500 dark:hover:text-white"
        >
          <Link
            href={"https://google.com/maps/place/Bengaluru,+India"}
            target="_blank"
            className="flex items-center justify-center gap-2 md:justify-start"
          >
            <Location className={"size-5"} />
            BENGALURU, INDIA
          </Link>
        </motion.div>

        {/* SPOTIFY */}
        <motion.div variants={child}>
          <Spotify />
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Hero;

const Description = ({ links }) => {
  return (
    <p className="text-muted-foreground text-center text-sm leading-8 sm:text-base sm:leading-7 md:text-left md:text-xl md:leading-8">
      I design and build interactive web applications using{" "}
      {links.map((link, index) => {
        const isLast = index === links.length - 1;
        const isSecondLast = index === links.length - 2;

        return (
          <span key={link.name} className="inline">
            <Link
              href={link.link}
              className="bg-muted hover:bg-muted/70 dark:text-muted text-muted-foreground mx-0.5 inline-flex items-center gap-1.5 rounded-md border-2 border-dashed px-1 align-baseline whitespace-nowrap transition-colors md:px-2.5 md:py-0.5"
              style={{
                backgroundColor:
                  link.name === "Typescript"
                    ? "var(--color-sky-100)"
                    : link.name === "React"
                      ? "var(--color-blue-100)"
                      : link.name === "Figma"
                        ? "var(--color-pink-100)"
                        : "var(--color-neutral-100)",
                border: `2px dashed ${
                  link.name === "Typescript"
                    ? "var(--color-sky-500)"
                    : link.name === "React"
                      ? "var(--color-blue-500)"
                      : link.name === "Figma"
                        ? "var(--color-pink-500)"
                        : "var(--color-neutral-500)"
                }`,
              }}
            >
              <span className="flex h-4 w-4 items-center justify-center">
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>

            {!isLast && (
              <span className="inline align-baseline">
                {isSecondLast ? " & " : ", "}
              </span>
            )}
          </span>
        );
      })}{" "}
      — with a ruthless focus on{" "}
      <span className={"text-primary font-semibold dark:text-white"}>
        UI clarity
      </span>{" "}
      and experience.
    </p>
  );
};
