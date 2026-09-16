import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, type Project } from "@/data/projects";
import { SiteHeader, Footer } from "@/components/site-shell";
import { ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(projects).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  return project ? { title: `${project.name} — ${project.fullName} | Jonah Chang`, description: project.description } : {};
}

function IrisPage() {
  const project = projects.iris;
  return <ProjectLayout project={project}>
    <section className="detail-section" id="overview">
      <SectionTitle title="The problem" />
      <div className="question-block"><p>How can a capable robotic manipulator be designed at a dramatically lower cost while retaining enough precision, range of motion, and sensing capability for automated sorting?</p></div>
      <div className="prose">
        <p>Industrial six-axis manipulators can position and orient an end effector anywhere in a 3D workspace — which is why they dominate tasks from assembly to inspection, with more than half a million new installations in 2024 alone. But an industrial robot is never just an arm: it is hardware, control software, sensing, calibration, and integration support that small manufacturers, schools, and hobbyists cannot buy or maintain.</p>
        <p>IRIS answers that gap with a low-cost, open-source six-axis arm built for a real task: vision-driven identification and pick-and-place sorting of components. The V9 hardware explored cycloidal joint reduction; the 2026–2027 redesign pushes affordability, reproducibility, efficiency, and adaptability — proven in the school robotics lab.</p>
        <p>IRIS earned 3rd Place in the Engineering division at the Maine State Science Fair.</p>
      </div>
    </section>
  </ProjectLayout>;
}

function OtherProject({ slug }: { slug: "odyssey" | "vortex" | "maribotics" | "sourcesight" }) {
  const project = projects[slug];
  if (slug === "odyssey") return <ProjectLayout project={project}>
    <section className="detail-section" id="overview">
      <SectionTitle title="Localization" />
      <p className="section-lede">Odyssey is an odometry and motion control template for VEX V5, built on PROS. It tracks the robot&apos;s field position and turns that estimate into repeatable autonomous motion — inspired by LemLib and EZ-Template.</p>
      <div className="prose">
        <p>From the running (x, y, heading) pose estimate, Odyssey provides PID turns and drives, boomerang moveToPose, and pure pursuit path following, with an optional Monte Carlo layer shadowing from V5 Distance Sensors. It installs as a PROS template — tuning guides and the API reference are in the documentation.</p>
      </div>
    </section>
  </ProjectLayout>;

  if (slug === "maribotics") return <ProjectLayout project={project}>
    <section className="detail-section" id="overview">
      <SectionTitle title="Perception system" />
      <p className="section-lede">O.R.B.I.T. — Optical Ranging, Bearing &amp; Identification Telemetry — is research toward a modular, low-cost 360° perception sensor: detect, classify, range, bear, track, and export real-world targets in real time.</p>
      <div className="prose">
        <p>Every detection leaves the pipeline as a normalized target record — identity, timestamp, class, confidence, bearing, and range. Bench prototypes run from pipeline simulations to a calibrated stereo YOLO rig with persistent tracking and Kalman-smoothed depth; ranging is validated end-to-end, with a single-sensor slice, a 360° prototype, then productization ahead.</p>
      </div>
    </section>
  </ProjectLayout>;

  if (slug === "vortex") return <ProjectLayout project={project}>
    <section className="detail-section" id="overview">
      <SectionTitle title="Problem" />
      <p className="section-lede">Competition data is useful only when it is available, current, and structured for the moment it is needed.</p>
      <div className="prose">
        <p>A request engine rotates through configured keys in round-robin fashion, pulling from the RobotEvents API through a request layer into processing and PostgreSQL storage, feeding the application.</p>
      </div>
    </section>
  </ProjectLayout>;

  return <ProjectLayout project={project}>
    <section className="detail-section" id="overview">
      <SectionTitle title="Overview" />
      <p className="section-lede">{project.description}</p>
    </section>
  </ProjectLayout>;
}

function SectionTitle({ title }: { title: string }) {
  return <div className="detail-heading"><h2>{title}</h2></div>;
}

function ProjectLayout({ project, children }: { project: Project; children: React.ReactNode }) {
  return <><SiteHeader project={project.name} /><main id="main" className="project-page">
    <div className="project-hero">
      <h1>{project.name}</h1>
      <p className="project-full-name">{project.fullName}</p>
      <p className="project-discipline">{project.category}</p>
      <p className="project-summary">{project.description}</p>
      <div className="project-links">
        {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>}
        {project.documentation && <a href={project.documentation} target="_blank" rel="noreferrer">Documentation <ArrowUpRight size={15} aria-hidden="true" /></a>}
        {project.slug === "iris" && <span className="muted-link">Technical brief coming soon</span>}
      </div>
    </div>
    {children}
  </main><Footer /></>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects[slug]) notFound();
  return slug === "iris" ? <IrisPage /> : <OtherProject slug={slug as "odyssey" | "vortex" | "maribotics" | "sourcesight"} />;
}
