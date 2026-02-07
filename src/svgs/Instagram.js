"use client"
import { motion } from "motion/react"

export default function Instagram() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
      whileHover="hover"
      animate="rest"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      {/* Outer frame */}
      <motion.path
        variants={{
          rest: { pathLength: 1, stroke: "currentColor" },
          hover: { pathLength: [0, 1], stroke: "#fff" },
        }}
        transition={{ duration: 0.35 }}
        d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8"
      />

      {/* Lens */}
      <motion.path
        variants={{
          rest: { scale: 1, stroke: "currentColor" },
          hover: { scale: 1.12, stroke: "#fff" },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          transformOrigin: "50% 50%",
          transformBox: "fill-box",
        }}
        d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
      />

      {/* Dot */}
      <motion.path
        variants={{
          rest: { stroke: "currentColor" },
          hover: { stroke: "#fff" },
        }}
        d="M16.5 7.5v.01"
      />
    </motion.svg>
  )
}
