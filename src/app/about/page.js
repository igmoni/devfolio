import Description from "@/components/about/Description";
import Education from "@/components/about/Education";
import Experience from "@/components/about/Experience";
import Features from "@/components/about/Features";
import HeroHeading from "@/components/about/Hero";
import Contact from "@/components/common/Contact";
import Container from "@/components/common/Container";
import { generateMetaData as getMetaData } from "@/config/Meta";

export async function generateMetadata() {
  return getMetaData("/about");
}

const page = () => {
  return (
    <Container className={"px-5 md:py-16"}>
      <HeroHeading />
      <Description />
      <Experience />
      <Education />
      <Features />
      <Contact className={"px-0"} />
    </Container>
  );
};

export default page;
