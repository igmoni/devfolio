import { Link } from "next-view-transitions";

import { getPublishedBlogPosts } from "@/lib/blog";

import BlogCard from "../blog/BlogCard";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { Button } from "../ui/button";

const Blog = () => {
  const posts = getPublishedBlogPosts();

  return (
    <Container className={"mt-20 px-5"}>
      <SectionHeading subHeading="Featured" heading="Blogs" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.slice(0, 2).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant={"outline"}>
          <Link href="/blog">Show All Blogs</Link>
        </Button>
      </div>
    </Container>
  );
};

export default Blog;
