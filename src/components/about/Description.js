"use client";
import Image from "next/image";

import Container from "../common/Container";
import { Separator } from "../ui/separator";

const Description = () => {
  return (
    <Container className={"py-16 md:py-20"}>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <div className="border-secondary/20 rounded-xl border p-2 shadow-[inset_0_0_5px_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_5px_2px_rgba(255,255,255,0.1)]">
          <Image
            src={"/assets/mohan.jpeg"}
            width={200}
            height={600}
            alt="Mohan"
            className={`min-h-[350px] w-2xs rounded-md`}
          />
        </div>

        <div className="flex w-full flex-col gap-8 text-justify text-lg md:w-3/4 md:pl-10">
          <p className="text-secondary">
            <span className="text-primary dark:text-white">
              I’m a full-stack developer based in India, focused on building
              fast, scalable, and user-friendly web applications.
            </span>{" "}
            I specialize in HTML, CSS, JavaScript, and React, while constantly
            leveling up my backend skills to deliver complete solutions.
          </p>

          <p className="text-secondary">
            <span className="text-primary dark:text-white">
              What began as simple curiosity turned into a passion for solving
              real problems through code.
            </span>{" "}
            I enjoy creating experiences that feel smooth, intuitive, and
            reliable for users.
          </p>

          <p className="text-secondary">
            <span className="text-primary dark:text-white">
              I’m also driven by an entrepreneurial mindset — I don’t just build
              software, I build products with purpose.
            </span>{" "}
            Every project is an opportunity to improve performance, refine
            design, and create impact.
          </p>
        </div>
      </div>

      <div className="py-10">
        <h2 className="text-primary text-3xl font-semibold dark:text-white">
          Mohan S P
        </h2>
        <p className="text-secondary text-sm">
          Full-Stack Web Developer - Bengaluru, India
        </p>
      </div>
      <Separator className={"mt-5"} />
    </Container>
  );
};

export default Description;
