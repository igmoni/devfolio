import React from "react";

import { education as e } from "@/config/About";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const Education = () => {
  return (
    <Container className={"py-16"}>
      <SectionHeading subHeading={"Featured"} heading={"Education"} />
      <div className="flex flex-col gap-5 pt-10">
        {e.map((item, idx) => (
          <div className="flex flex-col items-baseline lg:flex-row" key={idx}>
            <div className="w-full lg:w-1/4">
              <p className="text-secondary">{item.period}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-primary text-xl font-semibold dark:text-white">
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
