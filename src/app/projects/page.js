import Container from "@/components/common/Container";
import React from "react";
import ProjectList from "@/components/projects/ProjectList";
import { projects, projectDetails as p } from "@/config/Projects";
import { generateMetaData as getMetaData } from "@/config/Meta";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  ...getMetaData("/projects"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const page = () => {
  return (
    <Container className={"py-16 pt-32"}>
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="bg-linear-to-t from-primary to-secondary dark:from-neutral-600 dark:to-white bg-clip-text text-transparent   text-4xl font-semibold tracking-tight lg:text-7xl pb-2">
            {p.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {p.desc}
          </p>
        </div>
        <Separator/>
        <div className="mx-auto">

        <ProjectList className={'pt-8'} projects={projects}/>
        </div>
      </div>
    </Container>
  );
};

export default page;
