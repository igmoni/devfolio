import React from "react";
import Container from "@/components/common/Container";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import About from "@/components/landing/About";
import Github from "@/components/landing/Github";
import Blog from "@/components/landing/Blog";
import Contact from "@/components/common/Contact";
import SideQuests from "@/components/landing/SideQuests";


const page = () => {
  return (
    <Container className={"min-h-screen  py-16 "}>
      <div className="px-5">
        <Hero />
      </div>
      <Projects />
      <About />
      <Github />
      <SideQuests />
      <Blog />
      <Contact />
    </Container>
  );
};

export default page;
