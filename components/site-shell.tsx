"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

export function SiteHeader({ project }: { project?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  const links = <>
    <Link href="/projects" aria-current={pathname.startsWith("/projects") ? "page" : undefined} onClick={() => setOpen(false)}>Projects</Link>
    <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={() => setOpen(false)}>About</Link>
    {site.resumePath && <Link href={site.resumePath}>Resume</Link>}
    <a href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
    {site.email && <a className="nav-contact" href={`mailto:${site.email}`}>Contact</a>}
  </>;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/">Jonah Chang{project && <span className="brand-project">/ {project}</span>}</Link>
        <div className="nav-links">{links}</div>
        <button ref={toggle} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </nav>
      {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{links}</nav>}
    </header>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div><strong>Jonah Chang</strong><span>Robotics & autonomous systems</span></div>
    <div className="footer-links"><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a>{site.resumePath && <Link href={site.resumePath}>Resume</Link>}{site.email && <a href={`mailto:${site.email}`}>Contact</a>}</div>
    <span className="copyright">© {new Date().getFullYear()}</span>
  </footer>;
}
