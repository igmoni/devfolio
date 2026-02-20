"use client";
import React from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import ProjectCard from "./ProjectCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18, // delay between each card
    },
  },
};

const ProjectList = ({ projects, className }) => {
  if (projects.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-muted-foreground">No projects found.</h2>
        <p className="text-muted-foreground">
          Check back leter for new content!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2",
        className
      )}
    >
      {projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} />
      ))}
    </motion.div>
  );
};

export default ProjectList;
