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
