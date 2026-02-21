"use client";
import { motion } from "motion/react";

export default function X() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"
      whileHover="hover"
      animate="rest"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      <motion.path
        variants={{
          rest: { pathLength: 1, stroke: "currentColor" },
          hover: { pathLength: [0, 1], stroke: "#fff" },
        }}
        transition={{ duration: 0.3 }}
        d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0"
      />

      <motion.path
        variants={{
          rest: { opacity: 1, pathLength: 1, stroke: "currentColor" },
          hover: { opacity: [0, 1], pathLength: [0, 1], stroke: "#fff" },
        }}
        transition={{ duration: 0.3, delay: 0.3 }}
        d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"
      />
    </motion.svg>
  );
}
