import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getBlogPostBySlug } from "./blog";

const projectDirectory = path.join(process.cwd(), "src/data/projects");

export function getProjectPostSlug() {
  if (!fs.existsSync(projectDirectory)) return [];

  const files = fs.readdirSync(projectDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

// for the [slug]/page.js
export function getProjectPostBySlug(slug) {
  try {
    // makes the file path completely
    const fullPath = path.join(projectDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;
    // make the file into readable format
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    // converting into frontmatter and content of mdx
    const { data, content } = matter(fileContents);

    const frontmatter = data;

    // Validating the frontmatter
    if (!frontmatter.title || !frontmatter.desc) {
      throw new Error(`Invalid frontmatter in ${slug.mdx}`);
    }
    return {
      slug,
      frontmatter,
      content,
    };
  } catch (err) {
    console.error(`Error reading project post ${slug}:`, err);
    return null;
  }
}

export async function getAllProjects() {
  const slugs = getProjectPostSlug();

  const posts = slugs
    .map((slug) => {
      const post = getProjectPostBySlug(slug);
      if (!post) return null;

      return { slug: post.slug, frontmatter: frontmatter };
    })
    .filter((post) => post !== null)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
  return posts;
}

// to get posts on the basis of published or not
export function getPublishedProjectPosts() {
  const allPosts = getAllProjects();
  return allPosts.filter((post) => post.frontmatter.isPublished);
}

// to get the posts on basis of tags (filter)
export function getProjectPostByTag(tag) {
  const publishedPosts = getPublishedProjectPosts();
  return publishedPosts.filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

export function getAllTags() {
  const publishedPosts = getPublishedProjectPosts()
  const tagsSet = new Set()

  publishedPosts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagsSet.add(tag.toLowerCase())
    })
  })
  return Array.from(tagsSet).sort()
}

export async function getRelatedPosts(currentSlug, maxPosts = 3) {
  const currentPost = await getBlogPostBySlug(currentSlug)
  if(!currentPost || !currentPost.frontmatter.isPublished) {
    return []
  }

  const allPosts = getPublishedProjectPosts()
  const currentTags = currentPost.frontmatter.tags.map(tag => tag.toLowerCase())

  const postWithScore = allPosts.filter((post) => post.slug !== currentSlug).map((post) => {
    const sharedTags = post.frontmatter.tags.filter((tag) => currentTags.includes(tag.toLowerCase()),)
    return {
      post,
      score: sharedTags.length,
    }
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score)

  return postWithScore.slice(0, maxPosts).map((item) => item.post)
}
