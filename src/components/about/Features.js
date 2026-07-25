"use client";
import React from "react";

import { Instrument_Serif } from "next/font/google";

import { motion } from "motion/react";

import { features } from "@/config/About";

import Container from "../common/Container";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const Features = () => {
  return (
    <Container className="md:py-16">
      <h2 className="from-primary to-secondary w-full bg-linear-to-t bg-clip-text py-5 text-4xl font-medium text-transparent sm:text-6xl md:min-w-3xl lg:text-7xl dark:from-neutral-600 dark:to-white">
        Services that{" "}
        <span className={`${instrumentSerif.className} font-bold italic`}>
          accelerate
        </span>{" "}
        your business growth.
      </h2>

      <div className="grid grid-cols-1 gap-5 py-16 lg:grid-cols-2">
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
      className="bg-accent-foreground/5 relative flex h-60 flex-col gap-10 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-tr p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/5"
    >
      {/* Icon + Glow (LEFT) */}
      <div className="flex flex-col items-start gap-10">
        <div className="relative inline-flex shrink-0 items-center justify-center">
          <span className="bg-primary/40 absolute inset-0 scale-[2] rounded-full opacity-90 blur-2xl dark:bg-white/20"></span>

          <span className="bg-primary/20 absolute inset-0 scale-[3] rounded-full opacity-60 blur-3xl dark:bg-white/10"></span>
          <div
            className={`text-primary relative dark:text-white dark:drop-shadow-[0_0_12px_rgba(255,255,255,1)] ${
              iconType === "code"
                ? "drop-shadow-[0_0_12px_rgba(0,0,0,1)]"
                : "drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]"
            } `}
          >
            {icon}
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-primary font-semibold tracking-wide dark:text-white">
            {heading}
          </h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            {subheading}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
