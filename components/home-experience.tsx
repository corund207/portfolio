"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeExperience({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Animate existing children so typography and document flow stay intact.
      const reveal = (selector: string, stagger = .09) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach(group => {
          gsap.from(group.children, {
            opacity: 0, y: 22, duration: .85, stagger, ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 92%", once: true },
            clearProps: "opacity,transform",
          });
        });
      };

      reveal(".hero-heading, .showcase-heading, .project-showcase-copy, .contact-chapter");
      reveal(".discipline-specs, .project-meta-grid, .requirements-grid", .1);
      reveal(".project-hero, .page-intro, .about-content, .contact-block", .08);
      reveal(".detail-heading, .architecture-diagram, .iteration-line", .07);

      gsap.utils.toArray<HTMLElement>(".project-index article, .roadmap > div, .interest-list > div").forEach(row => {
        gsap.from(row, {
          opacity: 0, y: 16, duration: .65, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 96%", once: true },
          clearProps: "opacity,transform",
        });
      });

      gsap.utils.toArray<HTMLElement>(".immersive-frame").forEach(frame => {
        gsap.fromTo(frame,
          { scale: .96, opacity: .74 },
          { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top 95%", end: "center 66%", scrub: 1.4 } },
        );
      });

      gsap.utils.toArray<HTMLElement>(".showcase-statement, .archive-intro").forEach(statement => {
        gsap.fromTo(statement,
          { opacity: .35, y: 28 },
          { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: statement, start: "top 88%", end: "top 52%", scrub: 1.5 } },
        );
      });
    });

    media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const chapter = scope.current?.querySelector<HTMLElement>(".iteration-chapter");
      const statement = scope.current?.querySelector<HTMLElement>(".story-statement");
      if (!chapter || !statement) return;

      ScrollTrigger.create({
        trigger: chapter,
        start: "top top",
        end: "+=320",
        pin: statement,
        pinSpacing: true,
      });
    });

    return () => media.revert();
  }, { scope, dependencies: [pathname], revertOnUpdate: true });

  return <div ref={scope} className="experience-shell">{children}</div>;
}
