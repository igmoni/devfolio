import React from "react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { experience as e } from "@/config/About";

const Experience = () => {
  return (
    <Container className={"py-5"}>
      <SectionHeading subHeading={"Featured"} heading={"Experience"} />

      <div className="flex lg:flex-row flex-col items-baseline pt-10">
        <div className="w-full lg:w-1/4">
          <p className="text-secondary">{e.period}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">{e.job}</h2>
          <h3 className="font-semibold text-base">{e.company}</h3>
          <ul className="list-disc ml-7 flex flex-col gap-2 lg:text-justify">
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
