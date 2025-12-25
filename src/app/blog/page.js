import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTags, getPublishedBlogPosts } from "@/lib/blog";
import { Suspense } from "react";
import BlogPageClient from "./BlogPageClient";
import { generateMetaData as getMetaData } from "@/config/Meta";

export const generateMetadata = () => {
  const metadata = getMetaData("/blog");
  return {
    ...metadata,
  };
};

function BlogPageLoading() {
  return (
    <Container className={"py-16 "}>
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
  const allPosts = getPublishedBlogPosts();
  const allTags = getAllTags();

  return (
    <Suspense fallback={<BlogPageLoading />}>
      <BlogPageClient initialPosts={allPosts} initialTags={allTags} />
    </Suspense>
  );
};

export default page;
