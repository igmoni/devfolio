import React from "react";
import Container from "../common/Container";
import Image from "next/image";

const Description = () => {
  return (
    <Container className={"py-20"}>
      <div className="flex">
        <div className="p-1 bg-red-400 rounded-md">
          <Image
            src={"/projects/balc.jpg"}
            width={200}
            height={600}
            alt="Background"
            className="min-h-[350px] w-2xs rounded-sm"
          />
        </div>

        <div className="w-3/4 pl-10 flex flex-col gap-8 text-justify text-lg">
          <p className="text-secondary">
            <span className="text-white">
              I’m a full-stack developer based in India, focused on building
              fast, scalable, and user-friendly web applications.
            </span>{" "}
            I specialize in HTML, CSS, JavaScript, and React, while constantly
            leveling up my backend skills to deliver complete solutions.
          </p>

          <p className="text-secondary">
            <span className="text-white">
              What began as simple curiosity turned into a passion for solving
              real problems through code.
            </span>{" "}
            I enjoy creating experiences that feel smooth, intuitive, and
            reliable for users.
          </p>

          <p className="text-secondary">
            <span className="text-white">
              I’m also driven by an entrepreneurial mindset — I don’t just build
              software, I build products with purpose.
            </span>{" "}
            Every project is an opportunity to improve performance, refine
            design, and create impact.
          </p>
        </div>
      </div>
      <div className="py-10">
        <h2 className="text-3xl text-white font-semibold">Mohan S P</h2>
        <p className="text-secondary text-sm">
          Full-Stack Web Developer - Bengaluru, India
        </p>
      </div>
    </Container>
  );
};

export default Description;
