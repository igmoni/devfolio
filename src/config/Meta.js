import { about } from "./About";
import { heroConfig } from "./Hero";

export const siteConfig = {
  name: heroConfig.name,
  title: "Devfolio",
  desc: "Devfolio Template by @igmoni",
  url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
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

  "/contact": {
    title: "Contact - Get in Touch",
    description:
      "Get in touch with me for collaborations, projects, or opportunities. I'd love to hear from you!",
    keywords: ["contact", "hire", "collaboration", "freelance", "developer"],
    ogImage: "/assets/mon-y.png",
    twitterCard: "summary",
  },
};
