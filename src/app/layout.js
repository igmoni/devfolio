import { ViewTransitions } from "next-view-transitions";
import { Poppins } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";
import Footer from "@/components/common/Footer";
import KeyboardShortcutsLayer from "@/components/common/KeyboardShortcutsLayer";
import Navbar from "@/components/common/Navbar";
import OnekoCat from "@/components/common/OnekoCat";
import Quote from "@/components/common/Quote";
import ShootingStar from "@/components/common/ShootingStar";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import VisitorCount from "@/components/common/VisitorCount";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://monxdev.vercel.app"
  ),
  alternates: {
    canonical: "https://monxdev.vercel.app",
  },
  title: {
    default: "Mohan S P - Full Stack Web Developer • UI/UX Designer",
    template: "%s | Mohan S P",
  },

  description:
    "I design and build engaging digital experiences focused on performance and visual design. Explore my projects, experience & technical expertise.",

  openGraph: {
    type: "website",
    url: "https://monxdev.vercel.app/",
    title: "Mohan S P - Full Stack Web Developer • UI/UX Designer",
    description:
      "I design and build engaging digital experiences focused on performance and visual design. Explore my projects, experience & technical expertise.",
    siteName: "Mohan S P",
    images: [
      {
        url: "https://monxdev.vercel.app/meta/opengraph-img.png",
        width: 1200,
        height: 630,
        alt: "Mohan S P Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mohan S P - Full Stack Web Developer • UI/UX Designer",
    description:
      "I design and build engaging digital experiences focused on performance and visual design. Explore my projects, experience & technical expertise.",
    images: ["https://monxdev.vercel.app/meta/opengraph-img.png"],
    creator: "@_igmoni",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={`${poppins.className} min-h-[200vh] antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors position="top-center" />
            <KeyboardShortcutsLayer />
            <Navbar />
            <ShootingStar />
            {children}
            <VisitorCount />
            <OnekoCat />
            <Quote />
            <Footer />
            <Analytics />
            <UmamiAnalytics />
          </ThemeProvider>
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
