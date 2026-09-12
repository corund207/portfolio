import Link from "next/link";
import type { Project } from "@/data/projects";
import { projectPreviews } from "@/data/visuals";
import { ProjectMedia } from "./media";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const preview = projectPreviews[project.slug];
  return <article className={`project-card project-${project.slug} ${wide ? "project-card-wide" : ""}`}>
    <div className="project-card-visual">
      {project.heroImage
        ? <ProjectMedia media={project.heroImage} fallbackLabel={project.name} />
        : <div className="system-preview">
            <p className="preview-label">{preview.label}</p>
            <ol>{preview.nodes.map((node, index) => <li key={node}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{node}</strong>
              {index < preview.nodes.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
            </li>)}</ol>
            <span className="preview-caption">System outline · {preview.caption}</span>
          </div>}
    </div>
    <div className="project-card-copy">
      <h3><Link href={`/projects/${project.slug}`}>{project.name} <ArrowUpRight aria-hidden="true" /></Link></h3>
      <p className="project-domain">{project.category}</p>
      <p>{project.description}</p>
      <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="card-actions">
        <Link href={`/projects/${project.slug}`} className="text-link">Explore project <ArrowRight size={16} aria-hidden="true" /></Link>
        {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="quiet-link">Code <ArrowUpRight size={15} aria-hidden="true" /></a>}
      </div>
    </div>
  </article>;
}
