"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Avatar() {
  const [image, setImage] = useState("/assets/logo.png");
  const [glitch, setGlitch] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    if (glitch) return;

    setGlitch(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    // swap image during glitch
    setTimeout(() => {
      setImage((prev) =>
        prev === "/assets/logo.png"
          ? "/assets/gojo.jpg"
          : "/assets/logo.png"
      );
    }, 120);

    // stop glitch
    setTimeout(() => {
      setGlitch(false);
    }, 350);
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="h-full w-full rounded-full dark:bg-[#EEDA66] bg-[#8EC0E8] cursor-pointer"
      >
        <Image
          src={image}
          alt="Avatar"
          width={100}
          height={100}
          priority
          className="size-24 sm:size-28 md:size-36 rounded-full border-3 border-primary dark:border-white"
        />
      </div>

      {/* GLITCH FX */}
      <AnimatePresence>
        {glitch && (
          <>
            {/* red layer */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden mix-blend-screen pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: [-6, 6, -3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={image} alt="" fill className="object-cover" />
            </motion.div>

            {/* blue layer */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden mix-blend-screen pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: [6, -6, 3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={image} alt="" fill className="object-cover" />
            </motion.div>

            {/* shake */}
            <motion.div
              className="absolute inset-0 rounded-full border-3 border-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* SOUND */}
      <audio ref={audioRef} src="/assets/glitch.wav" preload="auto" />
    </div>
  );
}
