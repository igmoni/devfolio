import React from "react";
import Image from "next/image";
import CodeCopyButton from "./CodeCopyButton";

const BlogComponents = {
  img: ({ src, alt, ...props }) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg mx-auto"
      {...props}
    />
  ),

  h1: ({ children, ...props }) => (
    <h1 className="mb-6 text-4xl font-bold" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="mb-4 mt-8 text-3xl font-semibold" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="mb-3 mt-6 text-2xl font-medium" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props}>
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
    <li className="leading-7 text-muted-foreground" {...props}>
      {children}
    </li>
  ),

  pre: ({ children, ...props }) => {
    const getTextContent = (node) => {
      if (typeof node === "string" || typeof node === "number") {
        return String(node);
      }
      if (React.isValidElement(node) && node.props && typeof node.props === "object") {
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
        <div className="border p-1 dark:shadow-[inset_0_0_3px_rgba(255,255,255,0.5)] shadow-[inset_0_0_2px_rgba(0,0,0,0.3)] rounded-3xl">

        <pre style={{ margin: 0 }}
          className="overflow-x-auto rounded-[18px] border bg-[#171717] p-4 text-sm [&>code]:bg-transparent [&>code]:p-0 my-0"
          {...props}
          >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
          </div>
      </div>
    );
  },

  code: ({ children, className, ...props }) => {
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="rounded px-2 py-1 text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
};

export default BlogComponents;
