"use client";
import { motion } from "motion/react";

export default function Website({ className }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={` ${className}`}
      whileHover="hover"
      animate="rest"
      style={{
        transformOrigin: "50% 50%",
        transformBox: "fill-box",
      }}
    >
      <g transform="scale(10.6667)">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <motion.path
          variants={{
            rest: { scale: 1, stroke: "currentColor" },
            hover: { scale: 1.2, stroke: "#fff" },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            mass: 0.6,
          }}
          d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
        />

        <motion.path
          variants={{
            rest: { scale: 1, stroke: "currentColor" },
            hover: { scale: 1.2, stroke: "#fff" },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            mass: 0.6,
          }}
          d="M3.6 9h16.8"
        />

        <motion.path
          variants={{
            rest: { scale: 1, stroke: "currentColor" },
            hover: { scale: 1.2, stroke: "#fff" },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            mass: 0.6,
          }}
          d="M3.6 15h16.8"
        />

        <motion.path
          variants={{
            rest: { scale: 1, stroke: "currentColor" },
            hover: { scale: 1.2, stroke: "#fff" },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            mass: 0.6,
          }}
          d="M11.20 3a17 17 0 0 0 0 18"
        />

        <motion.path
          variants={{
            rest: { scale: 1, stroke: "currentColor" },
            hover: { scale: 1.2, stroke: "#fff" },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            mass: 0.6,
          }}
          d="M12.5 3a17 17 0 0 1 0 18"
        />
      </g>
    </motion.svg>
  );
}
