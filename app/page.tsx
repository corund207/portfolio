import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { archiveProjects, projects, tint } from "@/data/projects";
import { liveApps } from "@/data/apps";
import { site } from "@/data/site";
import { Footer, SiteHeader } from "@/components/site-shell";
import { HeroDots } from "@/components/hero-dots";
import { DotField } from "@/components/dot-field";
import { KineticLine, Magnetic } from "@/components/hero-kinetic";
import { ProjectMedia, ProjectVideo } from "@/components/media";
import { ScrollCue } from "@/components/scroll-cue";
import { ContactActions } from "@/components/contact-actions";

// Each discipline borrows the accent of the project that leans on it most.
const disciplines = [
  ["Mechanical design", "From concept and CAD to manufacturable assemblies.", projects.iris],
  ["Control systems", "Localization, motion planning, and feedback control.", projects.odyssey],
  ["Computer vision", "Perception and ranging for real-world systems.", projects.maribotics],
  ["Embedded computing", "Software that runs where the system does.", projects.sourcesight],
] as const;

// Projects with their own pages lead the list; the rest link out to GitHub.
const moreWork = [
  ...[projects.vortex, projects.sourcesight].map(project => ({
    name: project.name,
    area: project.category === "Not yet documented" ? project.status : project.category,
    description: project.description,
    href: `/projects/${project.slug}`,
  })),
  ...archiveProjects,
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
          <Magnetic><a className="button-primary" href="#apps">Open an app</a></Magnetic>
          <Magnetic><a className="button-secondary" href="#work">View projects</a></Magnetic>
        </div>
      </div>
      <ScrollCue target="apps" label="Scroll to the live apps" />
    </section>

    <section id="apps" className="apps-chapter" aria-labelledby="apps-title">
      <div className="archive-intro">
        <h2 id="apps-title">Live apps.</h2>
        <p>Everything that runs publicly, each at its own address on jonahchang.com.</p>
      </div>
      <ul className="app-grid">
        {liveApps.map(app => <li key={app.host}>
          <p className="app-kind">{app.kind}</p>
          <h3>{app.name}</h3>
          <p className="app-description">{app.description}</p>
          <p className="app-host">{app.host}</p>
          <a className="button-primary" href={`https://${app.host}`} aria-label={`Open ${app.name}`}>Open <ArrowUpRight size={15} aria-hidden="true" /></a>
        </li>)}
      </ul>
    </section>

    <section id="work" className="iris-showcase product-chapter" style={tint(projects.iris)} aria-labelledby="iris-title">
      <div className="showcase-heading">
        <p>{projects.iris.fullName}</p>
        <h2 id="iris-title">IRIS</h2>
        <p>Six axes. One integrated system.</p>
        <div>
          <Link className="button-primary" href="/projects/iris">Explore the design</Link>
        </div>
      </div>
      <div className="showcase-media immersive-frame">
        {projects.iris.demoVideo
          ? <ProjectVideo video={projects.iris.demoVideo} label="IRIS demonstration" filename="iris/iris-demo.mp4" />
          : <ProjectMedia media={projects.iris.assemblyImage ?? null} fallbackLabel="IRIS V9 / CAD render" description="Full-width assembly render or motion study" filename="iris/iris-v9-assembly.webp" />}
      </div>
    </section>

    <section className="project-showcase odyssey-showcase" style={tint(projects.odyssey)} aria-labelledby="odyssey-title">
      <div className="project-showcase-copy">
        <p>{projects.odyssey.name}</p>
        <h2 id="odyssey-title">Know where you are.<br />Control where you go.</h2>
        <p>{projects.odyssey.description}</p>
        <Link href="/projects/odyssey">Explore Odyssey <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="project-showcase-media immersive-frame">
        <figure className="video-slot">
          <figcaption><strong>Lab run: solo AWP</strong><span>Autonomous win-point routine during lab testing</span></figcaption>
          <ProjectVideo video={projects.odyssey.demoVideo} label="Odyssey solo AWP lab run" filename="odyssey/odyssey-lab-solo-awp.mp4" />
        </figure>
        <figure className="video-slot">
          <figcaption><strong>Worlds: right-side autonomous</strong><span>Right-side autonomous routine at the World Championship</span></figcaption>
          <ProjectVideo video={projects.odyssey.secondaryVideo} label="Odyssey right-side autonomous at Worlds" filename="odyssey/odyssey-worlds-right.mp4" />
        </figure>
      </div>
    </section>

    <section className="project-showcase orbit-showcase" style={tint(projects.maribotics)} aria-labelledby="orbit-title">
      <div className="project-showcase-copy">
        <p>{projects.maribotics.name}</p>
        <h2 id="orbit-title">Low-cost, 360°<br />perception.</h2>
        <p>{projects.maribotics.description}</p>
        <Link href="/projects/maribotics">Explore O.R.B.I.T. <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>

    <section className="archive-chapter" aria-labelledby="archive-title">
      <div className="archive-intro">
        <h2 id="archive-title">More work.</h2>
        <p>Competition software, computer vision, simulation, and engineering tools.</p>
      </div>
      <div className="project-index">
        {moreWork.map(item => {
          const internal = item.href?.startsWith("/");
          return <article key={item.name}>
            <div><h3>{item.name}</h3><p>{item.area}</p></div>
            <p>{item.description}</p>
            {item.href && (internal
              ? <Link href={item.href} aria-label={`${item.name} project page`}><ArrowRight size={19} aria-hidden="true" /></Link>
              : <a href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.name} repository`}><ArrowUpRight size={19} aria-hidden="true" /></a>)}
          </article>;
        })}
      </div>
    </section>

    <section id="about" className="iteration-chapter" aria-labelledby="about-title">
      <div className="story-statement">
        <p>About</p>
        <h2 id="about-title">Built through iteration.</h2>
        <p>I&apos;m Jonah Chang, a student engineer at Cape Elizabeth High School. I design, build, test, and revise mechanical and software systems, and keep every result grounded in what can be measured. On VEX team 56S, I&apos;m the main programmer and primary CAD designer.</p>
      </div>
      <div className="discipline-specs">
        {disciplines.map(([title, description, project]) => <article key={title} style={tint(project)}><h3>{title}</h3><p>{description}</p></article>)}
      </div>
    </section>

    <section id="contact" className="contact-chapter has-dots" aria-labelledby="contact-title">
      <DotField />
      <p>Have a project question?</p>
      <h2 id="contact-title">Let&apos;s talk engineering.</h2>
      <ContactActions email={site.email} github={site.github} />
    </section>
  </main><Footer /></>;
}
