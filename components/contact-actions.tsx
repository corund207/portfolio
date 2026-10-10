"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Shows the address itself and offers a copy button, so visitors without a
 * configured mail app (most webmail users) can still reach out.
 */
export function ContactActions({ email, github }: { email: string; github: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const mailto = `mailto:${email}?subject=${encodeURIComponent("Hello from your portfolio")}`;
  return <div className="contact-actions">
    <div className="contact-email">
      <a href={mailto}>{email}</a>
      <button type="button" onClick={copy} aria-label={`Copy ${email}`}>
        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        <span>{status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy"}</span>
      </button>
      <span className="visually-hidden" aria-live="polite">{status === "copied" ? "Email address copied" : ""}</span>
    </div>
    <div className="contact-buttons">
      <a className="button-primary" href={mailto}><Mail size={16} aria-hidden="true" />Send an email</a>
      <a className="button-secondary" href={github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
  </div>;
}
