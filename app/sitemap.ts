import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const base = "https://jonahchang207.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [{ url: `${base}/`, lastModified: new Date() }];
  const projectRoutes = Object.keys(projects).map(slug => ({ url: `${base}/projects/${slug}/`, lastModified: new Date() }));
  return [...staticRoutes, ...projectRoutes];
}
