"use client";
import { useEffect, useState } from "react";

import { Link } from "next-view-transitions";
import Image from "next/image";

import { motion } from "motion/react";

import { resolveTechnologies } from "@/lib/technologies";
import ArrowRight from "@/svgs/ArrowRight";
import Github from "@/svgs/Github";
import Website from "@/svgs/Website";

import { instrumentSerif } from "../landing/Hero";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ProjectCard = ({ project }) => {
  const { title, image } = project;

  return (
    <motion.div variants={item}>
      {/* Changed from 'group' to 'group/card' for card-level hover */}
      <Card className="group/card relative min-h-[540px] w-full overflow-hidden border-gray-100 p-4 pt-8 pb-0 shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)] transition-all dark:border-gray-800">
        <CardCon project={project} />
        <CardFoo project={project} />

        <CardHeader className="absolute right-0 bottom-0 mt-4 h-[200px] w-full p-0 pl-[58px] lg:h-[230px] lg:group-hover/card:h-[250px]">
          <div className="absolute right-0 bottom-0 w-full pl-5 lg:pl-10">
            {/* Glow - responds to card hover */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-tl-2xl rounded-br-2xl bg-linear-to-b from-orange-500/30 via-orange-300/10 to-transparent opacity-0 blur-2xl transition-all duration-500 group-hover/card:opacity-80 dark:from-blue-500/60 dark:via-purple-500/40" />

            {/* Image - responds to card hover */}
            <div className="relative z-20 h-[200px] origin-bottom translate-y-3 transform-gpu overflow-hidden rounded-tl-2xl rounded-br-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover/card:translate-y-1 group-hover/card:opacity-100 lg:h-[250px]">
              <Image
                fill
                src={image}
                alt={title}
                className="rounded-tl-2xl rounded-br-2xl object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;

const CardCon = ({ project }) => {
  const { slug } = project;
  const technologies = resolveTechnologies(project.technologies);

  return (
    <CardContent className={"flex flex-col gap-4 px-6"}>
      <div className="flex items-center justify-between gap-4">
        <Link href={`/projects/${slug}`}>
          <h3
            className={`${instrumentSerif.className} text-3xl leading-tight font-semibold italic hover:cursor-pointer`}
          >
            {project.shortTitle}
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          {/* Website */}
          {project.live &&
          <Tooltip>
            <TooltipTrigger asChild>

              <Link
                className="text-secondary flex size-6 items-center justify-center"
                href={String(project.live)}
                target="_blank"
                >
                <Website className={"hover:text-accent-foreground size-10"} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Website</p>
            </TooltipContent>
          </Tooltip>
              }

          {/* GitHub */}
          {project.github && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="text-secondary hover:text-accent-foreground flex size-6 items-center justify-center"
                  href={String(project.github)}
                  target="_blank"
                >
                  <Github />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View GitHub</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <p className="text-secondary line-clamp-2">{project.desc}</p>

      {/* Added 'group/tech' for technologies section */}
      <div className="group/tech mt-3">
        <h4 className="text-secondary mb-2 text-sm font-medium">
          Technologies
        </h4>

        <div className="flex items-center pl-3 hover:pl-5">
          {technologies.map(({ name, Icon }, index) => (
            <motion.div
              key={`${name}-${index}`}
              layout
              variants={{
                initial: { marginLeft: -12 }, // -ml-5
                animate: { marginLeft: -25 }, // -ml-3
              }}
              initial="initial"
              whileHover="animate"
              whileTap="animate"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="relative"
            >
              {/* SINGLE PILL */}
              <motion.div
                variants={{
                  initial: {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                  animate: {
                    paddingLeft: 5,
                    paddingRight: 10,
                  },
                }}
                initial="initial"
                whileHover="animate"
                whileTap="animate"
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="bg-muted dark:bg-accent flex h-10 items-center overflow-hidden rounded-full border"
              >
                {/* ICON */}
                <motion.span
                  variants={{ animate: { paddingRight: 8 } }}
                  transition={{ type: "spring" }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center"
                >
                  <span className="flex h-7 w-7 items-center justify-center">
                    {Icon && <Icon />}
                  </span>
                </motion.span>

                {/* TEXT */}
                <motion.span
                  variants={{
                    initial: { width: 0 },
                    animate: { width: "auto" },
                    exit: { width: 0 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.5,
                  }}
                  className="text-primary overflow-hidden text-xs whitespace-nowrap opacity-100 dark:text-white"
                >
                  {name}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </CardContent>
  );
};

const CardFoo = ({ project }) => {
  const { slug } = project;
  const isWorking = project.status === "Working";

  if (!project.featured) return null;

  return (
    <CardFooter className="flex justify-between gap-12 p-4 pt-0 sm:flex-row sm:items-center md:gap-3 md:px-6">
      {/* STATUS */}
      <div
        className={`inline-flex w-full items-center gap-3 rounded-md border px-2 py-1 text-xs md:w-fit ${
          isWorking
            ? "border-green-300 bg-green-500/10 text-green-700 dark:text-green-400"
            : "border-red-300 bg-red-500/10 text-red-700 dark:text-red-400"
        } `}
      >
        <span
          className={`h-2 min-h-2 w-2 min-w-2 animate-pulse rounded-full md:h-2 md:min-h-2 md:w-2 md:min-w-2 ${
            isWorking ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="sm:whitespace-nowrap">
          {isWorking ? "All Systems Operational" : "Building"}
        </span>
      </div>

      {/* LINK - Added 'group/link' for independent hover */}
      <Link
        href={`/projects/${slug}`}
        className="group/link hover:text-primary text-muted-foreground relative inline-flex items-center gap-1 whitespace-nowrap dark:hover:text-white"
      >
        View Details
        <span className="absolute -bottom-1 left-0 h-[2px] w-[98px] origin-right scale-x-0 rounded-full bg-current transition-all duration-200 ease-out group-hover/link:origin-left group-hover/link:scale-x-100" />
        <ArrowRight className="size-4" />
      </Link>
    </CardFooter>
  );
};
