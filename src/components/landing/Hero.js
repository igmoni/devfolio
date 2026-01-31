"use client";
import { heroConfig, socialLinks, links, coverVideos } from "@/config/Hero";
import { Link } from "next-view-transitions";
import Container from "../common/Container";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import FreelanceText from "./FreelanceText";
import Spotify from "./Spotify";
import { useState, useEffect } from "react";
import Coffee from "../common/Coffee";
import WakaTimeCard from "./WakaTimeCard";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import Location from "@/svgs/Location";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const Hero = () => {
  const { name, title, button } = heroConfig;
  const { theme } = useTheme();

  const avatar = theme === "dark" ? "/assets/mony.jpeg" : "/assets/monb.jpeg";

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
        prev === null ? 0 : (prev + 1) % coverVideos.length,
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
          <div
            className="
            shadow-xl 
            relative w-full
            h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px]
            overflow-hidden rounded-3xl bg-black dark:shadow-acternoty-white
          "
          >
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
          <div
            className="
            absolute z-20
            left-1/2 -translate-x-1/2
            top-[120px] sm:top-[140px]
            md:left-10 md:translate-x-0 md:top-[200px]
            rounded-full bg-white p-1 dark:bg-primary shadow-2xl  
          "
          >
            <Image
              src={avatar}
              alt="Avatar"
              width={100}
              height={100}
              priority
              className="
                size-24 sm:size-28 md:size-36
                rounded-full
                border-3 border-primary dark:border-white 
              "
            />

            <div
              className="
              absolute  bottom-3 right-1.5
              scale-75   sm:scale-90 md:scale-100
            "
            >
              <WakaTimeCard />
            </div>
          </div>

          {/* FREELANCE TEXT (DESKTOP ONLY) */}
          <motion.div
            variants={child}
            className="absolute right-0 -bottom-10 hidden  md:block"
          >
            <FreelanceText />
          </motion.div>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          variants={child}
          className="
            mt-20 sm:mt-24 md:mt-20
            text-center md:text-left
            font-bold tracking-tighter
            text-2xl flex flex-wrap justify-center md:block md:text-[44px]
            text-primary dark:text-white
          "
        >
          Hi, Am {name} —{" "}
          <span
            className={`${instrumentSerif.className} italic text-muted-foreground`}
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
        <div className="flex items-center md:justify-start justify-center gap-3">
          <motion.div
            variants={child}
            className="flex cursor-pointer items-center"
          >
            <Link href={button.href}>
              <Button className="bg-primary cursor-pointer dark:bg-white flex items-center gap-2">
                {button.icon}
                {button.text}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={child}
            className="flex items-center justify-center"
          >
            <Coffee className="size-9 shadow-acternity dark:shadow-acternity-white" />
          </motion.div>
        </div>

        {/* SOCIALS */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-2 md:gap-4 md:justify-start"
        >
          {socialLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  target="_blank"
                  className="flex items-center gap-2 text-secondary"
                >
                  {/* 👇 EACH ICON IS A STAGGERED CHILD */}
                  <motion.span variants={child} className="size-7">
                    {link.icon}
                  </motion.span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>{link.name}</TooltipContent>
            </Tooltip>
          ))}
        </motion.div>

        <motion.div
          variants={child}
          className="tracking-widest text-muted-foreground hover:text-primary dark:hover:text-white transition-all duration-500"
        >
          <Link
            href={"https://google.com/maps/place/Bengaluru,+India"}
            target="_blank"
            className="flex gap-2 md:justify-start justify-center items-center"
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
    <p
      className="
        text-muted-foreground 
        text-sm sm:text-base md:text-xl
        leading-8 sm:leading-7 md:leading-8
        text-center md:text-left 
      "
    >
      I design and build interactive web applications —{" "}
      {links.map((link, index) => {
        const isLast = index === links.length - 1;
        const isSecondLast = index === links.length - 2;

        return (
          <span key={link.name} className="inline ">
            <Link
              href={link.link}
              className="  border-dashed 
                inline-flex items-center gap-1.5
                align-baseline
                rounded-md border-2 bg-muted
                px-1 md:px-2.5 md:py-0.5
                mx-0.5
                whitespace-nowrap
                transition-colors
                hover:bg-muted/70
              "
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
      <span className={" font-semibold  text-primary dark:text-white"}>
        UI clarity
      </span>{" "}
      and experience.
    </p>
  );
};
