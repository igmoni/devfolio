import React from "react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { education as e } from "@/config/About";

const Education = () => {
  return (
    <Container className={"py-16"}>
      <SectionHeading subHeading={"Featured"} heading={"Education"} />
      <div className="flex flex-col gap-5 pt-10">
        {e.map((item, idx) => (
          <div className="flex items-baseline lg:flex-row flex-col" key={idx}>
            <div className="lg:w-1/4 w-full">
              <p className="text-secondary">{item.period}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-primary dark:text-white font-semibold text-xl">
                {item.course}
              </p>
              <p className="text-secondary">{item.college}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Education;
