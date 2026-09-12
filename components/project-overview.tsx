"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { irisViews } from "@/data/visuals";

export function ProjectOverview() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const view = irisViews[selected];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % irisViews.length;
    else if (event.key === "ArrowLeft") next = (index + irisViews.length - 1) % irisViews.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = irisViews.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return <div className="project-overview">
    <div className="overview-topline"><span>IRIS / System overview</span><span>{String(selected + 1).padStart(2, "0")} / 03</span></div>
    <div className="overview-tabs" role="tablist" aria-label="Explore IRIS systems">
      {irisViews.map((item, index) => <button ref={el => { tabs.current[index] = el; }} key={item.name} role="tab" id={`system-tab-${index}`} aria-selected={selected === index} aria-controls={`system-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={e => navigate(e, index)}>{item.name}</button>)}
    </div>
    <div key={selected} id={`system-panel-${selected}`} role="tabpanel" aria-labelledby={`system-tab-${selected}`} tabIndex={0} className="overview-panel">
      <h4>{view.title}</h4>
      <ol className="overview-flow">{view.nodes.map((node, index) => <li key={node}><span className="node-number">{String(index + 1).padStart(2, "0")}</span><span>{node}</span>{index < view.nodes.length - 1 && <ArrowRight size={15} aria-hidden="true" />}</li>)}</ol>
      <p>{view.description}</p>
      <span className="overview-note">{view.note}</span>
    </div>
  </div>;
}
