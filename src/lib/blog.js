import fs from 'fs'
import path from 'node:path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'src/data/blog')

export function getBlogPostSlug() {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const files = fs.readdirSync(blogDirectory)
  return files.filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getBlogPostBySlug(slug) {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontmatter = data
    if (!frontmatter.title || !frontmatter.desc) {
      throw new Error(`Invalid frontmatter in ${slug}.mdx`)
    }
    return {
      slug, frontmatter, content
    }
  } catch (err) {
    console.error(`Error reading blog post ${slug}:`, err)
    return null
  }
}


export function getAllBlogPosts() {
  const slugs = getBlogPostSlug()

  const posts = slugs.map((slug) => {
    const post = getBlogPostBySlug(slug)
    if (!post) return null

    return { slug: post.slug, frontmatter: post.frontmatter }
  }).filter((post) => post !== null).sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
  })

  return posts
}

export function getPublishedBlogPosts() {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => post.frontmatter.isPublished)
}

export function getBlogPostByTag(tag) {
  const publishedPosts = getPublishedBlogPosts()
  return publishedPosts.filter((post) =>
    post.frontmatter.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()))
}


export function getAllTags() {
  const publishedPosts = getPublishedBlogPosts()
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
  if (!currentPost || !currentPost.frontmatter.isPublished) {
    return []
  }

  const allPosts = getPublishedBlogPosts()
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