# Phase 5 — Protected URL Audit

Full audit of all 34 migrated Tier 1 + Tier 2 URLs (12 tier-1, 22
tier-2), the homepage, all 11 hub pages, `/stickers/`, direct
PDF/media URLs with Search Console impressions, sitemap output, and
robots behavior — before starting Tier 3. Performed against a fresh
`astro check` + `astro build`, then verified directly against the
generated `dist/` output (not just source files), per the 16-point
checklist below.

**Scope note:** this is a verification pass, not a migration batch.
No URLs were changed, no content was rewritten, no pages were added.
Two real defects were found and fixed (see "Issues found and fixed"),
both were pre-existing bugs from earlier phases that this audit caught
— not new work.

## Method

1. `npx astro check` and `npx astro build` — clean baseline.
2. Extracted frontmatter (slug, title, description, canonical, status,
   migration_priority, hub, og_image) for all 33 `articles` entries
   directly from source files, plus the homepage's inline `BaseLayout`
   props (it isn't a collection entry).
3. Cross-referenced every migrated URL in `URL_INVENTORY.md` (34 rows
   marked `migrated` at tier-1/tier-2) against `dist/`'s 45 generated
   `index.html` files — confirmed exact 1:1 correspondence (34 migrated
   pages + 11 new hub pages = 45, no more, no less).
4. Grepped `dist/` directly (not source) for: `noindex`, canonical
   tags, H1 count per page, `<a href>` targets (internal and stray
   absolute), `<img src>` targets, PDF links, sitemap contents, and
   JS-only navigation patterns in nav components.
5. Cross-checked every internal link and every `related_articles` /
   `key_articles` path against either a generated `dist/` page or a
   confirmed row in `URL_INVENTORY.md` — flagging anything that
   resolved to neither as a guessed slug.
6. Checked every `<img src="/wp-content/uploads/...">` and every
   `og:image` meta value against the actual file on disk in
   `public/wp-content/uploads/`.

## 16-point checklist — results

| # | Check | Result |
|---|---|---|
| 1 | Exact original path preserved | **Pass** — every migrated `slug` matches its `original_url` and `URL_INVENTORY.md` row exactly (scripted diff, 0 mismatches). |
| 2 | Trailing slash preserved | **Pass** — all 44 collection slugs (33 articles + 11 hubs) end in `/`; `trailingSlash: 'always'` enforces this at build time. |
| 3 | Page generates in `dist/` | **Pass** — all 34 migrated URLs have a corresponding `dist/.../index.html`. |
| 4 | Canonical URL correct | **Pass** — every page's `<link rel="canonical">` matches `https://multiplyingdisciples.us` + its own path exactly (scripted check, 0 mismatches). |
| 5 | No accidental noindex | **Pass** — `grep -rl noindex dist` returns nothing. Zero pages carry a `noindex` meta tag. |
| 6 | Title exists | **Pass** — all 45 pages have a non-empty `<title>`. |
| 7 | Meta description exists | **Pass** — all 45 pages have a `<meta name="description">`. |
| 8 | H1 exists and is reasonable | **1 issue found and fixed** — see below. Now: exactly 1 `<h1>` per page, all 45 pages. |
| 9 | Internal links are crawlable HTML | **Pass** — no `onclick`/`javascript:` navigation anywhere in `Header`, `Footer`, `Breadcrumbs`, `RelatedArticles`, `ToolCTA`. The only `<script>` in these components is a JSON-LD structured-data block (not navigation). |
| 10 | Related links resolve to confirmed URLs | **Pass** — all 42 distinct `related_articles`/`key_articles` paths across every article and hub resolve to either a generated page (33) or a confirmed real not-yet-migrated URL in `URL_INVENTORY.md` (9). Zero guessed slugs. |
| 11 | Media references exist or are documented deferred | **Pass with 1 known, previously-documented exception** — see "Remaining risks." |
| 12 | No broken visible images | **1 known exception** (same as #11 — `apostles-meaning`, previously deferred 2026-07-06, not new). All other 90 distinct `/wp-content/uploads/` image references across all 45 pages resolve to real files on disk. |
| 13 | No stray absolute `multiplyingdisciples.us` links | **2 issues found and fixed** — see below. Now zero stray absolute internal links anywhere in `dist/`. |
| 14 | No guessed slugs | **Pass** — every internal `<a href="/...">` across all 45 pages (53 distinct hrefs) resolves to either a generated page, a confirmed `URL_INVENTORY.md` row, or a real media file. Zero unverified. |
| 15 | No hub path collisions | **Pass** — all 44 collection slugs (articles + hubs) are unique; `uniq -d` on the sorted list returns nothing. |
| 16 | No duplicate generated page at wrong slug | **Pass** — 45 distinct `dist/` paths for 45 collection entries (33 articles + 11 hubs + homepage), 1:1, no collisions. |

## Issues found and fixed

### 1. Duplicate H1 on the Four Fields manual page

`/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/`
rendered **2** `<h1>` elements: the page's real title (from
`ArticleLayout`, as expected) plus a stray `# Four Fields of Kingdom
Growth` level-1 Markdown heading embedded in the body — the title
page of the embedded Shank manual, left at H1 when it was originally
migrated in Phase 4 Batch 1. Fixed by demoting it to `##` (matching
the sibling `## Preface` / `## Download - FREE` section headings
already used elsewhere in the same document) and its subtitle line
from `##` to `###`. Verified: exactly 1 H1 after rebuild.

### 2. Stray absolute internal links (3 instances, 2 files)

Found via `grep` for `<a href="https://multiplyingdisciples.us`
directly in `dist/` output — every other migrated page already
converts internal links to relative paths (established pattern since
Phase 2), but these 3 slipped through:

- `the-three-circles-gospel-presentation-step-by-step.md`: a link to
  `https://multiplyingdisciples.us/3-circles/` (a real, confirmed,
  not-yet-migrated URL) → fixed to `/3-circles/`.
- `the-three-circles-gospel-presentation-step-by-step.md`: a
  "Start Training" CTA link to
  `https://multiplyingdisciples.us/free-training` (absolute **and**
  missing its trailing slash) → fixed to `/free-training/`, matching
  the exact same CTA already written correctly (relative + trailing
  slash) in `how-to-evangelize-ultimate-step-by-step-guide.md` and
  `understanding-biblical-discipleship-a-complete-guide-to-following-jesus.md`.
- `discover-the-12-disciples-of-jesus-christ.md`: the identical
  "Start Training" CTA with the identical bug → same fix.

`/3-circles/` and `/free-training/` are both confirmed real rows in
`URL_INVENTORY.md` (page, not-migrated, unknown tier) — not guessed
slugs, just links that needed to be relative. Verified: zero stray
absolute internal links anywhere in `dist/` after rebuild.

Both fixes were verified with a full `astro check` + `astro build`
before moving on, per the phase instructions.

## Remaining risks (not fixed — pre-existing, explicitly deferred)

1. **`apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/`
   has 2 broken images**, both real gaps, not new: `5520c44066fbc694ac1c2e207151fe125162f59d.jpeg`
   and `760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg`.
   Only `-100x100` thumbnail crops of these exact filenames have ever
   been supplied, never the full-size originals. **By explicit user
   decision on 2026-07-06** (recorded in
   `MEDIA_ACQUISITION_CHECKLIST.md` and `MEDIA_IMPORT_PLAN.md`), this
   is deferred — to be resolved once the site is live, not chased
   further pre-launch. This audit re-confirms it's still the *only*
   media gap on any migrated page (re-verified against all 92 distinct
   image references across all 45 pages).
2. **`astro.config.mjs`'s sitemap integration has no `source-pending`
   filter configured.** This is harmless today — 0 of the 33 migrated
   articles carry `status: source-pending`, confirmed by this audit —
   but there's no safety net if Tier 3 introduces a placeholder page
   before it's ready. **Recommendation, not a bug today:** add a
   sitemap filter (or a `noindex`-aware serialize function) before or
   during Tier 3 if any placeholder/`source-pending` pages are
   introduced, so the sitemap can't silently include an unfinished
   page. The existing code comment in `astro.config.mjs` already flags
   this same need.

## Homepage + hub audit

All 12 (homepage + 11 hubs) individually verified: correct canonical,
non-empty title/description, exactly 1 H1, no noindex.

| Page | Canonical | Title | H1 |
|---|---|---|---|
| `/` (homepage) | correct | `Multiplying Disciples` | `Multiply disciples in real life.` |
| `/3-circles-guide/` | correct | `3 Circles \| Multiplying Disciples` | `3 Circles` |
| `/church-planting-movements/` | correct | `Church Planting Movements \| Multiplying Disciples` | `Church Planting Movements` |
| `/disciple-making/` | correct | `Disciple Making \| Multiplying Disciples` | `Disciple Making` |
| `/four-fields/` | correct | `Four Fields \| Multiplying Disciples` | `Four Fields` |
| `/jesus-and-the-twelve/` | correct | `Jesus and the Twelve \| Multiplying Disciples` | `Jesus and the Twelve` |
| `/prayer/` | correct | `Prayer \| Multiplying Disciples` | `Prayer` |
| `/share-the-gospel/` | correct | `Share the Gospel \| Multiplying Disciples` | `Share the Gospel` |
| `/simple-church/` | correct | `Simple Church \| Multiplying Disciples` | `Simple Church` |
| `/stories-of-hope/` | correct | `Stories of Hope \| Multiplying Disciples` | `Stories of Hope` |
| `/strategy-coordinator/` | correct | `Strategy Coordinator \| Multiplying Disciples` | `Strategy Coordinator` |
| `/testimony/` | correct | `Testimony \| Multiplying Disciples` | `Testimony` |

`/3-circles-guide/` is a **new** page (not a WordPress migration —
deliberately renamed from `/3-circles/` in Phase 1 to avoid colliding
with the real, protected WordPress URL of the same name; see
`PROTECTED_URLS.md`). Correctly excluded from the 34-URL migrated
count, correctly present in `dist/` and the sitemap as its own hub
page.

## `/stickers/` — re-confirmed

Already fully verified during Phase 4 Batch 4 migration (canonical,
no noindex, all 6 real sticker images present and resolving, all
Sticker Mule external links intact, related articles resolving, no
hub collision). This audit re-ran every one of those same checks as
part of the full 45-page sweep above and found no regressions.

## PDF / direct-media URLs with Search Console impressions

6 PDFs carry their own GSC impressions (either linked from a migrated
page or ranking as a direct file hit independent of any page):

| PDF | Impressions | On disk? | Linked from |
|---|---:|---|---|
| `/wp-content/uploads/2023/05/4-Fields-Nathan-Shank-2014.pdf` | 603 | Yes | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` (verified linked in `dist/`) |
| `/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf` | 347 | Yes | not on a migrated page yet (direct GSC hit) |
| `/wp-content/uploads/2023/06/Virtual-Training-Packet.pdf` | 41 | Yes | not on a migrated page yet (direct GSC hit) |
| `/wp-content/uploads/2023/05/Church-Waffle-English-112222-1.pdf` | 36 | Yes | not on a migrated page yet (direct GSC hit) |
| `/wp-content/uploads/2023/04/4-Fields-Toolbox-Updated-03.31.23.pdf` | 36 | Yes | not on a migrated page yet (direct GSC hit) |
| `/wp-content/uploads/2023/09/3-Circles-Sticker-QR-Code.pdf` | 5 | Yes | not on a migrated page yet (direct GSC hit) |

All 6 present on disk at their exact original paths. None require a
redirect (nothing has moved).

## Sitemap audit

- `dist/sitemap-index.xml` correctly references `dist/sitemap-0.xml`.
- `sitemap-0.xml` contains **exactly 45 URLs** — a scripted set
  comparison confirms this is an exact 1:1 match against the 45 pages
  actually generated in `dist/`. Nothing missing, nothing extra, no
  duplicates.
- 0 `source-pending`/draft pages exist today, so none could leak into
  the sitemap — but see "Remaining risks" #2 above for the
  forward-looking gap in the sitemap config itself.

## Robots audit

`public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://multiplyingdisciples.us/sitemap-index.xml
```

Allows all crawling, correctly references the sitemap. No `Disallow`
rules exist that could accidentally block a migrated page.

## Redirects

**None needed.** Every one of the 34 migrated tier-1/tier-2 URLs is
live at its exact original WordPress path — confirmed again by this
audit's scripted diff against `URL_INVENTORY.md`. `REDIRECTS.md`
remains correctly empty.

## Full per-URL table (34 migrated tier-1/tier-2 URLs)

All 34 pass every applicable check (canonical, no noindex, title,
description, single H1, no broken images except the 1 documented
`apostles-meaning` exception, no stray absolute links after the fixes
above, no guessed slugs, no hub collision).

| # | URL | Tier | Status |
|---|---|---|---|
| 1 | `/` (homepage) | tier-1 | Pass |
| 2 | `/discover-the-12-disciples-of-jesus-christ/` | tier-1 | Pass (2 stray absolute links fixed) |
| 3 | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | tier-1 | Pass |
| 4 | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | tier-1 | Pass |
| 5 | `/15-second-testimony-examples-ignite-your-faith/` | tier-1 | Pass |
| 6 | `/the-three-circles-gospel-presentation-step-by-step/` | tier-1 | Pass (2 stray absolute links fixed) |
| 7 | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | tier-1 | Pass |
| 8 | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | tier-1 | Pass, **2 known deferred broken images** (see Remaining risks) |
| 9 | `/how-to-evangelize-ultimate-step-by-step-guide/` | tier-1 | Pass |
| 10 | `/unlocking-the-power-of-apest-the-ultimate-guide/` | tier-1 | Pass |
| 11 | `/three-thirds/` | tier-1 | Pass |
| 12 | `/movement-resources/12-practice-church-circle/` | tier-1 | Pass |
| 13 | `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | tier-2 | Pass |
| 14 | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | tier-2 | Pass |
| 15 | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | tier-2 | Pass (duplicate H1 fixed) |
| 16 | `/how-to-get-started-in-four-fields-training/` | tier-2 | Pass |
| 17 | `/disciple-making-movement-books-top-25-must-reads/` | tier-2 | Pass |
| 18 | `/prayer-is-essential-12-key-prayer-points-for-disciple-making-movements/` | tier-2 | Pass |
| 19 | `/stickers/` | tier-2 | Pass (re-confirmed from Phase 4 Batch 4) |
| 20 | `/seven-words-of-jesus-on-the-cross/` | tier-2 | Pass |
| 21 | `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/` | tier-2 | Pass |
| 22 | `/breakthrough-guide-for-a-modern-day-disciple/` | tier-2 | Pass (og_image intentionally omitted, documented since Batch 3) |
| 23 | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | tier-2 | Pass |
| 24 | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` | tier-2 | Pass |
| 25 | `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` | tier-2 | Pass |
| 26 | `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/` | tier-2 | Pass |
| 27 | `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | tier-2 | Pass |
| 28 | `/4-stages-of-movement-unlock-your-next-steps/` | tier-2 | Pass |
| 29 | `/ridiculously-simple-3-ways-to-make-disciples/` | tier-2 | Pass |
| 30 | `/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/` | tier-2 | Pass |
| 31 | `/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/` | tier-2 | Pass |
| 32 | `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` | tier-2 | Pass (filename substitution, documented since Batch 3) |
| 33 | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | tier-2 | Pass |
| 34 | `/10-qualities-present-in-every-church-planting-movement-keys-to-sustainable-growth-and-multiplication/` | tier-2 | Pass |

## Build status

`astro check`: 0 errors, 0 warnings, 53 hints (pre-existing Zod
deprecation notices, unrelated to this audit).
`astro build`: 45 pages built clean, both before and after the 2
fixes above.

## Recommendation for Tier 3

- **48 tier-3 URLs remain** (per `URL_INVENTORY.md`'s tier breakdown:
  122 total published pages − 12 tier-1 − 22 tier-2 − 40 "unknown"-tier
  = 48 tier-3), plus the 40 "unknown"-tier pages (mostly 0-impression
  WooCommerce/archive-style pages) and the still-undecided
  category/tag archive URL question from `MIGRATION_PLAN.md`'s Phase 4
  scope note.
- **Batch size:** continue the same 5-7-page batch discipline used
  through all of Phase 4 (4 batches, 7/7/7/1) — Tier 3 pages have
  lower search value individually, but the same batch size keeps each
  build/verify/commit cycle reviewable. At 48 pages that's roughly
  7-8 batches.
- **Sequence:** sort by Search Console impressions descending (same
  method as `PHASE_4_TIER_2_BATCH_PLAN.md`), and resolve the
  category/tag archive URL question *before* the first Tier 3 batch,
  since it's a structural decision (not a per-page one) that could
  affect how several tier-3 URLs are classified.
- **Before batch 1:** decide whether to add the sitemap
  `source-pending` filter now (see Remaining risks #2) — cheap
  insurance if any tier-3 page needs to land as a placeholder before
  its real content is ready, which didn't happen in Tier 2 but could
  happen at tier-3 given the lower research priority per page.
