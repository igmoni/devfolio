import React from "react";
import Container from "./Container";
import { footerConfig as data } from "@/config/Footer";

const Footer = () => {
  return (
    <Container className={"py-16"}>
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-secondary text-center">
          {data.text} <b>{data.developer}</b>
          <br />
          &copy; {new Date().getFullYear()}.{data.copyright}
        </p>
      </div>
    </Container>
  );
};

export default Footer;
