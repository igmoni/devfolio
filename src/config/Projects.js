import NextJs from "@/components/technologies/NextJs";
import ReactIcon from "@/components/technologies/ReactIcon";
import TailwindCss from "@/components/technologies/TailwindCss";
import TypeScript from "@/components/technologies/TypeScript";

export const projectDetails = {
  title: "Projects",
  desc: "Building unique, high-performance solutions fueled by innovation and technical mastery.",
};

export const projects = [
  {
    id: 1,
    title: "BALC",
    desc: "A responsive website showcasing a computer institute’s programs and achievements.",
    image: "/projects/balc.jpg",
    video: "",
    link: "https://www.balc-cadd-bengaluru.in",
    github: "https://www.github.com/igmoni/BALC",
    details: true,
    projectsDetailsPageSlug: "/projects/balc",
    isWorking: true,
    technologies: [
      { name: "Next.js", icon: <NextJs /> },
      { name: "Tailwind CSS", icon: <TailwindCss /> },
      { name: "React", icon: <ReactIcon /> },
    ],
  },
  {
    id: 2,
    title: "Founders Hub",
    desc: "A platform that lists startups, allowing founders to pitch their ideas and connect with other entrepreneurs.",
    image: "/projects/balc.jpg",
    video: "",
    link: "https://founders-hubb.vercel.app/",
    github: "https://www.github.com/igmoni/founders-hub",
    details: true,
    projectsDetailsPageSlug: "/projects/founders-hub",
    isWorking: true,
    technologies: [
      { name: "Next.js", icon: <NextJs /> },
      { name: "Tailwind CSS", icon: <TailwindCss /> },
      { name: "Typescript", icon: <TypeScript className={"rounded-full"} /> },
    ],
  },
];
