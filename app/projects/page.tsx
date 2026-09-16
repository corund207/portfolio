import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SiteHeader, Footer } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Projects | Jonah Chang",
  description: "All engineering projects: robotic manipulators, localization, perception, competition software, and more.",
};

// Mirrors the homepage showcase order, with Vortex last.
const order = ["iris", "maribotics", "odyssey", "sourcesight", "vortex"];

function isDocumented(value: string) {
  return value !== "Not yet documented";
}

export default function ProjectsPage() {
  return <><SiteHeader /><main id="main" className="inner-page projects-page">
    <div className="page-intro">
      <h1>Projects.</h1>
      <p>Robotic systems, software, and research — each with its own build log, media, and technical detail.</p>
    </div>
    <div className="project-card-list">
      {order.map(slug => {
        const project = projects[slug];
        const tags = project.tags.filter(isDocumented);
        return <Link key={slug} href={`/projects/${slug}`} className="project-card">
          <span className="project-card-main">
            <span className="project-card-title">{project.name}</span>
            <span className="project-card-eyebrow">{project.category}</span>
            <span className="project-card-description">{project.description}</span>
            {tags.length > 0 && <span className="project-card-tags">{tags.join("  ·  ")}</span>}
          </span>
          <span className="project-card-side">
            <span className="project-card-status">{project.status}</span>
            <span className="project-card-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
          </span>
        </Link>;
      })}
    </div>
  </main><Footer /></>;
}
