import React from "react";
import Container from "@/components/common/Container";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import About from "@/components/landing/About";
import Github from "@/components/landing/Github";
import Blog from "@/components/landing/Blog";
import Contact from "@/components/common/Contact";
import { generateMetaData as getPageMetaData } from "@/config/Meta";

export async function generateMetaData() {
    return getPageMetaData('/')
}

const page = () => {
  return (
    <Container className={"min-h-screen  py-16 "}>
      <div className="px-5">
        <Hero />
      </div>
      <Projects />
      <About />
      <Github />
      <Blog />
      <Contact />
    </Container>
  );
};

export default page;
