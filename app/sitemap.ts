import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const base = "https://jonahchang.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [{ url: `${base}/`, lastModified: new Date() }];
  // No trailing slash: that is the address the pages are served at (with one,
  // every sitemap entry was a redirect).
  const projectRoutes = Object.keys(projects).map(slug => ({ url: `${base}/projects/${slug}`, lastModified: new Date() }));
  return [...staticRoutes, ...projectRoutes];
}
