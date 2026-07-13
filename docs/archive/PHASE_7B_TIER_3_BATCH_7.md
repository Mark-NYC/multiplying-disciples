# Phase 7B: Tier 3 Batch 7 (Final)

Seventh and final Tier 3 migration batch. Governing constraints
(unchanged from every prior Phase 7B batch): no launch, no DNS changes,
no WordPress edits, no archive redirects implemented yet, no heavy
rewrites, no page merges, no slug renames.

## Confirming the batch against `URL_INVENTORY.md`

All 5 remaining Tier 3 `not-migrated` URLs (the entire remaining list —
this batch closes out Tier 3 completely):

| URL | Type | Clicks | Impr. | Tier |
| --- | --- | --- | --- | --- |
| `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/` | article | 0 | 2 | tier-3 |
| `/action-plan/` | page | 0 | 2 | tier-3 |
| `/4-responses-to-the-gospel/` | page | 0 | 1 | tier-3 |
| `/elementor-10714/` | page | 0 | 1 | tier-3 |
| `/the-church-waffle-sticker/` | page | 0 | 1 | tier-3 |

All 5 confirmed present in `URL_INVENTORY.md`. This is the complete
remaining Tier 3 list — after this batch, Tier 3 will be 100%
migrated.

## Pre-migration verification (WXR export cross-check)

| Slug | post_id | WP type | WP status | Matches inventory? |
| --- | --- | --- | --- | --- |
| get-ready-to-be-empowered-evangelists-revolutionize-disciple-making | 8085 | post | publish | yes |
| action-plan | 6452 | page | publish | yes |
| the-church-waffle-sticker | 11718 | page | publish | yes |
| elementor-10714 | 10714 | page | publish | yes |
| 4-responses-to-the-gospel | 5925 | page | publish | yes |

All 5 confirmed `publish` status in the export, matching the
"not-migrated" (i.e. never yet brought over, but real published
content) status in the inventory.

## No hub slug/path collision

Checked `src/content/hubs/`: `3-circles.md`,
`church-planting-movements.md`, `disciple-making.md`, `four-fields.md`,
`jesus-and-the-twelve.md`, `prayer.md`, `share-the-gospel.md`,
`simple-church.md`, `stories-of-hope.md`, `strategy-coordinator.md`,
`testimony.md`. None of the 5 Batch 7 slugs collide with any hub slug
or existing article slug.

## Special inspection: `/action-plan/`

Confirmed via the WordPress export (post_id 6452, page, `publish`,
dated 2023-04-10): this is a **stale, cohort-specific landing/coaching
page** — "Harvest Group Resources & Coaching Plan," a 4-week training
program overview (Week 1: Vision + Pathway, Week 2: Starter Tools,
Week 3: The Multiplying Process, Week 4: Harvest Strategies) tied to a
specific July–August 2023 cohort. Most of the interactive chrome is
genuinely broken or empty in the export itself (not something removed
by us): `href=""` and `href="#"` placeholder buttons ("Join The
Coaching Network," "Zoom Recording" View, "Tools" View), a JS
countdown-timer widget rendering as literal `00 00 00 00` text, and
links to `/action-plan/#week1` etc. (in-page anchors, not separate
pages). The four week-checkpoint links point to `/week-1/`, `/week-2/`,
`/week-3/`, `/week-4/` — **none of these appear anywhere in
`URL_INVENTORY.md`**, so per "no guessed slugs" they are **not**
migrated as links; the week titles/dates are preserved as plain text
instead. The one real, working, non-invented destination worth keeping
is the `Virtual-Training-Packet.pdf` download link (already confirmed
present from an earlier phase) and the 4 real JotForm checkpoint URLs
(genuine external URLs present in the source, kept as documented
external links even though they're tied to a since-lapsed cohort
registration). No form/action behavior was invented — the empty-href
placeholders were dropped, not replaced with fabricated destinations.

Classified as a **utility/landing page**: no hub assignment (spans
multiple unrelated topics as a cohort syllabus, no single clean fit),
`exclude_from_blog: true` (a stale cohort landing page doesn't read as
blog content), one related_articles entry to `/starter-tools/` (a
genuine topical relationship — the coaching network's tools).

## Special inspection: `/the-church-waffle-sticker/`

Confirmed via the WordPress export (post_id 11718, page, `publish`,
dated 2025-01-31): a single sticker-product page, same family as
`/stickers/`'s child products and `/the-four-fields-sticker-simple-2x2/`
(Batch 5 precedent) — a "Church Waffle" (2″×2″) sticker with a real
Printify product link
(`https://movement-merch-at-cost.printify.me/product/7577271/the-church-waffle-sticker-2x2`).
Migrated into `articles` + `ArticleLayout`, no hub assignment,
`related_articles: ["/stickers/"]`. **Excluded from `/blog/`** via
`exclude_from_blog: true` — same reasoning as
`/the-four-fields-sticker-simple-2x2/`: a bare storefront product
listing doesn't read as blog content. Preserved the Printify product
link and price verbatim; kept the "←BACK" link to `/stickers/`.

## Special inspection: `/elementor-10714/`

Confirmed via the WordPress export (post_id 10714, page, `publish`,
dated 2025-01-14): the slug's suspicion is correct — this is an
**orphaned, single-event landing page**, a "Your seat is saved!"
confirmation page for a specific past Zoom training
("FREE Disciple Maker Training on Zoom," originally scheduled
2025-02-26, now long expired). Content is a brandmark image, a
confirmation photo, an `<add-to-calendar-button>` custom web component
(non-standard, JS-dependent, meaningless without its supporting
script), and a Zoom join link for an event that has already occurred.
This is not evergreen content and not a normal article — it is exactly
the "empty/junk/legacy" case the batch instructions anticipated.

Per instruction, **not** redirected or 404'd — the URL is preserved
with a minimal migration: the real text ("Your seat is saved!" and the
instruction to watch for follow-up emails) is kept, the
`add-to-calendar-button` widget is dropped (meaningless without its
JS), and the Zoom link is kept as a plain documented external link
with a note that the training date has passed. No hub, no tool CTA, no
related_articles. `exclude_from_blog: true`. Documented in its own
frontmatter notes as a **legacy-preservation page**: kept only so the
indexed URL continues to resolve with real (if now-outdated) content,
not because it's meant to be discovered or promoted.

## Special inspection: `/4-responses-to-the-gospel/`

Confirmed via the WordPress export (post_id 5925, page, `publish`,
dated 2023-04-02): genuine resource content — a "12 Practice Church
Circle" Google Slides deck (via a Google Slides share link), presented
as "4 Responses" to the gospel from the Acts 2:36-47 diagnostic
framework, with 2 screenshot preview images linking to the same slides.
This is the same "Church Waffle" / Acts 2:36-47 diagnostic family as
the already-migrated `/movement-resources/12-practice-church-circle/`
(tier-1, hub: `simple-church`, currently 308 impressions) — a real,
reusable teaching resource, not a utility or landing page.

Classified as **real resource content**: assigned to the **Simple
Church** hub (same hub as its sibling resource), with
`related_articles: ["/movement-resources/12-practice-church-circle/"]`.
**Included in `/blog/`** (not excluded) — matches the precedent that
`/movement-resources/12-practice-church-circle/` itself is not
excluded from `/blog/` despite also being a slide-deck resource page,
not prose.

## Media findings

| File | Referenced by | Status |
| --- | --- | --- |
| `2025/02/Biglife_Brandmark_cyan-1024x324-1.png` | elementor-10714 | Missing — only `-100x100`/`-150x150` crops exist, not the referenced size |
| `2025/01/2177CB2D-3CFE-4636-9EB7-644536B91734-1-copy-1-1024x768.webp` | elementor-10714 | Present |
| `2023/02/cropped-cropped-cropped-Copy-of-Untitled-31-1-1.png` | action-plan | Present |
| `2023/06/FUL.png` | action-plan | Missing |
| `2023/06/Virtual-Training-Packet.pdf` | action-plan | Present (confirmed in an earlier phase) |
| `2023/04/2-2.jpg` | action-plan (Week 2 image) | Missing |
| `2023/04/3-2.jpg` | action-plan (Week 3 image) | Missing |
| `2023/04/4.jpg` | action-plan (Week 4 image) | Missing |
| `2023/02/MULTIPLYING-DISCIPLES-2.png` | action-plan (footer logo) | Present |
| `2020/12/Screenshot-2023-09-02-at-4.18.46-PM.png` | the-church-waffle-sticker | Present |
| `2024/04/Printify_Logo-1024x320.png` | the-church-waffle-sticker | Missing — entire `2024/04` folder never supplied (same file already missing on `/the-four-fields-sticker-simple-2x2/` in Batch 5) |
| `2023/04/Screen-Shot-2023-04-02-at-6.40.51-AM-1024x701.jpg` | 4-responses-to-the-gospel | Missing |
| `2023/04/Screen-Shot-2023-04-02-at-6.40.40-AM-1024x802.jpg` | 4-responses-to-the-gospel | Missing |
| `2023/05/pexels-photo-6150581.jpeg` | get-ready-to-be-empowered-evangelists (featured) | Missing |
| `2023/05/pexels-charlotte-may-5965923-1024x683.jpg` | get-ready-to-be-empowered-evangelists (inline) | Present |

9 of 15 tracked media references are missing across 4 of the 5 pages.
None block the batch: none are above-the-fold-critical (elementor-10714
and action-plan are minimal/legacy pages by design), none are
product-critical (the-church-waffle-sticker's real product link and
price are intact even without the decorative badge image), none are
action-critical (the missing action-plan week images are decorative
photos, not the checkpoint links or PDF themselves), and none are a
missing direct-access PDF (the one PDF referenced,
`Virtual-Training-Packet.pdf`, is present).

## Content notes per page

- **get-ready-to-be-empowered-evangelists-revolutionize-disciple-making**
  — converted the Spotify podcast embed to a plain link, removed 2
  duplicate pull-quote `<h4>` blocks, removed the stray Elementor
  `<style>` block, removed the trailing "Are you in?/Start Here./Get
  Started" CTA block (kept the real link to `/starter-tools/` inline
  in the body text). Assigned to **Church Planting Movements** hub
  (evangelist's role in starting/sustaining DMMs — movement mechanics,
  consistent with the hub's existing content).
- **action-plan** — see special inspection above.
- **the-church-waffle-sticker** — see special inspection above.
- **elementor-10714** — see special inspection above.
- **4-responses-to-the-gospel** — removed the stray Elementor `<style>`
  block, kept both screenshot images as links to the real Google
  Slides URL, kept the "VIEW SLIDES" link. Assigned to **Simple
  Church** hub.

## Hub assignments

- **Church Planting Movements**: `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/`
  (now 22 slots).
- **Simple Church**: `/4-responses-to-the-gospel/` (now 4 slots).
- **No hub**: `/action-plan/`, `/the-church-waffle-sticker/`,
  `/elementor-10714/` (all utility/product/legacy pages, per special
  inspection above).

## Blog index inclusion

- **Included**: `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/`,
  `/4-responses-to-the-gospel/` (real article/resource content).
- **Excluded** (`exclude_from_blog: true`): `/action-plan/` (stale
  cohort landing page), `/the-church-waffle-sticker/` (storefront
  product page), `/elementor-10714/` (orphaned legacy event page).

## Build verification plan

Run `astro check` and `astro build`, then verify: all 5 URLs generate;
canonicals correct; no accidental noindex; exactly 1 H1 per page; no
broken internal links among migrated pages; no hub collisions; no
guessed slugs (confirmed `/week-1/` through `/week-4/` are NOT linked,
since they're not in `URL_INVENTORY.md`); `/blog/` still builds and
excludes the 3 utility/product/legacy pages; header/footer links still
resolve.

## Confirming Tier 3 completion

After this batch, re-checking `URL_INVENTORY.md` for any remaining
`tier-3` rows with `not-migrated` status should return zero results —
Tier 3 will be 100% migrated (48 of 48 original Tier 3 URLs accounted
for across Batches 1-7 plus the pre-existing Tier 3 migrations from
earlier phases).
