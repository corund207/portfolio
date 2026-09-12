import type React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

export function SystemFlow({ items, vertical = false }: { items: string[]; vertical?: boolean }) {
  return <div className={`system-flow ${vertical ? "flow-vertical" : ""}`}>{items.map((item, index) => <div className="flow-unit" key={item}>
    <span className="flow-node">{item}</span>
    {index < items.length - 1 && <span className="flow-arrow" aria-hidden="true">{vertical ? <ArrowDown size={16} /> : <ArrowRight size={16} />}</span>}
  </div>)}</div>;
}

export function ArchitectureDiagram({ items }: { items: { title: string; detail?: string; status?: string }[] }) {
  return <div className="architecture-diagram">{items.map((item, index) => <div className="architecture-row" key={item.title}>
    <div className="arch-node"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong>{item.detail && <small>{item.detail}</small>}{item.status && <em>{item.status}</em>}</div>
    {index < items.length - 1 && <div className="arch-connector" aria-hidden="true" />}
  </div>)}</div>;
}

export function MetricCard({ label, value = "Not measured" }: { label: string; value?: string }) {
  return <div className="metric-card"><span>{label}</span><strong>{value}</strong></div>;
}

export function StatusBadge({ children }: { children: string }) {
  return <span className={`status-badge status-${children.toLowerCase().replaceAll(" ", "-")}`}><i />{children}</span>;
}

export function EngineeringDecision({ children }: { children: React.ReactNode }) {
  return <aside className="engineering-decision"><h3>API rate-limit management</h3><p className="decision-label">Engineering decision</p>{children}</aside>;
}
