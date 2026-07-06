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

### Phase 4 — Remaining pages + launch prep (in progress)

Migrate the remaining ~110 published pages (tier-2 and tier-3, real
counts from the WordPress export) plus decide how to handle
category/tag archive URLs, using `URL_INVENTORY.md` as the tracking
sheet. Gated for launch by `LAUNCH_CHECKLIST.md`, which requires 100% of
old URLs either present in Astro or redirected per `REDIRECTS.md`, and
all media binaries acquired per `MEDIA_ACQUISITION_CHECKLIST.md`.

**Batch 1 (done):** full batch plan in `PHASE_4_TIER_2_BATCH_PLAN.md`.
Migrated the 7 highest-value tier-2 pages: 5 strategies for personal
evangelism, the biblical discipleship guide, the four fields Nathan &
Kari Shank training manual (the largest single page migrated so far,
~356KB of embedded book content preserved verbatim), getting started
in four fields training, the top 25 disciple-making books list, prayer
is essential (12 key prayer points), and 7 words on the cross. Same
cleanup discipline as Phases 2-3 (chrome removal, heading
normalization, absolute-to-relative URL conversion) plus one new
pattern: converting a raw-HTML rowspan summary table into a flattened
Markdown table. All 14 distinct media files this batch depends on were
already present under `public/wp-content/uploads/` — no new uploads
needed. `astro check` and `astro build` both clean; all 7 URLs verified
in `dist/` with correct canonicals, no noindex, no broken internal
links, no hub collisions. 15 tier-2 URLs remain (Batches 2-4).

**Batch 2 (done):** migrated the next 7 tier-2 pages: the prayer
walking guide, the Christian Prayer Wheel guide, the strategy
coordinator role article (the highest media count of any tier-2 page —
13 files), 3 ways to make disciples, radical discipleship, the high
price of discipleship, and the power of sharing your testimony
scripture. Fully completes the Prayer hub (3/3), the Testimony hub
(3/3), and the Strategy Coordinator hub (1/1, its only slot). Same
cleanup discipline as Batch 1, plus 2 new patterns: repointing 3
same-page "jump to" anchor links to Astro's actual generated heading-
slug ids (WordPress-era custom ids like `#5H` and `#guide` don't exist
in the Astro build), and unwrapping YouTube-redirect click-tracking
URLs down to their real bit.ly destination when the visible anchor
text already named that destination. All 24 distinct media files this
batch depends on were already present — no new uploads needed. `astro
check` and `astro build` both clean; all 7 URLs verified in `dist/`
with correct canonicals, no noindex, no broken internal links (including
the repointed in-page anchors), no hub collisions. 8 tier-2 URLs remain
(Batches 3-4).

**Batch 3 (done):** migrated the next 7 tier-2 pages: the breakthrough
guide for a modern day disciple, 4 stages of movement, the power of
multiplication, the simple church article, love and obedience, DMM key
characteristics, and 10 qualities of church planting movements. Fully
completes the Simple Church hub (3/3) and brings the Church Planting
Movements hub to 4 of its 8 listed slots (the remaining 4 are tier-3,
out of this phase). Handled 2 pages sharing a previously-documented
"Won't fix" deferred media file (`breakthrough-guide-for-a-modern-day-
disciple` migrated with `og_image` omitted since it has no inline
images; `4-stages-of-movement-unlock-your-next-steps` needed the file
only as a decorative CTA-block background that was removed as chrome)
and 1 page with a previously-documented featured-image filename
mismatch (`love-and-obedience-exploring-the-biblical-relationship-
between-the-two`, resolved by using the tracked `-scaled` variant,
WordPress's own auto-generated large-image size, not a different
photo). Same cleanup discipline as Batches 1-2 (chrome removal, heading
normalization, duplicate pull-quote removal, absolute-to-relative URL
conversion, one Spotify-embed-to-plain-link conversion, one raw-HTML-
table-to-Markdown-table flattening). All 10 non-deferred media files
this batch depends on were already present. `astro check` and `astro
build` both clean; all 7 URLs verified in `dist/` with correct
canonicals, no noindex, no broken internal links, no hub collisions,
and confirmed the deferred file appears nowhere in the rendered output.
This completed 21 of the 22 real tier-2 URLs — only `/stickers/`
remained, held for Batch 4 pending a layout/media decision.

**Batch 4 (done):** migrated the final tier-2 page, `/stickers/` — a
Sticker Mule product showcase (6 movement-themed stickers with
external purchase links), not an editorial article. Investigated
before migrating per the batch's explicit checklist: confirmed the
slug against the WordPress export (post_id 9927, empty categories, no
natural hub fit) and reviewed the full original content directly from
the export XML. Decided against a new content type or layout — the
live content is plain prose, images, and external links, which the
existing `articles` collection and `ArticleLayout` already render
fine, consistent with "do not create a new content type unless
genuinely needed." No hub assignment, matching its prior
classification. Resolved the batch's "3 missing images" flag
(`2-1024x1024.jpg`, `3-Circles-Sticker-Multiplying-Disciples.webp`,
`3.jpg`): inspecting the WordPress export's block nesting directly
showed all 3 appear only inside a GenerateBlocks container with
`hideOnDesktop`, `hideOnTablet`, and `hideOnMobile` all set `true`
simultaneously — hidden on every breakpoint, i.e. dead chrome never
rendered to any visitor on the live site — so they were not needed and
are not part of the migrated page. That same dead container held a
second, near-duplicate "Movement Stickers at Cost" section with stale
copy (referencing "Printify" instead of Sticker Mule) and a bulk-
pricing list; removed entirely as chrome, since it was never visible
in the first place. The 6 real, visible sticker images were already
present under `public/wp-content/uploads/2025/10/` and `2025/12/` — no
new uploads needed. `astro check` and `astro build` both clean; the
`/stickers/` URL verified in `dist/` with correct canonical, no
noindex, no broken internal/external links, no broken images, no hub
collision, no guessed slugs. **This completes all 22 of 22 real
tier-2 URLs — Tier 2 is now 100% migrated.**

### Phase 5 — Protected URL audit (done)

Full audit of all 34 migrated tier-1/tier-2 URLs before starting Tier
3, per `PHASE_5_PROTECTED_URL_AUDIT.md`. Verified against fresh
`astro check`/`astro build` output and the generated `dist/` files
directly (not just source): exact path/trailing-slash preservation,
canonical correctness, no accidental noindex, title/description/H1
present, crawlable internal links, related-link resolution, media
presence, no stray absolute internal links, no guessed slugs, no hub
collisions, no duplicate pages at wrong slugs — plus the homepage, all
11 hubs, `/stickers/`, 6 direct-hit PDFs with GSC impressions, the
generated sitemap, and `robots.txt`.

Found and fixed 2 real, pre-existing bugs: a duplicate H1 on the Four
Fields manual page (a stray level-1 Markdown heading left over from
Phase 4 Batch 1, demoted to match its sibling headings), and 3 stray
absolute `multiplyingdisciples.us` internal links across 2 articles
(2 of them also missing their trailing slash) that should have been
relative like every other migrated page — all fixed to relative paths
pointing at the same confirmed real URLs. Re-ran `astro check`/`astro
build` clean after both fixes.

Confirmed 1 known, unchanged risk: `apostles-meaning` still has 2
broken images, deferred by explicit 2026-07-06 decision (unchanged by
this audit). Confirmed the generated sitemap is an exact 1:1 match to
the 45 built pages, and flagged (as a recommendation, not a bug) that
`astro.config.mjs`'s sitemap integration has no `source-pending`
filter configured yet — harmless today since 0 such pages exist, but
worth adding before Tier 3 if any placeholder pages are introduced.
No redirects needed; `REDIRECTS.md` remains empty.

### Phase 6 — Archive and URL structure decision (done)

Decided how to handle WordPress archive-style URLs before starting
Tier 3, per `PHASE_6_ARCHIVE_URL_DECISION.md`. Checked GSC exports,
the live sitemap index, the WordPress export XML, and current Astro
routes directly (not just the existing inventory summary):

- **20 category/tag archive URLs** (7 category, 13 tag) — all present
  in the live site's own sitemap, all with **0 clicks** despite having
  impressions (1-43 each). Decision: **301 each to its closest
  matching hub** (all 11 hubs already exist; no new hub paths
  needed). Documented as `pending` redirects in `REDIRECTS.md` —
  not implemented yet, since no hosting/redirect config exists.
- **Author and date archive URLs** — zero presence in any data source
  (no GSC rows, no dedicated sitemap file, no export mentions).
  Decision: default to allow 404/410 once live, not a redirect (there's
  no confirmed URL to redirect from). Still subject to a live
  spot-check per `LAUNCH_CHECKLIST.md` before final sign-off.
- **`/blog/`** — confirmed via the WordPress export to be WordPress's
  configured "posts page" with **empty body content** (nothing to
  port), already linked from site nav (`src/data/navigation.ts`)
  today. Decision: needs to become a **real, newly-built Astro index
  page** (not a content migration) — recommended as a pre-Tier-3 step
  since it's zero content-risk and already a live nav-linked 404 in
  every current build. Not built in this phase (decisions/docs only).
- **`/movement-resources/`** — confirmed via the export to be a real,
  distinct WordPress content page (33 KB, "Emerging Network
  Resources," a curated external-resource list), not an archive or
  directory of its children — it doesn't even link to them. Its 2
  already-migrated children (`7-stories-of-hope-...`,
  `12-practice-church-circle`) and 2 not-yet-migrated real children
  (`/movement-resources/strategy-coordinator/`,
  `/movement-resources/4-fields-toolbox/`) are confirmed via
  `post_parent` to be a genuine WordPress page hierarchy. Decision:
  migrate `/movement-resources/` normally as a real Tier 3 article
  (not "recreate an index") — good Tier 3 Batch 1 candidate. No index
  page is needed; no risk to its existing migrated children, since
  Astro's routing is keyed by each entry's `slug` field, not folder
  structure.

No redirects were implemented (docs-only, per phase scope). No Tier 3
pages were migrated. `astro check`/`astro build` re-verified clean.

### Phase 7A — Build `/blog/` index page (done)

Built `/blog/` as a real Astro page (`src/pages/blog/index.astro`),
not a content migration — the WordPress export confirmed it has no
body content to port (empty posts-page placeholder), so this is new
page-building work using the existing `articles` and `hubs`
collections, not a Tier 3 batch.

Queries `getCollection('articles')` and `getCollection('hubs')`
directly (no new content-collection entry, no frontmatter file — same
pattern as the homepage, which also isn't a collection entry). Lists
all 33 migrated articles, sorted by `migration_priority` (tier-1
before tier-2) first, then by best-available date (`updated ?? date`)
descending within a tier, since roughly half of migrated articles have
neither field set — verified this produces the intended order with an
independent script before shipping. Each entry shows title,
description, its hub (if any, linked), and formatted date (if any).
Also lists all 11 hubs as plain crawlable links for topic browsing.
`canonical: https://multiplyingdisciples.us/blog/`, `type="website"`,
no `noindex`. Reused `BaseLayout` and `Breadcrumbs`, no new components,
no client-side JS.

`astro check`/`astro build` clean, 46 pages (was 45). Verified in
`dist/`: canonical correct, exactly 1 H1, title/description present,
no noindex, sitemap count now matches 46 generated pages exactly, all
33 article links and all 11 hub links resolve to real generated pages.
The only unresolved hrefs on the page are the same 2 sitewide nav
links to real, already-tracked, not-yet-migrated tier-3 URLs
(`/starter-tools/`, `/disciple-making-resources-for-churches-that-
will-multiply/`) that appear on every page site-wide — not introduced
by this page, not a regression. Header/footer nav's `/blog/` links
(present on every page since Phase 1) now resolve instead of 404ing.

### Phase 7B Batch 1 — First Tier 3 batch (done)

Migrated the first 7 Tier 3 pages, per `PHASE_7B_TIER_3_BATCH_1.md`:
led with `/movement-resources/` (confirmed real content, not an
archive, per Phase 6 — a curated external-resource list, "Emerging
Network Resources," across 6 sections, converted from
Elementor/GenerateBlocks accordion markup to plain headings and lists
since Astro has no accordion component and fancy JS is prohibited),
then the two named strong candidates
(`/disciple-making-resources-for-churches-that-will-multiply/`,
`/under-the-hood-of-disciple-making-movements/`) plus 4 more selected
by impressions and hub completion
(`/what-are-disciple-making-movements-5-examples-from-around-the-world/`,
`/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/`,
`/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/`,
`/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/`).

Every non-`/movement-resources/` page already had a pre-reserved hub
`key_articles` slot from earlier phases (confirmed by reading each hub
file directly before selecting) — this batch **completes the Church
Planting Movements hub fully (8 of 8)**, fills the **Share the
Gospel hub's** last open slot, and fills the **Disciple Making hub's**
reserved slot + `next_step` target
(`disciple-making-resources-for-churches-that-will-multiply`, also
already linked from primary site nav — closing another live
nav-linked 404).

Same cleanup discipline as every prior phase: removed a one-off junk
embedded HTML placeholder block, a reusable "Are you in? / Start
Here. / Get Started" promotional CTA block (appeared verbatim across
3 of these 7 pages), several duplicate pull-quote-style headings that
repeated adjacent paragraph text verbatim, stray Elementor `<style>`
blocks, and trailing reusable-block shortcodes. Converted 2 Spotify
embeds to plain links, fixed 1 broken internal link (a dead
`/podcast/...` permalink) to a real confirmed article, converted
several absolute internal links to relative, and normalized one
article's inconsistent heading hierarchy.

8 media files across 5 of these pages are missing from supplied
uploads (5 featured/`og_image`-only, 1 decorative icon, 2 inline
supporting images on `under-the-hood-of-disciple-making-movements`) —
all deferred, non-blocking, none above-the-fold or a direct PDF; see
`PHASE_7B_TIER_3_BATCH_1.md` and `MEDIA_ACQUISITION_CHECKLIST.md` for
the full breakdown. `astro check`/`astro build` clean, 53 pages (was
46). Verified in `dist/`: all 7 canonicals correct, no noindex,
exactly 1 H1 each, no stray absolute internal links, no broken images
beyond the 1 already-known `apostles-meaning` gap (unchanged), no hub
collisions, no guessed slugs, sitemap count matches exactly, and
`/blog/` now lists all 40 migrated articles (was 33). No redirects
implemented. 41 tier-3 URLs remain.

### Phase 7B Batch 2 — Second Tier 3 batch (done)

Migrated the second 7 Tier 3 pages, per `PHASE_7B_TIER_3_BATCH_2.md`:
`/starter-tools/` (dual-nav-linked from Header/Footer on every page —
inspected directly against the WordPress export first, confirmed a
GenerateBlocks resource/tool grid rather than prose, and migrated into
the existing `articles` collection + `ArticleLayout` rather than a new
content type, same page-type judgment call as `/stickers/` in Phase 4
Batch 4), plus 6 articles selected by impressions:
`/royal-priest-strategy-explodes-disciple-making-movement-worldwide/`,
`/unlock-biblical-principles-for-multiplying-disciples/`,
`/5-insightful-keys-into-the-biblical-jesus/`,
`/missionary-verses-in-the-bible-reveal-gods-heart/`,
`/the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making/`,
and `/7-surprising-disciple-making-movement-examples/`.

Each of the 6 articles was added to a hub's `key_articles`: royal-priest-
strategy and 7-surprising add to **Church Planting Movements** (now
10 slots — hubs have no hard cap), unlock-biblical-principles adds to
**Disciple Making**, missionary-verses-in-the-bible adds to **Share
the Gospel**, the-clear-pathway-of-jesus adds to **Four Fields**, and
5-insightful-keys-into-the-biblical-jesus adds to **Jesus and the
Twelve**.

Same cleanup discipline as every prior phase: removed 2 junk embedded
`<html><head><style>...</style></head><body>...</body></html>`
placeholder shells (one held a real table that was extracted and
converted; the other was a pure "Example Site - FAQ" export artifact),
several duplicate pull-quote-style headings that repeated adjacent
paragraph text verbatim, the reusable "Are you in? / Start Here. / Get
Started" promotional CTA block (appeared verbatim across 3 of these 7
pages), and stray Elementor `<style>` blocks. Converted a Spotify
embed and an Apple Podcasts embed to plain links, removed 2 dead
`/podcast/...` hyperlinks (kept the surrounding text, no confirmed
replacement destination), converted 20 raw-HTML `<table>` blocks
(including one large custom-CSS infographic block) to Markdown tables,
and normalized 4 plain-`<p>`/bold-styled "question" lines that matched
sibling heading formatting into proper heading levels on one article.

11 media files across 5 of these pages are missing from supplied
uploads (7 featured/`og_image`-only, 2 `/starter-tools/` card
thumbnails, 1 decorative CTA background, 4 inline supporting images on
`unlock-biblical-principles-for-multiplying-disciples`) — all
deferred, non-blocking, none above-the-fold or a direct PDF; see
`PHASE_7B_TIER_3_BATCH_2.md` and `MEDIA_ACQUISITION_CHECKLIST.md` for
the full breakdown. `astro check`/`astro build` clean, 60 pages (was
53). Verified in `dist/`: all 7 canonicals correct, no noindex,
exactly 1 H1 each, no broken images introduced by this batch, no hub
collisions (including the `/4-fields/` vs. `/four-fields/` distinction
inside `/starter-tools/`'s content), no guessed slugs, and `/blog/`
now lists all 47 migrated articles (was 40). No redirects implemented.
34 tier-3 URLs remain.

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
