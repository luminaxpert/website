# LuminaXpert — Website

Marketing site for **LuminaXpert**, an enterprise AI consultancy (strategy, engineering, MLOps, AI agents and responsible AI).

Built with **Next.js 16 (App Router, Turbopack)**, React 19, Tailwind CSS v4 and React Three Fiber. Deployed on **Netlify**.

## Run locally

Requires Node.js 20.9+ (22 recommended).

```bash
npm ci
npm run dev        # http://localhost:3000 (development)
# or, to test the production build:
npm run build && npm start
```

`npm run lint` runs ESLint.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Routes (App Router). Every route is statically pre-rendered, including all blog posts. |
| `app/sitemap.ts`, `app/robots.ts` | Generated `sitemap.xml` / `robots.txt`. |
| `components/background/` | The single, persistent WebGL background (GPU shaders, lazy-loaded after first paint). |
| `components/blog/` | Blog explorer (filters, search, pagination) and article tools (share, reading progress). |
| `lib/site.ts` | Site-wide constants: URLs, emails, social links, EmailJS keys, services list. |
| `lib/posts.tsx` | All blog posts (metadata + content). Add a new post by appending to `POSTS`. |
| `lib/team.ts` | Founders and practice leads. |
| `public/images/` | Optimised WebP images. |

## Adding a blog post

1. Add a hero image to `public/images/blog/` (WebP, ~1600px wide).
2. Append an entry to `POSTS` in `lib/posts.tsx` (unique `slug`, `date` like `"Nov 23, 2026"`).
3. The listing, pagination, sitemap, related posts and article page update automatically.

## Configuration

- **Site URL** — set `NEXT_PUBLIC_SITE_URL` in Netlify (e.g. your custom domain) for canonical URLs, Open Graph and the sitemap. Defaults to `https://luminaxpert.netlify.app`.
- **Forms** — contact, newsletter, onboarding, assessment and ROI-report forms send through EmailJS using the IDs in `lib/site.ts`.
- **Booking** — Calendly URL in `lib/site.ts`.

## Deployment

Pushing to `main` triggers a Netlify build (`netlify.toml`: Node 22, `@netlify/plugin-nextjs`, image caching and security headers).
