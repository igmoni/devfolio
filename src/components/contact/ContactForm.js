"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Chat from "@/svgs/Chat";
import { cn } from "@/lib/utils";
import Coffee from "../common/Coffee";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Enter a valid email" }),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number"),
  message: z.string().min(10).max(1000),
});

const ContactForm = ({ className, showHeader = true }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result?.error || "Send failed");

      toast.success("Message sent!");
      form.reset();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("border-none shadow-none bg-transparent p-0", className)}>
      {showHeader && (
        <CardHeader className="p-0 pb-4">
          <CardTitle>Send me a message</CardTitle>
          <CardDescription>
            Fill out the form and I&apos;ll get back to you quickly.
          </CardDescription>
        </CardHeader>
      )}

      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-6", !showHeader && "mt-0")}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          <div className="flex gap-5 items-start">
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-fit dark:bg-white group dark:hover:bg-neutral-200" 
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                <div className="group-hover:rotate-45 group-hover:flex transition-all duration-200">

                  <Chat className="w-4 h-4 " />
                </div>
                  Send Message

                </>
              )}
            </Button>
              <Coffee className={'size-9 shadow-acternity dark:shadow-acternity-white'}/>
              
          </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
