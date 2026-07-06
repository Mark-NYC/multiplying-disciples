# Phase 6 — Archive and URL Structure Decision

Decides how to handle WordPress archive-style URLs (category, tag,
author, date, blog index/pagination) and confirms the true nature of
`/movement-resources/`, before Tier 3 migration starts. This is a
**decision and documentation phase** — no Tier 3 pages were migrated,
no redirects were implemented, no existing migrated URL was changed.

## Method

Checked every source the task named directly, not just
`URL_INVENTORY.md`'s summary:

- `URL_INVENTORY.md` / `PROTECTED_URLS.md` — existing archive-URL
  section and tier data.
- `Pages.csv` (Google Search Console, 179 rows, last 3 months, raw
  file re-queried directly) — for clicks/impressions on every
  archive-shaped URL, and to confirm nothing was missed.
- `Sitemap_Index.xml` (the live site's actual sitemap index, supplied
  2026-07-06) — to see which archive *types* the live site itself
  currently sitemaps.
- `multiplyingdisciples.WordPress.20260706.xml` (full WXR export) —
  queried directly for `post_name: blog` and `post_name:
  movement-resources` (and its two tracked children) to read their
  real `post_type`, `post_parent`, and body content, not just their
  URL.
- Current Astro routes (`src/pages/[...slug].astro`,
  `src/data/navigation.ts`) — to confirm no archive route already
  exists and to check where `/blog/` is referenced today.

## 1. Category archive URLs

7 found, all present in the live site's `category-sitemap.xml` (per
`Sitemap_Index.xml` — WordPress/AIOSEO does sitemap these), all with
**0 clicks** in the 3-month GSC window despite having impressions:

| URL | Clicks | Impressions | In sitemap? | Generated in Astro? | Recommended action | Redirect target | Risk | Notes |
|---|---:|---:|---|---|---|---|---|---|
| `/category/movements/` | 0 | 43 | Yes | No | **B — redirect** | `/church-planting-movements/` | Low | Direct topic match; hub already anchors this exact subject with 4 real articles. |
| `/category/four-fields-training/` | 0 | 18 | Yes | No | **B — redirect** | `/four-fields/` | Low | Direct match; hub has both real Four Fields articles. |
| `/category/entry-strategies/` | 0 | 2 | Yes | No | **B — redirect** | `/share-the-gospel/` | Low | "Entry strategies" = evangelism entry points; hub covers this. |
| `/category/discipleship-tools/` | 0 | 2 | Yes | No | **B — redirect** | `/disciple-making/` | Low | Direct match. |
| `/category/missionary-strategies/` | 0 | 1 | Yes | No | **B — redirect** | `/strategy-coordinator/` | Low | Closest topical match; single article, single hub. |
| `/category/spiritual-gifts/` | 0 | 1 | Yes | No | **B — redirect** | `/jesus-and-the-twelve/` | Low | APEST/five-fold ministry content lives in this hub. |
| `/category/great-commission/` | 0 | 1 | Yes | No | **B — redirect** | `/share-the-gospel/` | Low | Great Commission = evangelism mandate, matches hub. |

## 2. Tag archive URLs

13 found, all present in `post_tag-sitemap.xml`, all **0 clicks**:

| URL | Clicks | Impressions | In sitemap? | Generated in Astro? | Recommended action | Redirect target | Risk | Notes |
|---|---:|---:|---|---|---|---|---|---|
| `/tag/apostle/` | 0 | 25 | Yes | No | **B — redirect** | `/jesus-and-the-twelve/` | Low | Apostles-meaning article anchors this hub. |
| `/tag/conversation-quadrant/` | 0 | 10 | Yes | No | **B — redirect** | `/share-the-gospel/` | Low | Concept used in the how-to-evangelize article. |
| `/tag/disciple-making-movement/` | 0 | 9 | Yes | No | **B — redirect** | `/church-planting-movements/` | Low | DMM article lives in this hub. |
| `/tag/sustainable-disciple-making/` | 0 | 7 | Yes | No | **B — redirect** | `/disciple-making/` | Low | Direct match. |
| `/tag/oikos-mapping/` | 0 | 7 | Yes | No | **B — redirect** | `/share-the-gospel/` | Low | Household-evangelism concept, matches hub's persons-of-peace content. |
| `/tag/disciple-making/` | 0 | 3 | Yes | No | **B — redirect** | `/disciple-making/` | Low | Direct match. |
| `/tag/community/` | 0 | 2 | Yes | No | **B — redirect** | `/simple-church/` | Low | House-church community topic. |
| `/tag/apostolic/` | 0 | 2 | Yes | No | **B — redirect** | `/jesus-and-the-twelve/` | Low | Direct match. |
| `/tag/hybrid-model/` | 0 | 1 | Yes | No | **B — redirect** | `/simple-church/` | Low | Hybrid church models, closest topical fit. |
| `/tag/revival/` | 0 | 1 | Yes | No | **B — redirect** | `/church-planting-movements/` | Low | Closest topical fit. |
| `/tag/prayer-walking/` | 0 | 1 | Yes | No | **B — redirect** | `/prayer/` | Low | Prayer-walking article anchors this hub. |
| `/tag/precision-harvesting/` | 0 | 1 | Yes | No | **B — redirect** | `/share-the-gospel/` | Low | Targeted-evangelism concept (also appears in `/movement-resources/`'s own content — see below). |
| `/tag/15-second-testimony-examples/` | 0 | 1 | Yes | No | **B — redirect** | `/testimony/` | Low | 15-second-testimony article anchors this hub. |

**Why B, not A, for all 20 category/tag archives:** every one has
**zero clicks** despite having impressions — the classic signature of
a thin, auto-generated taxonomy page that search engines index but
users never choose over the real content it's listing. A stronger,
curated hub replacement already exists for every single topic (11
hubs cover all of them). Recreating these as real Astro pages would
just reproduce the same thin-content problem the classification
framework is designed to avoid — the hubs are already the "closest
hub with a clear user purpose" the framework describes, so B (not A)
is the correct fit for 100% of them.

## 3. Author archive URLs

**None found in any data source.** `Sitemap_Index.xml` — the live
site's actual current sitemap index — has no `author-sitemap.xml`
entry at all (compare to the `category-sitemap.xml` and
`post_tag-sitemap.xml` entries that do exist), meaning the site's own
SEO plugin (All in One SEO) isn't sitemapping author archives today.
Zero rows in the 179-row `Pages.csv` GSC export match `/author/`. Zero
mentions in the WordPress export.

**Recommended action: default to allow 404/410 (Class C)**, not
"defer" — the absence itself is real evidence here (the live site
already excludes these from its sitemap, and 3 months of GSC data
shows zero impressions), not just missing data. **Risk: Low.** This
should still get a live spot-check per `LAUNCH_CHECKLIST.md`'s
existing 404-test item before final launch sign-off, since this
audit only used exported data, not a live crawl.

## 4. Date archive URLs

**None found in any data source**, for the same reasons as author
archives — no dedicated sitemap file, zero GSC rows, zero export
mentions. **Recommended action: allow 404/410 (Class C). Risk: Low.**
Same live-spot-check caveat as author archives.

## 5. Blog index and pagination

`/blog/` is already tracked in `URL_INVENTORY.md` (tier-3, 0 clicks,
95 impressions, type `page`) and is **already wired into site
navigation today** — `src/data/navigation.ts` links to `/blog/` from
both `PRIMARY_NAV` and `FOOTER_NAV`, rendered on every single page,
pointing at a URL that doesn't exist in `dist/` yet.

Queried the WordPress export directly for `post_name: blog`:
`post_type: page`, `status: publish`, **`content:encoded` is empty
(0 characters)**. This confirms `/blog/` is WordPress's configured
"posts page" (Settings → Reading → "Posts page") — a page WordPress
auto-populates with the post loop at render time, with no authored
body content of its own to port. There is nothing to "migrate" here;
it has to be built as a new Astro page.

| URL | Type | Clicks | Impressions | In sitemap? | Generated in Astro? | Recommended action | Risk | Notes |
|---|---|---:|---:|---|---|---|---|---|
| `/blog/` | blog index | 0 | 95 | Yes (`page-sitemap.xml`) | No (nav links to it today, 404 in current build) | **A — recreate as a real Astro index page** | **Medium** | Already linked from nav on every page; leaving it un-migrated means a live, permanently-linked 404 once launched. No WP content to preserve — needs new work (list migrated articles), not a content port. |
| `/blog/page/2/`, `/page/2/`, etc. (pagination) | pagination | — | 0 rows in GSC | No dedicated sitemap entries | No | **D — defer** | Low | Zero evidence in any export. Only becomes a real decision once `/blog/` itself is built and the migrated-article count is known. Revisit when `/blog/` is built. |

**Should `/blog/` be created before Tier 3?** Yes — recommended as a
pre-Tier-3 (or "Tier 3 Batch 0") step, not part of a normal content
batch. It's zero content-risk (nothing to preserve verbatim, no
WordPress body to misread), it closes a live nav-linked 404 that
exists in every build today, and building it doesn't require any
Tier 3 article to be migrated first — it can simply list whatever
articles already exist and grow as Tier 3 lands. This is a
**recommendation for the next session to act on, not something built
in this phase** (Phase 6 is decisions + docs only, per the standing
"do not migrate Tier 3 yet" instruction — and `/blog/` isn't a Tier 3
migration in the usual sense, but it's still new page-building work
outside this phase's docs-only scope).

## 6. `/movement-resources/` — not an archive at all

This needed the most careful check, because it looks archive-shaped
(a section prefix with real child content under it) but isn't one.

Queried the WordPress export directly:

- `/movement-resources/` itself: `post_id: 2301`, `post_type: page`,
  **`content:encoded` is 33,335 characters of real, unique authored
  content** — titled "Emerging Network Resources," a curated list of
  external links (videos, PDFs, Google Docs) from partner movement
  networks (#NoPlaceLeft, 1BodyChurch, BigLife), organized into 6
  accordion sections (4 Fields of Jesus Strategy, Leadership
  Development, Big Picture Vision, Training Formats, Event Trainings,
  3 Phases of Movement Resources). **This content has nothing to do
  with being an index/directory of its child pages** — it doesn't
  even link to them.
- `/movement-resources/7-stories-of-hope-complete-facilitation-guide/`
  (already migrated, tier-1) and
  `/movement-resources/12-practice-church-circle/` (already migrated,
  tier-1): confirmed `post_parent: 2301` — i.e., **real WordPress
  parent/child page hierarchy**, not a taxonomy archive.
  `/movement-resources/strategy-coordinator/` (`post_parent: 2301`,
  32,732 characters of real content) and
  `/movement-resources/4-fields-toolbox/` (`post_parent: 2301`, 3,188
  characters of real content) are two more real, tracked, not-yet-
  migrated children (both currently "unknown" tier in
  `URL_INVENTORY.md`, 0 recorded impressions in this export window).

| URL | Type | Clicks | Impressions | In sitemap? | Generated in Astro? | Recommended action | Risk | Notes |
|---|---|---:|---:|---|---|---|---|---|
| `/movement-resources/` | section path (real page, not an archive) | 0 | 22 | Yes (`page-sitemap.xml`) | No | **Migrate normally as a Tier 3 article** (not "recreate as an index" — it already has real content to port) | Low | Real, distinct content; not thin, not a duplicate of its children. Good Tier 3 Batch 1 candidate — establishes the section's own page alongside its already-migrated children. |
| `/movement-resources/strategy-coordinator/` | section path (real page) | 0 | 0 (unknown tier) | Not confirmed in supplied sub-sitemaps | No | Normal future Tier 3/unknown-tier migration | Low | Real content (32.7 KB), not urgent given 0 recorded impressions, but must not be dropped or merged. |
| `/movement-resources/4-fields-toolbox/` | section path (real page) | 0 | 0 (unknown tier) | Not confirmed in supplied sub-sitemaps | No | Normal future Tier 3/unknown-tier migration | Low | Real content (3.2 KB). Same treatment as above. |

**Does `/movement-resources/` need an index page?** No — it already
*is* a real, distinct, single-topic content page (a curated external
resource list), not a directory that needs to be synthesized. Nothing
needs to be built beyond migrating its existing real content like any
other tier-3 page. **No child URL under `/movement-resources/` is at
any risk from this decision** — Astro's routing is keyed entirely by
each entry's `slug` frontmatter field (see `MIGRATION_PLAN.md`'s
"Routing model"), not by folder structure, so adding
`/movement-resources/` as its own article entry cannot collide with
or break `/movement-resources/7-stories-of-hope-.../` or
`/movement-resources/12-practice-church-circle/`, both already live
today.

## Hub collision check

Checked all 7 proposed category-redirect targets and 13 proposed
tag-redirect targets against the 11 existing hub slugs
(`src/content/hubs/*.md`) — every target is an **already-existing**
hub slug (`/church-planting-movements/`, `/four-fields/`,
`/share-the-gospel/`, `/disciple-making/`, `/strategy-coordinator/`,
`/jesus-and-the-twelve/`, `/simple-church/`, `/prayer/`,
`/testimony/`). No new hub paths are proposed, so there is no
possibility of colliding with a real WordPress URL the way `/3-circles/`
did in Phase 1 (see `PROTECTED_URLS.md`).

## Summary table

| Archive type | Count | Recommended action |
|---|---:|---|
| Category archives | 7 | B — 301 to closest hub |
| Tag archives | 13 | B — 301 to closest hub |
| Author archives | 0 found | C — default allow 404/410 |
| Date archives | 0 found | C — default allow 404/410 |
| Blog index (`/blog/`) | 1 | A — recreate as real Astro index (recommended before Tier 3, not part of this phase) |
| Blog/general pagination | 0 found in data | D — defer until `/blog/` exists |
| `/movement-resources/` + 2 real children | 3 | Not an archive — normal Tier 3/future migration of real content |

## Unresolved decisions

- Exact copy/design for the future `/blog/` index page (how many
  articles per page, sort order, whether to paginate immediately or
  only once the article count warrants it) — deferred until it's
  actually built.
- Whether `/movement-resources/strategy-coordinator/` and
  `/movement-resources/4-fields-toolbox/` should be pulled into an
  earlier Tier 3 batch (to keep the whole `/movement-resources/`
  subtree together) or left at their natural impression-sorted
  position (both currently 0 impressions, "unknown" tier) — a
  reasonable batch-sequencing call for whoever runs Tier 3 Batch 1,
  not a structural blocker.
