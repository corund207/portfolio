"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeExperience({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
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
  }, { scope });

  return <div ref={scope} className="experience-shell">{children}</div>;
}
