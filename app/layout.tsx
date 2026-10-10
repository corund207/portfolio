import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { DotField } from "@/components/dot-field";
import { HomeExperience } from "@/components/home-experience";

// One typeface everywhere; the optical-size axis tightens display sizes and opens up small text.
const inter = Inter({ subsets: ["latin"], axes: ["opsz"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL("https://corund.vercel.app/"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={inter.variable}><body><DotField fixed spacing={48} /><HomeExperience>{children}</HomeExperience></body></html>;
}
