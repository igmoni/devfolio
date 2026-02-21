"use client";
import { motion } from "motion/react";

export default function LinkedIn() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
      whileHover="hover"
      animate="rest"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      <motion.path
        variants={{
          rest: { opacity: 1, pathLength: 1  },
          hover: { opacity: [0, 1], pathLength: [0, 1] },
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
        d="M8 11v5"
      />

      <path
        d="M8 8v.01"
      />

      <motion.path
        variants={{
          rest: { opacity: 1, pathLength: 1},
          hover: { opacity: [0, 1], pathLength: [0, 1] },
        }}
        transition={{ duration: 0.3, delay: 0.15 }}
        d="M12 16v-5"
      />

      <motion.path
        variants={{
          rest: { opacity: 1, pathLength: 1 },
          hover: { opacity: [0, 1], pathLength: [0, 1] },
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
        d="M16 16v-3a2 2 0 1 0 -4 0"
      />

      <motion.path
        variants={{
          rest: { opacity: 1, pathLength: 1 },
          hover: { opacity: [0, 1], pathLength: [0, 1] },
        }}
        transition={{ duration: 0.5 }}
        d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10"
      />
    </motion.svg>
  );
}
