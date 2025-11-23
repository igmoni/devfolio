import { Link } from "next-view-transitions"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import { Button } from "../ui/button"
import { getPublishedBlogPosts } from "@/lib/blog"
import BlogCard from "../blog/BlogCard"

const Blog = () => {
  const posts = getPublishedBlogPosts().slice(0, 2)


  return (
    <Container className={'mt-20'}>
      <SectionHeading subHeading='Featured' heading='Blogs' />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {posts.map((post) => {
          <BlogCard key={post.slug} post={post} />
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant={'outline'}>
          <Link href='/blog'>Show All Blogs</Link>
        </Button>
      </div>

    </Container>
  )
}

export default Blog
