"use client";
import React from "react";
import Container from "../common/Container";
import { features } from "@/config/About";
import { motion } from "motion/react";
const Features = () => {
  return (
    <Container className="py-16">
      <h2 className="min-w-3xl text-7xl font-medium bg-linear-to-t from-primary to-secondary dark:from-neutral-600 dark:to-white bg-clip-text text-transparent py-5">
        Services that acclerate your business growth.
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-16">
        {features.map((feature, idx) => (
          <FeatureCard feature={feature} key={idx} />
        ))}
      </div>
    </Container>
  );
};

export default Features;

const FeatureCard = ({ feature }) => {
  const { heading, subheading, icon, iconType } = feature;
  return (
    <motion.div
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
      className="relative h-60 rounded-2xl p-10 flex flex-col gap-10
overflow-hidden bg-linear-to-tr 
border border-white/10 dark:border-white/5
bg-accent-foreground/5 backdrop-blur-xl backdrop-saturate-150
shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
"
    >
      {/* Icon + Glow (LEFT) */}
      <div className="flex flex-col items-start gap-10">
        <div className="relative inline-flex items-center justify-center shrink-0">
          <span
            className="absolute inset-0 rounded-full scale-[2] bg-primary/40 dark:bg-white/20 blur-2xl opacity-90
"
          ></span>

          <span
            className="absolute inset-0 rounded-full scale-[3]
bg-primary/20 dark:bg-white/10
blur-3xl opacity-60
"
          ></span>
          <div
            className={`relative text-primary dark:text-white
    dark:drop-shadow-[0_0_12px_rgba(255,255,255,1)]
    ${
      iconType === "code"
        ? "drop-shadow-[0_0_12px_rgba(0,0,0,1)]"
        : "drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
    }
  `}
          >
            {icon}
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold tracking-wide text-primary dark:text-white">
            {heading}
          </h1>
          <p className="text-black/60 dark:text-white/60 text-sm">
            {subheading}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
