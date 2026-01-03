import TypeScript from "@/components/technologies/TypeScript";
import ReactIcon from "@/components/technologies/ReactIcon";
import NodeJs from "@/components/technologies/NodeJs";
import NextJs from "@/components/technologies/NextJs";
import JavaScript from "@/components/technologies/JavaScript";
import Figma from "@/components/technologies/Figma";
import TailwindCss from "@/components/technologies/TailwindCss";
import Code from "@/svgs/Code";
import Database from "@/svgs/Database";
import Mentor from "@/svgs/Mentor";
import Conversion from "@/svgs/Conversion";

export const mySkills = [
  <ReactIcon key="react" />,
  <NextJs key="nextjs" />,
  <NodeJs key="nodejs" />,
  <TypeScript key="typescript" />,
  <JavaScript key="javascript" />,
  <TailwindCss key="tailwindcss" />,
  <Figma key="figma" />,
];

export const about = {
  name: "Mohan S P",
  desc: `I design and build engaging digital experiences focused on performance and visual design, specialized in creating landing page’s and portfolio website’s.`,
  logoLight: "/assets/monb.jpeg",
  logoDark: "/assets/mony.jpeg",
};

export const experience = {
  period: "Aug 2023 - Present",
  job: "Programming Trainer",
  company: "BALC CADD",

  points: [
    "Conduct training sessions on computer fundamentals and programming languages for students of varying skill levels",
    "Guide students through practical projects, debugging code, and strengthening real-world problem-solving skills.",
    "Manage course materials and assessments, ensuring high-quality learning outcomes and student growth.",
  ],
};

export const education = [
  {
    period: "2023 - 2026",
    course: "Bachelor's of Computer Applications",
    college: "Government First Grade College",
  },
  {
    period: "2017 - 2021",
    course: "High School",
    college: "Isaac Newton High School",
  },
];

export const features = [
  {
    heading: "Full-Stack Web Development",
    subheading:
      "Build fast, scalable, and secure websites using modern frameworks and best practices.",
    iconType: "code",
    icon: <Code />,
  },
  {
    heading: "High-Conversion Landing Pages",
    subheading:
      "Create beautiful, conversion-focused pages that turn visitors into customers.",
    iconType: "conversion",
    icon: <Conversion />,
  },
  {
    heading: "CMS-Powered Websites & Blogs",
    subheading:
      "Manage content effortlessly with powerful, editable, CMS-driven systems.",
    iconType: "database",
    icon: <Database />,
  },
  {
    heading: "Learning, Mentorship & Training",
    subheading:
      "Learn development the practical way — industry workflows, not classroom theory.",
    iconType: "mentor",
    icon: <Mentor />,
  },
];
