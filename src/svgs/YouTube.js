"use client";
import { motion } from "motion/react";

export default function YouTubeIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube"
      whileHover="hover"
      animate="rest"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      {/* Outer box */}
      <motion.path
        variants={{
          rest: { pathLength: 1, stroke: "currentColor" },
          hover: { pathLength: [0, 1], stroke: "#fff" },
        }}
        transition={{ duration: 0.4 }}
        d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8"
      />

      {/* Play */}
      <motion.path
        variants={{
          rest: { scale: 1, stroke: "currentColor" },
          hover: { scale: [1.15, 1], stroke: "#fff" },
        }}
        transition={{ duration: 0.2 }}
        style={{
          transformOrigin: "50% 50%",
          transformBox: "fill-box",
        }}
        d="M10 9l5 3l-5 3l0 -6"
      />
    </motion.svg>
  );
}
