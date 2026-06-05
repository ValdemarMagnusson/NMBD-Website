# Backend options for Guvani App Starter

> **For coding agents:** Read this document before adding auth, database, payments, or API routes to a client project cloned from `guvani-app-starter`. Pick **one** backend path at project kickoff — do not mix patterns without explicit reason.

## When to use this template

| Guvani template | Stack | Deploy | Use when |
|---|---|---|---|
| `guvani-site-starter` | Vite + React | Cloudflare Pages | Static marketing site, no server |
| `guvani-site-starter-pro` | Vite + React + Functions | Cloudflare Pages | Marketing site + contact form (Resend) |
| **`guvani-app-starter`** (this) | Next.js | Vercel | App features: auth, DB, dashboards, integrations |

This repo ships **frontend only**. Backend is chosen per client.

---

## Decision tree

```
Does the project need persistent data or user accounts?
├─ NO  → Vercel API routes only (Path A)
│         Contact forms, webhooks, light serverless
│
└─ YES → Does the client need to self-manage later?
    ├─ YES → Supabase (Path B) or Clerk + Neon (Path B variant)
    │         Familiar dashboards, large ecosystem
    │
    └─ NO (Guvani operates it, agent-heavy build)
        → Specific.dev (Path C)
          Unified Postgres, storage, workers — agent-first config
```

**Stripe / payments:** Almost always added on top of any path. Not included in any template.

---

## Path A — Vercel API routes only

**Best for:** Contact forms, newsletter signup, webhooks, proxying third-party APIs, cron jobs, secrets that must not live in the browser.

**Not for:** User auth at scale, complex relational data, real-time sync, long-running workers.

### What you get

- API routes in `src/app/api/`
- Deployed automatically with the Next.js app on Vercel
- Secrets via Vercel Environment Variables

### Setup steps

1. Create `src/app/api/<name>/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // validate, call Resend/Stripe/etc.
  return NextResponse.json({ ok: true });
}
```

2. Add env vars in Vercel dashboard (and `.env.local` locally):

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

3. Call from client: `fetch("/api/contact", { method: "POST", ... })`

### Limits

- Serverless execution time limits (Vercel plan-dependent)
- Cold starts on infrequent routes
- No built-in database — pair with external DB if needed

### When to graduate to Path B or C

- You need Postgres with migrations
- You need auth sessions, RLS, or user tables
- You need background jobs longer than serverless timeout

---

## Path B — Supabase (or Clerk + Neon)

**Best for:** Client-facing apps with accounts, dashboards, CMS-like data, realtime, file storage. Client may hire another dev who knows Supabase.

### Supabase includes

- Postgres database
- Auth (email, OAuth, magic links)
- Row Level Security
- Storage buckets
- Realtime subscriptions
- Edge Functions (optional)

### Setup steps

1. Create project at [supabase.com](https://supabase.com)
2. Add to `.env.local` and Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server only, never expose to client
```

3. Install: `npm install @supabase/supabase-js`
4. Create `src/lib/supabase/client.ts` (browser) and `server.ts` (Server Components / API routes)
5. Run migrations via Supabase SQL editor or CLI

### Clerk + Neon variant

Use when you want **Clerk** for auth UX and **Neon** for serverless Postgres separately:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=   # Neon connection string
```

Install `@clerk/nextjs` + Drizzle/Prisma for ORM.

### Tradeoffs

| Pros | Cons |
|---|---|
| Mature, well-documented | Multiple dashboards (Vercel + Supabase + Stripe) |
| Client can self-serve | Agent must wire SDK + RLS correctly |
| Auth + DB in one (Supabase) | Vendor lock-in to Supabase patterns |

---

## Path C — Specific.dev

**Best for:** Guvani-operated projects built heavily with coding agents. Unified infra: Postgres, Redis, object storage, long-running services, secrets — defined in a config file, deployed with CLI.

Docs: [https://docs.specific.dev](https://docs.specific.dev)

### What Specific provides

- Managed Postgres (serverless)
- S3-compatible object storage
- Redis-compatible cache
- Full backend services (any language, long-running)
- Real-time sync engine from Postgres
- Secrets management
- `specific dev` — local full stack in one command
- `specific deploy` — production deploy

### When to choose Specific over Supabase

- You want **one platform** for DB + storage + workers (less vendor sprawl)
- You need **long-running** processes or WebSockets (not serverless limits)
- Build workflow is **agent-first** (infra as config next to code)
- Client does **not** need to self-manage infra

### When NOT to choose Specific

- Client expects Supabase/Vercel familiarity for handoff
- Project needs Stripe Billing + Supabase Auth tutorials off the shelf
- Team has not evaluated Specific production readiness for the client

### Setup steps

1. Install Specific CLI per [installation docs](https://docs.specific.dev/installation-and-usage)
2. Add `specific.yaml` (or project config) defining services + Postgres
3. Run `specific dev` locally
4. Next.js on Vercel calls Specific backend via HTTPS (env: `API_URL`, `DATABASE_URL` from Specific secrets)
5. Deploy backend: `specific deploy`

### Architecture pattern

```
Browser → Vercel (Next.js frontend + thin BFF API routes)
              ↓
         Specific (Postgres, workers, storage)
```

Keep Next.js on Vercel for frontend/CDN. Run heavy backend on Specific unless you move the full app there.

---

## Environment variable conventions

Use consistent names across projects:

| Variable | Used in | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Client + SEO | Production origin |
| `DATABASE_URL` | Server only | Postgres connection |
| `RESEND_API_KEY` | Server only | Email |
| `STRIPE_SECRET_KEY` | Server only | Payments |
| `STRIPE_WEBHOOK_SECRET` | API routes | Webhook verification |
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Supabase path |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Supabase path |

**Rule:** Never prefix secrets with `NEXT_PUBLIC_`.

---

## Payments (Stripe)

Not templated — add per client when needed.

1. Create Stripe account for client
2. Add `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
3. Implement Checkout or Billing via API routes
4. Webhook handler at `src/app/api/webhooks/stripe/route.ts`

Works with any backend path (A, B, or C).

---

## Agent checklist — starting a new client app

1. [ ] Clone `guvani-app-starter` → new repo
2. [ ] Update `src/site.config.ts`, locales, `public/` SEO files
3. [ ] **Choose backend path** (A, B, or C) — document choice in client README
4. [ ] Add only the env vars and packages for that path
5. [ ] Deploy frontend to Vercel
6. [ ] If Path B/C: provision database and run migrations before shipping features

---

## Quick reference

| Need | Path |
|---|---|
| Contact form email | A (Vercel API + Resend) — or use `guvani-site-starter-pro` instead |
| User login | B (Supabase Auth or Clerk) |
| Postgres + Guvani operates | C (Specific) or B (Neon) |
| File uploads | B (Supabase Storage) or C (Specific storage) |
| Realtime | B (Supabase realtime) or C (Specific sync) |
| Payments | Stripe on any path |
| Client self-manages later | B (Supabase) |
| Agent-first, unified infra | C (Specific) |

---

## Related repos

- [guvani-site-starter](https://github.com/Guvani-Labs/guvani-site-starter) — Level 1 static sites
- [guvani-site-starter-pro](https://github.com/Guvani-Labs/guvani-site-starter-pro) — Level 2 + Resend on Cloudflare
