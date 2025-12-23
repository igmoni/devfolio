"use client";
import React from "react";
import { heroConfig, socialLinks } from "@/config/Hero";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Container from "../common/Container";
import { Button } from "../ui/button";
import { TooltipContent, Tooltip, TooltipTrigger } from "../ui/tooltip";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import FreelanceText from "./FreelanceText";
import Spotify from "./Spotify";
import { useState, useEffect } from "react";
import Coffee from "../common/Coffee";
import WakaTimeCard from "./WakaTimeCard";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { name, title, button } = heroConfig;
  const { theme } = useTheme();

  const avatar = theme === "dark" ? "/assets/mony.png" : "/assets/monb.png";

  const parent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay between children
        delayChildren: 0.1, // delay before staggering starts
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container className="flex flex-col items-center justify-center pt-16">
      {/* PARENT */}
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 items-center"
      >
        {/* CHILD 1 — Avatar */}
        <motion.div
          variants={child}
          className="relative p-[7px] bg-muted rounded-full inline-block"
        >
          <Image
            src={avatar}
            alt="Avatar"
            width={100}
            height={100}
            className="size-52 rounded-full"
          />

          {/* Bottom-right anchored WakaTime indicator */}
          <div className="absolute bottom-2 right-2">
            <WakaTimeCard />
          </div>
        </motion.div>

        {/* CHILD 2 — Name */}
        <motion.h1
          variants={child}
          className="tracking-tighter font-bold text-lg lg:text-6xl text-primary dark:text-white"
        >
          {name}
        </motion.h1>

        {/* CHILD 3 — FreelanceText */}
        <motion.div variants={child}>
          <FreelanceText />
        </motion.div>

        {/* CHILD 4 — Title */}
        <motion.h1
          variants={child}
          className="text-secondary tracking-tight font-medium"
        >
          {title}
        </motion.h1>
        <div className="flex gap-5 items-start">
          <motion.div variants={child}>
            <Link href={button.href}>
              <Button
                variant={button.variant}
                className="bg-primary  cursor-pointer dark:bg-white"
              >
                {button.icon}
                {button.text}
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={child}>
            <Coffee
              className={"size-9 shadow-acternity dark:shadow-acternity-white"}
            />
          </motion.div>
        </div>

        {/* CHILD 6 — Social Links */}
        <motion.div variants={child} className="flex gap-4">
          {socialLinks.map((link) => (
            <Tooltip key={link.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  target="_blank"
                  className="text-secondary flex items-center gap-2"
                >
                  <span className="size-7">{link.icon}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>

        {/* CHILD 7 — Spotify */}
        <motion.div variants={child}>
          <Spotify />
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Hero;
