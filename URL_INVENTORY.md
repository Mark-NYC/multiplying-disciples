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
out to have 7 incorrect slugs. See `docs/archive/PROTECTED_URLS.md` for the corrected
list of what the brief got wrong.

## Protected URLs (absorbed from docs/archive/PROTECTED_URLS.md, 2026-07-12)

Every tier-1 and tier-2 URL in the table below is **protected**: do
not rename, merge, or heavily rewrite these pages before launch
without checking GSC first. All 12 tier-1 and 22 tier-2 URLs were
migrated at their exact paths and audited (Phase 5); the full
verification record is archived at docs/archive/PROTECTED_URLS.md and
docs/archive/PHASE_5_PROTECTED_URL_AUDIT.md.

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
Phase 1/2 + 7 from Phase 3 — see `docs/archive/PHASE_3_TIER_1_BATCH.md`). 0 tier-1
pages remain. Tier-2 (22 URLs) and below are Phase 4+ work.

**Phase 4 status:** Batches 1-4 of Tier 2 are migrated — 22 of 22
tier-2 URLs, 100% complete (see `docs/archive/PHASE_4_TIER_2_BATCH_PLAN.md`). Batch 1: `/5-proven-
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
content type; see `docs/archive/PHASE_4_TIER_2_BATCH_PLAN.md` for the layout
decision and media findings). 0 tier-2 URLs remain.

**Phase 5 status:** full protected URL audit completed across all 34
migrated tier-1/tier-2 URLs — see `docs/archive/PHASE_5_PROTECTED_URL_AUDIT.md`.
Found and fixed 2 real bugs (a duplicate H1, 3 stray absolute internal
links). All 34 URLs re-confirmed preserved at their exact original
path with correct canonical, no noindex, no guessed slugs, no hub
collisions. Sitemap confirmed an exact match to the 45 built pages.
1 known deferred media gap (`apostles-meaning`, 2 images) unchanged.
Next: Tier 3 (48 URLs) + the 40 "unknown"-tier URLs + the
category/tag archive URL question.

**Phase 6 status:** archive/URL-structure decision completed — see
`docs/archive/PHASE_6_ARCHIVE_URL_DECISION.md`. The 20 category/tag archive rows
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
and `docs/archive/MIGRATION_PLAN.md`. A real Astro index page, not a WordPress
content migration (there was no body content to port). Lists all 33
migrated articles (sorted by tier, then by best-available date),
shows each article's title/description/hub/date, and links to all 11
hubs for topic browsing. `/blog/` status flipped from `not-migrated`
to `published` above. 46 pages now build clean (was 45). Site nav's
`/blog/` links (present on every page) now resolve instead of 404ing.

**Phase 7B Batch 1 status:** first Tier 3 batch migrated — 7 pages,
see `docs/archive/PHASE_7B_TIER_3_BATCH_1.md`. Led with `/movement-resources/` (real
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
PDFs); see `docs/archive/PHASE_7B_TIER_3_BATCH_1.md` and
`MEDIA_ACQUISITION_CHECKLIST.md` for the full breakdown. 53 pages now
build clean (was 46). 41 tier-3 URLs remain (48 − 7).

**Phase 7B Batch 2 status:** second Tier 3 batch migrated — 7 pages,
see `docs/archive/PHASE_7B_TIER_3_BATCH_2.md`. `/starter-tools/` (a header/footer
dual-nav-linked WordPress "page" that turned out to be a GenerateBlocks
resource/tool grid, not prose — migrated into the existing `articles`
collection + `ArticleLayout`, same page-type judgment call as
`/stickers/` in Phase 4 Batch 4, documented in the file's own
frontmatter notes), plus 6 articles:
`/royal-priest-strategy-explodes-disciple-making-movement-worldwide/`,
`/unlock-biblical-principles-for-multiplying-disciples/`,
`/5-insightful-keys-into-the-biblical-jesus/`,
`/missionary-verses-in-the-bible-reveal-gods-heart/`,
`/the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making/`,
and `/7-surprising-disciple-making-movement-examples/`. Adds 2 more
key-article slots to the Church Planting Movements hub (now 10),
1 slot each to Disciple Making, Share the Gospel, Four Fields, and
Jesus and the Twelve hubs. 11 files across 5 of these pages are
missing from supplied uploads (7 featured/og_images plus 4 inline
supporting images on `unlock-biblical-principles-for-multiplying-disciples`)
— all deferred, non-blocking; see `docs/archive/PHASE_7B_TIER_3_BATCH_2.md` and
`MEDIA_ACQUISITION_CHECKLIST.md` for the full breakdown. 60 pages now
build clean (was 53). 34 tier-3 URLs remain (41 − 7).

**Phase 7B Batch 3 status:** third Tier 3 batch migrated — 7 pages,
see `docs/archive/PHASE_7B_TIER_3_BATCH_3.md`. `/start-here/` (a near-duplicate of
`/starter-tools/`'s resource grid, plus unrelated podcast-theme
demo/placeholder content dropped as chrome — migrated into the
existing `articles` collection + `ArticleLayout`, same precedent as
`/starter-tools/` and `/stickers/`) and `/vision/` (the ministry's
core "No Place Left" vision statement — genuine prose, migrated into
the same collection, deliberately given no hub assignment so it
doesn't collide with any hub's own topic framing) both received
special inspection per this batch's instructions. Plus 5 articles:
`/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/`
(→ Disciple Making hub),
`/bible-passages-about-love-what-scripture-really-says/` (no hub — scripture
roundup),
`/breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy/`
and `/the-multiplier-mandate-revealed-from-genesis-to-revelation/`
(both → Church Planting Movements hub, now 12 slots), and
`/how-to-spot-a-lone-wolf-and-not-become-one/` (no hub — team/community
dynamics, no clean single-hub fit). 12 files across 5 of these pages
are missing from supplied uploads (8 featured/og_images, 1 hero image,
1 grid-image size variant substituted instead, 2 inline images) — all
deferred, non-blocking; see `docs/archive/PHASE_7B_TIER_3_BATCH_3.md` and
`MEDIA_ACQUISITION_CHECKLIST.md` for the full breakdown. 67 pages now
build clean (was 60). 27 tier-3 URLs remain (34 − 7).

**Phase 7B Batch 4 status:** fourth Tier 3 batch migrated — 7 pages,
see `docs/archive/PHASE_7B_TIER_3_BATCH_4.md`. `/beliefs-values/` (the ministry's
doctrinal statement, linked from `/vision/` — genuine prose, migrated
into the existing `articles` collection + `ArticleLayout`, deliberately
given no hub assignment) and `/privacy-policy/` (a standard legal
page — WordPress block-comment artifacts stripped from leaked `<h2>`
tags, 2 bare contact links completed as real `mailto:` links, no hub/
tool CTA/related_articles added) both received special inspection per
this batch's instructions. `/privacy-policy/` is also the first page
to use the new `exclude_from_blog: true` frontmatter field (added to
`src/content.config.ts` and filtered in `src/pages/blog/index.astro`)
so it doesn't appear in the `/blog/` article index. Plus 4 articles:
`/jesus-the-leader-examining-how-he-identified-trained-and-sent-leaders-in-the-gospel-of-mark/`
(→ Jesus and the Twelve hub),
`/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/`
(no hub — general leadership-diligence principle),
`/the-leadership-phase-everyone-skips-why-investment-matters/` (→
Church Planting Movements hub, now 13 slots),
`/discovering-the-disciple-meaning-a-life-changing-journey/` (→
Disciple Making hub), and
`/5-surprising-ways-to-attract-multiplying-leaders/` (→ Four Fields
hub). 8 files across 4 of these pages are missing from supplied
uploads (5 featured/og_images, 3 inline images on one page — a 4th
inline image on that same page is present under a slightly different
filename/month, kept), plus 1 unresolvable text-only PDF reference on
`/beliefs-values/` with no actual link in the export (not a broken
link, just an unlinked mention) — all deferred, non-blocking; see
`docs/archive/PHASE_7B_TIER_3_BATCH_4.md` and `MEDIA_ACQUISITION_CHECKLIST.md` for
the full breakdown. 74 pages now build clean (was 67). `/blog/` lists
60 articles (54 + 6 blog-eligible — `/privacy-policy/` correctly
excluded). 20 tier-3 URLs remain (27 − 7).

**Phase 7B Batch 5 status:** fifth Tier 3 batch migrated — 7 pages,
see `docs/archive/PHASE_7B_TIER_3_BATCH_5.md`. Batch list re-derived directly from
this file (not assumed from the prior batch's forward-looking note),
confirming all 7 recommended URLs were indeed the top 7 remaining
tier-3 rows by impressions. `/kingdom-ministry-training/` (a
5-module training/curriculum landing page, not blog prose — migrated
into the existing `articles` collection + `ArticleLayout`, no hub
assignment, `exclude_from_blog: true`) and `/the-four-fields-sticker-simple-2x2/`
(a single sticker-product page, same family as `/stickers/`'s child
products — no hub assignment, `exclude_from_blog: true`, since a bare
storefront listing doesn't read as blog content) both received the
page-type inspection this batch called for. Plus 5 articles:
`/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/`,
`/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church/`,
and `/content-vs-systems-the-game-changer-for-leadership-development/`
(all → Church Planting Movements hub, now 16 slots), and
`/unlock-the-power-of-friendly-accountability/` and
`/discover-the-game-changing-secrets-starfish-and-the-spirit-review/`
(both → Disciple Making hub). 8 files across 5 of these pages are
missing from supplied uploads (5 featured/og_images, 1 decorative
badge image, 1 checklist infographic, 1 product photo) — all
deferred, non-blocking; see `docs/archive/PHASE_7B_TIER_3_BATCH_5.md` and
`MEDIA_ACQUISITION_CHECKLIST.md` for the full breakdown. 81 pages now
build clean (was 74). `/blog/` lists 65 articles (60 + 5 blog-eligible
— `/kingdom-ministry-training/` and `/the-four-fields-sticker-simple-2x2/`
correctly excluded via `exclude_from_blog`). 13 tier-3 URLs remain
(20 − 7).

**Phase 7B Batch 6 status:** sixth Tier 3 batch migrated — 7 pages,
see `docs/archive/PHASE_7B_TIER_3_BATCH_6.md`. Batch list re-derived directly from
this file, confirming all 7 recommended URLs were indeed the top 7
remaining tier-3 rows by impressions (re-derivation also caught that
the actual remaining-tier-3 count was 12, not the 13 carried forward
in the prior batch's note — a minor count discrepancy, not a selection
error). `/contact-us/` (a page, not an article) received the special
inspection this batch called for: its Brevo/Sendinblue subscription
form could not be migrated (the Astro project has no form-handling
infrastructure), so it was replaced with a plain
`mailto:contact@multiplyingdisciples.us` fallback (same address used
on `/privacy-policy/` in Batch 4) and documented in the page's own
frontmatter notes; no hub, no tool CTA, no related_articles, and
`exclude_from_blog: true` (same reasoning as `/privacy-policy/`). Plus
6 articles: `/the-3-core-habits-of-a-disciple/` → Disciple Making hub;
`/filtering-unlock-this-essential-for-disciple-making-movements/`,
`/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/`,
`/go-slow-to-go-fast-could-transform-your-leadership-pipeline/`,
`/start-strengthen-sustain-core-insights-on-building-lasting-ministry/`,
and `/next-gen-local-owners-building-beachheads-of-the-kingdom/` → all
5 to Church Planting Movements hub (now 21 slots). 5 files across 3 of
these pages are missing from supplied uploads (2 featured/og_images, 3
inline supporting images on one page) — all deferred, non-blocking;
see `docs/archive/PHASE_7B_TIER_3_BATCH_6.md` and `MEDIA_ACQUISITION_CHECKLIST.md`
for the full breakdown. 88 pages now build clean (was 81). `/blog/`
lists 71 articles (65 + 6 blog-eligible — `/contact-us/` correctly
excluded via `exclude_from_blog`). 5 tier-3 URLs remain (12 − 7).

**Phase 7B Batch 7 status (final Tier 3 batch):** the seventh and
final Tier 3 batch migrated — the remaining 5 pages, see
`docs/archive/PHASE_7B_TIER_3_BATCH_7.md`. `/action-plan/`, `/the-church-waffle-sticker/`,
and `/elementor-10714/` all received the special inspection this batch
called for: `/action-plan/` is a stale July-August 2023 cohort
coaching-plan landing page (4-week checkpoint structure preserved as
plain text since its `/week-1/`-`/week-4/` links are not in this
inventory; genuine working links — the training PDF and 4 real
JotForm checkpoint URLs — were kept; empty `href=""`/`href="#"`
placeholder buttons already broken in the export were dropped, not
replaced with invented destinations); no hub,
`exclude_from_blog: true`. `/the-church-waffle-sticker/` is a single
sticker-product page in the `/stickers/` family (same treatment as
`/the-four-fields-sticker-simple-2x2/` in Batch 5); no hub,
`exclude_from_blog: true`. `/elementor-10714/` is an orphaned
"Your seat is saved!" confirmation page for a specific, already-past
Zoom training — migrated minimally as a documented
legacy-preservation page (URL preserved, not redirected or 404'd, per
instruction), no hub, `exclude_from_blog: true`. `/4-responses-to-the-gospel/`
is genuine resource content (a "12 Practice Church Circle" Google
Slides deck, same Acts 2:36-47 diagnostic family as the already-migrated
`/movement-resources/12-practice-church-circle/`) — assigned to the
**Simple Church** hub and included in `/blog/`.
`/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/`
(a real article on the evangelist's role in disciple making movements)
was added to the **Church Planting Movements** hub (now 22 slots) and
included in `/blog/`. 9 files across 4 of these 5 pages are missing
from supplied uploads (2 featured/og_images, 1 decorative brandmark on
the legacy page, 4 decorative images on the cohort page, 2 screenshot
previews on the resource page) — all deferred, non-blocking; see
`docs/archive/PHASE_7B_TIER_3_BATCH_7.md` and `MEDIA_ACQUISITION_CHECKLIST.md` for
the full breakdown. 93 pages now build clean (was 88). `/blog/` lists
73 articles (71 + 2 blog-eligible — `/action-plan/`,
`/the-church-waffle-sticker/`, and `/elementor-10714/` all correctly
excluded via `exclude_from_blog`). **Zero Tier 3 URLs remain
not-migrated — Tier 3 is now 100% migrated (48 of 48 original Tier 3
URLs accounted for).**

**Phase 8 full-site audit status:** ran a comprehensive audit of all
93 generated pages against this inventory, `docs/archive/PROTECTED_URLS.md`, and
every prior phase doc — see `docs/archive/PHASE_8_FULL_SITE_AUDIT.md` for the full
breakdown. Confirmed: all 81 `migrated` rows in the table below
generate correctly; the other 12 generated pages (11 hubs + `/blog/`)
are accounted for as documented new IA; 0 duplicate slugs, 0 hub/
article collisions, 0 slug-vs-`original_url` mismatches across all 91
content files; 0 SEO issues (title/description/canonical/H1/noindex)
across all 93 pages; `/blog/` and all 11 hub pages fully verified
(67 `key_articles` links, 11 `next_step` links, 0 broken). Found and
fixed 1 genuine bug: a broken image link on `/kingdom-ministry-training/`
caused by a Unicode space mismatch between the markdown reference and
the actual filename (see `docs/archive/PHASE_8_FULL_SITE_AUDIT.md` §7). All 20
proposed archive redirects in `REDIRECTS.md` reconfirmed valid and
still unimplemented. No missed/undiscovered URLs were found requiring
migration.

**Phase 9 status:** resolved the 6 real, confirmed-but-unmigrated URLs
flagged as a Phase 8 risk — see
`docs/archive/PHASE_9_LINK_TARGETS_AND_HUB_STATUS.md`. Migrated 4 as real content:
`/free-training/` (an evergreen lead-magnet landing page, the
most-linked of the 6), `/3-circles/` and `/4-1-1/` (real Google
Slides tool pages), and both real `/movement-resources/` children
(`/movement-resources/strategy-coordinator/`,
`/movement-resources/4-fields-toolbox/`). Left `/4-fields/`
intentionally not migrated — its actual WordPress content is a stale,
superseded "12 Practice Church Circle" duplicate mislabeled under a
Four-Fields-named slug, not real Four Fields content; the 3 internal
links that pointed to it (in `/start-here/` and `/starter-tools/`)
were redirected in the source content itself to the real
`/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/`
article instead, not left broken and not fabricated as a new page. All
33 internal links that pointed to the 6 targets now resolve (30 to the
5 newly migrated pages, 3 to the replacement Four Fields article) — 0
broken internal links remain sitewide. Also reviewed all 11 hub pages
and promoted every one from `status: migrated-draft` to `status:
published` (all structurally verified: generate correctly, every
`key_articles`/`next_step` link resolves). 98 pages now build clean
(was 93).

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
| `/starter-tools/` | bespoke tutorial page (`src/pages/starter-tools.astro`; was a migrated resource-grid article, rebuilt as the "Start Making Disciples" beginner tutorial — same URL, hand-indexed for search) | published | 0 | 78 | tier-3 |
| `/what-are-disciple-making-movements-5-examples-from-around-the-world/` | article | migrated | 1 | 74 | tier-3 |
| `/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/` | article | migrated | 0 | 71 | tier-3 |
| `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/` | article | migrated | 0 | 66 | tier-3 |
| `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | article | migrated | 1 | 66 | tier-3 |
| `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/` | article | migrated | 0 | 55 | tier-3 |
| `/unlock-biblical-principles-for-multiplying-disciples/` | article | migrated | 1 | 52 | tier-3 |
| `/5-insightful-keys-into-the-biblical-jesus/` | article | migrated | 0 | 49 | tier-3 |
| `/missionary-verses-in-the-bible-reveal-gods-heart/` | article | migrated | 0 | 48 | tier-3 |
| `/the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making/` | article | 301 → `/four-fields-of-kingdom-growth/` | 0 | 46 | tier-3 |
| `/7-surprising-disciple-making-movement-examples/` | article | migrated | 1 | 43 | tier-3 |
| `/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/` | article | migrated | 0 | 42 | tier-3 |
| `/bible-passages-about-love-what-scripture-really-says/` | article | migrated | 0 | 41 | tier-3 |
| `/breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy/` | article | migrated | 0 | 33 | tier-3 |
| `/the-multiplier-mandate-revealed-from-genesis-to-revelation/` | article | migrated | 0 | 33 | tier-3 |
| `/start-here/` | page | migrated | 0 | 32 | tier-3 |
| `/vision/` | page | migrated | 1 | 30 | tier-3 |
| `/how-to-spot-a-lone-wolf-and-not-become-one/` | article | migrated | 0 | 30 | tier-3 |
| `/jesus-the-leader-examining-how-he-identified-trained-and-sent-leaders-in-the-gospel-of-mark/` | article | migrated | 0 | 29 | tier-3 |
| `/beliefs-values/` | page | migrated | 0 | 26 | tier-3 |
| `/privacy-policy/` | page | migrated | 0 | 25 | tier-3 |
| `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | article | migrated | 1 | 24 | tier-3 |
| `/movement-resources/` | page | migrated | 0 | 22 | tier-3 |
| `/the-leadership-phase-everyone-skips-why-investment-matters/` | article | migrated | 2 | 21 | tier-3 |
| `/discovering-the-disciple-meaning-a-life-changing-journey/` | article | migrated | 0 | 20 | tier-3 |
| `/5-surprising-ways-to-attract-multiplying-leaders/` | article | migrated | 2 | 20 | tier-3 |
| `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | article | migrated | 0 | 20 | tier-3 |
| `/kingdom-ministry-training/` | page | migrated | 0 | 19 | tier-3 |
| `/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church/` | article | migrated | 0 | 19 | tier-3 |
| `/content-vs-systems-the-game-changer-for-leadership-development/` | article | migrated | 0 | 18 | tier-3 |
| `/unlock-the-power-of-friendly-accountability/` | article | migrated | 0 | 17 | tier-3 |
| `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | article | migrated | 1 | 17 | tier-3 |
| `/the-four-fields-sticker-simple-2x2/` | page | migrated | 3 | 14 | tier-3 |
| `/filtering-unlock-this-essential-for-disciple-making-movements/` | article | migrated | 0 | 10 | tier-3 |
| `/the-3-core-habits-of-a-disciple/` | article | migrated | 0 | 10 | tier-3 |
| `/contact-us/` | page | migrated | 0 | 7 | tier-3 |
| `/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/` | article | migrated | 0 | 7 | tier-3 |
| `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | article | migrated | 0 | 7 | tier-3 |
| `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | article | migrated | 0 | 5 | tier-3 |
| `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | article | migrated | 0 | 4 | tier-3 |
| `/action-plan/` | page | migrated | 0 | 2 | tier-3 |
| `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/` | article | migrated | 0 | 2 | tier-3 |
| `/4-responses-to-the-gospel/` | page | migrated | 0 | 1 | tier-3 |
| `/elementor-10714/` | page | migrated | 0 | 1 | tier-3 |
| `/the-church-waffle-sticker/` | page | migrated | 0 | 1 | tier-3 |
| `/free-training/` | page | migrated | 0 | 0 | unknown |
| `/about-us/` | page | not-migrated | 0 | 0 | unknown |
| `/get-coaching/` | page | not-migrated | 0 | 0 | unknown |
| `/4-1-1/` | page | migrated | 0 | 0 | unknown |
| `/3-circles/` | page (real tool, see docs/archive/PROTECTED_URLS.md hub collision note) | migrated | 0 | 0 | unknown |
| `/4-fields/` | page (stale/superseded duplicate content — see docs/archive/PHASE_9_LINK_TARGETS_AND_HUB_STATUS.md, intentionally not migrated) | not-migrated | 0 | 0 | unknown |
| `/movement-resources/strategy-coordinator/` | page | migrated | 0 | 0 | unknown |
| `/movement-resources/4-fields-toolbox/` | page | migrated | 0 | 0 | unknown |
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
(see `docs/archive/PHASE_6_ARCHIVE_URL_DECISION.md`): all 20 get a 301 to their
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
(see `docs/archive/PHASE_6_ARCHIVE_URL_DECISION.md` sections 3-4).

## Media URLs

See `docs/archive/MEDIA_URLS_TO_PRESERVE.md` for the full list (24 with confirmed
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
`docs/archive/PROTECTED_URLS.md` for why), `/stories-of-hope/`, `/prayer/`,
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
