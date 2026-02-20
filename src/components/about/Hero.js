"use client";
import { motion } from "motion/react";

export default function HeroHeading() {
  return (
    <div className="pt-[150px] pb-0 lg:py-20 lg:pt-28">
      <motion.h2
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="from-primary mx-auto w-auto max-w-none bg-linear-to-t to-[#383838] bg-clip-text py-2 text-4xl text-transparent sm:text-6xl lg:py-5 lg:text-8xl xl:w-280 dark:from-neutral-600 dark:to-white"
        style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
      >
        Building{" "}
        <span className="font-extrabold">
          <span className="absolute text-[rgba(10,10,10,0.4)] blur-sm dark:text-gray-400/40">
            Solutions
          </span>
          <span className="">Solutions</span>
        </span>{" "}
      </motion.h2>
      <motion.h2
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.2 }}
        className="from-primary mx-auto w-auto max-w-none bg-linear-to-t to-[#383838] bg-clip-text text-4xl text-transparent sm:text-6xl lg:text-8xl xl:w-280 dark:from-neutral-600 dark:to-white"
        style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
      >
        that build the future.
      </motion.h2>
    </div>
  );
}
