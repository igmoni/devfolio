"use client";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";

import { about, mySkills } from "@/config/About";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const About = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Container className={"mt-20 px-5"}>
      <SectionHeading subHeading={"About"} heading={"Me"} />

      <div className="mt-8 flex flex-col gap-5 md:flex-row">
        <div className="relative size-fit overflow-hidden rounded-xl p-[2px] md:h-60 md:w-97">
          {/* SPIN GRADIENT 1 */}
          <div className="animation-duration-[2s] absolute inset-0 scale-[1.5] animate-spin overflow-hidden bg-[conic-gradient(at_center,transparent,var(--color-indigo-500)_20%,transparent_30%)]" />

          {/* GRADIENT 2 — 180° PHASE SHIFT */}
          <div className="animation-duration-[2s] absolute inset-0 scale-[1.5] animate-spin overflow-hidden bg-[conic-gradient(at_center,transparent,var(--color-pink-500)_20%,transparent_30%)] [animation-delay:-1s]" />

          {/* INNER CONTENT CONTAINER */}
          <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[calc(20px-8px)] bg-[#8EC0E8] dark:bg-[#EEDA66]">
            <Image
              src="/assets/logo.png"
              priority
              alt="Avatar"
              width={100}
              height={100}
              className="size-60 rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold">{about.name}</h3>
          <p className="text-secondary mt-4">{about.desc}</p>
          <div className="bg-secondary mt-7 h-px w-full rounded-full"></div>
          <Separator />
          <p className="text-secondary mt-8 font-bold">Skills</p>
          <div className="flex flex-wrap items-center gap-2">
            {mySkills.map((skill) => (
              <Tooltip key={skill.key}>
                <TooltipTrigger>
                  <div className="mt-2 size-7 hover:cursor-pointer">
                    {skill}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{skill.key}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
