"use client";

import { useEffect, useState } from "react";

import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";

import Calender from "@/svgs/Calendar";

import Container from "../common/Container";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import BlogComponents from "./BlogComponents";

const BlogContent = ({ frontmatter, content }) => {
  const { title, desc, image, tags, date } = frontmatter;
  const [mdxSource, setMdxSource] = useState(null);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  useEffect(() => {
    async function compileMDX() {
      const { serialize } = await import("next-mdx-remote/serialize");
      const rehypePrettyCode = (await import("rehype-pretty-code")).default;

      const mdx = await serialize(content, {
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "github-dark",
              },
            ],
          ],
        },
      });

      setMdxSource(mdx);
    }

    compileMDX();
  }, [content]);
  return (
    <Container className="max-w-4xl text-pretty">
      <header className="mb-8 space-y-6">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="primary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {title}
          </h1>

          <p className="text-muted-foreground text-xl">{desc}</p>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calender className="size-6" />

            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>

        <Separator />
      </header>

      <div className="prose prose-neutral dark:prose-invert prose-pre:my-0 max-w-none">
        {mdxSource ? (
          <MDXRemote {...mdxSource} components={BlogComponents} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
};

export default BlogContent;
