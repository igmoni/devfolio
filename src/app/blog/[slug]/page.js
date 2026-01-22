import BlogList from "@/components/blog/BlogList";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/Meta";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  getBlogPostSlug,
} from "@/lib/blog";
import { Metadata } from "next";
import { Link } from "next-view-transitions";
// import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog/BlogContent";
import BackButton from "@/components/blog/BackButton";

export async function generateStaticParams() {
  const slugs = getBlogPostSlug();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return {
      title: "Post not found",
    };
  }

  const { title, desc, image } = post.frontmatter;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    desc,
    openGraph: {
      title,
      desc,
      images: [image],
      type: "article",
    },
    twitter: { card: "summary_large_image", title, desc, images: [image] },
  };
}

const page = async ({ params }) => {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, 3);
  return (
    <>
      <Container className="py-24 max-w-4xl">
        <div className="space-y-12">
          {/* Back Button */}
          <BackButton />

          {/* Blog Content */}
          <BlogContent frontmatter={post.frontmatter} content={post.content} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <Separator />
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Related Posts</h2>
                <BlogList posts={relatedPosts} />
              </div>
            </div>
          )}

          {/* Back to Blog CTA */}
          <div className="text-center">
            <Separator className="mb-8" />
            <Button asChild size="lg" variant={"outline"}>
              <Link href="/blog">View All Blogs</Link>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default page;
