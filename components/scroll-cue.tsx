"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

/** Tooltip pinned to the bottom of the hero that points visitors down, then fades once they scroll. */
export function ScrollCue({ target, label }: { target: string; label: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const update = () => setHidden(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <a className={`scroll-cue ${hidden ? "is-hidden" : ""}`} href={`#${target}`} tabIndex={hidden ? -1 : undefined}>
    <span className="scroll-cue-tip">{label}</span>
    <ChevronDown className="scroll-cue-arrow" size={22} aria-hidden="true" />
  </a>;
}
