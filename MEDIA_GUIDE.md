# Media guide

The site renders intentional placeholders until a project asset is configured.

On the homepage, missing hero media is replaced with a conceptual system overview.
IRIS has keyboard-accessible Mechanics, Controls, and Perception tabs; their copy
lives in `data/visuals.ts`. These outlines are not renderings or test evidence.
Adding a `heroImage` replaces the overview with the actual media automatically.
Project-page placeholders keep expected filenames under “Asset details.”
Configured images or local videos that fail to load also fall back to placeholders.

1. Export the image as WebP, PNG, or JPG.
2. Place it inside `/public/media/<project>/`.
3. Open `data/projects.ts`.
4. Find the relevant `heroImage: null` or `demoVideo: null` value.
5. Replace it with a media value, for example:

```ts
heroImage: { src: "/media/iris/iris-v9-hero.webp", label: "IRIS V9 CAD Render" }
```

6. Save. Next.js will update the site automatically.

CAD renders: WebP, 2400–3200 px wide, 16:9 or 3:2, high quality, transparent or clean neutral background. Photos: WebP or JPG, 2000+ px wide. Diagrams: SVG preferred, otherwise high-resolution PNG or WebP.

For local video:

```ts
demoVideo: { type: "local", src: "/media/odyssey/autonomous-demo.mp4", poster: "/media/odyssey/autonomous-demo-poster.webp" }
```

For YouTube, use an unlisted video if it should not be publicly discoverable:

```ts
demoVideo: { type: "youtube", youtubeId: "XXXXXXXXXXX" }
```

Recommended local video format: MP4, H.264, 1080p, 30 or 60 fps. Use YouTube for large files.
