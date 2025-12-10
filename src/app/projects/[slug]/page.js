import Container from "@/components/common/Container";
import ArrowLeft from "@/svgs/ArrowLeft";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/Meta";
import {
  getProjectNavigation,
  getProjectCaseStudySlugs,
  getProjectCaseStudyBySlug,
  getRelatedProjectCaseStudies,
} from "@/lib/projects";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import  ProjectContent  from "@/components/projects/ProjectContent";

export async function generateStaticParams() {
  const slugs = getProjectCaseStudySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getProjectCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) {
    return { title: "Project Not Found" };
  }

  const { title, desc, image } = caseStudy.frontmatter;

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${title} - Project Case Study`,
    desc,
    openGraph: {
      title: `${title} - Project Case Study`,
      desc,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Project Case Study`,
      desc,
      images: [image],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = await getProjectCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) {
    notFound();
  }

  const navigation = await getProjectNavigation(slug);
  const relatedProjects = await getRelatedProjectCaseStudies(slug, 2);

  return (
    <Container className={"py-16"}>
      <div className="sapce-y-12">
        <div>
          <Button variant={"ghost"} asChild className={"group"}>
            <Link href={"/projects"} className="flex items-center space-x-2">
              <ArrowLeft className={"size-4"} />
              <span>Back to Projects</span>
            </Link>
          </Button>
        </div>

        <ProjectContent
          frontmatter={caseStudy.frontmatter}
          content={caseStudy.content}
        />

        <ProjectNavigation
          previous={navigation.previous}
          next={navigation.next}
        />

        {relatedProjects.length > 0 && (
          <div className="space-y-6">
            <Separator />
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Related Projects</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedProjects.map((project) => (
                  <div
                    key={project.slug}
                    className="group rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold group-hover:text-primary">
                            {project.frontmatter.title}
                          </h3>
                          <div className="text-xs">
                            <div
                              className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                                project.frontmatter.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : project.frontmatter.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dakr:text-gray-400"
                              }`}
                            >
                              {project.frontmatter.status
                                .charAt(0)
                                .toUpperCase() +
                                project.frontmatter.status.slice(1)}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.frontmatter.desc}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.frontmatter.technologies
                            .slice(0, 3)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="rounded bg-muted px-2 py-1 tex-cxs"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.frontmatter.technologies.length > 3 && (
                            <span className="rounded bg-muted px-2 py-1 text-xs">
                              + {project.frontmatter.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <Separator className={"mb-8"} />
          <Button asChild size={"lg"}>
            <Link href={"/projects"}>View All Projects</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
