"use client";

import { useEffect, useRef, type ReactNode } from "react";

const RADIUS = 190;
const MAX_OFFSET = 34;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** A line of text whose letters fling away from the cursor and spring home. */
export function KineticLine({ text }: { text: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>("[data-k]"));
    const state = chars.map(() => ({ ox: 0, oy: 0, vx: 0, vy: 0 }));
    let centers: { x: number; y: number }[] = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };
    let raf = 0;
    let running = true;

    const measure = () => {
      centers = chars.map(el => {
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };

    const onMove = (event: PointerEvent) => {
      const dx = mouse.active ? event.clientX - mouse.x : 0;
      const dy = mouse.active ? event.clientY - mouse.y : 0;
      mouse.vx = mouse.vx * 0.7 + dx * 0.3;
      mouse.vy = mouse.vy * 0.7 + dy * 0.3;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const frame = () => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;
      chars.forEach((el, i) => {
        const s = state[i];
        const home = centers[i];
        if (home && mouse.active) {
          const dx = home.x + s.ox - mouse.x;
          const dy = home.y + s.oy - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 1 && dist < RADIUS) {
            const fall = 1 - dist / RADIUS;
            const force = fall * fall * 9;
            s.vx += (dx / dist) * force - (dy / dist) * force * 0.5 + mouse.vx * 0.05 * fall;
            s.vy += (dy / dist) * force + (dx / dist) * force * 0.5 + mouse.vy * 0.05 * fall;
          }
        }
        s.vx += -s.ox * 0.03;
        s.vy += -s.oy * 0.03;
        s.vx *= 0.86;
        s.vy *= 0.86;
        s.ox += s.vx;
        s.oy += s.vy;
        const offset = Math.hypot(s.ox, s.oy);
        if (offset > MAX_OFFSET) {
          s.ox = (s.ox / offset) * MAX_OFFSET;
          s.oy = (s.oy / offset) * MAX_OFFSET;
        }
        el.style.transform = `translate3d(${s.ox.toFixed(2)}px,${s.oy.toFixed(2)}px,0)`;
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && !document.hidden;
      if (visible && !running) {
        measure();
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0 });
    observer.observe(root);

    measure();
    raf = requestAnimationFrame(frame);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [text]);

  return <span ref={rootRef} aria-hidden="true">{text.split("").map((char, i) => <span key={i} data-k className="kinetic-char">{char === " " ? " " : char}</span>)}</span>;
}

/** Gently pulls its child toward the cursor within range, then lets go. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | null;
    if (!el || reducedMotion()) return;
    const RANGE = 150;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < RANGE && dist > 1) {
        const pull = (1 - dist / RANGE) * 7;
        el.style.transform = `translate3d(${(dx / dist * pull).toFixed(1)}px,${(dy / dist * pull).toFixed(1)}px,0)`;
      } else {
        el.style.transform = "";
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <span ref={ref} className="magnetic" style={{ display: "contents" }}>{children}</span>;
}
