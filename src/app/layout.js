import { Poppins } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Quote from "@/components/common/Quote";
import { Toaster } from "sonner";
import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";
import VisitorCount from "@/components/common/VisitorCount";
import OnekoCat from "@/components/common/OnekoCat";
import ShootingStar from "@/components/common/ShootingStar";
import KeyboardShortcutsLayer from "@/components/common/KeyboardShortcutsLayer";
import { Analytics } from "@vercel/analytics/next"
import { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export const metadata = {
  title: {
    default: "Mohan – Full Stack Web Developer",
    template: "%s | Mohan",
  },
  description:
    "Devfolio is my digital workspace where I build, ship, and showcase modern full-stack web applications.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://monxdev.vercel.app"
  ),
};


export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={`${poppins.className}  min-h-[200vh]  antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionChange
          >
            <Toaster richColors position="top-center" />
            <KeyboardShortcutsLayer />
            <Navbar />
            <ShootingStar/>
            {children}
            <VisitorCount />
            <OnekoCat/>
            <Quote />
            <Footer />
            <Analytics />
            <UmamiAnalytics />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
