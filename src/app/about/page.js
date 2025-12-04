import Description from "@/components/about/Description";
import Education from "@/components/about/Education";
import Experience from "@/components/about/Experience";
import Features from "@/components/about/Features";
import HeroHeading from "@/components/about/Hero";
import Container from "@/components/common/Container";
import Contact from "@/components/common/Contact";

const page = () => {
  return (
    <Container className={"py-16"}>
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
