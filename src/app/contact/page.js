import React from "react";
import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import { generateMetaData as getMetaData } from "@/config/Meta";
import { MetaData } from "next";
import ContactForm from '@/components/contact/ContactForm'
export const metadata = {
  ...getMetaData("/contact"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
const page = () => {
  return (
    <Container className={"py-16"}>
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
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
