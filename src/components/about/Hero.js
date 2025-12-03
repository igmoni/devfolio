"use client";
import { motion } from "motion/react";


export default function HeroHeading() {
  return (
    <div className="pt-[150px] lg:py-20 lg:pt-28 pb-0">
      <motion.h2
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="mx-auto bg-linear-to-t from-primary to-[#383838] dark:from-neutral-600 dark:to-white bg-clip-text text-transparent text-4xl sm:text-6xl lg:text-8xl w-auto xl:w-280 max-w-none py-2 lg:py-5"
        style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
      >
        Building{" "}
        <span className="font-bold ">
          <span className="dark:text-gray-400/40 text-[rgba(10,10,10,0.4)] blur-sm absolute">
            Solutions
          </span>
          <span className="">Solutions</span>
        </span>{" "}
      </motion.h2>
      <motion.h2
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.2 }}
        className=" mx-auto bg-linear-to-t from-primary to-[#383838] dark:from-neutral-600 dark:to-white bg-clip-text text-transparent text-4xl sm:text-6xl lg:text-8xl w-auto xl:w-280 max-w-none"
        style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
      >
        that build the future.
      </motion.h2>
    </div>
  );
}
