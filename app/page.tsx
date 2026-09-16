import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { archiveProjects, projects } from "@/data/projects";
import { site } from "@/data/site";
import { Footer, SiteHeader } from "@/components/site-shell";
import { HeroDots } from "@/components/hero-dots";
import { DotField } from "@/components/dot-field";
import { KineticLine, Magnetic } from "@/components/hero-kinetic";
import { ProjectMedia, ProjectVideo } from "@/components/media";

const disciplines = [
  ["Mechanical design", "From concept and CAD to manufacturable assemblies."],
  ["Control systems", "Localization, motion planning, and feedback control."],
  ["Computer vision", "Perception and ranging for real-world systems."],
  ["Embedded computing", "Software that runs where the system does."],
];

export default function Home() {
  return <><SiteHeader /><main id="main" className="site-main">
    <section className="product-hero" aria-labelledby="hero-title">
      <HeroDots />
      <div className="hero-heading">
        <p>Jonah Chang</p>
        <h1 id="hero-title" aria-label="Robotics. Engineered further."><KineticLine text="Robotics." /><br /><KineticLine text="Engineered further." /></h1>
        <p>Student engineer building autonomous systems across mechanical design, controls, perception, and software.</p>
        <div className="hero-actions">
          <Magnetic><Link className="button-primary" href="/projects">Explore Projects</Link></Magnetic>
          <Magnetic><a className="button-secondary" href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a></Magnetic>
        </div>
      </div>
    </section>

    <section className="iris-showcase product-chapter" aria-labelledby="iris-title">
      <div className="showcase-heading">
        <p>{projects.iris.fullName}</p>
        <h2 id="iris-title">IRIS</h2>
        <p>Six axes. One integrated system.</p>
        <div>
          <Link className="button-primary" href="/projects/iris">Explore the design</Link>
          <Link className="button-secondary" href="/projects">More projects</Link>
        </div>
      </div>
      <div className="showcase-media immersive-frame">
        {projects.iris.demoVideo
          ? <ProjectVideo video={projects.iris.demoVideo} label="IRIS demonstration" filename="iris/iris-demo.mp4" />
          : <ProjectMedia media={projects.iris.assemblyImage ?? null} fallbackLabel="IRIS V9 / CAD render" description="Full-width assembly render or motion study" filename="iris/iris-v9-assembly.webp" />}
      </div>
    </section>

    <section className="project-showcase odyssey-showcase" aria-labelledby="odyssey-title">
      <div className="project-showcase-copy">
        <p>{projects.odyssey.name}</p>
        <h2 id="odyssey-title">Know where you are.<br />Control where you go.</h2>
        <p>{projects.odyssey.description}</p>
        <Link href="/projects/odyssey">Explore Odyssey <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="project-showcase-media immersive-frame dual-video">
        <figure className="video-slot">
          <figcaption><strong>Solo AWP — Lab Run</strong><span>Autonomous win-point routine · lab testing</span></figcaption>
          <ProjectVideo video={projects.odyssey.demoVideo} label="Odyssey solo AWP lab run" filename="odyssey/odyssey-lab-solo-awp.mp4" />
        </figure>
        <figure className="video-slot">
          <figcaption><strong>Worlds — Right-Side Autonomous</strong><span>Right-side autonomous routine · World Championship</span></figcaption>
          <ProjectVideo video={projects.odyssey.secondaryVideo} label="Odyssey right-side autonomous at Worlds" filename="odyssey/odyssey-worlds-right.mp4" />
        </figure>
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
      <div className="project-definition">
        <p>ORBIT is a low-cost perception system designed to give autonomous and semi-autonomous platforms a better understanding of their surroundings. The project combines inexpensive camera hardware, edge computing, and computer vision to detect objects and estimate information such as their position, bearing, and distance.</p>
        <p>The current prototype focuses on stereo vision using dual cameras, with ongoing work in calibration, synchronization, depth estimation, and real-world testing.</p>
        <p>ORBIT is being developed as a modular platform that can be adapted beyond its initial marine application to robotics, vehicles, and other autonomous systems.</p>
      </div>
    </section>

    <section className="project-showcase sourcesight-showcase" aria-labelledby="sourcesight-title">
      <div className="project-showcase-copy">
        <p>{projects.sourcesight.name}</p>
        <h2 id="sourcesight-title">A clearer view<br />of your sources.</h2>
        <p>{projects.sourcesight.description}</p>
        <Link href="/projects/sourcesight">Explore SourceSight <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="project-definition">
        <p>SourceSight is in active development — full project details coming soon.</p>
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

    <section className="contact-chapter has-dots" aria-labelledby="contact-title">
      <DotField />
      <p>Have a project question?</p>
      <h2 id="contact-title">Let&apos;s talk engineering.</h2>
      <div>
        {site.email && <a className="button-primary" href={`mailto:${site.email}`}>Send an email</a>}
        <Link className="button-secondary" href="/about">About Jonah</Link>
      </div>
    </section>
  </main><Footer /></>;
}
