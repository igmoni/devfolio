"use client";
import React from "react";

import { motion } from "motion/react";

export default function GithubIcon({ className }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
      whileHover="hover"
      animate="rest"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      <motion.path
        d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
        style={{
          transformOrigin: "50% 50%",
          transformBox: "fill-box",
        }}
        variants={{
          rest: { rotate: 0, scale: 1},
          hover: { rotate: -10, scale: 1.18 },
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 14,
          mass: 0.6,
        }}
      />
    </motion.svg>
  );
}
