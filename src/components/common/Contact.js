import React from "react";

import { cn } from "@/lib/utils";

import ContactForm from "../contact/ContactForm";
import FreelanceText from "../landing/FreelanceText";
import Container from "./Container";

const Contact = ({ className }) => {
  return (
    <Container
      className={cn(
        "ml-0 flex w-full flex-col gap-5 px-5 py-10 md:w-3/4 md:py-32",
        className
      )}
    >
      <FreelanceText />
      <div className="flex flex-col">
        <h1 className="from-primary to-secondary bg-linear-to-t bg-clip-text pb-3 text-4xl font-semibold tracking-tight text-transparent lg:text-6xl dark:from-neutral-600 dark:to-white">
          Let's work together!
        </h1>
        <p className="text-muted-foreground max-w-xl text-base">
          Always thrilled to collabrate with passioante minds on impactful tech
          projects.
        </p>
      </div>
      <ContactForm className={"ml-0 pl-0"} showHeader={false} />
    </Container>
  );
};

export default Contact;
