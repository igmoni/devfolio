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

const ProjectCard = ({ project, className }) => {
  const { title, image, date } = project;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <motion.div variants={item}>
      <Card className="group min-h-[520px] w-full overflow-hidden transition-all p-4 pt-8 pb-0 border-gray-100 shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)] dark:border-gray-800 relative">
        <CardCon project={project} />
        <CardFoo project={project} />

        <CardHeader className="p-0 pl-[58px] absolute bottom-0 right-0 w-full h-[200px] lg:h-[250px] lg:group-hover:h-[270px]">
          <div className="w-full absolute right-0 bottom-0 pl-5 lg:pl-10">
            {/* Glow */}
            <div
              className="absolute inset-0 z-10 rounded-tl-2xl rounded-br-2xl 
                                opacity-0 group-hover:opacity-80 transition-all duration-500 from-orange-500/30 via-orange-300/10  
                                bg-linear-to-b dark:from-blue-500/60 dark:via-purple-500/40 to-transparent 
                                blur-2xl pointer-events-none"
            />

            {/* Image */}
            <div
              className=" relative z-20
    h-[200px] lg:h-[250px]
    rounded-tl-2xl rounded-br-2xl
    overflow-hidden
    transform-gpu will-change-transform
    transition-all duration-700
    ease-[cubic-bezier(0.16,1,0.3,1)]
    origin-bottom
    translate-y-3 
    group-hover:translate-y-1
    group-hover:opacity-100"
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
  const { slug, title } = project;

  const matchedProject = PROJECTS_CONFIG.find((p) => p.title === title);
  return (
    <CardContent className={"flex flex-col gap-4 px-6"}>
      <div className="flex items-center justify-between gap-4">
        <Link href={`/projects/${slug}`}>
          <h3 className="text-xl font-semibold leading-tight  hover:cursor-pointer">
            {project.title}
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

      <div className="mt-3">
        <h4 className="text-sm font-medium mb-2 text-secondary">
          Technologies
        </h4>
        <div className="flex flex-wrap gap-3">
          {matchedProject?.technologies?.map((tech) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger>
                <div className="size-6 hover:scale-120 transition-all duration-300 hover:cursor-pointer">
                  {tech.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tech.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </CardContent>
  );
};

const CardFoo = ({ project }) => {
  const { slug } = project;
  const isWorking = project.status === "Working";
  return (
    project.featured && (
      <CardFooter className="p-6 pt-0 flex justify-between">
        <div
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
            isWorking
              ? "border-green-300 bg-green-500/10"
              : "border-red-300 bg-red-500/10"
          }`}
        >
          {isWorking ? (
            <>
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              All Systems Operational
            </>
          ) : (
            <>
              <div className="size-2 rounded-full bg-red-500 animate-pulse" />
              Building
            </>
          )}
        </div>

        <Link
          href={`/projects/${slug}`}
          className="text-secondary flex items-center gap-2 text-sm hover:underline underline-offset-4 "
        >
          View Details <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    )
  );
};
