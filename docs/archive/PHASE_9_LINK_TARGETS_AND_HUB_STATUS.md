# Phase 9: Remaining Link Targets + Hub Status Decision

Resolves the 2 remaining risks flagged at the end of Phase 8: the 6
internal-link targets that pointed to real-but-unmigrated URLs, and
the hub `status: migrated-draft` question. Governing constraints
(unchanged): no launch, no DNS changes, no WordPress edits, no
redirects implemented, no redesign.

## Method

For each of the 6 targets: confirmed the exact URL in
`URL_INVENTORY.md`, extracted its real content from the WordPress
export (`f078c6c4-multiplyingdisciples.WordPress.20260706.xml`),
classified its page type, counted exact internal-link occurrences
across the generated `dist/` output, identified every linking page,
and decided an action. No slugs were guessed and no missing pages were
fabricated — every decision is grounded in either real exported
content or an existing real internal page.

## The 6 link targets

### 1. `/free-training/`

- **URL_INVENTORY.md**: confirmed, `page`, `not-migrated`, tier `unknown`.
- **WordPress export**: found — post_id 104, `page`, `publish`,
  dated 2020-11-27 (original creation; content itself is evergreen,
  not date-locked to that creation date).
- **Page type**: real content page — an evergreen lead-magnet landing
  page ("FREE 1-HOUR Live Disciple Making Training"), a recurring
  weekly Zoom training offer with a real, working registration link,
  a 3-step overview (Pray / Go / Disciple), and an FAQ.
- **Link count**: 11 links across 9 pages: `/starter-tools/`,
  `/under-the-hood-of-disciple-making-movements/`,
  `/how-to-evangelize-ultimate-step-by-step-guide/`,
  `/the-three-circles-gospel-presentation-step-by-step/`,
  `/start-here/` (×2), `/discover-the-12-disciples-of-jesus-christ/`,
  `/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/`,
  `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/`,
  `/content-vs-systems-the-game-changer-for-leadership-development/` (×2).
- **Decision: A — migrate now.** This is the single most-referenced
  target of the 6 and is genuinely the site's primary "get started"
  CTA destination. Migrated as `src/content/articles/free-training.md`.
  Converted the FAQ accordion (JS-dependent GenerateBlocks toggle
  widget) into plain H3/paragraph pairs. Kept the one real, working,
  evergreen destination — the Zoom registration link
  (`https://us06web.zoom.us/meeting/register/5rgyTZTMSU-zP6ud0BTe0Q`)
  — as the primary CTA. **Dropped the 3 specific dated session rows**
  (March 13/27, April 10 2025 — all now long past relative to today)
  as stale, time-bound content, same reasoning as the Batch 6/7
  precedent for `/action-plan/` and `/elementor-10714/`. Two of those
  rows' "Select Date" buttons pointed to `/trainings/03-27-25` and
  `/trainings/04-10-2025/` — neither appears anywhere in
  `URL_INVENTORY.md`, so per "no guessed slugs" they were dropped
  entirely, not linked. `exclude_from_blog: true` (a CTA/landing page,
  not an article). No hub assignment (a cross-cutting CTA destination,
  not one hub's specific topic).

### 2. `/3-circles/`

- **URL_INVENTORY.md**: confirmed, `page (real tool, see
  PROTECTED_URLS.md hub collision note)`, `not-migrated`, tier `unknown`.
- **WordPress export**: found — post_id 5914, `page`, `publish`,
  dated 2023-04-02.
- **Page type**: real tool/resource page — a "3 Circles" Google
  Slides deck with a short explanation and a link to the already-
  migrated `/ridiculously-simple-3-ways-to-make-disciples/` article.
- **Link count**: 12 links across 8 pages: `/unlock-biblical-principles-for-multiplying-disciples/`,
  `/starter-tools/` (×2), `/under-the-hood-of-disciple-making-movements/`,
  `/the-three-circles-gospel-presentation-step-by-step/`,
  `/ridiculously-simple-3-ways-to-make-disciples/`, `/start-here/` (×3),
  `/disciple-making-resources-for-churches-that-will-multiply/` (×2),
  `/breakthrough-guide-for-a-modern-day-disciple/`.
- **Decision: A — migrate now.** The most-linked of the 6 targets, and
  exactly the case `/3-circles-guide/` (the hub)'s own notes
  anticipated: "If `/3-circles/` itself ever gets migrated, link to it
  from here as a related tool." Migrated as
  `src/content/articles/3-circles.md`, preserving the exact URL
  `/3-circles/` (deliberately distinct from the hub's
  `/3-circles-guide/`, per `PROTECTED_URLS.md`). Added to the
  `/3-circles-guide/` hub's `key_articles`. `exclude_from_blog: true`
  (a bare tool/slide-deck link page, same family as
  `/4-responses-to-the-gospel/`'s Batch 7 precedent — except that one
  was judged real enough for `/blog/`; this one is thinner, effectively
  a single external link plus a short caption, closer to a utility
  redirect page). No other hub assignment beyond the 3-circles-guide
  cross-link.

### 3. `/4-1-1/`

- **URL_INVENTORY.md**: confirmed, `page`, `not-migrated`, tier `unknown`.
- **WordPress export**: found — post_id 5902, `page`, `publish`,
  dated 2023-04-02.
- **Page type**: real tool/resource page — a "4-1-1" Google Slides
  deck, same simple pattern as `/3-circles/`.
- **Link count**: 5 links across 3 pages: `/starter-tools/` (×2),
  `/start-here/` (×2),
  `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/`.
- **Decision: A — migrate now.** Same reasoning as `/3-circles/`:
  real, clean, evergreen tool content, no duplication issue. Migrated
  as `src/content/articles/4-1-1.md`, preserving the exact URL
  `/4-1-1/`. No hub assignment (no existing hub matches "4-1-1"
  specifically). `exclude_from_blog: true` (same reasoning as
  `/3-circles/`).

### 4. `/4-fields/`

- **URL_INVENTORY.md**: confirmed, `page`, `not-migrated`, tier `unknown`.
- **WordPress export**: found — post_id 5970, `page`, `publish`,
  dated 2023-04-02.
- **Page type**: **stale/superseded duplicate content, not worth
  migrating as its own page.** Its actual body content is titled
  "12 Practice Church Circle Google Slides" (an older, 2023-era Google
  Slides version) — **not** Four Fields content at all, despite its
  URL slug. This exact "12 Practice Church Circle" topic already has a
  richer, current, already-migrated version at
  `/movement-resources/12-practice-church-circle/` (tier-1, 308
  impressions), which the same `starter-tools.md` resource grid
  already links to separately under a "Church Waffle" card. Migrating
  `/4-fields/` verbatim would create confusing duplicate content under
  a mismatched, unrelated slug name — exactly the "weak filler" the
  brief warned against creating.
- **Link count**: 3 links across 2 pages: `/starter-tools/`,
  `/start-here/` (×2) — both under a "4 Fields" grid card with a
  "[View]" link, clearly intended by the original author to point to
  real Four Fields framework content (not the 12-practice-church-circle
  duplicate that's actually there).
- **Decision: C — replace the links.** Left `/4-fields/` itself
  pending in `URL_INVENTORY.md` (not migrated, documented why).
  Replaced all 3 "4 Fields" card links in `start-here.md` and
  `starter-tools.md` with the real, substantive, already-migrated
  Four Fields article:
  `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/`
  — a genuine deep-dive on the Four Fields framework by Nathan and
  Kari Shank, already used as a CTA target elsewhere (Batch 5/6). This
  is a stronger, topically-correct match for a "4 Fields" resource card
  than either the stale original or a freshly-invented stub would be.

### 5. `/movement-resources/strategy-coordinator/`

- **URL_INVENTORY.md**: confirmed, `page`, `not-migrated`, tier `unknown`.
- **WordPress export**: found — post_id 5988, `page`, `publish`,
  dated 2023-04-02, `post_parent` 2301 (matching `/movement-resources/`'s
  own post_id — a genuine child page, not an archive).
- **Page type**: real, substantial content page — "5 T's Strategy
  Coordinator Overview," including a definition section, an embedded-
  video-turned-link, a YouTube playlist link, 4 podcast/bit.ly links,
  and a full "URLPEG Framework" article-length section on urban
  mission targeting.
- **Link count**: 1 link, from `/movement-resources/`'s own
  `related_articles` frontmatter (already wired in an earlier phase
  anticipating this exact migration).
- **Decision: A — migrate now.** Real, rich, on-topic content that
  directly strengthens the existing `/strategy-coordinator/` hub
  (which previously had only 1 key article). Migrated as
  `src/content/articles/movement-resources-strategy-coordinator.md`,
  preserving the exact nested URL
  `/movement-resources/strategy-coordinator/` (same file-naming
  convention as the other `/movement-resources/` children). Converted
  in-page anchor navigation ("BACK TO TOP" / jump links) to plain
  headings since Astro has no matching in-page nav component. Added to
  the `/strategy-coordinator/` hub's `key_articles` (now 2). Included
  in `/blog/` (real article-length content, not a utility page).

### 6. `/movement-resources/4-fields-toolbox/`

- **URL_INVENTORY.md**: confirmed, `page`, `not-migrated`, tier `unknown`.
- **WordPress export**: found — post_id 6048, `page`, `publish`,
  dated 2023-04-03, `post_parent` 2301 (genuine child of
  `/movement-resources/`).
- **Page type**: real resource/tool page — "4 Fields Toolbox," a
  simple download page (PDF + PNG) for emerging leaders, explicitly
  positioned as the next step after `/starter-tools/`.
- **Link count**: 1 link, from `/movement-resources/`'s own
  `related_articles` frontmatter (same as #5).
- **Decision: A — migrate now.** Real, simple, genuinely useful
  resource page; the referenced PDF
  (`4-Fields-Toolbox-Updated-03.31.23.pdf`) is confirmed present.
  Migrated as `src/content/articles/movement-resources-4-fields-toolbox.md`,
  preserving the exact nested URL
  `/movement-resources/4-fields-toolbox/`. No hub assignment (this is
  a standalone downloadable resource, not tied to one specific hub
  topic beyond its `/movement-resources/` parent relationship, which is
  handled via `related_articles`). `exclude_from_blog: true` (a bare
  download page, same family as the sticker/product pages from
  Batch 5/7).

## Media findings for the 5 newly migrated pages

Two files initially flagged "missing" turned out to be present but
referenced with the wrong space character — the same **U+202F narrow
no-break space** encoding bug found and fixed in Phase 8's
`/kingdom-ministry-training/` fix, now confirmed as a recurring
WordPress/macOS screenshot-naming pattern rather than a one-off:

| File | Page | Status |
| --- | --- | --- |
| `2025/01/Screenshot-2025-01-20-at-1.13.20 PM.webp` | free-training | Present — filename uses U+202F, not a regular space; referenced with correct `%E2%80%AF` encoding |
| `2025/01/Screenshot-2025-01-20-at-9.14.43 PM-1024x574.webp` | movement-resources-strategy-coordinator | Present — same U+202F fix applied |
| `2025/03/SELECT-DATE-1.jpg` | free-training | Missing — belonged to the dropped stale dated-sessions section, so no longer referenced at all |
| `2023/04/Screen-Shot-2023-04-02-at-6.25.14-AM-1024x731.jpg` | 3-circles | Missing (screenshot preview) |
| `2023/04/Screen-Shot-2023-04-02-at-6.32.15-AM-1024x810.jpg` | 3-circles | Missing (screenshot preview) |
| `2023/04/Screen-Shot-2023-04-02-at-6.12.23-AM-1024x350.jpg` | 4-1-1 | Missing (screenshot preview) |
| `2023/04/Screen-Shot-2023-04-02-at-6.04.54-AM-1024x812.jpg` | 4-1-1 | Missing (screenshot preview) |
| `2023/04/pexels-omar-lopez-1182825-1.jpg` | movement-resources-strategy-coordinator | Missing (decorative header background) |
| `2023/04/4-Fields-Toolbox-03.26.23-copy.jpg` | movement-resources-4-fields-toolbox | Missing (product preview image) |
| `2023/04/IMG_4574-1.jpg` | movement-resources-4-fields-toolbox | Missing (PNG download target — the PDF download, the primary CTA, is present) |

7 files are genuinely missing across the 5 new pages — all are
decorative preview/screenshot images, not the core real destination
links (Google Slides decks, the Zoom registration, the PDF download).
None are above-the-fold-critical in a way that blocks the page's real
content or purpose. All deferred, non-blocking, documented in
`MEDIA_ACQUISITION_CHECKLIST.md` and `MEDIA_IMPORT_PLAN.md`.

## Hub status review

Reviewed all 11 hub pages currently `status: "migrated-draft"`:

| Hub | Generates | Canonical/title/meta/H1 | key_articles resolve | next_step resolves | Decision |
| --- | --- | --- | --- | --- | --- |
| 3 Circles | ✓ | ✓ | ✓ (2 → 3 after this phase) | ✓ | **published** |
| Church Planting Movements | ✓ | ✓ | ✓ (22) | ✓ | **published** |
| Disciple Making | ✓ | ✓ | ✓ (14) | ✓ | **published** |
| Four Fields | ✓ | ✓ | ✓ (4) | ✓ | **published** |
| Jesus and the Twelve | ✓ | ✓ | ✓ (6) | ✓ | **published** |
| Prayer | ✓ | ✓ | ✓ (3) | ✓ | **published** |
| Share the Gospel | ✓ | ✓ | ✓ (6) | ✓ | **published** |
| Simple Church | ✓ | ✓ | ✓ (4) | ✓ | **published** |
| Stories of Hope | ✓ | ✓ | ✓ (2) | ✓ | **published** |
| Strategy Coordinator | ✓ | ✓ | ✓ (1 → 2 after this phase) | n/a (no next_step field set) | **published** |
| Testimony | ✓ | ✓ | ✓ (3) | ✓ | **published** |

All 11 hubs pass every structural criterion: they generate correctly
(confirmed in Phase 8's 93-page SEO sweep — 0 issues), every one of
the 67 (now 69, after this phase's 2 additions)
`key_articles` links resolves, every `next_step` link resolves (10 of
11 hubs have a `next_step`; Strategy Coordinator doesn't set one,
which is a content-completeness choice, not a broken link), and no hub
links point anywhere broken. Nothing structurally blocks any of the 11
hubs from `published` status. **Decision: promote all 11 hubs from
`migrated-draft` to `published`.**

Note: `published` here describes the hub *page's* content-readiness
state within this schema (matching the terminal status already used
for real migrated WordPress content) — it does not mean the site is
launched. DNS, hosting, and the human go/no-go sign-off in
`LAUNCH_CHECKLIST.md` remain entirely separate, unaffected gates.

## Build verification

- `astro check`: 0 errors (same 54 pre-existing Zod-deprecation hints).
- `astro build`: 0 errors, 98 pages (93 + 5 newly migrated pages).
- Sitemap: 98 `<loc>` entries, matching the build exactly.
- `/blog/`: now lists 74 articles (73 + 1 — only
  `/movement-resources/strategy-coordinator/` is new real
  article-length content added to `/blog/`; `/free-training/`,
  `/3-circles/`, and `/movement-resources/4-fields-toolbox/` are all
  `exclude_from_blog: true` utility/tool pages).
- Internal links: re-crawled all 98 pages. The 33 links that
  previously pointed to the 6 unmigrated targets now resolve: 30
  across the 5 migrated pages' new URLs, and 3 replaced with the
  stronger existing Four Fields article. **0 broken internal links
  remain anywhere on the site** (down from the 33 flagged in Phase 8).
- No accidental noindex, no duplicate slugs, no hub/article collisions
  introduced by the 5 new pages (all cross-checked against the same
  slug/`original_url` audit method from Phase 8).

## Remaining status

- **Redirects**: still none needed. All 5 newly migrated pages
  preserve their exact original WordPress URLs; `/4-fields/` was never
  redirected (it remains a real, confirmed, deliberately-unmigrated
  URL — not renamed, not merged, just judged not worth republishing as
  its own page while its content is superseded elsewhere). No change
  to `REDIRECTS.md`'s 20 pending archive rows.
- **Media gaps**: 7 new (all decorative, non-blocking, documented
  above) plus the 3 already-documented gaps from Phase 8 — 10 total
  deferred media gaps sitewide, none blocking.
- **Hub status**: resolved — all 11 promoted to `published`.
- **`/4-fields/`**: intentionally left pending, with reason documented
  above and in `URL_INVENTORY.md`. This is the one target of the
  original 6 that remains un-migrated by deliberate decision, not
  oversight.
