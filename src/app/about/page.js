import Description from "@/components/about/Description";
import Education from "@/components/about/Education";
import Experience from "@/components/about/Experience";
import Features from "@/components/about/Features";
import HeroHeading from "@/components/about/Hero";
import Container from "@/components/common/Container";
import Contact from "@/components/common/Contact";
import { getPageMetaData } from "@/config/Meta";

export const generateMetadata = () => {
  const metadata = getMetaData("/about");
  return {
    ...metadata,
  };
};

const page = () => {
  return (
    <Container className={"md:py-16 px-5"}>
      <HeroHeading />
      <Description />
      <Experience />
      <Education />
      <Features />
      <Contact className={'px-0'} />
    </Container>
  );
};

export default page;
