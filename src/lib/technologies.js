import ExpressJs from "@/components/technologies/ExpressJs";
import JavaScript from "@/components/technologies/JavaScript";
import NextJs from "@/components/technologies/NextJs";
import NodeJs from "@/components/technologies/NodeJs";
import Prisma from "@/components/technologies/Prisma";
import PostgreSQL from "@/components/technologies/PSQL";
import ReactIcon from "@/components/technologies/ReactIcon";
import Shadcn from "@/components/technologies/Shadcn";
import TailwindCss from "@/components/technologies/TailwindCss";
import TypeScript from "@/components/technologies/TypeScript";

const TECHNOLOGY_ICONS = {
  "next.js": NextJs,
  react: ReactIcon,
  typescript: TypeScript,
  javascript: JavaScript,
  "node.js": NodeJs,
  "express.js": ExpressJs,
  "tailwind css": TailwindCss,
  "shadcn ui": Shadcn,
  prisma: Prisma,
  postgresql: PostgreSQL,
  postgres: PostgreSQL,
};

function normalizeTechnologyName(name) {
  return name.trim().toLowerCase();
}

export function getTechnologyIcon(name) {
  return TECHNOLOGY_ICONS[normalizeTechnologyName(name)] ?? null;
}

export function resolveTechnologies(technologies = []) {
  return technologies.map((name) => ({
    name,
    Icon: getTechnologyIcon(name),
  }));
}
