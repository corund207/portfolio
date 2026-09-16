# Add your images and IRIS video

## 1. Copy your files

Put your files in `public/media/iris/`, for example:

```text
public/media/iris/iris-v9-hero.webp
public/media/iris/iris-v9-assembly.webp
public/media/iris/iris-demo.mp4
```

JPG, PNG, and WebP images work; use your actual extension. Export video as H.264 MP4 for broad browser compatibility. Prefer lowercase filenames without spaces.

## 2. Set the IRIS media

In `data/projects.ts`, inside `iris`, replace the existing `heroImage`, `assemblyImage`, and `demoVideo` values with:

```ts
heroImage: {
  src: "/media/iris/iris-v9-hero.webp",
  label: "IRIS V9 complete robotic arm assembly",
},
assemblyImage: {
  src: "/media/iris/iris-v9-assembly.webp",
  label: "IRIS V9 assembly showing all six joints",
},
demoVideo: {
  type: "local",
  src: "/media/iris/iris-demo.mp4",
  poster: "/media/iris/iris-v9-assembly.webp",
},
```

Paths start with `/media/`, **not** `/public/media/`. Labels describe images for screen readers. The optional poster is the still shown before playback.

- The homepage hero is text-only (no media stage).
- The homepage IRIS showcase uses `demoVideo` when configured, otherwise `assemblyImage`.
- Project detail pages are text-only explanations; `demoVideo` and images appear in the homepage showcases, never on detail pages.
- Keep `demoVideo: null` to show images only. Leave image values `null` until ready.

Video autoplays muted on loop while in view, with playback controls. Missing images fall back to placeholders. Local video errors fall back when the browser attempts to load the video.

For YouTube, use only the video ID after `v=`, not the full URL:

```ts
demoVideo: { type: "youtube", youtubeId: "YOUR_VIDEO_ID" },
```

## 3. Add other images

Project detail pages (`app/projects/[slug]/page.tsx`) are text-only explanations — do not add media figures there. Add images and video to the homepage showcases in `app/page.tsx` using the same pattern:

```tsx
<ProjectMedia
  media={{ src: "/media/iris/iris-v9-exploded.webp", label: "IRIS V9 exploded view showing the joint assemblies" }}
  fallbackLabel="IRIS V9 exploded assembly"
  type="diagram"
/>
```

Homepage videos use `ProjectVideo`, which autoplays muted on loop while in view.

## 4. Preview

Run `npm run dev`, open the local URL printed in the terminal, and check the homepage and `/projects/iris`. Play the video to confirm it loads. If a placeholder remains, check filename capitalization, extension, and the `/media/` path. Restart the dev server if newly added files do not appear. Files are included the next time you deploy the site.
