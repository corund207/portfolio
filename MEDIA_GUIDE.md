# Project media

The site deliberately shows labeled, dark media stages until real project images and videos are ready. It does not use AI-generated robot imagery as project evidence.

Homepage media slots are defined in `app/page.tsx`. Each placeholder has a `filename` under `public/media/`:

| Stage | Suggested file |
| --- | --- |
| Homepage IRIS hero | `public/media/iris/iris-v9-hero.webp` |
| IRIS assembly showcase | `public/media/iris/iris-v9-assembly.webp` |
| O.R.B.I.T. field/perception video | `public/media/orbit/orbit-field-test.mp4` |
| Odyssey autonomous run | `public/media/odyssey/odyssey-autonomous.mp4` |

After adding a real file, replace that stage’s `MediaPlaceholder` in `app/page.tsx` with `ProjectMedia` for images or `ProjectVideo` for video. Configure the source and descriptive label in `data/projects.ts`:

```ts
heroImage: {
  src: "/media/iris/iris-v9-hero.webp",
  label: "IRIS V9 complete assembly CAD render",
}

demoVideo: {
  type: "local",
  src: "/media/odyssey/odyssey-autonomous.mp4",
  poster: "/media/odyssey/odyssey-autonomous-poster.webp",
}
```

Project pages have additional labeled figure slots. Their `filename` values are visible in `app/projects/[slug]/page.tsx`. Use CAD renders, build photos, diagrams, testing footage, and screenshots from the actual projects. Prefer WebP for large stills and H.264 MP4 for local video. The media components fall back to placeholders if a configured source fails to load.
