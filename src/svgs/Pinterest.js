"use client";
import { motion } from "motion/react";

export default function Pinterest() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"

      whileHover="hover"
      animate="rest"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      {/* Pin line */}
      <motion.path
        variants={{
          rest: { pathLength: 1},
          hover: { pathLength: [0, 1] },
        }}
        transition={{ duration: 0.25 }}
        d="M8 20l4 -9"
      />

      {/* Curve */}
      <motion.path
        variants={{
          rest: { pathLength: 1 },
          hover: { pathLength: [0, 1] },
        }}
        transition={{ duration: 0.3, delay: 0.05 }}
        d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7"
      />

      {/* Circle */}
      <motion.path
        variants={{
          rest: { pathLength: 1},
          hover: { pathLength: [0, 1]},
        }}
        transition={{ duration: 0.35, delay: 0.1 }}
        d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
      />
    </motion.svg>
  );
}
