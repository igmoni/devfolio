// import fs from "fs";
// import matter from "gray-matter";
// import path from "path";

// const projectDirectory = path.join(process.cwd(), "src/data/projects");

// export function getProjectPostSlug() {
//   if (!fs.existsSync(projectDirectory)) return [];

//   const files = fs.readdirSync(projectDirectory);
//   return files
//     .filter((file) => file.endsWith(".mdx"))
//     .map((file) => file.replace(".mdx", ""));
// }

// // for the [slug]/page.js
// export function getProjectPostBySlug(slug) {
//   try {
//     // makes the file path completely
//     const fullPath = path.join(projectDirectory, `${slug}.mdx`);
 
//     if (!fs.existsSync(fullPath)) return null;
//     // make the file into readable format
//     const fileContents = fs.readFileSync(fullPath, "utf-8");
//     // converting into frontmatter and content of mdx
//     const { data, content } = matter(fileContents);

//     const frontmatter = data;

   
//     // Validating the frontmatter
//     if (!frontmatter.title || !frontmatter.desc || !frontmatter.status) {
//       throw new Error(`Invalid frontmatter in ${slug.mdx}`);
//     }
//     return {
//       slug,
//       title: data.title,
//       desc: data.desc,
//       image: data.image,
//       technologies: data.technologies,
//       github: data.github ?? null,
//       live: data.live,
//       timeline: data.timeline,
//       role: data.role ?? null,
//       team: data.team ?? null,
//       status: data.status ?? null,
//       featured: Boolean(data.featured),
//       challenges: data.challenges ?? [],
//       learnings: data.learnings ?? [],
//       tags: Array.isArray(data.tags) ? data.tags : [],
//       date: data.date ?? data.timeline ?? null,
//       content,
//     };
//   } catch (err) {
//     console.error(`Error reading project post ${slug}:`, err);
//     return null;
//   }
// }

// export function getAllProjects() {
//   const slugs = getProjectPostSlug();

//   return slugs.map(getProjectPostBySlug)
//     .filter((post) => post !== null)
//     .sort((a, b) => {
//       return (
//         new Date(b.date).getTime() -
//         new Date(a.date).getTime()
//       );
//     });
//   return posts;
// }

// // to get posts on the basis of published or not
export function getPublishedProjectPosts() {
  const allPosts = getAllProjects();
  return allPosts.filter((post) => post.isPublished);
}

// // to get the posts on basis of tags (filter)
// export function getProjectPostByTag(tag) {
//   const publishedPosts = getPublishedProjectPosts();
//   return publishedPosts.filter((post) => post.frontmatter.tags.includes(tag));
// }

// export function getAllTags() {
//   const publishedPosts = getPublishedProjectPosts();
//   const tagsSet = new Set();

//   publishedPosts.forEach((post) => {
//     post.tags.forEach((tag) => {
//       tagsSet.add(tag);
//     });
//   });
//   return Array.from(tagsSet);
// }

// export async function getRelatedPosts(currentSlug, maxPosts = 3) {
//   const currentPost = await getProjectPostBySlug(currentSlug);
//   if (!currentPost || !currentPost.frontmatter.isPublished) {
//     return [];
//   }

  // const allPosts = getPublishedProjectPosts();
  // const currentTags = currentPost.frontmatter.tags.map((tag) =>
  //   tag.toLowerCase()
  // );

//   const postWithScore = allPosts
//     .filter((post) => post.slug !== currentSlug)
//     .map((post) => {
//       const sharedTags = post.frontmatter.tags.filter((tag) =>
//         currentTags.includes(tag.toLowerCase())
//       );
//       return {
//         post,
//         score: sharedTags.length,
//       };
//     })
//     .filter((item) => item.score > 0)
//     .sort((a, b) => b.score - a.score);

//   return postWithScore.slice(0, maxPosts).map((item) => item.post);
// }

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