import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { archiveProjects, projects } from "@/data/projects";
import { site } from "@/data/site";
import { Footer, SiteHeader } from "@/components/site-shell";
import { HomeExperience } from "@/components/home-experience";
import { MediaPlaceholder } from "@/components/media";

const disciplines = [
  ["Mechanical design", "From concept and CAD to manufacturable assemblies."],
  ["Control systems", "Localization, motion planning, and feedback control."],
  ["Computer vision", "Perception and ranging for real-world systems."],
  ["Embedded computing", "Software that runs where the system does."],
];

export default function Home() {
  return <HomeExperience><SiteHeader /><main id="main" className="site-main">
    <section className="product-hero" aria-labelledby="hero-title">
      <div className="hero-heading">
        <p>Jonah Chang</p>
        <h1 id="hero-title">Robotics.<br />Engineered further.</h1>
        <p>Student engineer building autonomous systems across mechanical design, controls, perception, and software.</p>
        <div className="hero-actions">
          <Link className="button-primary" href="/projects/iris">Explore IRIS</Link>
          <a className="button-secondary" href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-media immersive-frame">
        <MediaPlaceholder label="IRIS — complete assembly" description="Replace with a hero CAD render or project film" filename="iris/iris-v9-hero.webp" />
      </div>
    </section>

    <section className="iris-showcase product-chapter" aria-labelledby="iris-title">
      <div className="showcase-heading">
        <p>{projects.iris.fullName}</p>
        <h2 id="iris-title">IRIS</h2>
        <p>Six axes. One integrated system.</p>
        <div>
          <Link className="button-primary" href="/projects/iris">Explore the design</Link>
          <Link className="button-secondary" href="/projects/iris#controls">Control system</Link>
        </div>
      </div>
      <div className="showcase-media immersive-frame">
        <MediaPlaceholder label="IRIS V9 / CAD render" description="Full-width assembly render or motion study" filename="iris/iris-v9-assembly.webp" />
      </div>
      <div className="showcase-statement">
        <h3>Designed as a system,<br />not a collection of parts.</h3>
        <p>Mechanical architecture and joint transmission lead the current work. Control software and camera-based identification are planned around the same sorting task.</p>
      </div>
    </section>

    <section className="iteration-chapter" aria-labelledby="iteration-title">
      <div className="story-statement">
        <p>Engineering process</p>
        <h2 id="iteration-title">Built through iteration.</h2>
        <p>I design, build, test, and revise mechanical and software systems—keeping the result grounded in what can actually be measured.</p>
      </div>
      <div className="discipline-specs">
        {disciplines.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
      </div>
    </section>

    <section className="project-showcase orbit-showcase" aria-labelledby="orbit-title">
      <div className="project-showcase-copy">
        <p>{projects.maribotics.name}</p>
        <h2 id="orbit-title">Low-cost, 360°<br />perception.</h2>
        <p>{projects.maribotics.description}</p>
        <Link href="/projects/maribotics">Explore O.R.B.I.T. <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="project-showcase-media immersive-frame">
        <MediaPlaceholder label="O.R.B.I.T. / perception test" description="Replace with field footage, camera rig photography, or detection output" filename="orbit/orbit-field-test.mp4" type="video" />
      </div>
    </section>

    <section className="project-showcase odyssey-showcase" aria-labelledby="odyssey-title">
      <div className="project-showcase-copy">
        <p>{projects.odyssey.name}</p>
        <h2 id="odyssey-title">Know where you are.<br />Control where you go.</h2>
        <p>{projects.odyssey.description}</p>
        <Link href="/projects/odyssey">Explore Odyssey <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="project-showcase-media immersive-frame">
        <MediaPlaceholder label="Odyssey / autonomous run" description="Replace with field trajectory visualization or autonomous run video" filename="odyssey/odyssey-autonomous.mp4" type="video" />
      </div>
    </section>

    <section className="archive-chapter" aria-labelledby="archive-title">
      <div className="archive-intro">
        <h2 id="archive-title">More work.</h2>
        <p>Competition robotics, computer vision, simulation, and engineering tools.</p>
      </div>
      <div className="project-index">
        {archiveProjects.map(project => <article key={project.name}>
          <div><h3>{project.name}</h3><p>{project.area}</p></div>
          <p>{project.description}</p>
          {project.href && <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.name} repository`}><ArrowUpRight size={19} aria-hidden="true" /></a>}
        </article>)}
      </div>
    </section>

    <section className="contact-chapter" aria-labelledby="contact-title">
      <p>Have a project question?</p>
      <h2 id="contact-title">Let&apos;s talk engineering.</h2>
      <div>
        {site.email && <a className="button-primary" href={`mailto:${site.email}`}>Send an email</a>}
        <Link className="button-secondary" href="/about">About Jonah</Link>
      </div>
    </section>
  </main><Footer /></HomeExperience>;
}
