import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { DotField } from "@/components/dot-field";
import { HomeExperience } from "@/components/home-experience";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL("https://jonahchang.dev"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><DotField fixed spacing={48} /><HomeExperience>{children}</HomeExperience></body></html>;
}
