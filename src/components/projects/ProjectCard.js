"use client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Website from "@/svgs/Website";
import Github from "@/svgs/Github";
import ArrowRight from "@/svgs/ArrowRight";
import { motion } from "motion/react";
import { projects as PROJECTS_CONFIG } from "@/config/Projects";
import { instrumentSerif } from "../landing/Hero";
import { cn } from "@/lib/utils";

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
      <Card className="group/card min-h-[540px] w-full overflow-hidden transition-all p-4 pt-8 pb-0 border-gray-100 shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)] dark:border-gray-800 relative">
        <CardCon project={project} />
        <CardFoo project={project} />

        <CardHeader className="mt-4 p-0 pl-[58px] absolute bottom-0 right-0 w-full h-[200px] lg:h-[230px] lg:group-hover/card:h-[250px]">
          <div className="w-full absolute right-0 bottom-0 pl-5 lg:pl-10">
            {/* Glow - responds to card hover */}
            <div className="absolute inset-0 z-10 rounded-tl-2xl rounded-br-2xl opacity-0 group-hover/card:opacity-80 transition-all duration-500 from-orange-500/30 via-orange-300/10  bg-linear-to-b dark:from-blue-500/60 dark:via-purple-500/40 to-transparent blur-2xl pointer-events-none" />

            {/* Image - responds to card hover */}
            <div
              className=" relative z-20 h-[200px] lg:h-[250px] rounded-tl-2xl rounded-br-2xl overflow-hidden transform-gpu will-change-transform transition-all duration-700
    ease-[cubic-bezier(0.16,1,0.3,1)]
    origin-bottom
    translate-y-3 
    group-hover/card:translate-y-1
    group-hover/card:opacity-100"
            >
              <Image
                fill
                src={image}
                alt={title}
                className="object-cover rounded-tl-2xl rounded-br-2xl 
            transition-transform duration-500 
            ease-[cubic-bezier(0.25,0.1,0.25,1)]"
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
  const { slug, shortTitle } = project;

  const matchedProject = PROJECTS_CONFIG.find((p) => p.title === shortTitle);
  return (
    <CardContent className={"flex flex-col gap-4 px-6"}>
      <div className="flex items-center justify-between gap-4">
        <Link href={`/projects/${slug}`}>
          <h3
            className={`${instrumentSerif.className} italic text-3xl font-semibold leading-tight  hover:cursor-pointer`}
          >
            {project.shortTitle}
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          {/* Website */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className="text-secondary flex size-6 items-center justify-center "
                href={String(project.live)}
                target="_blank"
              >
                <Website />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Website</p>
            </TooltipContent>
          </Tooltip>

          {/* GitHub */}
          {project.github && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="text-secondary flex size-6 items-center justify-center  "
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

      <p className="text-secondary line-clamp-3">{project.desc}</p>

      {/* Added 'group/tech' for technologies section */}
      <div className="mt-3 group/tech">
        <h4 className="text-sm font-medium mb-2 text-secondary">
          Technologies
        </h4>

        <div className="flex pl-3 hover:pl-5 items-center">
          {matchedProject?.technologies?.map((tech, index) => (
            <motion.div
              key={index}
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
                className="flex items-center h-10 rounded-full border bg-muted dark:bg-accent overflow-hidden"
              >
                {/* ICON */}
                <motion.span
                  variants={{ animate: { paddingRight: 8 } }}
                  transition={{ type: "spring" }}
                  className="flex h-10 w-10 items-center justify-center shrink-0"
                >
                  <span className="flex h-7 w-7 items-center justify-center">
                    {tech.icon}
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
                  className="overflow-hidden opacity-100 text-primary dark:text-white whitespace-nowrap text-xs"
                >
                  {tech.name}
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
    <CardFooter className="p-4 md:px-6 pt-0 flex gap-12 md:gap-3 sm:flex-row sm:items-center justify-between">
      {/* STATUS */}
      <div
        className={`
          inline-flex items-center gap-3 w-full md:w-fit rounded-md px-2 py-1 text-xs border 
          ${
            isWorking
              ? "border-green-300 bg-green-500/10 text-green-700 dark:text-green-400"
              : "border-red-300 bg-red-500/10 text-red-700 dark:text-red-400"
          }
        `}
      >
        <span
          className={`min-w-2 min-h-2 md:min-w-2 md:min-h-2 w-2 h-2 md:w-2 md:h-2 rounded-full animate-pulse ${
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
        className="relative group/link inline-flex whitespace-nowrap items-center gap-1 text-muted-foreground"
      >
        View Details
        <span className="absolute left-0 -bottom-1 h-[2px] w-[98px] rounded-full bg-current scale-x-0 origin-right transition-all duration-200 ease-out group-hover/link:scale-x-100 group-hover/link:origin-left" />
        <ArrowRight className="size-4" />
      </Link>
    </CardFooter>
  );
};
