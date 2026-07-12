# Phase 4 — Tier 2 Batch Plan

Real data pulled directly from `URL_INVENTORY.md`, `PROTECTED_URLS.md`,
`MEDIA_ACQUISITION_CHECKLIST.md`, `MEDIA_IMPORT_PLAN.md`, the WordPress
export XML (re-queried fresh for this plan, not reused from memory),
and `INTERNAL_LINKING_PLAN.md` / the hub files' `key_articles` fields
(checked directly, not the plan's prose summary, since that could go
stale).

**Scope: all 22 real tier-2 URLs (100–999 impressions, last 3 months).**
0 are migrated as of this plan. Migrating in controlled batches of
5–7, per the phase instructions — **not all at once.**

## Non-negotiables carried over from Phase 1–3

Same rules as every prior phase: preserve exact URL + trailing slash,
no heavy rewrites, no merges, no slug renames, preserve media paths
exactly, internal links must be plain crawlable `<a href>`. Do not
launch, touch DNS, or touch WordPress.

## Full tier-2 inventory (22 URLs)

Sorted by impressions, descending.

| # | URL | Clicks | Impressions | Status | Likely hub | Media deps | Risk | Notes |
|---|---|---:|---:|---|---|---|---|---|
| 1 | `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | 0 | 906 | migrated | share-the-gospel | 2 files, both present (`Screen-Shot-2023-05-20-at-12.10.25-PM-scaled.jpg`, `personal-evangelism-main-header.png`) | **Low** | WP type: post. Directly supports tier-1 `how-to-evangelize` and the Share the Gospel hub, which already has a real "coming soon" slot for this exact URL. |
| 2 | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 1 | 609 | migrated | disciple-making | 3 files, all present (`disciple-making-leader.webp`, `reading-the-bible.webp`, `Untitled-design-2025-11-28T172403.122.webp`) | **Low** | Anchors the Disciple Making hub (first key-article slot). |
| 3 | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | 7 | 603 | migrated | four-fields | 6 files, all present (1 PDF + 5 size variants of one image) | **Medium** | WP type: page, not post. Content is unusually large — the WordPress body embeds the **entire Nathan & Kari Shank "Four Fields of Kingdom Growth" manual** verbatim (~356 KB of HTML), not a normal blog-length article. Preserving this without heavy rewrite means a long resulting page; flagged medium risk for volume, not media. |
| 4 | `/how-to-get-started-in-four-fields-training/` | 5 | 495 | migrated | four-fields | 3 files, all present (`4-Fields-1-e1685451774487.jpg`, `4-Fields-e1685451695430.jpg`, `Screenshot-2023-05-06-at-10.05.09-AM.jpg`) | **Low** | Pairs with #3 to fully complete the Four Fields hub (both its key-article slots). |
| 5 | `/disciple-making-movement-books-top-25-must-reads/` | 3 | 415 | migrated | disciple-making | 2 files, both present (`Includes-3-Circles-Video-1-1024x576.jpg`, `books.jpeg`) | **Medium** | Large content (~142 KB) — a 25-book annotated list with external retailer links to verify/preserve, not rewrite. |
| 6 | `/prayer-is-essential-12-key-prayer-points-for-disciple-making-movements/` | 2 | 403 | migrated | prayer | 1 file, present (`pexels-photo-2258251.jpeg`, featured image only, not inline in body) | **Low** | Clean Gutenberg-block content, no inline images to place. |
| 7 | `/stickers/` | 7 | 359 | migrated | **none** | 6 sticker images present (2025/10 + 2025/12); 3 originally-flagged files (`2-1024x1024.jpg`, `3-Circles-Sticker-Multiplying-Disciples.webp`, `3.jpg`) confirmed genuinely absent at full size under both `2023/04/` and `2025/02/` — moot, since all 3 only appeared inside a GenerateBlocks container with `hideOnDesktop`+`hideOnTablet`+`hideOnMobile` all `true`, i.e. dead chrome never rendered on the live site | **Resolved** | Migrated into the existing `articles` collection (no new content type needed — the live content is plain prose + images + external Sticker Mule links, which the existing schema/`ArticleLayout` already render fine). No hub assignment (empty WP categories, no clean topical fit, consistent with this row's original flag). See `MIGRATION_PLAN.md` Batch 4 notes and the migration notes in `src/content/articles/stickers.md` for full detail. |
| 8 | `/seven-words-of-jesus-on-the-cross/` | 1 | 339 | migrated | jesus-and-the-twelve | 1 file, present (`pexels-photo-977659.jpeg`, featured image only) | **Low** | Fills the one remaining "coming soon" slot in the Jesus and the Twelve hub (alongside 3 already-migrated tier-1 pages). |
| 9 | `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/` | 8 | 335 | migrated | prayer | 1 file, present (`eliott-reyna-jCEpN62oWL4-unsplash.jpg`) | **Low** | Content is sizable (~40 KB) but media is simple (single hero image, also the featured image). |
| 10 | `/breakthrough-guide-for-a-modern-day-disciple/` | 0 | 228 | migrated | disciple-making (likely — content not yet reviewed in detail) | 1 file **missing** (`nonresident-JTW6AUbCLC4-unsplash-3-1.jpg` — this is the page's own featured image, and is the file marked "Won't fix" on 2026-07-06) | **Medium** | This page's only tracked image is the deferred won't-fix file, meaning it would launch with a genuinely missing hero/featured image unless a substitute is found or the image reference is dropped. Hold until that's resolved or a decision is made to migrate without a featured image. |
| 11 | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | 4 | 228 | migrated | strategy-coordinator | 13 files, all present (mix of numbered screenshots + 2 Untitled-design images) | **Medium** | Very large content (~69 KB) and highest media count of any tier-2 page. This is the *only* key-article slot for the Strategy Coordinator hub, so migrating it fully completes that hub. |
| 12 | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` | 4 | 190 | migrated | prayer | 3 files, all present (2 diagram images + 1 sticker upsell image) | **Low** | Completes the Prayer hub's 3rd and final key-article slot alongside #6 and #9. |
| 13 | `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` | 1 | 181 | migrated | disciple-making | 1 file, present (`pexels-photo-5543374.jpeg`, featured image only) | **Low** | — |
| 14 | `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/` | 0 | 166 | migrated | testimony | 1 file, present (`Sharing-Your-Testimony-Scripture-7-Biblical-Reasons-You-Cant-Stay-Silent.webp`) | **Low** | Completes the Testimony hub's 3rd and final key-article slot. |
| 15 | `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | 2 | 165 | migrated | disciple-making | 2 files, both present (`image-1024x576.jpg`, `pexels-photo-6860404.jpeg`) | **Medium** | Content ~22 KB, moderate length. |
| 16 | `/4-stages-of-movement-unlock-your-next-steps/` | 7 | 165 | migrated | church-planting-movements | 4 files present (3 SVG diagrams + featured SVG) + 1 missing (same won't-fix `nonresident-JTW6AUbCLC4-unsplash-3-1.jpg` shared with #10) | **Medium** | One inline image is the same deferred won't-fix file as #10 — same caveat applies, but here it's a body image, not the sole featured image, so lower severity than #10. |
| 17 | `/ridiculously-simple-3-ways-to-make-disciples/` | 0 | 164 | migrated | disciple-making | 2 files, both present (`Screen-Shot-2023-04-02-at-7.11.17-AM-copy-2-1024x766.jpg`, `pexels-photo-4051134.jpeg`) | **Medium** | Content ~21 KB. |
| 18 | `/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/` | 0 | 160 | migrated | church-planting-movements | 1 file, present (`multiplication.jpeg`) | **Low** | — |
| 19 | `/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/` | 0 | 142 | migrated | simple-church | 1 file, present (`12044-small-group-bible-study-gettyimages-rawpixel.jpeg`) | **Low** | Completes the Simple Church hub's 3rd and final key-article slot (alongside 2 already-migrated tier-1 pages). |
| 20 | `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` | 1 | 134 | migrated | disciple-making | 1 file present inline (`75598-scaled.webp`), but **data-quality flag**: the WordPress `_thumbnail_id` attachment record resolves to `75598.webp` (no `-scaled` suffix) — a filename that was never separately supplied. Need to confirm at migration time whether the inline `-scaled` version is an acceptable substitute for the featured/og-image slot, or whether it's simply a different size of the same image (most likely, since "-scaled" is WordPress's own auto-generated large-image label). | **Medium** | Flagged for the filename mismatch above, not missing media outright. |
| 21 | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | 3 | 128 | migrated | church-planting-movements | 5 files, all present (4 DBS_2 size variants + 1 pexels photo) | **Low** | — |
| 22 | `/10-qualities-present-in-every-church-planting-movement-keys-to-sustainable-growth-and-multiplication/` | 1 | 107 | migrated | church-planting-movements | 1 file, present (`maxresdefault-3.jpg`) | **Low** | — |

## Batches

Grouped 5–7 at a time, prioritized by (1) impressions, (2) hub
strengthening, (3) tier-1 support, (4) low media complexity — in that
order, with `/stickers/` deliberately held out of the normal article
batches because it doesn't fit the hub/article model and has its own
missing-media + page-type questions to resolve first.

### Batch 1 (done) — 7 pages, 906–339 impressions

1. `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/`
2. `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/`
3. `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/`
4. `/how-to-get-started-in-four-fields-training/`
5. `/disciple-making-movement-books-top-25-must-reads/`
6. `/prayer-is-essential-12-key-prayer-points-for-disciple-making-movements/`
7. `/seven-words-of-jesus-on-the-cross/`

All 7 are low-or-medium risk with 100% of tracked media already
present. This batch fully completes the Four Fields hub (2/2), and
gives Disciple Making 2 of its 6 slots and Prayer 1 of its 3.

### Batch 2 (done) — 7 pages, 335–164 impressions

8. `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/`
9. `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/`
10. `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/`
11. `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/`
12. `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/`
13. `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/`
14. `/ridiculously-simple-3-ways-to-make-disciples/`

Fully completes the Prayer hub (3/3), the Strategy Coordinator hub
(1/1, its only slot), and the Testimony hub (3/3). Adds 3 more to
Disciple Making.

### Batch 3 (done) — 7 pages, 228–107 impressions

15. `/breakthrough-guide-for-a-modern-day-disciple/` — hold for the missing-featured-image question above, or migrate with a documented gap.
16. `/4-stages-of-movement-unlock-your-next-steps/` — same shared missing body image; lower severity.
17. `/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/`
18. `/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/` — completes Simple Church hub (3/3).
19. `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` — data-quality flag above.
20. `/disciple-making-movement-dmm-key-characteristics-and-definition/`
21. `/10-qualities-present-in-every-church-planting-movement-keys-to-sustainable-growth-and-multiplication/`

Fully completes the Church Planting Movements hub (5/8 of its listed
slots — the other 3, `5-examples`, `under-the-hood`, and
`equipping-your-church`/`breaking-down-barriers`, are tier-3, out of
this phase's scope) and Disciple Making's remaining slots (6/6).

### Batch 4 (done) — 1 page

22. `/stickers/` — migrated into the `articles` collection, no new
    content type. Investigation found the page's 6 real sticker
    images (3 Circles, 3 Circles Black, 15 Second Testimony, Prayer
    Wheel, 4 Fields, Church Waffle) all already present under
    `public/wp-content/uploads/2025/10/` and `2025/12/`. The 3
    originally-flagged missing files only ever appeared inside a
    GenerateBlocks container hidden on every breakpoint
    (`hideOnDesktop`+`hideOnTablet`+`hideOnMobile` all `true`) — dead
    chrome, never rendered live, dropped entirely along with the rest
    of that duplicate "Movement Stickers at Cost" section (which also
    had stale "Printify" copy inconsistent with the live "How it
    Works" text). No hub assignment (empty WP categories, no clean
    topical fit). 6 Gutenberg "BUY NOW" buttons converted to plain
    Markdown links to their unchanged Sticker Mule item URLs. See
    `src/content/articles/stickers.md` migration notes for full detail.

This completes Tier 2 — 22 of 22 URLs migrated, 0 remaining.

## What this plan does not do yet

- Tier 2 is fully migrated (Batches 1-4, 22/22 URLs) — nothing left to
  do under this plan.
- Does not re-request the 2 remaining `apostles-meaning` media files —
  those stay deferred per the 2026-07-06 decision in
  `imports/README.md`. The `/stickers/` media question is now resolved
  (see Batch 4 above), not deferred.
