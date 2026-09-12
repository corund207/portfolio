import { SiteHeader, Footer } from "@/components/site-shell";
import { site } from "@/data/site";

const interests = ["Robotics", "Autonomous Systems", "Control Systems", "Computer Vision", "Mechanical Design", "Embedded Computing", "Software Engineering"];

export default function AboutPage() {
  return <><SiteHeader /><main id="main" className="inner-page about-page">
    <div className="page-intro">
      <h1>About Jonah.</h1>
      <p>I&apos;m Jonah Chang, a student engineer at Cape Elizabeth High School interested in robotics, autonomous systems, controls, computer vision, and software.</p>
    </div>
    <div className="about-content">
      <section>
        <h2>Learning by building</h2>
        <p>Most of what I learn comes from building things, testing them, figuring out why they don&apos;t work, and trying again.</p>
      </section>
      <section>
        <h2>Current interests</h2>
        <div className="interest-list">{interests.map(item => <div key={item}>{item}</div>)}</div>
      </section>
    </div>
    <section className="contact-block">
      <h2>Contact</h2>
      <p>For project questions, collaboration, or technical conversation.</p>
      <div className="contact-links">{site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}<a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
    </section>
  </main><Footer /></>;
}
