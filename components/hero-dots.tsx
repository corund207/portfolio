"use client";

import { useEffect, useRef } from "react";

type Dot = {
  hx: number; hy: number;
  ox: number; oy: number;
  vx: number; vy: number;
  born: number;
};

const MAX_DPR = 1.75;
const EVENT_RADIUS = 260;
const MAX_OFFSET = 70;
const STIFFNESS = 0.022;
const DAMPING = 0.9;

export function HeroDots() {
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
    let dots: Dot[] = [];
    let firstLayout = true;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollVel = 0;
    let flow = 0;
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      const spacing = Math.max(26, Math.min(40, Math.floor(rect.width * dpr / 52)));
      const cols = Math.max(1, Math.floor(width / spacing));
      const rows = Math.max(1, Math.floor(height / spacing));
      const startX = (width - (cols - 1) * spacing) / 2;
      const startY = (height - (rows - 1) * spacing) / 2;
      dots = [];
      // Intro: dots start scattered outward and settle into the grid,
      // center first for a blooming assemble. Only on first layout.
      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.hypot(width, height) / 2 || 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const hx = startX + col * spacing;
          const hy = startY + row * spacing;
          if (firstLayout) {
            const dx = hx - cx;
            const dy = hy - cy;
            const dist = Math.hypot(dx, dy) || 1;
            const scatter = 160 + Math.random() * 260;
            dots.push({
              hx, hy,
              ox: (dx / dist) * scatter,
              oy: (dy / dist) * scatter,
              vx: 0, vy: 0,
              born: (dist / maxDist) * 0.45,
            });
          } else {
            dots.push({ hx, hy, ox: 0, oy: 0, vx: 0, vy: 0, born: 0 });
          }
        }
      }
      firstLayout = false;
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
        const dx = mouse.x > -9990 ? point.x - mouse.x : 0;
        const dy = mouse.y > -9990 ? point.y - mouse.y : 0;
        mouse.vx = mouse.vx * 0.7 + dx * 0.3;
        mouse.vy = mouse.vy * 0.7 + dy * 0.3;
        mouse.x = point.x;
        mouse.y = point.y;
      }
    };

    const onLeave = () => {
      mouse.active = false;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const onScroll = () => {
      const y = window.scrollY;
      scrollVel = Math.max(-120, Math.min(120, scrollVel * 0.5 + (y - lastScrollY) * 0.5));
      lastScrollY = y;
    };

    const frame = () => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (t0 < 0) t0 = performance.now() / 1000;
      const age = performance.now() / 1000 - t0;
      ctx.clearRect(0, 0, width, height);
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;
      scrollVel *= 0.9;
      flow += (Math.max(-70, Math.min(70, scrollVel * 1.4)) - flow) * 0.1;
      const speedK = Math.min(1, Math.abs(flow) / 40);

      for (const dot of dots) {
        const live = age >= dot.born;
        const x = dot.hx + dot.ox;
        const y = dot.hy + dot.oy;

        if (live && mouse.active) {
          // Black hole: violent radial ejection with orbital swirl, plus a kick
          // in the direction the cursor is traveling.
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 1 && dist < EVENT_RADIUS) {
            const nx = dx / dist;
            const ny = dy / dist;
            const fall = 1 - dist / EVENT_RADIUS;
            const force = fall * fall * 16;
            dot.vx += nx * force - ny * force * 0.55 + mouse.vx * 0.06 * fall;
            dot.vy += ny * force + nx * force * 0.55 + mouse.vy * 0.06 * fall;
          }
        }

        // Spring home with damping for the fluid settle.
        if (live) {
          dot.vx += -dot.ox * STIFFNESS;
          dot.vy += -dot.oy * STIFFNESS;
        }
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        if (live) {
          dot.ox += dot.vx;
          dot.oy += dot.vy;
        }
        const offset = Math.hypot(dot.ox, dot.oy);
        if (offset > MAX_OFFSET) {
          dot.ox = (dot.ox / offset) * MAX_OFFSET;
          dot.oy = (dot.oy / offset) * MAX_OFFSET;
        }

        // Proximity glow: brighter the further a dot is flung, blue at peak energy.
        // Scaled by the intro so settling dots don't flash on load.
        const introK = Math.min(1, Math.max(0, (age - dot.born) / 0.8));
        const fling = Math.min(1, Math.hypot(dot.ox, dot.oy) / 40) * introK;
        const alpha = 0.26 + fling * 0.6 + speedK * 0.08;
        const radius = (1.5 + fling * 1.2) * Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const drawY = dot.hy + dot.oy + flow;
        ctx.fillStyle = fling > 0.55
          ? `rgba(41,151,255,${alpha.toFixed(3)})`
          : `rgba(245,245,247,${alpha.toFixed(3)})`;
        ctx.beginPath();
        if (speedK > 0.05) {
          ctx.ellipse(dot.hx + dot.ox, drawY, radius, radius * (1 + speedK * 1.6), 0, 0, Math.PI * 2);
        } else {
          ctx.arc(dot.hx + dot.ox, drawY, radius, 0, Math.PI * 2);
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
  }, []);

  return <canvas ref={canvasRef} className="hero-dots" aria-hidden="true" />;
}
