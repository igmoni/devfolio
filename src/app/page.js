import React from "react";

import Contact from "@/components/common/Contact";
import Container from "@/components/common/Container";
import About from "@/components/landing/About";
import Blog from "@/components/landing/Blog";
import Github from "@/components/landing/Github";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import Setup from "@/components/landing/Setup";
import SideQuests from "@/components/landing/SideQuests";

const page = () => {
  return (
    <Container className={"relative min-h-screen py-16"}>
      <div className="px-5">
        <div className="absolute top-0 -left-px h-screen w-px bg-linear-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-800" />
        <div className="absolute top-0 -right-px h-screen w-px bg-linear-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-800" />
        <Hero />
      </div>
      <Projects />
      <About />
      <Github />
      <SideQuests />
      <Blog />
      <Setup />
      <Contact />
    </Container>
  );
};

export default page;
