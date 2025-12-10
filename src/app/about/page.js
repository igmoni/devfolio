import Description from "@/components/about/Description";
import Education from "@/components/about/Education";
import Experience from "@/components/about/Experience";
import Features from "@/components/about/Features";
import HeroHeading from "@/components/about/Hero";
import Container from "@/components/common/Container";
import Contact from "@/components/common/Contact";

const page = () => {
  return (
    <Container className={"md:py-16 px-5"}>
      <HeroHeading />
      <Description />
      <Experience />
      <Education />
      <Features />
      <Contact />
    </Container>
  );
};

export default page;
