import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { SiteHeader, Footer } from "@/components/site-shell";
import { ProjectCard } from "@/components/project-card";
import { ProjectMedia } from "@/components/media";
import { ProjectOverview } from "@/components/project-overview";

export default function Home() {
  return <><SiteHeader /><main id="main">
    <section className="home-hero">
      <div className="hero-copy">
        <h1>Jonah Chang<span className="name-period">.</span></h1>
        <p className="hero-discipline">Robotics · autonomous systems · controls</p>
        <p className="hero-lede">Mechanical design, control software,<br className="desktop-break" /> and the systems that connect them.</p>
      </div>
      <div className="hero-side">
        <p>Student engineer at Cape Elizabeth High School. Building across robotics, computer vision, and autonomous systems.</p>
        <div className="hero-actions">
          <Link className="text-link" href="#projects">Explore the work <ArrowRight size={17} aria-hidden="true" /></Link>
          <a className="quiet-link" href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section className="home-projects" id="projects" aria-labelledby="projects-heading">
      <div className="section-head">
        <h2 id="projects-heading">Selected work</h2>
        <p>Four projects spanning hardware and software.</p>
      </div>

      <article className="iris-feature">
        <div className="feature-copy">
          <div>
            <h3><Link href="/projects/iris">IRIS <ArrowUpRight aria-hidden="true" /></Link></h3>
            <p className="feature-title">{projects.iris.fullName}</p>
            <p className="project-domain">Independent robotics · flagship project</p>
          </div>
          <p>{projects.iris.description}</p>
          <div className="feature-facts">
            <span>6 degrees of freedom</span><span>FDM 3D printing</span><span>V9 mechanical design</span>
          </div>
          <Link href="/projects/iris" className="text-link">Inside the project <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="feature-media">
          {projects.iris.heroImage
            ? <ProjectMedia media={projects.iris.heroImage} fallbackLabel="IRIS V9 CAD Render" filename="iris/iris-v9-hero.webp" />
            : <ProjectOverview />}
        </div>
        <div className="feature-footnote">
          <span>Phase 2 · Mechanical assembly and control development</span>
          <span>3rd place, Engineering · Maine State Science Fair</span>
        </div>
      </article>

      <div className="project-grid">
        <ProjectCard project={projects.odyssey} />
        <ProjectCard project={projects.vortex} />
      </div>
      <ProjectCard project={projects.maribotics} wide />
    </section>

    <section className="home-about">
      <div><h2>Learning through<br />the work.</h2></div>
      <div>
        <p>Most of what I learn comes from building things, testing them, figuring out why they don’t work, and trying again.</p>
        <Link className="text-link" href="/about">More about me <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </main><Footer /></>;
}
