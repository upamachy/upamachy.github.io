# Upama's Coding House

Personal portfolio of **Upama Chowdhury** — .NET backend engineer in Dhaka, Bangladesh.

Live at **https://upamachy.github.io**

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (radix / nova preset) |
| 3D | three.js (lazy-loaded wireframe hero) |
| SEO | Static prerender + JSON-LD, OG, sitemap, manifest |
| Hosting | GitHub Pages via GitHub Actions |

## Commands

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck, client build, SSR build, prerender into dist/
npm run preview  # serve dist/
npm run images   # regenerate favicons and og.png
npm run lint     # oxlint
node scripts/audit.mjs   # Playwright audit: 7 viewports, axe, SEO, assets
```

`npm run build` renders the whole page to static HTML with `react-dom/server` and injects it
into `dist/index.html`, so crawlers and social previews get the full content without running JS.
The client hydrates that markup.

## Content

All copy lives in `src/data/profile.ts`. SEO strings and structured data live in `src/data/seo.ts`.
Edit those two files and rebuild — nothing else hardcodes content.

## Audit

`scripts/audit.mjs` boots Chromium against a preview server and checks, per viewport:
horizontal overflow, console errors, failed requests, image loading, 24px tap targets,
every section anchor landing clear of the sticky header, scroll-spy accuracy, education
content completeness, mobile sheet open/close, theme toggle, keyboard skip link, and
axe-core WCAG 2.1 AA. It then verifies meta tags, JSON-LD graph types, and that every
public asset returns 200.

## Layout

One page, seven anchored sections — About, Experience, Projects, Skills, Education,
Certifications, Contact. Each has its own accent colour, icon tile and layout (timelines
for Experience and Education, card grids for Projects, Skills and Certifications) so the
sections stay visually distinct. The sticky header tracks the active section as you scroll.
