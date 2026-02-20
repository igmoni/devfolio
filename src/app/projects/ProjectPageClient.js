"use client";
import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { motion } from "motion/react";

import Container from "@/components/common/Container";
import ProjectList from "@/components/projects/ProjectList";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";

const ProjectPageClient = ({ initialPosts, initialTags }) => {
  const searachParams = useSearchParams();
  const router = useRouter();
  const { triggerhaptic, isMobile } = useHapticFeedback();

  const [selectedStatus, setSelectedStatus] = useState(null);
  const listRef = useRef(null);
  useEffect(() => {
    const status = searachParams.get("tag");
    setSelectedStatus(status);
  }, [searachParams]);

  const filteredPosts = useMemo(() => {
    if (!selectedStatus) return initialPosts;

    return initialPosts.filter(
      (post) => post.status?.toLowerCase() === selectedStatus.toLowerCase()
    );
  }, [initialPosts, selectedStatus]);

  const handleStatusClick = (status) => {
    if (isMobile()) triggerhaptic("light");

    if (selectedStatus === status) {
      setSelectedStatus(null);
      router.replace("/projects", {
        scroll: false,
      });
    } else {
      setSelectedStatus(status);
      router.replace(`/projects?tag=${encodeURIComponent(status)}`, {
        scroll: false,
      });
    }

    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };
  const getStatusPostCount = (status) => {
    return initialPosts.filter(
      (post) => post.status?.toLowerCase() === status.toLowerCase()
    ).length;
  };

  return (
    <Container className={"px-5 py-16"}>
      <div className="mt-20 space-y-8">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="from-primary to-secondary bg-linear-to-t bg-clip-text pb-3 text-4xl font-semibold tracking-tight text-transparent lg:text-7xl dark:from-neutral-600 dark:to-white">
            Projects
          </h1>
          <p
            ref={listRef}
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
          >
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filter by status</h2>
            {selectedStatus && (
              <button
                onClick={() => handleStatusClick(selectedStatus)}
                className="text-muted-foreground hover:text-foreground text-sm hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {initialTags.map((status) => {
              const isSelected = selectedStatus === status;
              const postCount = getStatusPostCount(status);

              return (
                <button
                  key={status}
                  onClick={() => handleStatusClick(status)}
                  className="transition-colors"
                >
                  <Badge
                    variant={isSelected ? "default" : "outline"}
                    className={
                      "hover:bg-accent hover:text-accent-foreground tag-inner-shadow cursor-pointer rounded-sm capitalize"
                    }
                  >
                    {status} {postCount}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sapce-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {selectedStatus === "Working"
                ? `Active Projects`
                : selectedStatus === "Building"
                  ? "In Development Projects"
                  : "All Projects"}

              <span className="text-muted-foreground ml-2 text-sm font-normal">
                ({filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "project" : "projects"})
              </span>
            </h2>
          </div>
          <ProjectList className={"mt-8"} projects={filteredPosts} />
        </div>
      </div>
    </Container>
  );
};

export default ProjectPageClient;
