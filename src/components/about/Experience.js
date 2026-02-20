import React from "react";

import { experience as e } from "@/config/About";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const Experience = () => {
  return (
    <Container className={"md:py-5"}>
      <SectionHeading subHeading={"Featured"} heading={"Experience"} />

      <div className="flex flex-col items-baseline pt-10 lg:flex-row">
        <div className="w-full lg:w-1/4">
          <p className="text-secondary">{e.period}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">{e.job}</h2>
          <h3 className="text-base font-semibold">{e.company}</h3>
          <ul className="ml-7 flex list-disc flex-col gap-2 lg:text-justify">
            {e.points.map((item, idx) => (
              <li className="text-secondary" key={idx}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Experience;
