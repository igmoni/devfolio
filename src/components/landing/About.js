"use client";
import { useState, useEffect } from "react";
import { about, mySkills } from "@/config/About";
import Image from "next/image";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";

const About = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Container className={"mt-20 px-5"}>
      <SectionHeading subHeading={"About"} heading={"Me"} />

      <div className="mt-8  flex flex-col gap-5 md:flex-row">
        <div className="relative w-97 h-60  rounded-xl p-[2px] overflow-hidden">
          {/* SPIN GRADIENT 1 */}
          <div
            className="absolute inset-0 scale-[1.5] animate-spin overflow-hidden
    bg-[conic-gradient(at_center,transparent,var(--color-indigo-500)_20%,transparent_30%)]
    animation-duration-[2s]"
          />

          {/* GRADIENT 2 — 180° PHASE SHIFT */}
          <div
            className="absolute inset-0 scale-[1.5] animate-spin overflow-hidden
    bg-[conic-gradient(at_center,transparent,var(--color-pink-500)_20%,transparent_30%)]
    animation-duration-[2s] [animation-delay:-1s]"
          />

          {/* INNER CONTENT CONTAINER */}
          <div
            className="relative z-20 w-full h-full bg-[#8EC0E8] dark:bg-[#EEDA66] rounded-[calc(20px-8px)]
 flex items-center justify-center"
          >
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
          <div className="h-px w-full rounded-full bg-secondary mt-7"></div>
          <Separator />
          <p className="text-secondary mt-8 font-bold">Skills</p>
          <div className="flex items-center flex-wrap gap-2">
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
