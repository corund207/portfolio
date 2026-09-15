# Jonah Chang — engineering portfolio

Next.js portfolio for robotics, autonomous systems, mechanical design, controls, and computer vision. The visual system uses an Apple-inspired system font stack, black and graphite chapters, blue actions, and restrained scroll motion. Project facts and links come from `data/projects.ts`.

## Run

```bash
npm install
npm run dev
```

## Verify

```bash
npm run lint
npm run typecheck
npm run build
```

The homepage is in `app/page.tsx`, project routes are in `app/projects/[slug]/page.tsx`, and shared styles are in `app/globals.css`. See `MEDIA_GUIDE.md` for replacing the intentional image/video placeholders.

The older static implementation and its design/product planning files were removed. Verified project descriptions and repository links were retained in the Next.js data source.
