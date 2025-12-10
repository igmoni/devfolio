import { projects } from "@/config/Projects";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "src/data/projects");

export function getProjectCaseStudySlugs() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProjectCaseStudyBySlug(slug) {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data;

    if (!frontmatter.title || !frontmatter.desc) {
      throw new Error(`Invalid frontmatter in ${slug}.mdx`);
    }

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (err) {
    console.error(`Error reading project case study ${slug}:`, err);
    return null;
  }
}

export function getAllProjectCaseStudies() {
  const slugs = getProjectCaseStudySlugs();
  const caseStudies = slugs
    .map((slug) => {
      const caseStudy = getProjectCaseStudyBySlug(slug);
      if (!caseStudy) return null;

      return {
        slug: caseStudy.slug,
        frontmatter: caseStudy.frontmatter,
      };
    })
    .filter((caseStudy) => caseStudy !== null)
    .sort((a, b) => {
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      return a.frontmatter.title.localCompare(b.frontmatter.title);
    });

  return caseStudies;
}

export function getPublishedProjectCaseStudies() {
  const allCaseStudeis = getAllProjectCaseStudies();
  return allCaseStudeis.filter(
    (caseStudy) => caseStudy.frontmatter.isPublished
  );
}

export function getProjectCaseStudiesByTechnology(technology) {
  const publishedCaseStudies = getPublishedProjectCaseStudies();
  return publishedCaseStudies.filter((caseStudy) =>
    caseStudy.frontmatter.technologies.some(
      (tech) => tech.toLowerCase() === technology.toLowerCase()
    )
  );
}

export function getAllTechnologies() {
  const publishedCaseStudies = getPublishedProjectCaseStudies();
  const technologiesSet = new Set();

  publishedCaseStudies.forEach((caseStudy) => {
    caseStudy.frontmatter.technologies.forEach((tech) => {
      technologiesSet.add(tech.toLowerCase());
    });
  });
  return Array.from(technologiesSet).sort();
}

export function getProjectNavigation(currentSlug) {
  const currentProjectIndex = projects.findIndex(
    (project) => project.projectsDetailsPageSlug === `/project/${currentSlug}`
  );

  if (currentProjectIndex === -1) {
    return { previous: null, next: null };
  }

  const previousProject =
    currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : null;

  const nextProject =
    currentProjectIndex < projects.length - 1
      ? projects[currentProjectIndex + 1]
      : null;

  return {
    previous: previousProject
      ? {
          title: previousProject.projectsDetailsPageSlug.replace(
            "/projects/",
            ""
          ),
        }
      : null,
    next: nextProject
      ? {
          title: nextProject.title,
          slug: nextProject.projectsDetailsPageSlug.replace("/projects/", ""),
        }
      : null,
  };
}

export function getRelatedProjectCaseStudies(currentSlug, maxProjects = 2) {
  const currentCaseStudy = getProjectCaseStudyBySlug(currentSlug);
  if (!currentCaseStudy || !currentCaseStudy.frontmatter.isPublished) {
    return [];
  }

  const allCaseStudies = getPublishedProjectCaseStudies();
  const currentTechnologies = currentCaseStudy.frontmatter.technologies.map(
    (tech) => tech.toLowerCase()
  );

  const caseStudeisWithScore = allCaseStudies
    .filter((caseStudy) => caseStudy.slug !== currentSlug)
    .map((caseStudy) => {
      const shareTechnologies = caseStudy.frontmatter.technologies.filter(
        (tech) => currentTechnologies.includes(tech.toLowerCase())
      );

      return {
        caseStudy,
        score: shareTechnologies.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return caseStudeisWithScore
    .slice(0, maxProjects)
    .map((item) => item.caseStudy);
}
