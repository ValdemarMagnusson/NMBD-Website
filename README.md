# Guvani App Starter (Level 3)

Next.js + TypeScript app template for **client projects that may need a backend**. Hosted on **Vercel**; domain and DNS typically on **Cloudflare**.

Includes bilingual i18n (sv/en), SEO (Next.js metadata + runtime language updates), and a backend decision guide for coding agents.

## Quick start for a new client

1. Click **Use this template** on GitHub (or clone and push to a new repo).
2. Update `src/site.config.ts` — name, domain, email.
3. Replace copy in `src/locales/en.json` and `src/locales/sv.json`.
4. Update `public/sitemap.xml`, `public/robots.txt`, `public/og-image.svg`.
5. Copy `.env.example` → `.env.local`.
6. **Read [`docs/BACKEND.md`](docs/BACKEND.md)** and pick a backend path before adding auth, DB, or payments.

## Develop

```bash
npm install
npm run dev
```

Health check: `GET /api/health`

## Deploy (Vercel + Cloudflare DNS)

1. Push to GitHub.
2. Import repo in [Vercel](https://vercel.com).
3. Add environment variables from `.env.example` as needed.
4. Add the production domain in Vercel → **Settings → Domains**.
5. Point **Cloudflare DNS** at Vercel (grey cloud / DNS-only by default).
6. Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL.

Full steps, apex/`www`, and proxy vs DNS-only: **[docs/BACKEND.md](docs/BACKEND.md#deployment--vercel--cloudflare-dns)**.

## Project structure

```
src/
  site.config.ts       # ← start here for each new client
  app/                 # Next.js App Router pages + API routes
  lib/seo.ts           # Metadata + client SEO updates
  lib/i18n.ts
  locales/
docs/
  BACKEND.md           # ← agent onboarding: Vercel / Supabase / Specific
```

## Backend options (summary)

| Path | When |
|---|---|
| **A — Vercel API routes** | Light serverless (forms, webhooks) |
| **B — Supabase / Clerk + Neon** | Auth, DB, client self-manage |
| **C — Specific.dev** | Unified agent-first infra, Guvani-operated |

Full details: **[docs/BACKEND.md](docs/BACKEND.md)**

## Related templates

| Template | Use case |
|---|---|
| **guvani-site-starter** | Static landing sites (Cloudflare) |
| **guvani-site-starter-pro** | Landing + contact form + Resend (Cloudflare) |
| **guvani-app-starter** (this repo) | Next.js apps with optional backend (Vercel) |
