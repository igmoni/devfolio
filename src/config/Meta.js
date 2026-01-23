import { about } from "./About";
import { heroConfig } from "./Hero";

export const siteConfig = {
  name: heroConfig.name,
  title: "Devfolio",
  desc: "Devfolio Template by @igmoni",
  url: process.env.NEXT_PUBLIC_URL || "http://monxdev.vercel.app",
  ogImage: "/meta/opengraph-img.png",
  author: {
    name: about.name,
    twitter: "@_igmoni",
    github: "igmoni",
    linkdein: "igmoni",
    email: "mohansp119@gmail.com",
  },
  keywords: [
    "portfolio",
    "developer",
    "full-stack",
    "react",
    "nextjs",
    "typescript",
    "javascript",
    "web developement",
    heroConfig.name.toLowerCase(),
  ],
};

export const pageMetaData = {
  "/": {
    title: `${heroConfig.name} - ${heroConfig.title}`,
    description: `${about.desc} Explore my projects, experience & technical expertise.`,
    keywords: [
      "portfolio",
      "developer",
      "full-stack",
      "web development",
      "projects",
    ],
    ogImage: "/meta/opengraph-img.png",
    twitterCard: "summary_large_image",
  },

  "/about": {
    title: `About ${heroConfig.name} - ${heroConfig.title}`,
    description: "About Me",
     alternates: {
    canonical: "https://monxdev.vercel.app/about",
  },
    keywords: [
      "portfolio",
      "developer",
      "full-stack",
      "web development",
      "projects",
    ],
    ogImage: "/meta/about.png",
    twitterCard: "summary_large_image",
  },

  "/contact": {
    title: "Contact - Get in Touch",
     alternates: {
    canonical: "https://monxdev.vercel.app/contact",
  },
    description:
      "Get in touch with me for collaborations, projects, or opportunities. I'd love to hear from you!",
    keywords: ["contact", "hire", "collaboration", "freelance", "developer"],
    ogImage: "/meta/contact.png",
    twitterCard: "summary",
  },
  "/projects": {
    title: "Projects - My Work & Projects Portfolio",
     alternates: {
    canonical: "https://monxdev.vercel.app/projects",
  },
    description:
      "Discover my projects & work across different technologies & domains. From web apps to mobile solutions.",
    keywords: [
      "projects",
      "portfolio",
      "web development",
      "applications",
      "software",
    ],
    ogImage: "/meta/project.png",
    twitterCard: "summary_large_image",
  },

  "/blog": {
    title: "Blog - Thoughts & Tutorials",
     alternates: {
    canonical: "https://monxdev.vercel.app/blog",
  },
    description:
      "Read my thoughts, tutorials, and insights on engineering, programming, and web development.",
    keywords: [
      "blog",
      "tutorials",
      "programming",
      "web development",
      "technical writing",
    ],
    ogImage: "/meta/blogs.png",
    twitterCard: "summary_large_image",
  },
};

export function getPageMetaData(pathName) {
  return pageMetaData[pathName] || pageMetaData["/"];
}

export function generateMetaData(pathName) {
  const pageMeta = getPageMetaData(pathName);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(", "),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${pathName}`,
      title: pageMeta.title,
      description: pageMeta.description,
      sitename: siteConfig.title,
      images: [
        {
          url: pageMeta.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [pageMeta.ogImage || siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathName}`,
    },
  };
}
