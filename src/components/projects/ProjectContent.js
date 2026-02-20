import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "next-view-transitions";
import Image from "next/image";

import rehypeHighlight from "rehype-highlight";

import GithubIcon from "@/svgs/Github";
import Website from "@/svgs/Website";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ProjectComponents } from "./ProjectComponents";

export default function ProjectContent({ frontmatter, content }) {
  const {
    title,
    desc,
    image,
    technologies,
    github,
    live,
    timeline,
    role,
    team,
    status,
    challenges,
    learnings,
  } = frontmatter;

  const statusVariant =
    status === "completed"
      ? "default"
      : status === "in-progress"
        ? "secondary"
        : "outline";

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8 space-y-6">
        <div className="realtive aspect-video overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={1000}
            height={300}
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant={"outline"} className={"text-xs"}>
                {tech}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground text-xl">{desc}</p>
          <div className="bg-muted/20 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Timeline
              </h5>
              <p className="text-sm">{timeline}</p>
            </div>
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Role
              </h5>
              <p className="text-sm">{role}</p>
            </div>
            {team && (
              <div>
                <h5 className="text-muted-foreground text-sm font-semibold">
                  Team
                </h5>
                <p className="text-sm">{team}</p>
              </div>
            )}
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Status
              </h5>
              <Badge variant={statusVariant} className={"text-xs"}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {live && (
              <Button asChild>
                <Link
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 dark:bg-white"
                >
                  <Website className={"size-4"} />
                  Live Demo
                </Link>
              </Button>
            )}
            {github && (
              <Button variant={"outline"} asChild>
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <GithubIcon className={"size-4"} />
                  Source Code
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Separator />
      </header>

      {/* Challenges & Learnings */}
      {(!!challenges?.length || !!learnings?.length) && (
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {challenges && challenges.length > 0 && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Key Challenges
              </h3>
              <ul className="space-y-2">
                {challenges.map((challenge, idx) => (
                  <li
                    key={idx}
                    className="item-start flex gap-2 text-sm text-yellow-700 dark:text-yellow-300"
                  >
                    <span className="darkLbg-yellow-400 mt-1 block size-1.5 rounded-full bg-yellow-500" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {learnings && learnings.length > 0 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
              <h3 className="darkLtext-green-200 mb-3 text-lg font-semibold text-green-800">
                Key Learnings
              </h3>
              <ul className="space-y02">
                {learnings.map((learning, idx) => (
                  <li
                    className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
                    key={idx}
                  >
                    <span className="mt-1 block size-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                    {learning}
                  </li>
                ))}{" "}
              </ul>
            </div>
          )}
        </div>
      )}
      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={content}
          components={ProjectComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </div>
    </article>
  );
}
