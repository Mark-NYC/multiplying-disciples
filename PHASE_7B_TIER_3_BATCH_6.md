# Phase 7B: Tier 3 Batch 6

Sixth Tier 3 migration batch. Governing constraints (unchanged from every
prior Phase 7B batch): no launch, no DNS changes, no WordPress edits, no
archive redirects implemented yet, no heavy rewrites, no page merges, no
slug renames, migrate at most 7 pages this batch.

## Re-deriving the batch from `URL_INVENTORY.md`

Before selecting, the full remaining Tier 3 `not-migrated` list was
re-extracted and sorted by impressions, descending:

| # | URL | Type | Clicks | Impr. | Tier |
| - | --- | --- | --- | --- | --- |
| 1 | `/the-3-core-habits-of-a-disciple/` | article | 0 | 10 | tier-3 |
| 2 | `/filtering-unlock-this-essential-for-disciple-making-movements/` | article | 0 | 10 | tier-3 |
| 3 | `/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/` | article | 0 | 7 | tier-3 |
| 4 | `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | article | 0 | 7 | tier-3 |
| 5 | `/contact-us/` | page | 0 | 7 | tier-3 |
| 6 | `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | article | 0 | 5 | tier-3 |
| 7 | `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | article | 0 | 4 | tier-3 |
| 8 | `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/` | article | 0 | 2 | tier-3 |
| 9 | `/action-plan/` | page | 0 | 2 | tier-3 |
| 10 | `/the-church-waffle-sticker/` | page | 0 | 1 | tier-3 |
| 11 | `/elementor-10714/` | page | 0 | 1 | tier-3 |
| 12 | `/4-responses-to-the-gospel/` | page | 0 | 1 | tier-3 |

Confirmed: 12 Tier 3 URLs remain not-migrated (the user's brief said 13 —
a minor discrepancy from the prior batch's count; the actual number
derived directly from the inventory table is 12). The 7 URLs the user
recommended are exactly the top 7 by impressions — re-derivation
confirms the selection without changes.

## Selected Batch 6 URLs

| URL | Clicks | Impr. | WP post type | Status | Hub | Media deps | Risk | Why in Batch 6 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/the-3-core-habits-of-a-disciple/` | 0 | 10 | post | publish | Disciple Making | 1 featured (present), 3 inline (all missing, 2025/03 folder only partially supplied) | low | Highest-impression remaining tier-3 page; clean prose, no chrome. |
| `/filtering-unlock-this-essential-for-disciple-making-movements/` | 0 | 10 | post | publish | Church Planting Movements | 1 featured (missing), 2 external Pexels hotlinks (kept), 1 inline dedup-suffixed (present) | medium | Spotify embed, raw HTML table, CTA/form block need conversion. |
| `/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/` | 0 | 7 | post | publish | Church Planting Movements | 1 featured (missing, whole month folder absent) | low | Clean prose, only chrome is a trailing reusable CTA block. |
| `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | 0 | 7 | post | publish | Church Planting Movements | 1 featured + 3 inline (all present) | low | Apple Podcasts embed and highlighted paragraphs need conversion; media all present. |
| `/contact-us/` | 0 | 7 | page | publish | none (utility page) | none | medium | Special inspection required — see below. |
| `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | 0 | 5 | post | publish | Church Planting Movements | 1 image, used as both featured + inline (present) | low | Apple Podcasts embed needs conversion; media present. |
| `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | 0 | 4 | post | publish | Church Planting Movements | 1 featured (present) | low | Clean prose, only chrome is a trailing reusable CTA block. |

## Special inspection: `/contact-us/`

Confirmed via the WordPress export (post_id 2181, page, `publish`,
dated 2020-12-15): this is **not** a normal article. The entire visible
content is an H1 "Connect" heading followed by a Brevo/Sendinblue
subscription-style form (`sib-form`, form ID
`MUIFAJqZB70P9iotAnOLSdV_oZcfaJhL67lAjB3E0LtuzSUnNLXiAUjPhci25EbBgLd1pdw35ZQhsg7Vvh4O9-4hf3xIi5UE-CYXy593tNva5WOeCduOaaMy04uzwN1nbUTcritMuncV_fbkWlcrZ28FIvMvmDIpcy4cjREMNEWbPWpCTwQTD3pBYRaYhRMVthuqoj5UAYg4q5wH`)
collecting First Name, Email, Country, Zip Code, and an "I am
interested in..." checkbox group (connecting with local believers,
getting trained, learning about Jesus, other) — plus reCAPTCHA and
~250 lines of embedded CSS/JS. This is the **same Brevo form embed**
already converted to a plain CTA on
`/content-vs-systems-the-game-changer-for-leadership-development/` in
Batch 5 (there it was replaced with a link to `/free-training/`).

The Astro project has **no form-handling infrastructure** (confirmed —
no server endpoints, no client-side form JS in `src/components/` or
`src/layouts/`), so a working form cannot be reproduced without
inventing new functionality, which is out of scope for a content
migration. Per the batch instructions, the form's behavior could not be
migrated directly: the surrounding content ("Connect" heading, the
general intent to let visitors reach out) is preserved, and the missing
form is replaced with a **plain `mailto:contact@multiplyingdisciples.us`
link** — the same contact address already used as a real `mailto:`
fallback on `/privacy-policy/` in Batch 4. This is documented as a
temporary preserved fallback in the file's own frontmatter notes, not a
silently invented working form.

Per instruction: no hub assignment, no tool CTA, no related_articles
(none were present in the original and none are appropriate for a bare
contact page). `exclude_from_blog: true` is set, matching the
`/privacy-policy/` precedent for utility pages.

## No hub slug/path collision

Checked `src/content/hubs/`: `3-circles.md`, `church-planting-movements.md`,
`disciple-making.md`, `four-fields.md`, `jesus-and-the-twelve.md`,
`prayer.md`, `share-the-gospel.md`, `simple-church.md`,
`stories-of-hope.md`, `strategy-coordinator.md`, `testimony.md`. None of
the 7 Batch 6 slugs collide with any hub slug or existing article slug.

## Pre-migration verification

All 7 slugs, post types, and statuses were confirmed by direct
extraction from the WXR export (post_id, `wp:post_type`, `wp:status`,
`link` all cross-checked against `URL_INVENTORY.md`):

| Slug | post_id | WP type | WP status | Matches inventory? |
| --- | --- | --- | --- | --- |
| the-3-core-habits-of-a-disciple | 12869 | post | publish | yes |
| filtering-unlock-this-essential-for-disciple-making-movements | 9292 | post | publish | yes |
| setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting | 10302 | post | publish | yes |
| go-slow-to-go-fast-could-transform-your-leadership-pipeline | 12723 | post | publish | yes |
| contact-us | 2181 | page | publish | yes |
| start-strengthen-sustain-core-insights-on-building-lasting-ministry | 10385 | post | publish | yes |
| next-gen-local-owners-building-beachheads-of-the-kingdom | 13593 | post | publish | yes |

## Media findings

| File | Referenced by | Status |
| --- | --- | --- |
| `2025/01/3-5.jpg` | the-3-core-habits (featured) | Present |
| `2025/03/oikos-map-example.jpg` | the-3-core-habits (inline) | Missing — `2025/03` folder supplied but only contains `gen-z-bible-study.jpg` and an unrelated file |
| `2025/03/15-Second-Testimony-Format.jpg` | the-3-core-habits (inline) | Missing, same folder |
| `2025/03/3-Circles-English-presentation.jpg` | the-3-core-habits (inline) | Missing, same folder |
| `2023/06/pexels-photo-6146961.jpeg` | filtering (featured) | Missing |
| `images.pexels.com/photos/4587410/...` | filtering (inline) | External hotlink, kept as-is (established precedent, e.g. `/7-surprising-disciple-making-movement-examples/`) |
| `images.pexels.com/photos/5553616/...` | filtering (inline) | External hotlink, kept as-is |
| `2023/05/Includes-3-Circles-Video-1024x576.jpg` | filtering (inline) | Present under dedup `-1` suffix: `Includes-3-Circles-Video-1-1024x576.jpg` — same pattern as Batch 4/5 precedent, kept |
| `2024/10/Muddy-Boots-Leadership.jpg` | setting-the-stage (featured) | Missing — entire `2024/10` month folder was never supplied |
| `2025/01/disciple-making-leader.webp` | go-slow-to-go-fast (featured) | Present |
| `2025/01/discipleship-fathering.jpeg` | go-slow-to-go-fast (inline) | Present |
| `2025/01/mentorship.webp` | go-slow-to-go-fast (inline) | Present |
| `2025/01/model-assist-watch-launch.jpeg` | go-slow-to-go-fast (inline) | Present |
| `2025/01/Start-Strengthen-Sustain-Apostolic-Role.png` | start-strengthen-sustain (featured + inline, same file) | Present |
| `2025/03/gen-z-bible-study.jpg` | next-gen-local-owners (featured) | Present |
| (none — Brevo form only) | contact-us | N/A — form dropped, mailto fallback used |

8 of 15 tracked media references are genuinely missing (all
featured/inline supporting images, none above-the-fold-critical, none a
contact-functionality blocker, none a direct-access PDF); 2 are kept as
external hotlinks; 1 is present under a dedup suffix. None block the
batch.

## Content notes per page

- **the-3-core-habits-of-a-disciple** — clean, well-structured prose (3
  habits: Abide in Christ, Map Your Oikos, Share the Gospel via 3
  Circles). Only chrome: a trailing `wp:block {"ref":12760}` reusable
  CTA (the "Are you in? / Start Here." block, removed per established
  precedent). Kept real links to `/15-second-testimony-examples-ignite-your-faith/`
  and `/the-three-circles-gospel-presentation-step-by-step/` (both
  already migrated, tier-1).
- **filtering-unlock-this-essential-for-disciple-making-movements** —
  converted the Spotify podcast iframe to a plain link, converted the
  raw-HTML "Key Takeaways" table to a Markdown table, removed 3
  duplicate pull-quote `<h4>` blocks repeating adjacent sentences
  verbatim, removed 2 stray Elementor `<style>` blocks, kept the 2
  external Pexels hotlinked images with their captions, kept the real
  link to `/starter-tools/`, and converted the closing "Four Fields
  Action Guide" + `[sibwp_form id=2]` + "Are you in?/Start Here./Get
  Started" block into a single plain CTA linking to
  `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/`
  (same conversion precedent as Batch 5).
- **setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting**
  — clean prose throughout, no chrome besides the trailing reusable CTA
  block (removed).
- **go-slow-to-go-fast-could-transform-your-leadership-pipeline** —
  converted the Apple Podcasts iframe embed to a plain link,
  represented `has-base-2-background-color` highlighted paragraphs and
  one highlighted list as blockquotes (established pattern), removed
  the trailing reusable CTA block.
- **contact-us** — see special inspection above.
- **start-strengthen-sustain-core-insights-on-building-lasting-ministry**
  — converted the Apple Podcasts iframe embed to a plain link, removed
  the trailing reusable CTA block.
- **next-gen-local-owners-building-beachheads-of-the-kingdom** — clean
  prose throughout, no chrome besides the trailing reusable CTA block
  (removed).

## Hub assignments

- **Disciple Making**: `/the-3-core-habits-of-a-disciple/` (core
  discipleship habits — abiding, oikos mapping, gospel-sharing —
  directly matches the hub's front-door framing). `related_tools:
  ["3 Circles"]`.
- **Church Planting Movements**: `/filtering-unlock-this-essential-for-disciple-making-movements/`,
  `/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/`,
  `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/`,
  `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/`,
  and `/next-gen-local-owners-building-beachheads-of-the-kingdom/` — all
  5 are DMM/CPM strategy, leadership-pipeline, and movement-multiplication
  content, consistent with the hub's existing framing and its many
  leadership-development articles from Batches 4-5. Hub grows from 16
  to 21 `key_articles` slots.
- **No hub**: `/contact-us/` (utility page, per special instruction).

## Build verification plan

Run `astro check` and `astro build`, then verify: all 7 URLs generate;
canonicals correct; no accidental noindex; exactly 1 H1 per page; no
broken internal links among migrated pages; no hub collisions; no
guessed slugs; `/blog/` still builds and excludes `/contact-us/`;
header/footer links still resolve.
