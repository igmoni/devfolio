"use client";

import { Badge } from "../ui/badge";
import Calender from "@/svgs/Calendar";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { MDXRemote } from 'next-mdx-remote';
import { useEffect, useState } from 'react';
import Container from "../common/Container";
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
    <Container className="text-pretty max-w-4xl">
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

          <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
            {title}
          </h1>

          <p className="text-xl text-muted-foreground">{desc}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calender className="size-6" />
            
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>

        <Separator />
      </header>

      <div className="prose prose-neutral max-w-none dark:prose-invert prose-pre:my-0">
        {mdxSource ? <MDXRemote {...mdxSource} components={BlogComponents}  /> : <p>Loading...</p>}
      </div>
    </Container>
  );
};

export default BlogContent;