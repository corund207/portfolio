"use client";
import Image from "next/image";
import { Crosshair, Play } from "lucide-react";
import { useState } from "react";
import type { Media, Video } from "@/data/projects";

type PlaceholderProps = {
  label: string; description?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "3:2" | "portrait";
  filename?: string; type?: "image" | "video" | "diagram";
};

export function MediaPlaceholder({ label, description, aspectRatio = "16:9", filename, type = "image" }: PlaceholderProps) {
  return <figure className={`media-placeholder ratio-${aspectRatio.replace(":", "-")}`} data-asset={filename ? `/public/media/${filename}` : undefined}>
    <div className="placeholder-top"><span>{type === "video" ? "Motion study" : type === "diagram" ? "Technical drawing" : "Project archive"}</span><span>Media pending</span></div>
    <div className="placeholder-center">{type === "video" ? <Play size={30} strokeWidth={1} aria-hidden="true" /> : <Crosshair size={30} strokeWidth={1} aria-hidden="true" />}</div>
    <figcaption><strong>{label}</strong>{description && <p>{description}</p>}</figcaption>
  </figure>;
}

export function ProjectMedia({ media, fallbackLabel, description, aspectRatio = "16:9", filename, type = "image" }: { media: Media; fallbackLabel: string } & Omit<PlaceholderProps, "label">) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!media?.src || failedSrc === media.src) return <MediaPlaceholder label={fallbackLabel} description={description} aspectRatio={aspectRatio} filename={filename} type={type} />;
  return <div className={`media-frame ratio-${aspectRatio.replace(":", "-")}`}><Image src={media.src} alt={media.label} fill sizes="(max-width: 768px) 100vw, 1200px" onError={() => setFailedSrc(media.src)} /></div>;
}

export function ProjectVideo({ video, label, filename = "project/demo.mp4" }: { video?: Video; label: string; filename?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!video || (video.type === "local" && failedSrc === video.src)) return <MediaPlaceholder label={label} description="Demonstration video pending" filename={filename} type="video" />;
  if (video.type === "youtube") return <div className="video-frame"><iframe loading="lazy" src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`} title={label} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>;
  return <video className="video-frame" aria-label={label} controls preload="none" poster={video.poster} src={video.src} onError={() => setFailedSrc(video.src)}>Your browser does not support the video element.</video>;
}
