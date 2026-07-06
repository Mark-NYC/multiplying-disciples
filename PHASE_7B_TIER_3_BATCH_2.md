# Phase 7B — Tier 3 Batch 2

Second Tier 3 batch: the 7 recommended URLs, led by a careful inspection
of `/starter-tools/` per the special caution in this phase's
instructions. All 7 verified against `URL_INVENTORY.md` and the
WordPress export XML before migration.

## Selected URLs

| # | URL | Clicks | Impressions | Status | Likely hub | Media deps | Risk | Why Batch 2 |
|---|---|---:|---:|---|---|---|---|---|
| 1 | `/starter-tools/` | 0 | 78 | not-migrated | none (cross-cutting resource page) | 2 inline card thumbnails missing, 1 decorative hero background missing | **Medium** | Linked from header AND footer nav on every page — a live dual-nav-linked 404 today. Confirmed via the WordPress export to be a resource/tool grid page, not prose. |
| 2 | `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/` | 0 | 55 | not-migrated | church-planting-movements | None missing — all 4 media files present | **Low** | Highest-impression remaining tier-3 article. Clean modern Gutenberg content. |
| 3 | `/unlock-biblical-principles-for-multiplying-disciples/` | 1 | 52 | not-migrated | disciple-making | 1 featured + 4 inline local images missing (2 external pexels.com hotlinks unaffected) | **Medium** | Already linked from the Batch 1 `disciple-making-resources-for-churches-that-will-multiply` article — completes a reciprocal link. |
| 4 | `/5-insightful-keys-into-the-biblical-jesus/` | 0 | 49 | not-migrated | jesus-and-the-twelve | 1 featured image missing, no inline images | **Low** | Short, clean article; fits the Jesus and the Twelve hub. |
| 5 | `/missionary-verses-in-the-bible-reveal-gods-heart/` | 0 | 48 | not-migrated | share-the-gospel | None missing — featured image present, no inline images | **Medium** | Large content (12 sections, many tables) but zero media risk. |
| 6 | `/the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making/` | 0 | 46 | not-migrated | four-fields | 1 featured image missing (only a 100x100 thumbnail crop exists) | **Low** | Explicitly describes the Four Fields model by name — strong hub fit. |
| 7 | `/7-surprising-disciple-making-movement-examples/` | 1 | 43 | not-migrated | church-planting-movements | 1 featured image missing, inline images are external pexels.com hotlinks (unaffected) | **Low** | Directly parallels the Batch 1 "5 examples" article; rounds out the CPM hub's real-world-examples content. |

## Special inspection: `/starter-tools/`

Per this phase's explicit instruction, `/starter-tools/` was inspected
closely before any migration decision.

**Confirmed via the WordPress export:** `post_id: 2367`, `post_type:
page`, `status: publish`. The content is **not prose** — it's a
GenerateBlocks resource grid: a hero ("Starter Tools" / "Learn to make
disciples using simple tools"), a "Start here" intro (duplicated
verbatim across two responsive containers — one hidden on mobile, one
hidden on desktop/tablet, same GenerateBlocks responsive-duplicate
pattern seen on `/stickers/` in Phase 4 — consolidated to one clean
copy), an 11-card tool/resource grid (image + label + external/internal
"VIEW" link per card), and a closing "Get Training" CTA linking to
`/free-training/`.

**Classification decision: migrated into the existing `articles`
collection using the existing `ArticleLayout`** — the same successful
precedent as `/stickers/` in Phase 4 Batch 4. Reasoning:

- The content is fundamentally a **list of resources with images and
  links**, which Markdown (headings + images + links) already
  represents cleanly — no interactivity is needed, since "viewing" a
  tool just means following a link.
- `ArticleLayout` renders a single H1, a `<slot>` for body content, and
  the standard `related_articles`/`related_tools` mechanisms — nothing
  about this page's content requires a different template.
- No new content type or custom layout was needed, consistent with
  "do not force it into ArticleLayout if the content needs a simple
  tool/resource layout" — here, the existing layout genuinely does fit
  cleanly, so a new layout would be unjustified complexity for a
  one-page use case (same judgment call already documented for
  `/stickers/`).
- No hub assignment: the page links out to many different topics
  (3 Circles, 4-1-1, Four Fields, Church Waffle, Three Thirds, Stories
  of Hope) rather than belonging to one — same "no single clean fit"
  reasoning as `/stickers/` and `/movement-resources/`.

**Links confirmed against `URL_INVENTORY.md` before use:** `/3-circles/`
(real, tracked, unknown tier), `/4-1-1/` (real, tracked, unknown tier),
`/4-responses-to-the-gospel/` (real, tracked, tier-3, 1 impression),
`/4-fields/` (real, tracked, unknown tier — **not** the same as this
site's `/four-fields/` hub, confirmed distinct strings, no collision),
`/free-training/` (real, tracked, unknown tier). `/movement-resources/
7-stories-of-hope-complete-facilitation-guide/`, `/three-thirds/`, and
`/movement-resources/12-practice-church-circle/` are already migrated.
`https://www.churchwaffle.com/` is a legitimate external site, left
untouched.

## Pre-migration verification

**1. Confirmed in `URL_INVENTORY.md`:** all 7 rows exist exactly as
listed above.

**2. Confirmed slug + type via WordPress export XML:**

| Slug | `post_id` | `post_type` | `status` | `link` matches inventory? |
|---|---|---|---|---|
| `starter-tools` | 2367 | page | publish | Yes, exact |
| `royal-priest-strategy-explodes-disciple-making-movement-worldwide` | 10761 | post | publish | Yes, exact |
| `unlock-biblical-principles-for-multiplying-disciples` | 9011 | post | publish | Yes, exact |
| `5-insightful-keys-into-the-biblical-jesus` | 7397 | post | publish | Yes, exact |
| `missionary-verses-in-the-bible-reveal-gods-heart` | 13611 | post | publish | Yes, exact |
| `the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making` | 12836 | post | publish | Yes, exact |
| `7-surprising-disciple-making-movement-examples` | 8184 | post | publish | Yes, exact |

**3. No hub slug/path collision:** none of the 7 slugs match any of
the 11 existing hub slugs. `/starter-tools/`'s own internal links
were individually checked (see above) — `/4-fields/` is confirmed a
distinct, real, separate WordPress URL from this site's `/four-fields/`
hub (different strings, no collision, both already tracked
independently in `URL_INVENTORY.md`).

**4. Media dependencies confirmed** — see below.

## Media findings

11 distinct files across 5 of these 7 pages are genuinely missing
(checked against `public/wp-content/uploads/` directly, including a
search for filename/size variants before concluding "missing"). None
are above-the-fold hero-only necessities or direct-access PDFs, so
none of this blocks the batch:

| File | Referenced by | Role | Present? |
|---|---|---|---|
| `2023/04/EmbeddedImage-2-300x254.png` | starter-tools | Inline card thumbnail (Three Thirds) | **No** |
| `2023/04/EmbeddedImage-1-300x254.png` | starter-tools | Inline card thumbnail (4 Fields) | **No** |
| `2023/02/AdobeStock_358343642-copy.jpg` | starter-tools | Decorative CTA-section background | **No** (5 size variants exist — 150x150 up to 768x512 — but not used; background dropped as chrome anyway, no CSS background-image reproduced) |
| `2023/06/pexels-leonardo-dourado-13011294-1.jpg` | unlock-biblical-principles | Featured/og_image | **No** |
| `2023/05/lightstock_69771_xsmall_jared_callais.jpeg` | unlock-biblical-principles | Inline image | **No** |
| `2023/05/pexels-photo-4400997-e1686571140942.jpeg` | unlock-biblical-principles | Inline image | **No** |
| `2023/05/pexels-photo-14933981.jpeg` | unlock-biblical-principles | Inline image | **No** |
| `2023/06/pexels-tara-winstead-8383460-1024x683.jpg` | unlock-biblical-principles | Inline image with figcaption | **No** |
| `2023/04/pexels-photo-8383489.jpeg` | 5-insightful-keys-into-the-biblical-jesus | Featured/og_image | **No** |
| `2025/02/prayer-walking-in-city.webp` | the-clear-pathway-of-jesus | Featured/og_image | **No** (only a `-100x100` thumbnail crop exists) |
| `2023/05/B89DECCC-91D3-4DA4-8CCD-F1482F0DB33F.webp` | 7-surprising-disciple-making-movement-examples | Featured/og_image | **No** |

Present and confirmed: `royal-priest-strategy-explodes-disciple-
making-movement-worldwide` (all 4 media files present — 1 featured +
3 inline, all under `2025/01/`) and `missionary-verses-in-the-bible-
reveal-gods-heart` (featured image present, no inline images) have
**zero** media gaps.

Two images in `unlock-biblical-principles-for-multiplying-disciples`
are hotlinked directly to `images.pexels.com` (not local
`wp-content` uploads) — these are external and unaffected by any
local media gap; preserved exactly as-is, consistent with the rule
that intentional external links don't need local hosting.

**Resolution:** all 5 affected pages lose their `og_image` only, or
in `unlock-biblical-principles`'s case also lose a few decorative
inline images while keeping the 2 external pexels.com figures and all
surrounding prose intact. `starter-tools` loses 2 of its 11 card
thumbnails (the cards' labels and links remain, just without an
image) and drops a decorative CTA-section background entirely (no
loss of real content — it was never more than a background photo).
None of this blocks the batch.

## Content notes (chrome removed, same discipline as every prior batch)

- `starter-tools`: consolidated 2 duplicate responsive "Start here"
  containers (desktop/tablet vs. mobile, identical text) into one.
  Converted the GenerateBlocks image-grid cards into a plain Markdown
  list of resource cards (image + label + link). Preserved all 11
  cards and the closing "Get Training" CTA. Fixed 1 absolute internal
  link (`/three-thirds` missing its trailing slash) to `/three-thirds/`.
- `royal-priest-strategy-explodes-disciple-making-movement-worldwide`:
  converted several `wp:table` blocks to Markdown tables, and
  converted 10 individually-numbered GenerateBlocks "1" through "10"
  boxes (each a Bible-referenced characteristic) into one clean
  numbered Markdown list. Removed 1 trailing reusable-block shortcode
  (`ref:11750`).
- `unlock-biblical-principles-for-multiplying-disciples`: removed a
  junk embedded HTML FAQ placeholder block, 4 duplicate pull-quote-
  style headings that repeated adjacent paragraph text verbatim, the
  reusable "Are you in? / Start Here. / Get Started" CTA block, and a
  stray Elementor `<style>` block. Converted the Spotify episode embed
  to a plain link. Fixed 1 broken internal link
  (`/podcast/from-addition-to-multiplication-broken-image-broken-
  lives/`, not a real tracked URL) by dropping the dead hyperlink and
  keeping the plain text (no confirmed real destination existed to
  redirect it to, unlike a similar case in Batch 1).
- `5-insightful-keys-into-the-biblical-jesus`: removed 2 duplicate
  pull-quote headings, the "Are you in?" CTA block, and a leading
  stray `<style>` block. **Normalized headings safely**: 3 question
  headings ("What Did Jesus Preach About the Most?", "What are Jesus'
  Two Ways of Teaching?", "What Was The Reason Jesus Came to Earth?")
  were plain `<p>` tags in the source despite matching the exact
  question-heading format of their sibling `<h3>`/`<strong>` headings
  — promoted to proper heading levels for a consistent, crawlable
  heading hierarchy. This is a structural fix, not a content rewrite.
- `missionary-verses-in-the-bible-reveal-gods-heart`: converted 1
  large custom-styled HTML/CSS infographic block ("Father's Heart
  Study") and 11 raw-HTML `<table>` blocks into plain Markdown tables,
  preserving every data point while dropping the decorative custom
  CSS (gradients, colored table cells, responsive breakpoints) per
  the "no fancy JS/decorative HTML shells" discipline. All 12 numbered
  sections and their content preserved in full — this is a long,
  keyword-repetitive but genuinely real article; preserved close to
  verbatim despite its repetitive SEO-style phrasing, per "do not
  rewrite heavily."
- `the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making`:
  converted an Apple Podcasts embed iframe to a plain link. Removed 1
  trailing reusable-block shortcode (`ref:12760`) and its surrounding
  spacer blocks. Otherwise clean, well-structured content — no
  rewriting needed.
- `7-surprising-disciple-making-movement-examples`: removed 2 junk
  embedded HTML FAQ/style placeholder wrappers, 1 duplicate pull-quote
  heading, the "Are you in?" CTA block, and a stray `<style>` block.
  Converted 7 raw-HTML table wrappers (one per country example: China,
  India, Iran, Ethiopia, Southeast Asia, Sub-Saharan Africa, Latin
  America) down to plain Markdown tables, stripping the redundant
  `<html><head><style>...</style></head><body>` shell each was
  wrapped in. All 7 country case studies and their external
  pexels.com images preserved in full.

None of these changes are heavy rewrites — all are chrome removal,
raw-HTML-table-to-Markdown-table conversion, embed-to-link conversion,
one dead-link removal, and one heading-hierarchy normalization,
consistent with every prior phase's discipline.
