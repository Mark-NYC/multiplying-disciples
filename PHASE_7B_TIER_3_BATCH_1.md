# Phase 7B — Tier 3 Batch 1

First Tier 3 batch: 7 pages, led by `/movement-resources/` (a real
content page, not an archive — see `PHASE_6_ARCHIVE_URL_DECISION.md`),
followed by the two named strong candidates and 4 more selected by
impressions + hub completion. All 7 verified against `URL_INVENTORY.md`
and the WordPress export XML before migration.

## Selected URLs

| # | URL | Clicks | Impressions | Status | Likely hub | Media deps | Risk | Why Batch 1 |
|---|---|---:|---:|---|---|---|---|---|
| 1 | `/movement-resources/` | 0 | 22 | not-migrated | none (see notes) | None — pure external-link content, no images | **Low** | Must lead the batch per explicit instruction. Real, distinct content (confirmed Phase 6), not an archive/index. Establishes the section's own page alongside its 2 already-migrated children. |
| 2 | `/disciple-making-resources-for-churches-that-will-multiply/` | 1 | 92 | not-migrated | disciple-making | Featured image missing; 1 decorative inline icon missing; 1 PDF already present | **Medium** | Highest tier-3 impressions. Already linked from primary site nav ("Disciple Making") on every page — currently a live nav-linked 404. Already reserved as the Disciple Making hub's `next_step` target and 5th `key_articles` slot. |
| 3 | `/under-the-hood-of-disciple-making-movements/` | 0 | 86 | not-migrated | church-planting-movements | Featured image missing; 2 of 4 inline images missing (deferred, non-blocking) | **Medium** | Second-highest tier-3 impressions. Named strong candidate. Fills a reserved Church Planting Movements hub slot. |
| 4 | `/what-are-disciple-making-movements-5-examples-from-around-the-world/` | 1 | 74 | not-migrated | church-planting-movements | Featured image missing (deferred); no inline images | **Low** | Fills the CPM hub's reserved "5 examples" slot. Clean modern Gutenberg content, easy migration. |
| 5 | `/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/` | 0 | 71 | not-migrated | church-planting-movements | Featured image missing (deferred); no inline images | **Low** | Fills the CPM hub's reserved "equipping your church" slot. Short, clean article. |
| 6 | `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/` | 0 | 66 | not-migrated | share-the-gospel | Featured image missing (deferred); no inline images | **Low** | Fills the Share the Gospel hub's reserved "finding persons of peace" slot (its last open key-article slot). |
| 7 | `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | 1 | 66 | not-migrated | church-planting-movements | Featured image present, no other media | **Low** | Fills the CPM hub's reserved "breaking down barriers" slot — the 4th and final CPM slot, **completing that hub 8/8**. |

Migrating rows 3, 4, 5, and 7 alongside the two named candidates
completes the **Church Planting Movements hub fully (8 of 8
key-article slots)** and fills the **Share the Gospel hub's last open
slot**. `/disciple-making-resources-for-churches-that-will-multiply/`
fills the **Disciple Making hub's** reserved slot and its `next_step`
target. This is an unusually coherent batch: every
non-`/movement-resources/` page already had a pre-reserved hub slot
from earlier phases' `key_articles`/`next_step` fields (visible today
as "(coming soon)" links), confirmed by reading each hub file
directly before selecting.

## Pre-migration verification

**1. Confirmed in `URL_INVENTORY.md`:** all 7 rows exist exactly as
listed above (grepped directly, not assumed).

**2. Confirmed slug via WordPress export XML** (queried
`multiplyingdisciples.WordPress.20260706.xml` directly for each
`post_name`):

| Slug | `post_id` | `post_type` | `status` | `link` matches inventory? |
|---|---|---|---|---|
| `movement-resources` | 2301 | page | publish | Yes, exact |
| `disciple-making-resources-for-churches-that-will-multiply` | 8445 | post | publish | Yes, exact |
| `under-the-hood-of-disciple-making-movements` | 7897 | post | publish | Yes, exact |
| `what-are-disciple-making-movements-5-examples-from-around-the-world` | 7021 | post | publish | Yes, exact |
| `equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training` | 6876 | post | publish | Yes, exact |
| `finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making` | 6859 | post | publish | Yes, exact |
| `breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements` | 6885 | post | publish | Yes, exact |

**3. No hub slug/path collision:** none of the 7 slugs above match
any of the 11 existing hub slugs (`/church-planting-movements/`,
`/disciple-making/`, `/four-fields/`, `/jesus-and-the-twelve/`,
`/prayer/`, `/share-the-gospel/`, `/simple-church/`, `/stories-of-
hope/`, `/strategy-coordinator/`, `/testimony/`, `/3-circles-guide/`),
and none collide with any already-migrated article slug (checked
against the full 44-slug list from Phase 5's audit).

**4. Media dependencies confirmed** (checked every referenced file
against `public/wp-content/uploads/` directly — see full table below).

## Media findings

8 files referenced across this batch are genuinely missing (not
present at any size on disk). None are above-the-fold hero-only
content or a direct-access PDF, so per the standing rule this is
**documented as deferred, not blocking**:

| File | Referenced by | Role | Present? |
|---|---|---|---|
| `2023/05/pexels-photo-8383470.jpeg` | disciple-making-resources | Featured/og_image | **No** |
| `2023/05/1.webp` (+ size variants) | disciple-making-resources | Decorative download-button icon | **No** (`1-1.webp` exists but is a different file, not a size variant of `1.webp`) |
| `2023/05/weds-night-discipleship__1608243288.jpeg` | under-the-hood | Featured/og_image | **No** |
| `2023/05/picture1-e1692189886892.jpeg` (+ 1024x389) | under-the-hood | Inline image with figcaption | **No** |
| `2023/05/Table-of-Math.jpeg` (+ 1024x986) | under-the-hood | Inline "Do the Math" illustration | **No** |
| `2023/04/19369-gettyimages-1097758946-morsaimagesjpeg.jpeg` | 5-examples | Featured/og_image | **No** |
| `2023/04/Untitled-design-2023-03-28T085102.000.webp` | equipping-your-church | Featured/og_image | **No** |
| `2023/04/Untitled-design-2023-03-12T170248.450.webp` | finding-persons-of-peace | Featured/og_image | **No** |

Present and confirmed:

| File | Referenced by | Role |
|---|---|---|
| `2023/05/Church-Waffle-English-112222-1.pdf` | disciple-making-resources | Direct-access PDF download (already tracked from an earlier phase) |
| `2023/05/Screen-Shot-2023-08-16-at-8.47.48-AM-1024x499.png` | under-the-hood | Inline image (the exact size the original content uses is present, even though the untouched full-size original is not) |
| `2023/04/multiplication.jpeg` | breaking-down-barriers | Featured/og_image (already used as another migrated page's og_image too — no conflict, shared source photo) |

**Resolution:** 5 pages lose their `og_image` only (omitted, same
documented pattern as `breakthrough-guide-for-a-modern-day-disciple`
and `/stickers/` in earlier phases) — none of these 5 has any inline
body image affected. `under-the-hood-of-disciple-making-movements`
additionally has 2 inline supporting images dropped from the body
(the "picture1" figure and the "Table-of-Math" figure) since their
files don't exist — the surrounding prose stays intact and coherent
without them; only the illustrative images are omitted. Nothing here
is a hero/above-the-fold necessity or a direct PDF, so none of this
blocks the batch. `/movement-resources/` needs no media at all (pure
curated external-link content, already confirmed in Phase 6).

## Content notes (chrome to remove, same discipline as prior phases)

- `disciple-making-resources-for-churches-that-will-multiply`: remove
  a bizarre embedded junk `<html><head><title>Example Site - FAQ
  </title>...` placeholder block (a one-off export artifact, not real
  content), 2 duplicate pull-quote-style H4 headings that repeat
  adjacent paragraph text verbatim, stray `<style>` blocks, and the
  reusable "Are you in? / Start Here. / Get Started" promotional CTA
  block (same generic reusable chrome removed elsewhere — appears
  verbatim across 3 of this batch's pages). Convert the Spotify embed
  to a plain link. Fix 1 broken internal link
  (`/podcast/gospel-share-your-story-in-15-seconds/`, not a real
  tracked URL) to point at the real, confirmed
  `/15-second-testimony-examples-ignite-your-faith/` article instead.
  Convert 2 absolute internal links (`/3-circles/`, `/starter-tools/`)
  to relative.
- `under-the-hood-of-disciple-making-movements`: remove the same
  reusable "Are you in?" CTA block, 2 duplicate pull-quote H4s, and
  stray `<style>` blocks. Convert the Spotify embed to a plain link.
  Convert absolute links (`/three-thirds/`, `/3-circles/`,
  `/starter-tools/`) to relative, and fix `/free-training` (missing
  trailing slash) to `/free-training/`.
- `what-are-disciple-making-movements-5-examples-from-around-the-world`:
  remove 2 trailing reusable-block shortcodes (`wp:block ref:11750`,
  `ref:12760`, the same reusable CTA pattern removed since Phase 3)
  and spacer blocks. Otherwise clean modern Gutenberg content —
  external book-citation links (Amazon) preserved as legitimate
  external references, not touched.
- `equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training`:
  remove the same junk HTML placeholder pattern, the "Are you in?"
  CTA block, and stray `<style>`.
- `finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making`:
  remove a stray `<style>` block embedded inside the opening
  paragraph, 1 duplicate pull-quote H5, 1 duplicate closing blockquote
  (repeats a sentence already stated in the Conclusion), and a
  trailing reusable-block shortcode. Normalize an inconsistent heading
  hierarchy (H2/H3/H5/H6 out of order) to a clean H2/H3 structure.
  Convert 1 absolute link (`/starter-tools/`) to relative.
- `breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements`:
  remove a trailing reusable-block shortcode and a stray, doubly-escaped
  `<style>` block. Otherwise clean.
- `movement-resources`: already fully characterized in Phase 6 — a
  curated external-resource list ("Emerging Network Resources") across
  6 accordion sections. Preserved close to verbatim; only the
  Elementor/GenerateBlocks accordion markup itself is chrome (converted
  to plain headings + lists, since Astro has no accordion component and
  the instructions say no fancy JS).

None of these are heavy rewrites — all changes are chrome removal,
absolute-to-relative link conversion, one broken-link fix, and heading
normalization, consistent with every prior phase's discipline.
