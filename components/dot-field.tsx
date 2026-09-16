"use client";

import { useEffect, useRef } from "react";

type DriftDot = {
  hx: number; hy: number;
  ox: number; oy: number;
  vx: number; vy: number;
  seed: number; speed: number; amp: number;
};

const MAX_DPR = 1.5;
const FOLLOW_RADIUS = 320;
const FOLLOW_PULL = 14;

/** Calm ambient dot lattice: slow drift + shimmer, no interaction. */
export function DotField({ spacing = 46, fixed = false }: { spacing?: number; fixed?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let t0 = -1;
    let dots: DriftDot[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollVel = 0;
    let flow = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      const gap = spacing * dpr;
      const cols = Math.max(1, Math.floor(width / gap));
      const rows = Math.max(1, Math.floor(height / gap));
      const startX = (width - (cols - 1) * gap) / 2;
      const startY = (height - (rows - 1) * gap) / 2;
      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            hx: startX + col * gap,
            hy: startY + row * gap,
            ox: 0, oy: 0, vx: 0, vy: 0,
            seed: Math.random() * Math.PI * 2,
            speed: 0.12 + Math.random() * 0.22,
            amp: (4 + Math.random() * 6) * dpr,
          });
        }
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      scrollVel = Math.max(-120, Math.min(120, scrollVel * 0.5 + (y - lastScrollY) * 0.5));
      lastScrollY = y;
    };

    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      return {
        x: (clientX - rect.left) * dpr,
        y: (clientY - rect.top) * dpr,
        inside: clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom,
      };
    };

    const onMove = (event: PointerEvent) => {
      const point = toLocal(event.clientX, event.clientY);
      mouse.active = point.inside;
      if (point.inside) {
        mouse.x = point.x;
        mouse.y = point.y;
      }
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const frame = (time: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const t = time / 1000;
      if (t0 < 0) t0 = t;
      // Intro ramp: wobble and brightness ease in over ~1.4s.
      const introK = Math.min(1, (t - t0) / 1.4);
      const ease = 1 - Math.pow(1 - introK, 3);
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      ctx.clearRect(0, 0, width, height);
      // Scroll river: dots stream with scroll velocity, then settle.
      scrollVel *= 0.9;
      flow += (Math.max(-70, Math.min(70, scrollVel * 1.4)) - flow) * 0.1;
      const speedK = Math.min(1, Math.abs(flow) / 40);
      for (const dot of dots) {
        const wobble = 0.25 + 0.75 * ease;
        const baseX = dot.hx + Math.sin(t * dot.speed + dot.seed) * dot.amp * wobble;
        const baseY = dot.hy + Math.cos(t * dot.speed * 0.8 + dot.seed * 1.3) * dot.amp * wobble;
        // Subtle follow: lean toward the cursor, then relax home.
        if (mouse.active) {
          const dx = mouse.x - baseX;
          const dy = mouse.y - baseY;
          const dist = Math.hypot(dx, dy);
          if (dist > 1 && dist < FOLLOW_RADIUS) {
            const pull = (1 - dist / FOLLOW_RADIUS) * FOLLOW_PULL;
            dot.vx += ((dx / dist) * pull - dot.ox) * 0.045;
            dot.vy += ((dy / dist) * pull - dot.oy) * 0.045;
          } else {
            dot.vx += -dot.ox * 0.045;
            dot.vy += -dot.oy * 0.045;
          }
        } else {
          dot.vx += -dot.ox * 0.045;
          dot.vy += -dot.oy * 0.045;
        }
        dot.vx *= 0.9;
        dot.vy *= 0.9;
        dot.ox += dot.vx;
        dot.oy += dot.vy;
        const x = baseX + dot.ox;
        const variance = 0.6 + 0.8 * (dot.seed / (Math.PI * 2));
        const y = baseY + dot.oy + flow * variance;
        const alpha = (0.21 + (Math.sin(t * dot.speed * 1.4 + dot.seed * 2.1) * 0.5 + 0.5) * 0.11) * (0.2 + 0.8 * ease) + speedK * 0.05;
        const radius = 1.5 * dpr;
        ctx.fillStyle = `rgba(245,245,247,${alpha.toFixed(3)})`;
        ctx.beginPath();
        if (speedK > 0.05) {
          ctx.ellipse(x, y, radius, radius * (1 + speedK * 1.6), 0, 0, Math.PI * 2);
        } else {
          ctx.arc(x, y, radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && !document.hidden;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0 });
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden && running) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!document.hidden && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [spacing]);

  return <canvas ref={canvasRef} className={fixed ? "dot-field fixed" : "dot-field"} aria-hidden="true" />;
}
