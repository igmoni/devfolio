"use client";
import React from "react";

import { motion } from "motion/react";

export default function Mail() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover="hover"
      animate="rest"
    >
      <g transform="scale(10.6667)">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <motion.path
          variants={{
            rest: { stroke: "currentColor" },
            hover: { stroke: "#fff" },
          }}
          d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"
        />

        <motion.path
          variants={{
            rest: { pathLength: 1, stroke: "currentColor" },
            hover: { pathLength: [0, 1], stroke: "#fff" },
          }}
          transition={{ duration: 0.3 }}
          d="M3 7l9 6l9 -6"
        />
      </g>
    </motion.svg>
  );
}
