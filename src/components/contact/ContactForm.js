"use client";
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
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {  Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .regex(/^[\+]?[1-9][/d]{0,15}$/, {
      message: "Please enter a valid phone number.",
    }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters",
    })
    .max(1000, {
      message: "Message must not exceeed 1000 characters.",
    }),
});
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if(result.ok) {
            toast.success('Message sent successfully!')
            form.reset()
        } else {
            toast.error(result.error || 'Failed to send message. Please try again')
        }
    } catch (error) {
        console.error('Error submitting form:',error)
        toast.error('Something went wrong. Please try again later')
    } finally {
        setIsSubmitting(false)
    }
  }
  return (
    <Card>
        
    </Card>
  );
};

export default ContactForm;
