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

## Current constraint: no live network access in this environment

This build environment's egress policy blocks all outbound web access,
including `multiplyingdisciples.us`, its sitemap, and general internet
access (confirmed — even unrelated domains fail at the proxy level). That
means Phase 1 was built **without being able to fetch the live site,
sitemap.xml, or any page content**.

Everything in this repo for the first migration batch is a **structural
placeholder**: real frontmatter (title, slug, canonical, related links,
priority), but body content marked `status: source-pending` and clearly
bannered on-page as not-yet-real. No article body copy has been invented.

To move past this, see `/imports/README.md` — it explains exactly what
files to provide (WordPress export XML, Search Console CSV, saved
sitemap.xml, saved page HTML, media files) so real content can replace
these placeholders.

## Phases

### Phase 1 — Foundation (this phase)

- Astro project scaffolded: layouts, components, content collections,
  frontmatter schema, SEO component, sitemap integration.
- Migration docs created (this file and its siblings).
- Known protected URL list captured from the brief (45 URLs) in
  `PROTECTED_URLS.md` and `URL_INVENTORY.md`.
- First migration batch (homepage + 4 articles) created as **structural
  placeholders only** — real content pending import.
- 11 initial hub pages written (these are new pages, not migrated from
  WordPress, so their copy is original and not a placeholder).
- **Nothing launched. DNS untouched. WordPress untouched.**

### Phase 2 — Real content import (next, not started)

Blocked on the user providing:
- Full Google Search Console Pages export (last 3+ months), CSV.
- WordPress export XML (Tools → Export → All Content) or saved HTML for
  each protected page.
- A manually saved copy of `sitemap.xml` (and any sub-sitemaps).
- The media files listed in `MEDIA_URLS_TO_PRESERVE.md`.

Once supplied, replace `source-pending` placeholders with real,
lightly-improved content (see the 15-second testimony article's `notes`
field for the specific query targets to serve without a full rewrite).

### Phase 3 — Full site migration (later, not started)

Migrate the remaining ~134+ pages from the full sitemap, using
`URL_INVENTORY.md` as the tracking sheet. Assign real tiers once the GSC
export is available (see tier rules in `URL_INVENTORY.md`).

### Phase 4 — Launch (later, not started)

Gated by `LAUNCH_CHECKLIST.md`. Requires 100% of old URLs either present
in Astro or redirected per `REDIRECTS.md`.

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
site-relative output path** (e.g. `/the-three-thirds/` or
`/movement-resources/7-stories-of-hope-complete-facilitation-guide/`).
`src/pages/[...slug].astro` reads all three collections and generates a
static path per entry using that field — not the filename, not the
folder. This means nested WordPress paths (like `/movement-resources/...`)
don't require mirroring folder structure in `src/content/`, and nothing
about the URL depends on how we organize files for editing convenience.

`astro.config.mjs` sets `trailingSlash: 'always'` and
`build.format: 'directory'` so every generated page matches WordPress's
trailing-slash URLs exactly.
