# Phase 7B — Tier 3 Batch 5

## Re-derivation of the batch list

Re-read `URL_INVENTORY.md` directly for this batch rather than relying on the prior batch's forward-looking guess. All remaining tier-3 `not-migrated` rows (19 total) were pulled out and sorted by impressions, highest first:

| Rank | URL | Clicks | Impressions |
|---|---|---|---|
| 1 | `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | 0 | 20 |
| 2 | `/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church/` | 0 | 19 |
| 3 | `/kingdom-ministry-training/` | 0 | 19 |
| 4 | `/content-vs-systems-the-game-changer-for-leadership-development/` | 0 | 18 |
| 5 | `/unlock-the-power-of-friendly-accountability/` | 0 | 17 |
| 6 | `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | 1 | 17 |
| 7 | `/the-four-fields-sticker-simple-2x2/` | 3 | 14 |
| 8 | `/the-3-core-habits-of-a-disciple/` | 0 | 10 |
| 9 | `/filtering-unlock-this-essential-for-disciple-making-movements/` | 0 | 10 |
| 10 | `/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/` | 0 | 7 |
| 11 | `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | 0 | 7 |
| 12 | `/contact-us/` | 0 | 7 |
| 13 | `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | 0 | 5 |
| 14 | `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | 0 | 4 |
| 15 | `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/` | 0 | 2 |
| 16 | `/action-plan/` | 0 | 2 |
| 17 | `/the-church-waffle-sticker/` | 0 | 1 |
| 18 | `/elementor-10714/` | 0 | 1 |
| 19 | `/4-responses-to-the-gospel/` | 0 | 1 |

The top 7 by impressions become Batch 5, confirming the "known likely candidates" note and extending it with 5 more re-derived from the full list.

## Selected URLs

| URL | Clicks | Impressions | WP post type | Status | Likely hub | Media deps | Risk | Rationale |
|---|---|---|---|---|---|---|---|---|
| `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | 0 | 20 | post | not-migrated | church-planting-movements | None referenced | Low | Highest-impression remaining tier-3 URL; clean Gutenberg content, no images, no chrome |
| `/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church/` | 0 | 19 | post | not-migrated | church-planting-movements | 1 featured (missing) | Low | Familiar chrome patterns, clean prose about Paul's Ephesus movement |
| `/kingdom-ministry-training/` | 0 | 19 | page | not-migrated | none (training/curriculum landing page) | 1 featured (present) + 1 linked screenshot (present); 5 YouTube embeds, Google Slides links | Medium — special inspection required | Structured multi-session training curriculum, not article prose |
| `/content-vs-systems-the-game-changer-for-leadership-development/` | 0 | 18 | post | not-migrated | church-planting-movements | 4 inline images (all present) | Low | Podcast-transcript article on movement-leadership systems; one Apple Podcasts embed, one Brevo form embed |
| `/unlock-the-power-of-friendly-accountability/` | 0 | 17 | post | not-migrated | disciple-making | 4 images (1 present exact, 1 present under dedup-suffix variant, 2 missing) | Low | DMM accountability practices tied to the Three Thirds tool already referenced elsewhere in the hub |
| `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | 1 | 17 | post | not-migrated | disciple-making | 1 featured (missing) | Low | Book review complementing the hub's existing "top-25 must-reads" article |
| `/the-four-fields-sticker-simple-2x2/` | 3 | 14 | page | not-migrated | none (single sticker-product page, same precedent as `/stickers/`) | 2 images (both missing) | Medium — page-type inspection required | Single-product child page under `/stickers/`, not editorial content |

## Special inspection: `/kingdom-ministry-training/`

WordPress export: `post_id 6708`, `post_type page`, `status publish`, dated 2023-04-14. This is a structured, multi-session **training/curriculum landing page** — "Kingdom Ministry Training: Bridging the Theology and Practice of Spiritual Gifts Through Hands-On Training." The body is a GenerateBlocks accordion with 5 modules (Hearing God For Self, Practicing Prophecy, Building a Community of Practice, Simple 5-Step Healing Prayer Model (GAPAP), Power Evangelism), each with a short teaching paragraph, a Google Slides link ("VIEW TRAINING SLIDES"), and an embedded YouTube video. A closing section, "Building a Healthy Kingdom Ministry Learning Community," links out to a downloadable PDF packet (`Church-Waffle-English-04-2023.pdf`, already confirmed present from a prior batch).

**Classification decision:** this is not blog-style informational prose — it is a training curriculum/program page, closer in kind to `/privacy-policy/` (a utility page) than to a discursive article, even though its content is real and substantial. Migrated into the existing `articles` collection + `ArticleLayout` (no custom layout needed — the accordion becomes a plain sequence of H3 sections with their video/slide links as plain text links, since Astro has no accordion component and fancy JS/embeds are excluded, same reasoning applied to `/movement-resources/` in Phase 6/7B Batch 1). **Set `exclude_from_blog: true`**: a 5-module training syllabus with video links and slide decks does not read as a blog article, and excluding it keeps `/blog/`'s article index focused on editorial content, consistent with the precedent set for `/privacy-policy/` in Batch 4. No hub assignment — it doesn't map to any single hub's specific topic (it spans prophecy, healing prayer, evangelism, and community practice).

## Page-type inspection: `/the-four-fields-sticker-simple-2x2/`

WordPress export: `post_id 11730`, `post_type page`, `status publish`, dated 2025-01-31. A single sticker-product page: a photo of the sticker, a "←BACK" link to `/stickers/` (already migrated, Phase 4 Batch 4), the product title, an "ORDER NOW at COST" Printify-store badge, price ($1.39), and an "ORDER NOW" button linking to an external Printify storefront URL. This is the same page family as `/stickers/`'s child products — thin, non-editorial commerce content.

**Classification decision:** migrated into the existing `articles` collection + `ArticleLayout`, same precedent as `/stickers/` itself. **No hub assignment** (a single product, not a topic). **Set `exclude_from_blog: true`**: unlike `/stickers/` (a resource grid that at least surveys many tools), this is a bare storefront product listing — closer to `/privacy-policy/`'s utility-page category than to blog content, and the `exclude_from_blog` mechanism exists precisely for this kind of non-editorial page.

## Pre-migration verification

All 7 URLs confirmed present in `URL_INVENTORY.md` (tier-3, not-migrated, table above). Slug/type/status/link cross-check against the WordPress export:

| Slug | `post_id` | `post_type` | `status` | `link` matches inventory? |
|---|---|---|---|---|
| `spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication` | 13668 | post | publish | Yes |
| `unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church` | 6966 | post | publish | Yes |
| `kingdom-ministry-training` | 6708 | page | publish | Yes |
| `content-vs-systems-the-game-changer-for-leadership-development` | 12709 | post | publish | Yes |
| `unlock-the-power-of-friendly-accountability` | 8096 | post | publish | Yes |
| `discover-the-game-changing-secrets-starfish-and-the-spirit-review` | 8255 | post | publish | Yes |
| `the-four-fields-sticker-simple-2x2` | 11730 | page | publish | Yes |

All 7 confirmed exact matches — no slug discrepancies.

## No hub slug/path collision

Hub assignments made: `spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication`, `unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church`, and `content-vs-systems-the-game-changer-for-leadership-development` → `church-planting-movements`; `unlock-the-power-of-friendly-accountability` and `discover-the-game-changing-secrets-starfish-and-the-spirit-review` → `disciple-making`. `kingdom-ministry-training` and `the-four-fields-sticker-simple-2x2` get no hub assignment (reasoning above). All target hub files already exist with no path conflicts.

## Media findings

| File | Referenced by | Status | Resolution |
|---|---|---|---|
| `2025/01/jon-tyson-YtYNavix3pw-unsplash-copy.jpg` | kingdom-ministry-training (featured/hero) | Present | Use as `og_image` |
| `2025/01/Screenshot-2025-01-22-at-9.10.54 AM.webp` | kingdom-ministry-training (inline, linked to Rumble video) | Present | Keep inline |
| `2023/04/group.jpeg` | unleashing-the-movement (featured) | **Missing** | Omit `og_image` |
| `2025/01/webinar.webp`, `reading-the-bible.webp`, `discipleship-meeting.jpeg`, `loving-accountability.jpeg` | content-vs-systems (featured + 3 inline) | Present (all 4) | Use `discipleship-meeting.jpeg` as `og_image`, keep all 4 inline |
| `2023/05/pexels-photo-2962229.jpeg` | unlock-the-power-of-friendly-accountability (featured) | **Missing** | Omit `og_image` |
| `2023/05/Three-Thirds-Meeting-Format.webp` | unlock-the-power-of-friendly-accountability (inline) | Present | Keep inline |
| `2023/05/Friendly-Accountability-Checklist-for-Disciple-Making-Movements.png` | unlock-the-power-of-friendly-accountability (inline) | **Missing** | Drop image, keep caption text |
| `2023/05/Includes-3-Circles-Video-1024x576.jpg` | unlock-the-power-of-friendly-accountability (inline) | Present under a dedup-suffixed name (`Includes-3-Circles-Video-1-1024x576.jpg`/`.webp` — same photo, WordPress `-1` collision suffix) | Use the present file |
| (Amazon book-cover hash filename) | discover-the-game-changing-secrets-starfish-and-the-spirit-review (featured) | **Missing** | Omit `og_image` |
| `2023/09/Screenshot-2023-09-02-at-8.02.39-PM.png` | the-four-fields-sticker-simple-2x2 (product photo) | **Missing** (`2023/09` folder doesn't contain this file) | Drop image, keep text |
| `2024/04/Printify_Logo-1024x320.png` | the-four-fields-sticker-simple-2x2 (badge) | **Missing** (`2024` folder was never supplied) | Drop image, keep "ORDER NOW at COST" text |

None of these are above-the-fold hero-only necessities, training downloads, or direct-access PDFs — all deferred, non-blocking. The one real training download this batch (`Church-Waffle-English-04-2023.pdf`, linked from `/kingdom-ministry-training/`) is already confirmed present from an earlier phase.

## Content notes (chrome removed, same discipline as every prior batch)

- `spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication`: no chrome found — clean Gutenberg content, preserved verbatim.
- `unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church`: remove 1 junk embedded `<html><head><title>FAQ...</title>...<body></body></html>` placeholder shell, the reusable "Are you in? / Start Here. / Get Started" CTA block, and a stray Elementor `<style>` block.
- `kingdom-ministry-training`: see special inspection above — convert the 5 accordion modules to plain H3 sections, convert 5 embedded YouTube videos to plain links, keep the Google Slides / Rumble / PDF links as real external links (all working destinations, no fabrication needed).
- `content-vs-systems-the-game-changer-for-leadership-development`: convert the embedded Apple Podcasts iframe to a plain link. Remove the embedded Brevo/Sendinblue subscription form (heavy CSS/JS/reCAPTCHA embed — decorative interactive chrome, no fancy JS per policy) and its "Connect With Us" wrapper, replacing it with a plain CTA linking to `/free-training/`, consistent with the Forminator-to-CTA conversion pattern from Batch 4. Represent `has-base-2-background-color` highlighted callout paragraphs as blockquotes, same treatment as Batch 4's leadership articles.
- `unlock-the-power-of-friendly-accountability`: remove 2 duplicate pull-quote H4s that repeated adjacent text verbatim, the reusable "Are you in? / Start Here. / Get Started" CTA block, a stray Elementor `<style>` block, and the `[sibwp_form id=2]` newsletter-signup shortcode section ("Four Fields of Kingdom Growth Action Guide") — converted to a plain CTA linking to the real migrated article `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` instead of fabricating a form.
- `discover-the-game-changing-secrets-starfish-and-the-spirit-review`: convert the raw-HTML "Key Takeaways" table to a Markdown table. Remove a duplicate "Perplexity Article Summary" block — an AI-generated restatement of the entire article appended after the Conclusion, functionally identical to the duplicate pull-quote chrome removed in every prior batch, just at paragraph scale instead of sentence scale. Remove 2 duplicate pull-quote H4s, 1 junk embedded FAQ placeholder shell, the reusable "Are you in?" CTA block, and a stray Elementor `<style>` block. Remove hyperlinks on 4 `/podcast/...` links with no confirmed tracked destination in `URL_INVENTORY.md` (same dead-link pattern identified in Batch 2) — kept their surrounding text intact. Kept all links to already-migrated real articles.
- `the-four-fields-sticker-simple-2x2`: see page-type inspection above — no other chrome beyond the missing images.

None of these are heavy rewrites — all changes are chrome removal, embed-to-link and form-to-CTA conversion, one duplicate-summary removal, and dead-link cleanup, consistent with every prior batch's discipline.
