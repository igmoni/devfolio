// // to get posts on the basis of published or not
export function getPublishedProjectPosts() {
  const allPosts = getAllProjects();
  return allPosts.filter((post) => post.isPublished);
}

import { projects } from "@/config/Projects";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const projectDirectory = path.join(process.cwd(), "src/data/projects");

/* ----------------------------------------
   Get all project slugs
---------------------------------------- */
export function getProjectPostSlugs() {
  if (!fs.existsSync(projectDirectory)) return [];

  return fs
    .readdirSync(projectDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

/* ----------------------------------------
   Get single project by slug
---------------------------------------- */
export function getProjectPostBySlug(slug) {
  try {
    const fullPath = path.join(projectDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data: frontmatter, content } = matter(raw);

    // 🔒 minimal validation
    if (!frontmatter.title || !frontmatter.desc || !frontmatter.status) {
      throw new Error(`Invalid frontmatter in ${slug}.mdx`);
    }

    return {
      slug,
      title: frontmatter.title,
      shortTitle: frontmatter.shortTitle,
      desc: frontmatter.desc,
      image: frontmatter.image ?? null,
      technologies: frontmatter.technologies ?? [],
      github: frontmatter.github ?? null,
      live: frontmatter.live ?? null,
      timeline: frontmatter.timeline ?? null,
      role: frontmatter.role ?? null,
      team: frontmatter.team ?? null,
      isPublished: frontmatter.isPublished,
      // ✅ SOURCE OF TRUTH
      status: frontmatter.status, // "Working" | "Building"

      featured: Boolean(frontmatter.featured),
      challenges: frontmatter.challenges ?? [],
      learnings: frontmatter.learnings ?? [],
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],

      // used for sorting only
      date: frontmatter.date ?? frontmatter.timeline ?? null,

      content,
    };
  } catch (err) {
    console.error(`Error reading project ${slug}:`, err);
    return null;
  }
}

/* ----------------------------------------
   Get all projects
---------------------------------------- */
export function getAllProjects() {
  return getProjectPostSlugs()
    .map(getProjectPostBySlug)
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/* ----------------------------------------
   Get status tags (Working / Building)
---------------------------------------- */
export function getProjectStatusTags() {
  return ["Working", "Building"];
}


export function getProjectNavigation(currentSlug) {
  // Find current project in config
  const currentProjectIndex = projects.findIndex((project) => project.projectsDetailsPageSlug === `/projects/${currentSlug}`)

  if(currentProjectIndex === -1) {
    return { previous: null, next: null }
  }

  const previousProject = currentProjectIndex > 0 ? projects[currentProjectIndex -1]: null
  const nextProject = currentProjectIndex < projects.length - 1 ? projects[currentProjectIndex + 1] : null

  return {
    previous: previousProject ? {
      title: previousProject.title,
      slug: previousProject.projectsDetailsPageSlug.replace('/projects/', '')
    } : null,
    next: nextProject ? {
      title: nextProject.title,
      slug: nextProject.projectsDetailsPageSlug.replace('/projects/', '')
    } : null,
  }
}

export function getRelatedProjectPosts(currentSlug, maxProjects = 2) {
  const currentPost = getProjectPostBySlug(currentSlug)
  if(!currentPost || !currentPost.isPublished) return []

  const allPosts = getPublishedProjectPosts()
  const currentTechnologies = currentPost.technologies.map((tech) => tech.toLowerCase())

  const postWithScore = allPosts.filter((post) => post.slug !== currentSlug).map((post) => {
    const sharedTechnologies = post.technologies.filter((tech) => currentTechnologies.includes(tech.toLowerCase()))

    return {
      post, score: sharedTechnologies.length
    }
  })
  .filter((item) => item.score > 0).sort((a,b) => b.score - a.score)

  return postWithScore.slice(0, maxProjects).map((item) => item.post)
}