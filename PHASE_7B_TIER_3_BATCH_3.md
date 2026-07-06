# Phase 7B — Tier 3 Batch 3

## Selected URLs

| URL | Clicks | Impressions | Status | Likely hub | Media deps | Risk | Rationale |
|---|---|---|---|---|---|---|---|
| `/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/` | 0 | 42 | not-migrated | disciple-making | 1 featured (present) | Low | Highest-impression remaining tier-3 article; clean modern-blog-style article on Bonhoeffer's costly discipleship |
| `/bible-passages-about-love-what-scripture-really-says/` | 0 | 41 | not-migrated | none (scripture roundup) | 2 images (both present) | Low | Clean Gutenberg content, one decorative share-button HTML/JS block to strip |
| `/breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy/` | 0 | 33 | not-migrated | church-planting-movements | 1 featured (missing) | Low | Short, clean, same chrome patterns as every prior batch |
| `/the-multiplier-mandate-revealed-from-genesis-to-revelation/` | 0 | 33 | not-migrated | church-planting-movements | 1 featured (missing) | Low | Podcast-transcript article, real blockquotes, one Apple Podcasts embed + one reusable-block shortcode |
| `/start-here/` | 0 | 32 | not-migrated | none (resource grid, like `/stickers/`) | 8 local images (7 present, 1 missing variant), page also contains unrelated theme demo junk | Medium — special inspection required | Header-adjacent, near-duplicate of `/starter-tools/` content plus leftover page-builder template junk |
| `/vision/` | 1 | 30 | not-migrated | none (core site vision page) | 2 images (both missing) | Medium — special inspection required | Core "About the vision" page; must not collide with hub/homepage vision framing |
| `/how-to-spot-a-lone-wolf-and-not-become-one/` | 0 | 30 | not-migrated | none (community/team dynamics, no clean hub fit) | 3 images (all missing) | Low | Clean prose article, familiar chrome patterns |

## Special inspection: `/start-here/`

WordPress export: `post_id 29`, `post_type page`, `status publish`, dated 2023-02-04 (the same day as `/starter-tools/`'s underlying uploads). The first half of the content is a near-duplicate of `/starter-tools/`'s resource grid — a "Start Here" hero heading + intro paragraph, then a card grid: Full Packet, 3 Circles, 4-1-1, 4 Responses, Stories of Hope, Three Thirds, 4 Fields, Church Circle. All 8 of the grid's own "VIEW" links have **empty `href=""` attributes** in the raw export — they were never wired to real destinations even on the live WordPress site.

The **second half of the content is unrelated podcast-theme demo/placeholder content**: a "The new episode available now!" heading, Lorem-ipsum "About us" / "Our goals" paragraphs, links to the generic homepages of Apple Podcasts / Spotify / SoundCloud (not this site's real accounts), three fake "Testimonials" blocks with placeholder names ("Marc Larsson / Developer," "Loren Spears / Designer," "Eva Smith / Creative director") and Lorem-ipsum body text, a dead Vimeo icon link, and a "Support the podcast on Patreon" donate button pointing at an unrelated `qodeinteractive.com` contact page. This is leftover theme/page-builder demo content from an abandoned edit, not real content belonging to this site — it does not describe multiplyingdisciples.us in any way (no podcast, no team bios, no Patreon).

**Classification decision:** treat the demo-content half as chrome (same category as the junk placeholder `<html><head><title>FAQ</title>` shells removed in Batches 1–2) and drop it entirely — it is not "core content from the WordPress export" in any meaningful sense, it is unused template filler. Preserve the real half (the resource grid) as the page's actual content. Since the card grid's own links were dead (`href=""`), each card is repointed to the same confirmed real destination used for the identical card on `/starter-tools/` (3 Circles → `/3-circles/`, 4-1-1 → `/4-1-1/`, 4 Responses → `/4-responses-to-the-gospel/`, Stories of Hope → the migrated article, Church Circle → the migrated Church Waffle article at `/movement-resources/12-practice-church-circle/`) — this is not a guessed slug, it is the same site reusing the same card label for the same real destination one page over, already confirmed in `URL_INVENTORY.md` and already live in `starter-tools.md`.

**Layout decision:** same precedent as `/starter-tools/` and `/stickers/` — migrate into the existing `articles` collection + `ArticleLayout` rather than a new content type. No hub assignment (links out to many different topics, same reasoning as `/starter-tools/`). Add `related_articles` pointing to `/starter-tools/` itself (the fuller, image-complete sibling page) so a reader lands on the richer version too. **Not merged with `/starter-tools/`** — kept as its own file at its own exact URL, per "do not merge pages."

## Special inspection: `/vision/`

WordPress export: `post_id 6391`, `post_type page`, `status publish`, dated 2023-04-09. This is a genuine, clean, real content page — the ministry's "No Place Left" biblical vision statement (Paul's pattern in Romans 15/Acts 13–20, tracing the same vision from Genesis to Revelation, and "the Father's Heart" section on every believer's role). Gutenberg content only: one hero image block, one intro paragraph with a link to `/beliefs-values/`, then clean heading/paragraph blocks. No plugin chrome, no junk shells.

One external link needs cleanup: a citation link to Wikipedia is wrapped in a Google redirect tracker (`https://www.google.com/url?q=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDemography_of_the_Roman_Empire&sa=D&sntz=1&usg=...`) — unwrapped to the direct Wikipedia URL it points to, since the redirect wrapper is tracking cruft, not real content.

**Classification decision:** genuine prose content, not a resource grid — migrate into the existing `articles` collection + `ArticleLayout` (same collection as every other page this batch; no new layout needed, nothing about this content requires one). **No hub assignment**: this is the site's foundational vision/about statement spanning the whole ministry's theology (Great Commission, Abrahamic covenant, Acts 1:8, Revelation 5/7) rather than one hub's specific topic or tool — assigning it into any single hub (e.g. Church Planting Movements or Disciple Making) would incorrectly narrow a page that is meant to sit above all of them, and risks exactly the "conflict with hub vision content" the task called out. Homepage and hub `intro` fields were checked directly — none currently duplicate this page's Romans 15 / "No Place Left" content, so there is no collision, just a shared broad theology (expected, since `/vision/` is the source theology and the hubs are downstream topic pages).

## Pre-migration verification

All 7 URLs confirmed present in `URL_INVENTORY.md` (tier-3, not-migrated, table above). Slug/type/status/link cross-check against the WordPress export:

| Slug | `post_id` | `post_type` | `status` | `link` matches inventory? |
|---|---|---|---|---|
| `the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever` | 10437 | post | publish | Yes |
| `bible-passages-about-love-what-scripture-really-says` | 13747 | post | publish | Yes |
| `breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy` | 6995 | post | publish | Yes |
| `the-multiplier-mandate-revealed-from-genesis-to-revelation` | 12842 | post | publish | Yes |
| `start-here` | 29 | page | publish | Yes |
| `vision` | 6391 | page | publish | Yes |
| `how-to-spot-a-lone-wolf-and-not-become-one` | 9865 | post | publish | Yes |

All 7 confirmed exact matches — no slug discrepancies.

## No hub slug/path collision

No new hub slugs are being created this batch. Hub assignments made: `the-hidden-power-of-bonhoeffers-discipleship-model...` → `disciple-making`; `breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy` and `the-multiplier-mandate-revealed-from-genesis-to-revelation` → `church-planting-movements`. `bible-passages-about-love-what-scripture-really-says`, `start-here`, `vision`, and `how-to-spot-a-lone-wolf-and-not-become-one` get no hub assignment (reasoning documented per-page above and below). All 4 hub-target files (`disciple-making.md`, `church-planting-movements.md`) already exist with no path conflicts. Confirmed `/start-here/` and `/vision/` are each their own distinct path, not colliding with any hub slug (`/church-planting-movements/`, `/disciple-making/`, etc.) or with each other.

## Media findings

| File | Referenced by | Status | Resolution |
|---|---|---|---|
| `2025/01/Bonhoeffer.webp` | bonhoeffer (featured) | Present | Use as `og_image` |
| `2025/11/Bible-Passages-About-Love-–-Blog-Post-Thumbnail.webp` | bible-passages-about-love (featured) | Present | Use as `og_image` |
| `2025/11/Top-7-Bible-Verses-About-Love.webp` | bible-passages-about-love (inline infographic) | Present | Keep inline |
| `2023/04/pexels-photo-976866.jpeg` | breaking-the-mold (featured) | **Missing** | Omit `og_image` |
| `2024/08/unsplash-image-Hzi7U2SZ2GE.jpg` | multiplier-mandate (featured) | **Missing** (2024 folder not supplied at all) | Omit `og_image` |
| `2023/02/1.png`, `3circles.png`, `411.png`, `4responses.jpg`, `Untitled-design-2023-02-04T194046.359.png`, `33.png`, `4fields.png` | start-here (7 of 8 grid images) | Present | Keep inline |
| `2023/02/Untitled-design-34-1024x1024.png` | start-here (Church Circle card) | **Missing** (only `-150x150`/`-300x300`/`-650x650`/`-768x768` variants exist) | Substitute `-300x300` variant, same as `starter-tools.md`'s identical Church Waffle card |
| (all start-here demo-junk images: `2020/12/p1-section-img1.jpg`, `2020/12/h6-testimonials-img2/3.png`, `2020/12/testimonials-img1.jpg`) | start-here (junk demo section) | N/A | Dropped along with the junk section itself — not real site content |
| `2023/06/pexels-photo-6146961.jpeg` | vision (featured) | **Missing** | Omit `og_image` |
| `2020/12/2827019a-b6c6-4e5d-83b2-93290955c933-e1693686473697.png` | vision (hero image) | **Missing** (2020/12 folder only has one unrelated screenshot) | Drop hero image, keep text; purely decorative banner, not a diagram |
| `2023/08/lonewolf-big-2018-May17-1.jpg` | lone-wolf (featured) | **Missing** (2023/08 folder exists but doesn't contain this file) | Omit `og_image` |
| `2023/08/maxresdefault-2.jpg` | lone-wolf (inline, Acts 15 debate photo) | **Missing** | Drop image, keep caption text as plain text under the paragraph it illustrated |
| `2023/08/ChristianAlley-1.jpg` | lone-wolf (inline, community photo) | **Missing** | Drop image, keep caption text as plain text |

None of these are above-the-fold hero-only necessities or direct-access PDFs — all deferred, non-blocking, consistent with every prior batch's criteria.

## Content notes (chrome removed, same discipline as every prior batch)

- `the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever`: convert the embedded Forminator training-signup form (`[forminator_form id="10408"]`, non-functional outside WordPress) into a plain CTA sentence linking to `/free-training/`. Remove 2 trailing reusable-block shortcodes (`ref:12760`, `ref:11750`) — same reusable CTA/subscribe blocks removed in every prior batch. Convert 5 raw-HTML `<table>` (actually `wp:table` Gutenberg blocks, already close to clean) to Markdown tables. Otherwise preserve the short punchy sentence style close to verbatim — it's a deliberate rhetorical device, not something to "normalize" into longer paragraphs.
- `bible-passages-about-love-what-scripture-really-says`: remove one embedded HTML/CSS/JS "share this" button block (Facebook/X/Pinterest links plus a `navigator.clipboard.writeText(...)` copy-link button) — decorative interactive chrome, no fancy JS allowed. Otherwise clean Gutenberg content, preserved close to verbatim.
- `breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy`: remove 1 duplicate pull-quote H4, 1 junk embedded `<html><head><title>...FAQs</title>...<body></body></html>` placeholder shell, the reusable "Are you in? / Start Here. / Get Started" CTA block, and a stray Elementor `<style>` block. Otherwise clean, short, preserved close to verbatim.
- `the-multiplier-mandate-revealed-from-genesis-to-revelation`: convert the embedded Apple Podcasts iframe to a plain link. Remove 1 trailing reusable-block shortcode (`ref:12760`) and its surrounding spacer, same as `the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making` in Batch 2. Otherwise clean, well-structured podcast-transcript content with many real blockquotes, all preserved verbatim.
- `start-here`: see special inspection above — drop the entire unrelated demo/placeholder second half, keep and lightly clean the "Start Here" resource grid (same content pattern as `/starter-tools/`, repointed to the same real destinations), remove stray Elementor `<style>` blocks and decorative inline SVG arrow icons (chrome, no visual/semantic content).
- `vision`: unwrap 1 Google-redirect-tracker link to its real Wikipedia destination. Drop 1 missing decorative hero image (text preserved). Otherwise preserved essentially verbatim — this is real prose, not to be rewritten.
- `how-to-spot-a-lone-wolf-and-not-become-one`: convert 1 bare pasted YouTube URL into a plain link. Remove 1 duplicate pull-quote H4, the reusable "Are you in? / Start Here. / Get Started" CTA block, and 2 stray Elementor `<style>` blocks. Convert 1 raw-HTML `<table>` (with its own inline `<style>`) to a Markdown table. Drop 2 missing inline images (keep their captions as plain text).

None of these are heavy rewrites — all changes are chrome removal, junk-demo-content removal (start-here only), embed-to-link conversion, one tracking-link unwrap, and raw-HTML-table-to-Markdown-table conversion, consistent with every prior phase's discipline.
