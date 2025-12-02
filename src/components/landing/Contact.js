import React from "react";
import Container from "../common/Container";
import FreelanceText from "./FreelanceText";
import ContactForm from "../contact/ContactForm";

const Contact = () => {
  return (
    <Container className={"w-3/4 ml-0 py-32 flex flex-col gap-5 "}>
      <FreelanceText />
      <div className="flex flex-col">
        <h1 className="bg-linear-to-t from-primary to-secondary dark:from-neutral-600 dark:to-white bg-clip-text text-transparent   text-4xl font-semibold tracking-tight lg:text-6xl pb-3">
          Let's work together!
        </h1>
        <p className="max-w-xl text-base text-muted-foreground">
          Always thrilled to collabrate with passioante minds on impactful tech
          projects.
        </p>
      </div>
      <ContactForm className={'ml-0 pl-0 '} showHeader={false}/>
    </Container>
  );
};

export default Contact;
