# URL Inventory

Master tracking sheet for every known WordPress URL and its migration
status. Rebuilt from real data supplied 2026-07-06:

- `multiplyingdisciples.WordPress.20260706.xml` — full WordPress export
  (122 published posts + pages, plus 1,124 media attachments).
- `Pages.csv` — Google Search Console Pages export, last 3 months (179
  rows: pages, media, category/tag archives).
- `Queries.csv` — Google Search Console top queries (1,000 rows).
- `Sitemap_Index.xml` — confirms the live sitemap structure:
  `post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`,
  `post_tag-sitemap.xml`, `gblocks_pattern_collections-sitemap.xml`
  (individual sub-sitemaps not yet supplied — the WordPress export above
  is the authoritative URL list instead, and is more complete since it
  includes everything the sitemap would, minus the taxonomy archives).

This **replaces** the earlier provisional 45-URL list built only from the
migration brief, which — cross-checked against this real data — turned
out to have 7 incorrect slugs. See `PROTECTED_URLS.md` for the corrected
list of what the brief got wrong.

## Priority tiers (real, computed from Pages.csv)

- **Tier 1** — more than 1,000 impressions or more than 10 clicks in the
  last 3 months. **12 URLs.**
- **Tier 2** — 100 to 999 impressions. **22 URLs.**
- **Tier 3** — everything else with any recorded impressions. **48 URLs.**
- **Unknown** — no Search Console data in the known export (mostly
  utility/e-commerce pages: cart, checkout, my-account, sticker product
  pages). **40 URLs.**

## Status legend

- `not-migrated` — nothing built in Astro yet.
- `migrated` — real content ported in from the WordPress export, lightly
  improved, ready for review.
- `published` — reviewed and launch-ready.

(The earlier `draft-migrated` placeholder status no longer applies to
any page — all migrated pages have real content, not placeholders.)

**Phase 3 status:** all 12 real tier-1 URLs are now migrated (5 from
Phase 1/2 + 7 from Phase 3 — see `PHASE_3_TIER_1_BATCH.md`). 0 tier-1
pages remain. Tier-2 (22 URLs) and below are Phase 4+ work.

**Phase 4 status:** Batches 1-4 of Tier 2 are migrated — 22 of 22
tier-2 URLs, 100% complete (see `PHASE_4_TIER_2_BATCH_PLAN.md`). Batch 1: `/5-proven-
strategies-unlock-the-secrets-of-effective-personal-evangelism/`,
`/understanding-biblical-discipleship-a-complete-guide-to-following-
jesus/`, `/four-fields-of-kingdom-growth-starting-and-releasing-
healthy-churches-by-nathan-and-kari-shank/`, `/how-to-get-started-in-
four-fields-training/`, `/disciple-making-movement-books-top-25-must-
reads/`, `/prayer-is-essential-12-key-prayer-points-for-disciple-
making-movements/`, `/seven-words-of-jesus-on-the-cross/`. Batch 2:
`/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-
lives/`, `/what-is-a-strategy-coordinator-their-role-framework-and-
impact-in-modern-missions/`, `/christian-prayer-wheel-a-structured-
hour-of-prayer-that-actually-works/`, `/radical-discipleship-
understanding-what-it-means-and-how-to-live-it/`, `/the-power-of-
sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-
silent/`, `/the-high-price-of-discipleship-what-it-really-costs-to-
follow-jesus/`, `/ridiculously-simple-3-ways-to-make-disciples/`.
Batch 3: `/breakthrough-guide-for-a-modern-day-disciple/`,
`/4-stages-of-movement-unlock-your-next-steps/`, `/the-power-of-
multiplication-how-church-planting-movements-accomplish-the-great-
commission/`, `/what-is-a-simple-church-meeting-christ-in-a-spiritual-
family/`, `/love-and-obedience-exploring-the-biblical-relationship-
between-the-two/`, `/disciple-making-movement-dmm-key-characteristics-
and-definition/`, `/10-qualities-present-in-every-church-planting-
movement-keys-to-sustainable-growth-and-multiplication/`. Batch 4:
`/stickers/` (the final tier-2 URL — a Sticker Mule product showcase
page, migrated into the existing articles collection with no new
content type; see `PHASE_4_TIER_2_BATCH_PLAN.md` for the layout
decision and media findings). 0 tier-2 URLs remain.

**Phase 5 status:** full protected URL audit completed across all 34
migrated tier-1/tier-2 URLs — see `PHASE_5_PROTECTED_URL_AUDIT.md`.
Found and fixed 2 real bugs (a duplicate H1, 3 stray absolute internal
links). All 34 URLs re-confirmed preserved at their exact original
path with correct canonical, no noindex, no guessed slugs, no hub
collisions. Sitemap confirmed an exact match to the 45 built pages.
1 known deferred media gap (`apostles-meaning`, 2 images) unchanged.
Next: Tier 3 (48 URLs) + the 40 "unknown"-tier URLs + the
category/tag archive URL question.

**Phase 6 status:** archive/URL-structure decision completed — see
`PHASE_6_ARCHIVE_URL_DECISION.md`. The 20 category/tag archive rows
below now carry their decided redirect target (301 to the closest
hub). `/blog/` (row below, tier-3, 95 impressions) is confirmed via
the WordPress export to have **empty body content** — it's WordPress's
configured posts-page placeholder, not a page with real content to
port — and needs to become a newly-built Astro index page, recommended
before Tier 3 since it's already linked from site nav today.
`/movement-resources/` (row below, tier-3, 22 impressions) is
confirmed to be **real, distinct content** ("Emerging Network
Resources," a curated external-resource list unrelated to its child
pages) — not an archive or directory — and will migrate normally as a
real Tier 3 article, a good Batch 1 candidate. Its 2 real not-yet-
migrated children, `/movement-resources/strategy-coordinator/` and
`/movement-resources/4-fields-toolbox/` (both below, "unknown" tier),
are confirmed via the export's `post_parent` field to be genuine
WordPress child pages of `/movement-resources/`, not archives either.

**Phase 7A status:** `/blog/` built — see `src/pages/blog/index.astro`
and `MIGRATION_PLAN.md`. A real Astro index page, not a WordPress
content migration (there was no body content to port). Lists all 33
migrated articles (sorted by tier, then by best-available date),
shows each article's title/description/hub/date, and links to all 11
hubs for topic browsing. `/blog/` status flipped from `not-migrated`
to `published` above. 46 pages now build clean (was 45). Site nav's
`/blog/` links (present on every page) now resolve instead of 404ing.

**Phase 7B Batch 1 status:** first Tier 3 batch migrated — 7 pages,
see `PHASE_7B_TIER_3_BATCH_1.md`. Led with `/movement-resources/` (real
content, not an archive, per Phase 6), then
`/disciple-making-resources-for-churches-that-will-multiply/`,
`/under-the-hood-of-disciple-making-movements/`,
`/what-are-disciple-making-movements-5-examples-from-around-the-world/`,
`/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/`,
`/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/`,
and `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/`.
This **completes the Church Planting Movements hub fully (8 of 8
key-article slots)**, fills the Share the Gospel hub's last open slot,
and fills the Disciple Making hub's reserved slot + `next_step`
target. 8 files across 5 of these pages are missing from supplied
uploads (5 featured/og_images plus 2 inline supporting images on
`under-the-hood-of-disciple-making-movements`) — all deferred,
non-blocking (none are above-the-fold hero necessities or direct
PDFs); see `PHASE_7B_TIER_3_BATCH_1.md` and
`MEDIA_ACQUISITION_CHECKLIST.md` for the full breakdown. 53 pages now
build clean (was 46). 41 tier-3 URLs remain (48 − 7).

## Full inventory — all 122 published posts/pages

Sorted by impressions (real GSC data where available).

| URL | Type | Status | Clicks | Impressions | Tier |
|---|---|---|---:|---:|---|
| `/discover-the-12-disciples-of-jesus-christ/` | article | migrated | 330 | 116,772 | tier-1 |
| `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | article | migrated | 19 | 9,723 | tier-1 |
| `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | article | migrated | 2 | 8,305 | tier-1 |
| `/15-second-testimony-examples-ignite-your-faith/` | article | migrated | 13 | 7,669 | tier-1 |
| `/the-three-circles-gospel-presentation-step-by-step/` | article | migrated | 62 | 6,670 | tier-1 |
| `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | resource | migrated | 75 | 5,396 | tier-1 |
| `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | article | migrated | 0 | 2,430 | tier-1 |
| `/how-to-evangelize-ultimate-step-by-step-guide/` | article | migrated | 0 | 1,817 | tier-1 |
| `/unlocking-the-power-of-apest-the-ultimate-guide/` | article | migrated | 4 | 1,290 | tier-1 |
| `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | article | migrated | 0 | 906 | tier-2 |
| `/three-thirds/` | article | migrated | 13 | 737 | tier-1 |
| `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | article | migrated | 1 | 609 | tier-2 |
| `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | page | migrated | 7 | 603 | tier-2 |
| `/how-to-get-started-in-four-fields-training/` | article | migrated | 5 | 495 | tier-2 |
| `/disciple-making-movement-books-top-25-must-reads/` | article | migrated | 3 | 415 | tier-2 |
| `/prayer-is-essential-12-key-prayer-points-for-disciple-making-movements/` | article | migrated | 2 | 403 | tier-2 |
| `/stickers/` | page | migrated | 7 | 359 | tier-2 |
| `/seven-words-of-jesus-on-the-cross/` | article | migrated | 1 | 339 | tier-2 |
| `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/` | article | migrated | 8 | 335 | tier-2 |
| `/movement-resources/12-practice-church-circle/` | resource | migrated | 12 | 308 | tier-1 |
| `/` | homepage | migrated | 23 | 277 | tier-1 |
| `/breakthrough-guide-for-a-modern-day-disciple/` | article | migrated | 0 | 228 | tier-2 |
| `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | article | migrated | 4 | 228 | tier-2 |
| `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` | article | migrated | 4 | 190 | tier-2 |
| `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` | article | migrated | 1 | 181 | tier-2 |
| `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/` | article | migrated | 0 | 166 | tier-2 |
| `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | article | migrated | 2 | 165 | tier-2 |
| `/4-stages-of-movement-unlock-your-next-steps/` | article | migrated | 7 | 165 | tier-2 |
| `/ridiculously-simple-3-ways-to-make-disciples/` | article | migrated | 0 | 164 | tier-2 |
| `/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/` | article | migrated | 0 | 160 | tier-2 |
| `/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/` | article | migrated | 0 | 142 | tier-2 |
| `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` | article | migrated | 1 | 134 | tier-2 |
| `/disciple-making-movement-dmm-key-characteristics-and-definition/` | article | migrated | 3 | 128 | tier-2 |
| `/10-qualities-present-in-every-church-planting-movement-keys-to-sustainable-growth-and-multiplication/` | article | migrated | 1 | 107 | tier-2 |
| `/blog/` | new Astro index page (not a WP content migration — see Phase 7A) | published | 0 | 95 | tier-3 |
| `/disciple-making-resources-for-churches-that-will-multiply/` | article | migrated | 1 | 92 | tier-3 |
| `/under-the-hood-of-disciple-making-movements/` | article | migrated | 0 | 86 | tier-3 |
| `/starter-tools/` | page | not-migrated | 0 | 78 | tier-3 |
| `/what-are-disciple-making-movements-5-examples-from-around-the-world/` | article | migrated | 1 | 74 | tier-3 |
| `/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/` | article | migrated | 0 | 71 | tier-3 |
| `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/` | article | migrated | 0 | 66 | tier-3 |
| `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | article | migrated | 1 | 66 | tier-3 |
| `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/` | article | not-migrated | 0 | 55 | tier-3 |
| `/unlock-biblical-principles-for-multiplying-disciples/` | article | not-migrated | 1 | 52 | tier-3 |
| `/5-insightful-keys-into-the-biblical-jesus/` | article | not-migrated | 0 | 49 | tier-3 |
| `/missionary-verses-in-the-bible-reveal-gods-heart/` | article | not-migrated | 0 | 48 | tier-3 |
| `/the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making/` | article | not-migrated | 0 | 46 | tier-3 |
| `/7-surprising-disciple-making-movement-examples/` | article | not-migrated | 1 | 43 | tier-3 |
| `/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/` | article | not-migrated | 0 | 42 | tier-3 |
| `/bible-passages-about-love-what-scripture-really-says/` | article | not-migrated | 0 | 41 | tier-3 |
| `/breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy/` | article | not-migrated | 0 | 33 | tier-3 |
| `/the-multiplier-mandate-revealed-from-genesis-to-revelation/` | article | not-migrated | 0 | 33 | tier-3 |
| `/start-here/` | page | not-migrated | 0 | 32 | tier-3 |
| `/vision/` | page | not-migrated | 1 | 30 | tier-3 |
| `/how-to-spot-a-lone-wolf-and-not-become-one/` | article | not-migrated | 0 | 30 | tier-3 |
| `/jesus-the-leader-examining-how-he-identified-trained-and-sent-leaders-in-the-gospel-of-mark/` | article | not-migrated | 0 | 29 | tier-3 |
| `/beliefs-values/` | page | not-migrated | 0 | 26 | tier-3 |
| `/privacy-policy/` | page | not-migrated | 0 | 25 | tier-3 |
| `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | article | not-migrated | 1 | 24 | tier-3 |
| `/movement-resources/` | page | migrated | 0 | 22 | tier-3 |
| `/the-leadership-phase-everyone-skips-why-investment-matters/` | article | not-migrated | 2 | 21 | tier-3 |
| `/discovering-the-disciple-meaning-a-life-changing-journey/` | article | not-migrated | 0 | 20 | tier-3 |
| `/5-surprising-ways-to-attract-multiplying-leaders/` | article | not-migrated | 2 | 20 | tier-3 |
| `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | article | not-migrated | 0 | 20 | tier-3 |
| `/kingdom-ministry-training/` | page | not-migrated | 0 | 19 | tier-3 |
| `/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church/` | article | not-migrated | 0 | 19 | tier-3 |
| `/content-vs-systems-the-game-changer-for-leadership-development/` | article | not-migrated | 0 | 18 | tier-3 |
| `/unlock-the-power-of-friendly-accountability/` | article | not-migrated | 0 | 17 | tier-3 |
| `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | article | not-migrated | 1 | 17 | tier-3 |
| `/the-four-fields-sticker-simple-2x2/` | page | not-migrated | 3 | 14 | tier-3 |
| `/filtering-unlock-this-essential-for-disciple-making-movements/` | article | not-migrated | 0 | 10 | tier-3 |
| `/the-3-core-habits-of-a-disciple/` | article | not-migrated | 0 | 10 | tier-3 |
| `/contact-us/` | page | not-migrated | 0 | 7 | tier-3 |
| `/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/` | article | not-migrated | 0 | 7 | tier-3 |
| `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | article | not-migrated | 0 | 7 | tier-3 |
| `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | article | not-migrated | 0 | 5 | tier-3 |
| `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | article | not-migrated | 0 | 4 | tier-3 |
| `/action-plan/` | page | not-migrated | 0 | 2 | tier-3 |
| `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/` | article | not-migrated | 0 | 2 | tier-3 |
| `/4-responses-to-the-gospel/` | page | not-migrated | 0 | 1 | tier-3 |
| `/elementor-10714/` | page | not-migrated | 0 | 1 | tier-3 |
| `/the-church-waffle-sticker/` | page | not-migrated | 0 | 1 | tier-3 |
| `/free-training/` | page | not-migrated | 0 | 0 | unknown |
| `/about-us/` | page | not-migrated | 0 | 0 | unknown |
| `/get-coaching/` | page | not-migrated | 0 | 0 | unknown |
| `/4-1-1/` | page | not-migrated | 0 | 0 | unknown |
| `/3-circles/` | page (real tool, see PROTECTED_URLS.md hub collision note) | not-migrated | 0 | 0 | unknown |
| `/4-fields/` | page | not-migrated | 0 | 0 | unknown |
| `/movement-resources/strategy-coordinator/` | page | not-migrated | 0 | 0 | unknown |
| `/movement-resources/4-fields-toolbox/` | page | not-migrated | 0 | 0 | unknown |
| `/start/` | page | not-migrated | 0 | 0 | unknown |
| `/training/` | page | not-migrated | 0 | 0 | unknown |
| `/links/` | page | not-migrated | 0 | 0 | unknown |
| `/kingdom-ministry-catalyst-training/` | page | not-migrated | 0 | 0 | unknown |
| `/neighborhood-prayer-walking-guide-ignite-your-faith/` | page | not-migrated | 0 | 0 | unknown |
| `/discipleship-habit-formation-guide/` | page | not-migrated | 0 | 0 | unknown |
| `/10321-2/` | page | not-migrated | 0 | 0 | unknown |
| `/return-policy/` | page | not-migrated | 0 | 0 | unknown |
| `/3-circles-stickers-2x2/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/3-circles-stickers-with-qr-code/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/the-church-circle-10-sticker/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/the-four-fields-sticker-simple/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/2-kingdoms-stickers/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/christian-clothing-apparel/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/cart/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/checkout/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/my-account/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/terms-and-conditions/` | page | not-migrated | 0 | 0 | unknown |
| `/1-hour-training-seat-saved/` | page | not-migrated | 0 | 0 | unknown |
| `/christ-clothing/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/2025-family-wall-calendar/` | page (ecommerce) | not-migrated | 0 | 0 | unknown |
| `/start-here-2/` | page | not-migrated | 0 | 0 | unknown |
| `/how-to-share-the-gospel-with-friends-and-family-members/` | article | not-migrated | 0 | 0 | unknown |
| `/unleashing-the-power-of-pauls-methods-how-to-multiply-apostolic-leaders-in-the-modern-church/` | article | not-migrated | 0 | 0 | unknown |
| `/what-is-a-disciple-making-movement-and-why-does-it-matter/` | article | not-migrated | 0 | 0 | unknown |
| `/how-to-revitalize-christian-revival-with-disciple-making/` | article | not-migrated | 0 | 0 | unknown |
| `/empowering-transformation-unleashing-the-power-of-making-disciples/` | article | not-migrated | 0 | 0 | unknown |
| `/are-disciple-making-movements-anti-institutional/` | article | not-migrated | 0 | 0 | unknown |
| `/how-leaders-make-decisions-in-uncertainty/` | article | not-migrated | 0 | 0 | unknown |
| `/how-to-overcome-the-effects-of-movement-method-inoculation/` | article | not-migrated | 0 | 0 | unknown |
| `/strategic-persistence-how-to-plan-for-decades-and-live-for-today/` | article | not-migrated | 0 | 0 | unknown |
| `/is-your-strategy-blinding-you-to-gods-harvest/` | article | not-migrated | 0 | 0 | unknown |

## Category and tag archive URLs (from GSC, not in the export above)

These are WordPress taxonomy archive pages. **Decided in Phase 6**
(see `PHASE_6_ARCHIVE_URL_DECISION.md`): all 20 get a 301 to their
closest matching hub — every one has 0 clicks despite having
impressions, and a stronger, curated hub replacement already exists
for every topic. Proposed redirects are documented as `pending` rows
in `REDIRECTS.md`, not yet implemented (no hosting config chosen yet).

| Archive URL | Type | Clicks | Impressions | Redirect target (Phase 6) |
|---|---|---:|---:|---|
| `/category/movements/` | category | 0 | 43 | `/church-planting-movements/` |
| `/category/four-fields-training/` | category | 0 | 18 | `/four-fields/` |
| `/category/entry-strategies/` | category | 0 | 2 | `/share-the-gospel/` |
| `/category/discipleship-tools/` | category | 0 | 2 | `/disciple-making/` |
| `/category/missionary-strategies/` | category | 0 | 1 | `/strategy-coordinator/` |
| `/category/spiritual-gifts/` | category | 0 | 1 | `/jesus-and-the-twelve/` |
| `/category/great-commission/` | category | 0 | 1 | `/share-the-gospel/` |
| `/tag/apostle/` | tag | 0 | 25 | `/jesus-and-the-twelve/` |
| `/tag/conversation-quadrant/` | tag | 0 | 10 | `/share-the-gospel/` |
| `/tag/disciple-making-movement/` | tag | 0 | 9 | `/church-planting-movements/` |
| `/tag/sustainable-disciple-making/` | tag | 0 | 7 | `/disciple-making/` |
| `/tag/oikos-mapping/` | tag | 0 | 7 | `/share-the-gospel/` |
| `/tag/disciple-making/` | tag | 0 | 3 | `/disciple-making/` |
| `/tag/community/` | tag | 0 | 2 | `/simple-church/` |
| `/tag/apostolic/` | tag | 0 | 2 | `/jesus-and-the-twelve/` |
| `/tag/hybrid-model/` | tag | 0 | 1 | `/simple-church/` |
| `/tag/revival/` | tag | 0 | 1 | `/church-planting-movements/` |
| `/tag/prayer-walking/` | tag | 0 | 1 | `/prayer/` |
| `/tag/precision-harvesting/` | tag | 0 | 1 | `/share-the-gospel/` |
| `/tag/15-second-testimony-examples/` | tag | 0 | 1 | `/testimony/` |

**Author and date archive URLs:** checked directly against the GSC
export, the live sitemap index, and the WordPress export — zero
presence in any of the three. No rows tracked here since there's no
confirmed URL; default recommendation is allow 404/410 once live
(see `PHASE_6_ARCHIVE_URL_DECISION.md` sections 3-4).

## Media URLs

See `MEDIA_URLS_TO_PRESERVE.md` for the full list (24 with confirmed
Search Console impressions, plus ~39 more referenced directly by the 5
migrated pages).

## Anchor-fragment "URLs" in GSC (not real distinct pages)

53 rows in the Pages.csv export are the same page with a `#Section_Name`
fragment appended (from WordPress heading-jump navigation, e.g.
`/the-high-price-of-discipleship-.../#Section_1_The_Cost_of_Discipleship`).
These aren't separate URLs — Google is just recording impressions for
in-page anchors. No action needed beyond what the base page already
requires; not tracked as separate inventory rows.

## New pages not in this inventory (by design)

11 hub pages are new information architecture, not migrated WordPress
URLs: `/jesus-and-the-twelve/`, `/testimony/`, `/share-the-gospel/`,
`/3-circles-guide/` (deliberately not `/3-circles/` — see
`PROTECTED_URLS.md` for why), `/stories-of-hope/`, `/prayer/`,
`/disciple-making/`, `/simple-church/`, `/four-fields/`,
`/church-planting-movements/`, `/strategy-coordinator/`. All 11 were
checked against the real 122-page inventory above and confirmed
non-colliding (except `/3-circles/`, which was caught and fixed).

## Still not covered

The Search Console export (179 rows) and WordPress export (122
published posts/pages) together account for far more than the original
45-URL known list, but the brief mentioned "at least 179 pages with
performance data" as a 3-month snapshot — a longer date range or a full
crawl could still surface more. Treat this inventory as comprehensive
for now, not infallible.
