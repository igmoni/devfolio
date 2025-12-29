"use client";
import Container from "@/components/common/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ProjectList from "@/components/projects/ProjectList";

const getProjectPostsByTagClient = (posts, tag) => {
  return posts.filter((post) =>
    post.frontmatter.tags.some(
      (postTag) => postTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

const ProjectPageClient = ({ intialPosts, intialTags }) => {
  const searachParams = useSearchParams();
  const router = useRouter();
  const { triggerhaptic, isMobile } = useHapticFeedback();

  const [selectedTag, setselectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(intialPosts);

  useEffect(() => {
    const tagParam = searachParams.get("tag");
    if (tagParam) {
      setselectedTag(tagParam);
      const filtered = getProjectPostsByTagClient(intialPosts, tagParam);
      setFilteredPosts(filtered);
    } else {
      setselectedTag(null);
      setFilteredPosts(intialPosts);
    }
  }, [searachParams, intialPosts]);

  const handleTagClick = (tag) => {
    if (isMobile()) {
      triggerhaptic("light");
    }

    if (selectedTag === tag) {
      setselectedTag(null);
      setFilteredPosts(intialPosts);
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
    <Container className={"py-16 px-5"}>
      <div className="space-y-8 mt-20">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="bg-linear-to-t from-primary to-secondary pb-3 dark:from-neutral-600 dark:to-white bg-clip-text text-transparent   text-4xl font-semibold tracking-tight lg:text-7xl">
            Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Building unique, high-performance solutions fueled by innovation and
            technical mastery.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, width: "1px" }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
        >
          <Separator />
        </motion.div>

        {intialTags.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filter by status</h2>
              {selectedTag && (
                <button
                  onClick={() => handleTagClick(selectedTag)}
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {intialTags.map((tag) => {
                const postCount = getTagPostCount(tag);
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={() => handleTagClick(tag)}
                    className="transition-colors"
                  >
                    <Badge
                      variant={isSelected ? "default" : "outline"}
                      className={
                        "capitalize cursor-pointer hover:bg-accent rounded-sm hover:text-accent-foreground  tag-inner-shadow"
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

        <div className="sapce-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {selectedTag === "Working" ? `Active Projects` : "In Development Projects"}
              {filteredPosts.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredPosts.lneght}{" "}
                  {filteredPosts.length === 1 ? "project" : "projects"})
                </span>
              )}
            </h2>
          </div>
              <ProjectList projects={filteredPosts} />
        </div>
      </div>
    </Container>
  );
};
