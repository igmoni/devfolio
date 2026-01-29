import Github from "@/svgs/Github";
import LinkedIn from "@/svgs/LinkedIn";
import Mail from "@/svgs/Mail";
import X from "@/svgs/X";
import Instagram from "@/svgs/Instagram";
import YouTube from "@/svgs/YouTube";
import Pinterest from "@/svgs/Pinterest";
import Medium from "@/svgs/Medium";
import NextJs from "@/components/technologies/NextJs";
import TypeScript from "@/components/technologies/TypeScript";
import ReactIcon from "@/components/technologies/ReactIcon";
import Figma from "@/components/technologies/Figma";

export const heroConfig = {
  name: "Mohan S P",
  title: "Full Stack Web Developer • UI/UX Designer",

  skills: [
    {
      name: 'Typescript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
  ],

  button: {
    variant: "default",
    text: "Get in touch",
    href: "/contact",
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white dark:text-black"
      >
        <path d="M21.936 5.17077L18.9059 19.3546C18.6802 20.3539 18.1 20.5795 17.2618 20.1282L12.7166 16.7757L10.4923 18.9033C10.2666 19.1289 10.041 19.3546 9.5252 19.3546L9.8798 14.6804L18.3578 6.97598C18.7124 6.62138 18.2611 6.49244 17.8098 6.78256L7.26869 13.4232L2.72343 12.037C1.72412 11.7147 1.72412 11.0377 2.94908 10.5864L20.6144 3.72015C21.4847 3.46227 22.2262 3.91357 21.936 5.17077Z" />
      </svg>
    ),
  },
};

export const socialLinks = [
  {
    name: "X",
    href: "https://x.com/_igmoni",
    icon: <X />,
  },

  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/igmoni/",
    icon: <LinkedIn />,
  },
  {
    name: "Github",
    href: "https://github.com/igmoni",
    icon: <Github className={"text-white"} />,
  },

  {
    name: "YouTube",
    href: "https://youtube.com/@igmonii",
    icon: <YouTube />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mon.buildz",
    icon: <Instagram />,
  },

  {
    name: "Email",
    href: "mailto:mohansp119@gmail.com",
    icon: <Mail />,
  },
  {
    name: "Medium",
    href: "https://igmoni.medium.com/",
    icon: <Medium />,
  },
  {
    name: "Pinterest",
    href: "https://in.pinterest.com/igmonii/",
    icon: <Pinterest />,
  },
];

export const coverVideos = [
  '/assets/sukuna.mp4',
  'assets/onePiece.mp4',
  'assets/jjk.mp4',
  'assets/bleach.mp4',
]


export const links = [
  {
    name: "Typescript",
    link: 'https://www.typescriptlang.org/',
    icon: <TypeScript />
  },
  {
    name: "React",
    link: 'https://react.dev/',
    icon: <ReactIcon />
  },
  {
    name: "Next.js",
    link:  'https://nextjs.org/',
    icon: <NextJs />
  },
  {
    name: "Figma",
    link: 'https://www.figma.com/',
    icon: <Figma />
  }
]
