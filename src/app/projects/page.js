import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProjects, getAllTags, getProjectStatusTags, getPublishedProjectPosts } from "@/lib/projects";
import { Suspense } from "react";
import ProjectPageClient from "./ProjectPageClient";
import { generateMetaData as getMetaData } from "@/config/Meta";

export async function generateMetadata() {
  return getMetaData("/projects");
}

function ProjectPageLoading() {
  return (
    <Container className={"py-16"}>
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <Skeleton className={"h-12 w-32 mx-auto"} />
          <Skeleton className={"h-6 w-96 mx-auto"} />
        </div>

        <Separator />

        <div className="space-y-4">
          <Skeleton className={"h-6 w-32"} />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className={"h-8 w-20"} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Skeleton className={"h-8 w-48"} />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className={"h-6 w-3/4"} />
                <Skeleton className={"h-4 w-1/2"} />
                <Skeleton className={"h-4 w-2/3"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

const page = () => {
  const allPosts = getAllProjects();
  const allTags = getProjectStatusTags();

  return (
    <Suspense fallback={<ProjectPageLoading />}>
      <ProjectPageClient initialPosts={allPosts} initialTags={allTags} />
    </Suspense>
  );
};

export default page;

// import Container from "@/components/common/Container";
// import React from "react";
// import ProjectList from "@/components/projects/ProjectList";
// import { projects, projectDetails as p } from "@/config/Projects";
// import { generateMetaData as getMetaData } from "@/config/Meta";
// import { Separator } from "@/components/ui/separator";

// export const metadata = {
//   ...getMetaData("/projects"),
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
// };

// const page = () => {
//   return (
//     <Container className={"py-16 pt-32 px-5"}>
//       <div className="space-y-8">
//         <div className="space-y-4 text-center">
//           <h1 className="bg-linear-to-t from-primary to-secondary dark:from-neutral-600 dark:to-white bg-clip-text text-transparent   text-4xl font-semibold tracking-tight lg:text-7xl pb-2">
//             {p.title}
//           </h1>
//           <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
//             {p.desc}
//           </p>
//         </div>
//         <Separator/>
//         <div className="mx-auto">

//         <ProjectList className={'pt-8'} projects={projects}/>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default page;
