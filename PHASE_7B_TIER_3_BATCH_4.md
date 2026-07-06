# Phase 7B — Tier 3 Batch 4

## Selected URLs

| URL | Clicks | Impressions | Status | Likely hub | Media deps | Risk | Rationale |
|---|---|---|---|---|---|---|---|
| `/jesus-the-leader-examining-how-he-identified-trained-and-sent-leaders-in-the-gospel-of-mark/` | 0 | 29 | not-migrated | jesus-and-the-twelve | 1 featured (missing) | Low | Highest-impression remaining tier-3 article; clean prose, familiar chrome patterns |
| `/beliefs-values/` | 0 | 26 | not-migrated | none (core doctrinal statement, linked from `/vision/`) | 0 images; 1 unresolvable PDF text reference | Medium — special inspection required | Core site page, must preserve exact URL and stay faithful to original |
| `/privacy-policy/` | 0 | 25 | not-migrated | none (legal/utility page) | 0 images | Medium — special inspection required | Legal text; must not get CTAs/related links added, may need `/blog/` exclusion |
| `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | 1 | 24 | not-migrated | none (general leadership principle, no clean hub fit) | 4 images (1 featured, 3 inline — all missing) | Low | Podcast-transcript article, real content, one Apple Podcasts embed |
| `/the-leadership-phase-everyone-skips-why-investment-matters/` | 2 | 21 | not-migrated | church-planting-movements | 1 featured (missing) | Low | Long, clean, well-structured leadership-development framework tied directly to church planting |
| `/discovering-the-disciple-meaning-a-life-changing-journey/` | 0 | 20 | not-migrated | disciple-making | 1 featured (present) | Low | Clean prose, familiar chrome patterns |
| `/5-surprising-ways-to-attract-multiplying-leaders/` | 2 | 20 | not-migrated | four-fields | 1 featured (missing) | Low | Model-Assist-Watch-Launch content directly parallels the Four Fields hub's existing articles |

## Special inspection: `/beliefs-values/`

WordPress export: `post_id 5816`, `post_type page`, `status publish`, dated 2023-04-02. Genuine, clean doctrinal content — "Doctrinal Center & Theological Values," written by Sentergy, covering Scripture, Trinity, God the Father/Son/Spirit, People, Gospel, The Church, Marriage/Family/Singleness, Christ's Second Coming, and the Priesthood of All Believers. No plugin chrome beyond a duplicated `<h2>` title (export artifact — the title appears twice in a row, once white-on-transparent-styled and once plain; collapsed into one heading) and an inline attribution link to Sentergy (`https://www.sentergy.us/`, kept as a real external link).

One unresolved reference: the intro says "*Download PDF below for Scripture References," but the raw export contains no actual `<a href>` or file attachment for this — no PDF was captured in this post's postmeta, and no matching filename (`scripture`, `doctrinal`, `belief`, etc.) exists anywhere in the supplied uploads. Kept as plain text since there is no real destination to link to; documented as an unresolved/missing reference rather than fabricating a link.

**Classification decision:** migrated into the existing `articles` collection + `ArticleLayout` — this is straightforward prose, not a resource grid, and needs no custom layout. **No hub assignment**, per the instructions: this is the ministry's doctrinal statement, a core site page linked from `/vision/`, not a single hub's specific topic. Forcing it into e.g. Disciple Making or Church Planting Movements would misrepresent it as topical blog content rather than a foundational reference page. `related_articles` limited to `/vision/` (which links to it) and `/movement-resources/` (the other "about the movement" cluster page) — no tool CTA, since a doctrinal statement has no natural tool tie-in.

## Special inspection: `/privacy-policy/`

WordPress export: `post_id 8908`, `post_type page`, `status publish`, dated 2023-06-01. Standard legal privacy policy: information collected, use of information, cookies, data retention, security, third-party sharing (Google Analytics), user rights, children's privacy, and policy updates. The raw export has WordPress block-comment artifacts leaking into visible `<h2>` tags (e.g. `<h2><!-- wp:paragraph --></h2>`, `<h2><!-- /wp:list --> <!-- wp:paragraph --></h2>`) — these are literally HTML comments that got wrapped in heading tags during export, not real headings, and are removed entirely as chrome. The numbered list is preserved as a real Markdown ordered list. Two `contact@multiplyingdisciples.us` "links" had no `href` at all in the export (bare `<a>` tags with a text node) — converted to proper `mailto:` links, since the intent is unambiguous and this is not a guessed slug/destination, just completing a broken mailto that was clearly meant to work.

**Classification decision:** migrated into the existing `articles` collection + `ArticleLayout` (plain prose, no custom layout needed). Per the special caution: **no hub assignment, no tool CTA, no `related_articles`** — none were present in the original and none are appropriate for a legal page. Legal text preserved verbatim; only WordPress/plugin chrome (the leaked block comments) removed. **Excluded from `/blog/`** via a new `exclude_from_blog: true` frontmatter field — added to the `articles` collection schema (`src/content.config.ts`) as an optional boolean defaulting to `false`, and the blog index (`src/pages/blog/index.astro`) now filters `articles` on `!entry.data.exclude_from_blog` before sorting. This is a minimal, additive schema change: every other already-migrated article is unaffected (field defaults to `false`), and no other page opts in to exclusion this batch.

## Pre-migration verification

All 7 URLs confirmed present in `URL_INVENTORY.md` (tier-3, not-migrated, table above). Slug/type/status/link cross-check against the WordPress export:

| Slug | `post_id` | `post_type` | `status` | `link` matches inventory? |
|---|---|---|---|---|
| `jesus-the-leader-examining-how-he-identified-trained-and-sent-leaders-in-the-gospel-of-mark` | 6973 | post | publish | Yes |
| `beliefs-values` | 5816 | page | publish | Yes |
| `privacy-policy` | 8908 | page | publish | Yes |
| `the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence` | 12826 | post | publish | Yes |
| `the-leadership-phase-everyone-skips-why-investment-matters` | 12748 | post | publish | Yes |
| `discovering-the-disciple-meaning-a-life-changing-journey` | 7261 | post | publish | Yes |
| `5-surprising-ways-to-attract-multiplying-leaders` | 7623 | post | publish | Yes |

All 7 confirmed exact matches — no slug discrepancies.

## No hub slug/path collision

Hub assignments made: `jesus-the-leader-examining...` → `jesus-and-the-twelve`; `the-leadership-phase-everyone-skips-why-investment-matters` → `church-planting-movements` (its opening line frames leadership development as "a cornerstone of effective church planting"); `discovering-the-disciple-meaning-a-life-changing-journey` → `disciple-making` (a direct definitional fit); `5-surprising-ways-to-attract-multiplying-leaders` → `four-fields` (its "Model, Assist, Watch, & Launch" framework and "five parts of kingdom growth" language directly mirror the Four Fields hub's existing content). `beliefs-values`, `privacy-policy`, and `the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence` get no hub assignment (reasoning above and below). All 3 target hub files (`jesus-and-the-twelve.md`, `church-planting-movements.md`, `disciple-making.md`, `four-fields.md`) already exist with no path conflicts.

## Media findings

| File | Referenced by | Status | Resolution |
|---|---|---|---|
| `2023/04/4-ways-multiply-disciples-way-jesus-did.jpeg` | jesus-the-leader (featured) | **Missing** | Omit `og_image` |
| (PDF reference, "Scripture References") | beliefs-values (text-only mention, no `<a href>` in export) | **Unresolvable** — no attachment captured, no matching filename in supplied uploads | Kept as plain text, no link fabricated |
| `2025/02/photo-1555122125-7cea8b612ca0.avif` | the-secret-ingredient (featured) | **Missing** (only `-100x100`/`-150x150` crops of a differently-suffixed `-e1740396668837` variant exist) | Omit `og_image` |
| `2024/11/diligence-in-disciple-making-movements.jpeg` | the-secret-ingredient (inline) | **Missing** (`2024/11` folder was never supplied) | Drop image, keep surrounding prose |
| `2024/11/diligence-in-discipleship.webp` | the-secret-ingredient (inline) | **Missing** | Drop image, keep surrounding prose |
| `2024/11/diligence-in-discipleship-Jesus.webp` | the-secret-ingredient (inline) | **Missing** | Drop image, keep surrounding prose |
| `2023/08/personal-evangelism-main-header-1-1024x576.png` | the-secret-ingredient (inline, in Conclusion) | Present under a slightly different name/month (`2023/07/personal-evangelism-main-header-1024x576.png` — same photo family, missing only the WordPress dedup `-1` suffix) | Use the present file as the same image |
| `2025/02/making-disciples.jpeg` | the-leadership-phase (featured) | **Missing** | Omit `og_image` |
| `2023/02/AdobeStock_336959953-copy.jpg` | discovering-the-disciple-meaning (featured) | Present (exact match) | Use as `og_image` |
| `2023/05/pexels-photo-194094.jpeg` | 5-surprising-ways (featured) | **Missing** | Omit `og_image` |

None of these are above-the-fold hero-only necessities, legal content, or direct-access PDFs — all deferred, non-blocking, consistent with every prior batch's criteria. (The `/beliefs-values/` PDF reference is text-only with no actual link in the export, so there is nothing broken to defer — just an unresolvable mention.)

## Content notes (chrome removed, same discipline as every prior batch)

- `jesus-the-leader-examining-how-he-identified-trained-and-sent-leaders-in-the-gospel-of-mark`: remove the reusable "Are you in? / Start Here. / Get Started" CTA block, a stray Elementor `<style>` block, and a trailing WordPress "related posts" auto-widget (3 auto-generated `<article>` blocks with date-archive links and a decorative SVG arrow icon — not authored content). Otherwise clean, preserved close to verbatim.
- `beliefs-values`: see special inspection above — collapse the duplicated title, remove chrome, keep everything else verbatim.
- `privacy-policy`: see special inspection above — strip leaked WordPress block-comment artifacts, convert bare `contact@multiplyingdisciples.us` text into real `mailto:` links, preserve the ordered list and all legal text verbatim.
- `the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence`: convert the embedded Apple Podcasts iframe to a plain link. Remove 1 trailing reusable-block shortcode (`ref:12760`), the same recurring block removed in every prior batch. Represent the `has-base-2-background-color` highlighted callout paragraphs as blockquotes (a genuine visual callout style, not a default/meaningless background) rather than plain paragraphs.
- `the-leadership-phase-everyone-skips-why-investment-matters`: convert the embedded Apple Podcasts iframe to a plain link. Represent the `has-base-2-background-color` callout paragraphs and the four `wp:group` "base-2" boxes (Identify/Equip/Invest/Entrust) as blockquotes, consistent with the same pattern above. No other chrome — this is very long but genuinely clean Gutenberg content, preserved close to verbatim.
- `discovering-the-disciple-meaning-a-life-changing-journey`: remove 2 duplicate pull-quote H4s that repeated adjacent paragraph text verbatim, the reusable "Are you in? / Start Here. / Get Started" CTA block, and a stray Elementor `<style>` block.
- `5-surprising-ways-to-attract-multiplying-leaders`: convert 1 bare pasted YouTube URL (`https://youtu.be/d-ciGPyrqkw`) into a plain link. Remove 1 embedded third-party interactive widget iframe (`ask.swellai.com`, an AI chat/Q&A gadget — decorative, no fancy JS/embeds per policy, not real article content), 1 duplicate pull-quote H4, 1 junk embedded `<html><head><title>...FAQ(FAQ)</title>...<body></body></html>` placeholder shell, the reusable "Are you in? / Start Here. / Get Started" CTA block, and a stray Elementor `<style>` block.

None of these are heavy rewrites — all changes are chrome removal, embed-to-link conversion, one mailto-completion, and representing genuinely-styled callout boxes as blockquotes, consistent with every prior phase's discipline.
