# Migration Plan: WordPress → Astro

**multiplyingdisciples.us**

## Why

WordPress + plugin + theme + caching complexity is making the site harder to
maintain. Astro gives us clean Markdown content, predictable URLs, clean
internal linking, automatic sitemaps, reusable SEO metadata, faster pages,
and a codebase that's easy to edit in GitHub with Claude Code.

## What this is NOT

- Not a redesign project.
- Not a rewrite of existing copy.
- Not a URL restructuring project.
- Not a launch yet.

Treat this like moving a stocked warehouse. Preserve the shelves first.
Make it prettier later.

## Non-negotiable rules (see SEO_CHECKLIST.md for the full list)

1. Preserve every performing URL exactly, including trailing slash.
2. Do not rename slugs or merge pages during initial migration.
3. Do not heavily rewrite top-performing pages before launch.
4. Preserve old `/wp-content/uploads/` media URLs that rank or get linked.
5. Every old URL must exist in Astro or have a planned 301 documented in
   REDIRECTS.md before launch.
6. Internal links must be plain crawlable `<a href>` HTML, never
   JavaScript-only navigation.

## Network constraint (Phase 1) and how it was resolved

This build environment's egress policy blocks all outbound web access,
including `multiplyingdisciples.us`, its sitemap, and general internet
access (confirmed — even unrelated domains fail at the proxy level).
Phase 1 was therefore built **without being able to fetch the live site,
sitemap.xml, or any page content** — the first migration batch shipped as
structural placeholders only (real frontmatter, no invented body copy).

Phase 2 unblocked this: the user supplied the real WordPress export XML
(Tools → Export → All Content), the Google Search Console Pages/Queries
exports, and the sitemap index directly as files (2026-07-06). All 5
Phase 1 batch pages have since been replaced with real, lightly-improved
content extracted from that export. See `/imports/README.md` for the
remaining gaps (individual sub-sitemaps, media binaries).

## Phases

### Phase 1 — Foundation (done)

- Astro project scaffolded: layouts, components, content collections,
  frontmatter schema, SEO component, sitemap integration.
- Migration docs created (this file and its siblings).
- Known protected URL list captured from the brief (45 URLs, later found
  to have 7 wrong slugs — see `PROTECTED_URLS.md`).
- First migration batch (homepage + 4 articles) created as **structural
  placeholders only** — real content pending import.
- 11 initial hub pages written (these are new pages, not migrated from
  WordPress, so their copy is original and not a placeholder). One
  (`/3-circles/`) had to be renamed to `/3-circles-guide/` after
  discovering it collided with a real existing WordPress page.
- **Nothing launched. DNS untouched. WordPress untouched.**

### Phase 2 — Real content import (done for the Phase 1 batch)

Unblocked by the user supplying: WordPress export XML, Google Search
Console Pages + Queries CSVs, and the sitemap index XML.

- `URL_INVENTORY.md` and `PROTECTED_URLS.md` rebuilt from real data:
  122 published posts/pages, real click/impression tiers.
- All 5 Phase 1 batch pages (homepage, 12-disciples, 15-second-testimony,
  3-circles, 7-stories-of-hope) now have real content extracted from the
  WordPress export, lightly cleaned up (WordPress plugin/widget chrome
  removed, heading levels normalized, dead links fixed) — not rewritten.
  `status: migrated` in frontmatter, no longer `noindex`.
- Media requirements documented against real usage (`MEDIA_URLS_TO_PRESERVE.md`)
  — binary files still not supplied, only paths/metadata.
- **Still not done:** real content for the remaining ~117 published
  pages, and the media binary files themselves. Still nothing launched.

### Phase 3 — Remaining Tier 1 pages + media checklist (done)

Scope was deliberately narrow: preserve media asset paths and migrate
only the remaining real tier-1 pages, not the whole site. Full breakdown
in `PHASE_3_TIER_1_BATCH.md`.

- Identified and migrated the 7 remaining tier-1 pages: testimony in the
  Bible, bible verse about spreading the gospel, apostles meaning,
  unlocking APEST, how to evangelize, three thirds, and the Church
  Waffle guide (`/movement-resources/12-practice-church-circle/`).
- All 12 real tier-1 URLs are now migrated — 0 remain.
- Same cleanup discipline as Phase 2: WordPress plugin/widget chrome
  removed (share buttons, accordion toggles, a broken flattened contact
  form, a `[forminator_form]` shortcode), heading levels normalized,
  broken in-page anchors repointed to Astro's real generated ids, one
  internal link to a WordPress tag archive fixed to point at the real
  migrated article instead — content otherwise preserved close to
  verbatim.
- `MEDIA_ACQUISITION_CHECKLIST.md` created: 103 distinct media files
  across every migrated page, none supplied yet, prioritized by real
  Search Console impressions.
- Caught one more mis-attribution bug: 12 images on the Church Waffle
  page are actually hosted on `obey.tools` (the sister site), not this
  one — corrected before it could pollute the media checklist.
- **Still not done:** ~110 published pages remain (tier-2 and tier-3),
  and no media binary files have been supplied yet. Nothing launched,
  DNS untouched, WordPress untouched.

### Phase 4 — Remaining pages + launch prep (later, not started)

Migrate the remaining ~110 published pages (tier-2 and tier-3, real
counts from the WordPress export) plus decide how to handle
category/tag archive URLs, using `URL_INVENTORY.md` as the tracking
sheet. Gated for launch by `LAUNCH_CHECKLIST.md`, which requires 100% of
old URLs either present in Astro or redirected per `REDIRECTS.md`, and
all media binaries acquired per `MEDIA_ACQUISITION_CHECKLIST.md`.

## Repo structure

```
src/
  layouts/       BaseLayout, ArticleLayout, ToolLayout, HubLayout
  components/    SEO, Header, Footer, RelatedArticles, ToolCTA, Breadcrumbs
  content/
    articles/    One .md per article; `slug` frontmatter controls the URL
    tools/       Tool pages (e.g. 3 Circles, Stories of Hope)
    hubs/        Topic hub pages (new, not migrated)
  data/          site.ts, navigation.ts
  pages/
    index.astro      Homepage (not a collection entry)
    [...slug].astro  Catch-all route for articles/tools/hubs, keyed on
                     each entry's `slug` field, not its filename
public/          Static assets, robots.txt
imports/         Drop zone + instructions for source material (git-ignored
                 large files should go in a private location if sensitive)
```

## Routing model

Every article/tool/hub's `slug` frontmatter field is the **exact, full,
site-relative output path** (e.g. `/three-thirds/` or
`/movement-resources/7-stories-of-hope-complete-facilitation-guide/`).
`src/pages/[...slug].astro` reads all three collections and generates a
static path per entry using that field — not the filename, not the
folder. This means nested WordPress paths (like `/movement-resources/...`)
don't require mirroring folder structure in `src/content/`, and nothing
about the URL depends on how we organize files for editing convenience.

`astro.config.mjs` sets `trailingSlash: 'always'` and
`build.format: 'directory'` so every generated page matches WordPress's
trailing-slash URLs exactly.
