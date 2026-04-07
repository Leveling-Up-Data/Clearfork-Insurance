# Clearfork Insurance (clearforkinsurance.com)

## Quick Start

```bash
npm install
npm run dev        # dev server on :3000
npm run build      # production build (standalone)
npx next start     # serve production build
```

## Project Structure

```
clearfork-insurance/
  src/app/                  # Next.js App Router pages
    layout.tsx              # Root layout, GA4, InsuranceAgency JSON-LD
    page.tsx                # Homepage
    our-story/page.tsx      # Company story
    about/page.tsx          # 301 redirect -> /our-story
    home-auto-insurance/    # Personal lines
    commercial-insurance/   # Commercial lines
    life-insurance/         # Life insurance
    bonds/                  # Performance & bid bonds
    cyber-insurance/        # Cyber insurance
    blogs/page.tsx          # Blog index
    blogs/[slug]/page.tsx   # Blog post (MDX)
    blogs/rss.xml/route.ts  # RSS feed
    privacy/page.tsx        # Privacy policy
    sitemap.ts              # Dynamic sitemap
    robots.ts               # robots.txt
    not-found.tsx           # Custom 404
  src/components/           # Shared components
    header.tsx              # Site header + mobile nav
    footer.tsx              # Site footer
    quote-form.tsx          # Quote request form
    breadcrumbs.tsx         # Breadcrumb navigation
  src/lib/
    posts.ts                # MDX blog post loader
    schema.ts               # JSON-LD structured data helpers
  src/types/
    rss.d.ts                # Type declarations for rss module
  content/posts/*.mdx       # Blog post content
  public/                   # Static assets (logo, images)
  Dockerfile                # Multi-stage standalone Docker build
  cloudbuild.yaml           # Cloud Build pipeline
```

## Adding Blog Posts

Create `content/posts/<slug>.mdx` with frontmatter:

```yaml
---
title: "Post Title"
date: "2026-01-15"
description: "Short description for SEO"
author: "Clearfork Insurance"
tags: ["insurance", "tips"]
---
```

## Tech Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4
- MDX (`next-mdx-remote` + `gray-matter`)
- Docker (node:22-alpine multi-stage standalone)

## Build & Deploy

```bash
# Build Docker image
gcloud builds submit --tag us-central1-docker.pkg.dev/ludata-prod/cloud-run-source-deploy/clearfork-insurance:latest --project ludata-prod

# Deploy to Cloud Run
gcloud run deploy clearfork-insurance \
  --image us-central1-docker.pkg.dev/ludata-prod/cloud-run-source-deploy/clearfork-insurance:latest \
  --region us-central1 --project ludata-prod --allow-unauthenticated
```

## Architecture

- **GCP Project**: ludata-prod
- **Cloud Run**: clearfork-insurance (us-central1)
- **Load Balancer**: starfish-url-map (shared with starfishhealth.app)
- **LB IP**: 34.36.4.221
- **SSL**: Google-managed cert for clearforkinsurance.com + www
- **CDN**: Cloud CDN enabled on backend service
- **DNS**: GoDaddy (A record -> 34.36.4.221)

## SEO

- InsuranceAgency JSON-LD on every page via root layout
- Service schemas on each service page
- BlogPosting schemas on blog posts
- BreadcrumbList schemas on all interior pages
- Dynamic sitemap.xml and robots.txt
- RSS feed at /blogs/rss.xml
- Per-page metadata with Open Graph and Twitter cards
- GA4 via NEXT_PUBLIC_GA_ID env var

## Brand

- **Primary green**: #8BC53F
- **Dark navy**: #101517
- **Font**: Inter (Google Fonts)
- **Business**: SIG Clearfork Insurance Group
- **Phone**: (817) 249-8683
- **Email**: clearfork@sig4you.com
- **Address**: 992 Winscott Rd Suite B, Benbrook, TX 76126
