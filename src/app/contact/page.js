
import React from "react";
import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import { generateMetaData as getMetaData } from "@/config/Meta";
import { MetaData } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { contactConfig } from "@/config/Contact";

export async function generateMetadata() {
  return getMetaData("/contact");
}

const page = () => {
  return (
    <Container className={"py-16 pt-32 px-5"}>
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="bg-linear-to-t from-primary to-secondary dark:from-neutral-600 dark:to-white bg-clip-text text-transparent   text-4xl font-semibold tracking-tight lg:text-7xl">
            {contactConfig.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
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
