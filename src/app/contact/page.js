import React from "react";

import { MetaData } from "next";

import Container from "@/components/common/Container";
import ContactForm from "@/components/contact/ContactForm";
import { Separator } from "@/components/ui/separator";
import { contactConfig } from "@/config/Contact";
import { generateMetaData as getMetaData } from "@/config/Meta";

export async function generateMetadata() {
  return getMetaData("/contact");
}

const page = () => {
  return (
    <Container className={"px-5 py-16 pt-32"}>
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="from-primary to-secondary bg-linear-to-t bg-clip-text text-4xl font-semibold tracking-tight text-transparent lg:text-7xl dark:from-neutral-600 dark:to-white">
            {contactConfig.title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {contactConfig.desc}
          </p>
        </div>

        <Separator />
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
};

export default page;
