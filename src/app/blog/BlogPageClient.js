"use client";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { motion } from "motion/react";

import BlogList from "@/components/blog/BlogList";
import Container from "@/components/common/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";

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
    <Container className={"relative px-5 py-16"}>
      <div className="mt-20 space-y-8">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="from-primary to-secondary bg-linear-to-t bg-clip-text pb-3 text-4xl font-semibold tracking-tight text-transparent lg:text-7xl dark:from-neutral-600 dark:to-white">
            Blogs
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A collection of thoughts, tips & tutorials on engineering &
            programming.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, width: "1px" }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
        >
          <Separator />
        </motion.div>

        {initialTags.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Popular Tags</h2>
              {selectedTag && (
                <button
                  onClick={() => handleTagClick(selectedTag)}
                  className="text-muted-foreground hover:text-foreground text-sm underline"
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
                        "hover:bg-accent hover:text-accent-foreground tag-inner-shadow cursor-pointer rounded-sm capitalize"
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
                <span className="text-muted-foreground ml-2 text-sm font-normal">
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
