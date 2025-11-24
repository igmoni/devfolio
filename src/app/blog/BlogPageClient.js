"use client";
import BlogList from "@/components/blog/BlogList";
import Container from "@/components/common/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const getBlogPostsByTagClient = (posts, tag) => {
  return posts.filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

const BlogPageClient = ({ initialPosts, initialTags }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { triggerHaptic, isMobile } = useHapticFeedback();

  const [selectedTag, setselectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setselectedTag(tagParam);
      const filtered = getBlogPostsByTagClient(initialPosts, tagParam);
      setFilteredPosts(filtered);
    } else {
      setselectedTag(null);
      setFilteredPosts(initialPosts);
    }
  }, [searchParams, initialPosts]);

  const handleTagClick = (tag) => {
    if (isMobile()) {
      triggerHaptic("light");
    }

    if (selectedTag === tag) {
      setselectedTag(null);
      setFilteredPosts(initialPosts);
      router.replace("/blog");
    } else {
      setselectedTag(tag);
      const filtered = getBlogPostsByTagClient(initialPosts, tag);
      setFilteredPosts(filtered);
      router.replace(`/blog?tag=${encodeURIComponent(tag)}`);
    }
  };

  const getTagPostCount = (tag) => {
    return initialPosts.filter((post) =>
      post.frontmatter.tags.some(
        (postTag) => postTag.toLowerCase() === tag.toLowerCase()
      )
    ).length;
  };

  return (
    <Container className={"py-16"}>
      <div className="space-y-8">
        <div className="sapce-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Blogs
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A collection of thoughts, tips & tutorials on engineering &
            programming.
          </p>
        </div>
        <Separator />

        {initialTags.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Popular Tags</h2>
              {selectedTag && (
                <button
                  onClick={() => handleTagClick(selectedTag)}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Clear filter
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {initialTags.map((tag) => {
                const postCount = getTagPostCount(tag);
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="transition-colors"
                  >
                    <Badge
                      variant={isSelected ? "default" : "outline"}
                      className={
                        "capitalize cursor-pointer hover:bg-accent hover:text-accent-foreground tag-inner-shadow"
                      }
                    >
                      {tag} {postCount}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {selectedTag ? `Posts tagged "${selectedTag}"` : "Latest Posts"}
              {filteredPosts.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "post" : "posts"})
                </span>
              )}
            </h2>
          </div>

          <BlogList posts={filteredPosts} />
        </div>
      </div>
    </Container>
  );
};

export default BlogPageClient;
