import Image from "next/image";

import CodeCopyButton from "../blog/CodeCopyButton";
import JavaScript from "../technologies/JavaScript";
import NextJs from "../technologies/NextJs";
import NodeJs from "../technologies/NodeJs";
import ReactIcon from "../technologies/ReactIcon";
import TypeScript from "../technologies/TypeScript";
import { Badge } from "../ui/badge";

const technologyComponent = {
  "Next.js": NextJs,
  nextjs: NextJs,
  React: ReactIcon,
  react: ReactIcon,
  TypeScript: TypeScript,
  typescript: TypeScript,
  JavaScript: JavaScript,
  javascript: JavaScript,
  "Node.js": NodeJs,
  nodejs: NodeJs,
};

const Technology = ({ name }) => {
  const TechComponent =
    technologyComponent[name] || technologyComponent[name.toLowerCase()];

  return (
    <div className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
      {TechComponent && <TechComponent />}
      <span>{name}</span>
    </div>
  );
};

const TechStack = ({ technologies }) => {
  return (
    <div className="bg-muted/20 my-6 rounded-lg border p-4">
      <h4 className="mb-3 text-lg font-semibold">Technology Stack</h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Technology key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
};

const ProjectMeta = ({ timeline, role, team, status }) => {
  return (
    <div className="bg-muted/20 my-6 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
      {timeline && (
        <div>
          <h5 className="text-muted-foreground text-sm font-semibold">
            Timeline
          </h5>
          <p className="text-sm">{timeline}</p>
        </div>
      )}
      {role && (
        <div>
          <h5 className="text-muted-foreground text-sm font-semibold">Role</h5>
          <p className="text-sm">{role}</p>
        </div>
      )}
      {team && (
        <div>
          <h5 className="text-muted-foreground text-sm font-semibold">Team</h5>
          <p className="text-sm">{team}</p>
        </div>
      )}
      {status && (
        <div>
          <h5 className="text-muted-foreground text-sm font-semibold">
            Status
          </h5>
          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "in-progress"
                  ? "secondary"
                  : "outline"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      )}
    </div>
  );
};

const Challenges = ({ challenges }) => {
  return (
    <div className="boredr-yellow-200 my-6 rounded-lg border bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
      <h4 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
        Key Challenges
      </h4>
      <ul className="space-y-2">
        {challenges.map((challenge, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300"
          >
            <span className="mt-1 block size-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400">
              {challenge}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Learnings = ({ learnings }) => {
  return (
    <div className="my-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
      <h4 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">
        Key Learnings
      </h4>
      <ul className="space-y-2">
        {learnings.map((learnings, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
          >
            <span className="bg-green- mt-1 block size-1.5 rounded-full dark:bg-green-400">
              {learning}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ProjectComponents = {
  img: ({ src, alt, ...props }) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg"
      {...props}
    />
  ),

  h1: ({ children, ...props }) => (
    <h1 className="mb-6 text-4xl font-bold" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="mt-8 mb-4 text-3xl font-semibold" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="mt-6 mb-3 text-2xl font-medium" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p className="text-muted-foreground mb-4 leading-7" {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="text-muted-foreground leading-7" {...props}>
      {children}
    </li>
  ),

  pre: ({ children, ...props }) => {
    const getTextContent = (node) => {
      if (typeof node === "string" || typeof node === "number") {
        return String(node);
      }
      if (React.isValidElement(node) && node.props) {
        return getTextContent(node.props.children);
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join("");
      }
      return "";
    };

    const codeText = getTextContent(children);

    return (
      <div className="group relative mb-4">
        <pre
          className="bg-muted/30 overflow-x-auto rounded-lg border p-4 text-sm [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },

  code: ({ children, className, ...props }) => {
    if (className && className.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="rounded px-2 py-1 font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-primary text-muted-foreground mb-4 border-l-4 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Project-specific components
  Technology,
  TechStack,
  ProjectMeta,
  Challenges,
  Learnings,
};
