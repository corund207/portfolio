import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const base = "https://jonahchang.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects"].map(route => ({ url: `${base}${route}/`, lastModified: new Date() }));
  const projectRoutes = Object.keys(projects).map(slug => ({ url: `${base}/projects/${slug}/`, lastModified: new Date() }));
  return [...staticRoutes, ...projectRoutes];
}
