import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, type Project } from "@/data/projects";
import { SiteHeader, Footer, ProjectNav } from "@/components/site-shell";
import { ProjectMedia, ProjectVideo, MediaPlaceholder } from "@/components/media";
import { ArchitectureDiagram, EngineeringDecision, MetricCard, StatusBadge, SystemFlow } from "@/components/diagrams";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(projects).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  return project ? { title: `${project.name} — ${project.fullName} | Jonah Chang`, description: project.description } : {};
}

const irisRequirements = [
  ["Degrees of freedom", "6"],
  ["Primary manufacturing", "FDM 3D printing"],
  ["Primary task", "Object sorting"],
  ["Control", "Stepper-based joint control"],
  ["Perception", "Camera-based object identification"],
];

function IrisPage() {
  const project = projects.iris;
  return <ProjectLayout project={project} sections={["Overview", "Design", "Iteration", "Controls", "Results"]}>
    <section className="detail-section" id="overview">
      <SectionTitle number="01" title="The problem" />
      <div className="question-block"><p>How can a capable robotic manipulator be designed at a dramatically lower cost while retaining enough precision, range of motion, and sensing capability for automated sorting?</p></div>
      <div className="requirements-grid">{irisRequirements.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>Provisional</small></div>)}</div>
    </section>

    <section className="detail-section" id="design">
      <SectionTitle number="02" title="Mechanical architecture" />
      <MediaPlaceholder label="IRIS V9 exploded assembly" description="Exploded view showing structure, joints, and printed components" filename="iris/iris-v9-exploded.webp" type="diagram" />
      <div className="two-column">
        <div>
          <h3>Why 6 degrees of freedom?</h3>
          <p>Six joints provide the intended range of positioning and orientation for sorting. Reach and orientation limits remain to be documented.</p>
          <h3>Why FDM 3D printing?</h3>
          <p>FDM printing is the primary manufacturing method. Material choice, print orientation, and structural test results are still to be documented.</p>
        </div>
        <div className="axis-schematic" aria-label="Six-axis joint sequence"><span>J6</span><i /><span>J5</span><i /><span>J4</span><i /><span>J3</span><i /><span>J2</span><i /><span>J1</span><i /><b>BASE</b></div>
      </div>
      <div className="cycloidal">
        <div>
          <h3>Cycloidal reduction</h3>
          <p className="section-caption">Joint transmission</p>
          <p>The joint transmission uses cycloidal reduction. Backlash, output torque, bearing loading, and print durability remain open characterization questions.</p>
          <SystemFlow items={["Stepper motor", "Eccentric", "Cycloidal disc", "Output pins", "Joint"]} vertical />
        </div>
        <MediaPlaceholder label="Cycloidal gearbox · exploded view" description="Exploded render of the selected joint transmission" filename="iris/cycloidal-exploded.webp" type="diagram" />
      </div>
      <div className="metric-grid"><MetricCard label="Reduction ratio" /><MetricCard label="Target backlash" /><MetricCard label="Motor torque" /><MetricCard label="Estimated output torque" /></div>
    </section>

    <section className="detail-section" id="iteration">
      <SectionTitle number="03" title="Design iteration" />
      <div className="iteration-line">{["V1", "V3", "V5", "V8", "V9"].map((version, index) => <div className={version === "V9" ? "current" : ""} key={version}><span>{version}</span>{index < 4 && <i />}</div>)}</div>
      <div className="iteration-compare"><IterationCard version="V8" /><div className="change-arrow"><ArrowDown size={18} aria-hidden="true" /><span>Engineering change</span></div><IterationCard version="V9" /></div>
    </section>

    <section className="detail-section" id="controls">
      <SectionTitle number="04" title="Control system" />
      <ArchitectureDiagram items={["Joint geometry", "Forward kinematics", "End-effector pose", "Inverse kinematics", "Joint targets", "Trajectory planning", "Motor control", "Physical arm"].map(title => ({ title, detail: "Implementation status", status: "Planned" }))} />
    </section>

    <section className="detail-section" id="results">
      <SectionTitle number="05" title="Results" />
      <div className="result-callout"><h3>Maine State Science Fair</h3><strong>3rd Place</strong><span>Engineering Division</span></div>
      <div className="gallery-grid">{["Science fair presentation", "Prototype", "CAD", "Joint testing", "Physical hardware"].map(label => <MediaPlaceholder key={label} label={`IRIS — ${label}`} filename={`iris/${label.toLowerCase().replaceAll(" ", "-")}.webp`} aspectRatio="4:3" />)}</div>
    </section>

    <section className="detail-section phase-two">
      <SectionTitle number="06" title="Phase 2" />
      <div className="roadmap">{["Assemble mechanical system", "Characterize joint performance", "Implement motor control", "Forward kinematics", "Inverse kinematics", "Trajectory planning", "Vision-based object detection", "Autonomous sorting"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><StatusBadge>Planned</StatusBadge></div>)}</div>
    </section>
  </ProjectLayout>;
}

function IterationCard({ version }: { version: string }) {
  return <article className="iteration-card">
    <h3>Version {version}</h3>
    <MediaPlaceholder label={`${version} assembly`} description="Assembly comparison · CAD render pending" filename={`iris/${version.toLowerCase()}-assembly.webp`} aspectRatio="4:3" />
    <div><strong>What worked</strong><p>Documentation pending</p><strong>What failed</strong><p>Documentation pending</p><strong>What I learned</strong><p>Documentation pending</p></div>
  </article>;
}

function OtherProject({ slug }: { slug: "odyssey" | "vortex" | "maribotics" }) {
  const project = projects[slug];
  const isOdyssey = slug === "odyssey";
  const isVortex = slug === "vortex";
  const sections = isOdyssey ? ["Overview", "Architecture", "Control"] : isVortex ? ["Overview", "Architecture", "Pipeline"] : ["Overview", "Architecture", "Stereo Vision", "Future"];

  return <ProjectLayout project={project} sections={sections}>
    <section className="detail-section" id="overview">
      <ProjectVideo video={project.demoVideo} label={`${project.name} ${isOdyssey ? "Autonomous Navigation Demo" : "project demonstration"}`} filename={`${slug}/${slug}-demo.mp4`} />
      <SectionTitle number="01" title={isOdyssey ? "Localization" : isVortex ? "Problem" : "My contribution"} />
      <p className="section-lede">{isOdyssey ? "Odyssey gives a VEX robot a position estimate it can use for repeatable autonomous motion." : isVortex ? "Competition data is useful only when it is available, current, and structured for the moment it is needed." : "Perception system development, camera integration, object detection, and range / position estimation."}</p>
    </section>

    <section className="detail-section" id="architecture">
      <SectionTitle number="02" title={isOdyssey ? "Sensor fusion" : "Architecture"} />
      <ArchitectureDiagram items={(isOdyssey ? ["Tracking wheels", "IMU", "Sensor fusion", "Pose estimate (x, y, θ)", "Controller", "Motor commands", "Robot"] : isVortex ? ["RobotEvents API", "Request layer", "Data processing", "PostgreSQL", "Application"] : ["Camera system", "Image acquisition", "Object detection", "Bearing / range estimation", "Object position", "Data transmission", "Autonomy system"]).map(title => ({ title }))} />
    </section>

    {isVortex && <section className="detail-section" id="pipeline">
      <SectionTitle number="03" title="Data pipeline" />
      <EngineeringDecision>
        <p>The proposed request engine rotates through configured keys. Request spacing, retry behavior, recovery under failure, and exact rate limits remain to be documented.</p>
        <SystemFlow items={["Key 01", "Key 02", "Key 03", "Key 04", "…", "Key 10"]} />
        <p className="decision-engine">ROUND-ROBIN REQUEST ENGINE <ArrowDown size={16} aria-hidden="true" /> ROBOTEVENTS</p>
      </EngineeringDecision>
    </section>}

    {isOdyssey && <section className="detail-section" id="control">
      <SectionTitle number="03" title="Autonomous navigation" />
      <MediaPlaceholder label="Odyssey field position / trajectory render" description="Future visualization: robot pose, coordinates, heading, trajectory, target point, and path curvature" filename="odyssey/field-trajectory.webp" type="diagram" />
    </section>}

    {slug === "maribotics" && <section className="detail-section" id="stereo-vision">
      <SectionTitle number="03" title="P1 — Stereo vision" />
      <div className="stereo-diagram"><span>LEFT CAMERA</span><span>RIGHT CAMERA</span><b>Correspondence → Disparity → Depth</b></div>
      <div className="challenge-grid">{["USB synchronization", "Resolution limitations", "Camera calibration", "Baseline sensitivity", "Lighting", "Long-range accuracy", "Feature correspondence"].map(label => <div key={label}><strong>{label}</strong><p>Test observations and mitigation details pending.</p></div>)}</div>
    </section>}

    {slug === "maribotics" && <section className="detail-section" id="future">
      <SectionTitle number="04" title="Future approaches" />
      <div className="future-grid"><div><h3>P2 · AI depth estimation</h3><StatusBadge>Concept</StatusBadge></div><div><h3>P3 · Sensor fusion</h3><StatusBadge>Future Exploration</StatusBadge></div></div>
    </section>}
  </ProjectLayout>;
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return <div className="detail-heading"><span>{number}</span><h2>{title}</h2></div>;
}

function ProjectLayout({ project, sections, children }: { project: Project; sections: string[]; children: React.ReactNode }) {
  const mediaLabel = project.slug === "iris" ? "IRIS V9 complete assembly" : project.slug === "vortex" ? "Vortex dashboard" : project.slug === "odyssey" ? "Odyssey autonomous navigation" : "Maribotics perception system";
  return <><SiteHeader project={project.name} /><main id="main" className="project-page">
    <div className="project-hero">
      <h1>{project.name}</h1>
      <p className="project-full-name">{project.fullName}</p>
      <p className="project-discipline">{project.category}</p>
      <div className="project-links">
        {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>}
        {project.documentation && <a href={project.documentation} target="_blank" rel="noreferrer">Documentation <ArrowUpRight size={15} aria-hidden="true" /></a>}
        {project.slug === "iris" && <span className="muted-link">Technical brief coming soon</span>}
      </div>
      <ProjectMedia media={project.heroImage} fallbackLabel={mediaLabel} description="Project media pending" filename={`${project.slug}/${project.slug}-hero.webp`} />
    </div>
    <ProjectNav items={sections} />
    <div className="project-meta-grid">{[["Role", project.role], ["Status", project.status], ["Focus", project.focus.join(" · ")], ["Tools", project.tools.join(" · ")], ["Result", project.result]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    {children}
  </main><Footer /></>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects[slug]) notFound();
  return slug === "iris" ? <IrisPage /> : <OtherProject slug={slug as "odyssey" | "vortex" | "maribotics"} />;
}
