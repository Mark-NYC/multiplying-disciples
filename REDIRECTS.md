# Redirects

Every old URL must either exist in Astro at the exact same path, or have
a planned 301 documented here before launch. This file is the single
source of truth for redirects — do not launch with an entry still marked
`pending`.

## Redirect policy (permanent — adopted 2026-07-19)

Every redirect in this repo must follow these rules. They exist because a
Google result ("15 Second Testimony Examples") was landing on the
`/testimony/` list hub instead of the article that answers the query.

1. **Article URLs must redirect to an equivalent successor article** —
   never to a topic/list hub.
2. **Taxonomy URLs** (`/category/…`, `/tag/…`) **may** redirect to a
   relevant cluster hub. Exception: when a taxonomy term maps 1:1 to a
   single successor article (e.g. `/tag/15-second-testimony-examples/`),
   prefer that article — it better preserves query intent.
3. **Utility and tool URLs must redirect to an equivalent replacement**
   (page/tool), e.g. `/training/` → `/free-training/`, sticker products →
   `/stickers/`.
4. **If no substantially equivalent page exists, return 410** (via
   `api/gone.js`) — do not invent a destination.
5. **Never redirect an article to a hub merely because they share a
   topic.** Shared topic ≠ same search intent.
6. **Any redirect change requires confirming** that the new destination
   better preserves the original **query intent, title promise, and
   content** than the old one. Future cluster/content articles must not
   silently repoint existing redirects — a change is a deliberate,
   documented decision, not a side effect of publishing.

### Article → hub cases — resolved (owner decisions, 2026-07-19)

The five flagged WordPress-post URLs were decided as follows. GSC = clicks
/ impressions.

| Old URL (WordPress post) | GSC | Decision |
|---|---|---|
| `/disciple-making-resources-for-churches-that-will-multiply/` | 1 / 92 | **Keep 301 → `/disciple-making/`.** Legitimate resource-index → resource-hub replacement: the old page was itself a resource index, and the `/disciple-making/` hub is that same curated resource landing, not a broad topic dump. This is the sanctioned exception to policy #1 |
| `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | 1 / 17 | **410** — book review, no equivalent article |
| `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/` | 0 / 55 | **410** — specific DMM story, no closer surviving article |
| `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | 0 / 4 | **410** — local-ownership theme, no closer surviving article |
| `/disciple-making-movement-books-top-25-must-reads/` | 3 / 415 | **Restored as an article (2026-07-19).** Owner supplied the content; recreated at `src/content/articles/disciple-making-movement-books-top-25-must-reads.mdx` (200, self-canonical, in the sitemap, no noindex, hero reuses `books.jpeg`), relinked from the `/church-planting-movements/` hub `key_articles`, and its 301 removed from `vercel.json`. No longer a redirect or 410 |

## Content simplification (2026-07-11) — 26 article redirects, 3 retirements, 1 hub retirement

Positioning shift from "disciple-making encyclopedia" to a practice-first
field manual. 29 thin/generic articles removed; full rationale, search-intent
confidence rating, and GSC clicks/impressions for every row are in
`docs/archive/CONTENT_SIMPLIFICATION_REMOVAL_MANIFEST.md`. Unlike every row below this
section, these are **implemented now**, not just documented: real rules live
in `vercel.json` (`redirects` array, `statusCode: 301` explicit — not
`permanent: true`, which Vercel defaults to a 308) and in `api/gone.js` (a
Vercel serverless function returning a true HTTP 410, wired via `vercel.json`
`rewrites`, for the 3 URLs with no relevant surviving destination).

| Old URL | New URL / destination | Type | Status |
|---|---|---|---|
| `/missionary-verses-in-the-bible-reveal-gods-heart/` | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | 301 | implemented |
| `/discovering-the-disciple-meaning-a-life-changing-journey/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` | `/the-3-core-habits-of-a-disciple/` | 301 | implemented |
| `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | `/how-to-evangelize-ultimate-step-by-step-guide/` | 301 | implemented |
| `/ridiculously-simple-3-ways-to-make-disciples/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/` | `/how-to-evangelize-ultimate-step-by-step-guide/` | 301 | implemented |
| `/breakthrough-guide-for-a-modern-day-disciple/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/unlock-biblical-principles-for-multiplying-disciples/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/under-the-hood-of-disciple-making-movements/` | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | 301 | implemented |
| `/7-surprising-disciple-making-movement-examples/` | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | 301 | implemented |
| `/what-are-disciple-making-movements-5-examples-from-around-the-world/` | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | 301 | implemented |
| `/disciple-making-resources-for-churches-that-will-multiply/` | `/disciple-making/` | 301 | implemented |
| `/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/` | `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | 301 | implemented |
| `/breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy/` | `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | 301 | implemented |
| `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | — (410 via `api/gone.js`) | 410 | implemented (changed from a hub 301 to a 410 on 2026-07-19 per the redirect policy — no equivalent article) |
| `/disciple-making-movement-books-top-25-must-reads/` | `/church-planting-movements/` | 301 | implemented |
| `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/` | — (410 via `api/gone.js`) | 410 | implemented (changed from a hub 301 to a 410 on 2026-07-19 per the redirect policy — no equivalent article) |
| `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | 301 | implemented |
| `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | `/movement-resources/strategy-coordinator/` | 301 | implemented |
| `/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | `/content-vs-systems-the-game-changer-for-leadership-development/` | 301 | implemented |
| `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | — (410 via `api/gone.js`) | 410 | implemented (changed from a hub 301 to a 410 on 2026-07-19 per the redirect policy — no equivalent article) |
| `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | 301 | implemented |
| `/filtering-unlock-this-essential-for-disciple-making-movements/` | `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/` | 301 | implemented |
| `/the-leadership-phase-everyone-skips-why-investment-matters/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | 301 | implemented (repointed 2026-07-19 — see "Article removal" section and the redirect policy) |
| `/strategy-coordinator/` (hub retired) | `/movement-resources/strategy-coordinator/` | 301 | implemented |
| `/seven-words-of-jesus-on-the-cross/` | — (true 410 via `api/gone.js`) | 410 | implemented |
| `/bible-passages-about-love-what-scripture-really-says/` | — (true 410 via `api/gone.js`) | 410 | implemented |
| `/5-insightful-keys-into-the-biblical-jesus/` | — (true 410 via `api/gone.js`) | 410 | implemented |

Not yet `verified` in the sense this file otherwise uses that word: confirmed
the destinations exist as real generated pages and confirmed the JSON is
valid, but a live Vercel deploy is needed to confirm each old URL actually
returns the right status code in production (`vercel.json` rules are applied
by Vercel's edge routing, not by `astro build`/`astro preview`, so this can't
be fully exercised from a local build). Recommend a post-deploy smoke test of
all 29 URLs before promoting these rows to `verified`.

## Status as of Phase 8

**Re-reviewed after Tier 3 completion — all 20 rows below remain
valid and unchanged.** With Tier 1, Tier 2, and Tier 3 all fully
migrated (93 pages total), re-checked every proposed redirect in this
file against the final site: all 9 distinct destination hubs still
exist and generate correctly; none of the 20 old archive source paths
(`/category/...`, `/tag/...`) collide with any of the 93 real
generated pages; `URL_INVENTORY.md`'s "Category and tag archive URLs"
section still lists exactly 20 rows, matching this file exactly — no
new archive URLs were discovered during Tier 3. Also reconfirmed: 0
of the 91 migrated content files have a slug that differs from its
own `original_url` path, so no *new* redirects are needed for any
migrated page (Tier 1, 2, or 3) — every exact original WordPress path
was preserved throughout. See `docs/archive/PHASE_8_FULL_SITE_AUDIT.md` §8 for the
full breakdown. **Implemented** as 301s in `vercel.json` during the
pre-cutover redirect cleanup (2026-07-19).

## Status as of Phase 6

**20 redirects — now implemented as 301s in `vercel.json`** — all 7
WordPress category archives and all 13 tag archives, each 301'd to
its closest matching hub page. See `docs/archive/PHASE_6_ARCHIVE_URL_DECISION.md`
for the full evidence and per-URL reasoning (all 20 have 0 GSC clicks
despite having impressions — the classic thin-taxonomy-page signature
— and a stronger, curated hub replacement already exists for every
topic). These are the rows below, implemented in `vercel.json` during
the pre-cutover redirect cleanup (2026-07-19).

Author and date archive URLs were checked (GSC export, WordPress
export, live sitemap index) and found to have **zero presence in any
source** — no rows, no sitemap entries, no content. Recommended
default is allow 404/410 once live, not a redirect; no rows added
here since there's no confirmed URL to redirect *from*.

`/movement-resources/` and its 2 real children
(`/movement-resources/strategy-coordinator/`,
`/movement-resources/4-fields-toolbox/`) were **not archives** — real
WordPress content pages (confirmed via the export: real
`post_parent`/`post_type`/body content), both migrated in Phase 9 at
their exact existing URLs. No redirect involved.

`/blog/` is recommended to become a real Astro index page (not a
redirect target) — see `docs/archive/PHASE_6_ARCHIVE_URL_DECISION.md` section 5.

### Archive (taxonomy) redirects (implemented)

| Old URL | New URL / destination | Type | Reason | Status |
|---|---|---|---|---|
| `/category/movements/` | `/church-planting-movements/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/category/four-fields-training/` | `/four-fields/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/category/entry-strategies/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/category/discipleship-tools/` | `/disciple-making/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/category/missionary-strategies/` | `/movement-resources/strategy-coordinator/` | 301 | Taxonomy archive, 0 clicks; retargeted to the live resource page (the old `/strategy-coordinator/` hub is itself 301'd, so this avoids a chain) | implemented |
| `/category/spiritual-gifts/` | `/jesus-and-the-twelve/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/category/great-commission/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/apostle/` | `/jesus-and-the-twelve/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/conversation-quadrant/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/disciple-making-movement/` | `/church-planting-movements/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/sustainable-disciple-making/` | `/disciple-making/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/oikos-mapping/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/disciple-making/` | `/disciple-making/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/community/` | `/simple-church/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/apostolic/` | `/jesus-and-the-twelve/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/hybrid-model/` | `/simple-church/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/revival/` | `/church-planting-movements/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/prayer-walking/` | `/prayer/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/precision-harvesting/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | implemented |
| `/tag/15-second-testimony-examples/` | `/15-second-testimony-examples-ignite-your-faith/` | 301 | Exact 1:1 successor article exists (the tag names a single article); redirect to that article, not the `/testimony/` hub, to preserve the "15 second testimony examples" query intent. Fixed 2026-07-19 after a Google result was landing on the hub | implemented |

## Pre-cutover redirect cleanup (2026-07-19) — implemented

Final disposition for every remaining old URL that had neither a
same-path page nor a redirect (all 35 were 0 clicks / 0 impressions in
GSC). All rows below are **implemented** in `vercel.json`: 301s in the
`redirects` array (explicit `statusCode: 301`), 410s via the `rewrites`
array pointing at `api/gone.js`. Audited: no chains, no loops, every
301 target is a built 200 page, no redirect points at the homepage.

### Clear 1:1 renames — 301

| Old URL | New URL | Type | Status |
|---|---|---|---|
| `/about-us/` | `/about/` | 301 | implemented |
| `/start/` | `/start-here/` | 301 | implemented |
| `/start-here-2/` | `/start-here/` | 301 | implemented |
| `/training/` | `/free-training/` | 301 | implemented |
| `/kingdom-ministry-catalyst-training/` | `/kingdom-ministry-training/` | 301 | implemented |
| `/4-fields/` | `/four-fields/` | 301 | implemented |
| `/neighborhood-prayer-walking-guide-ignite-your-faith/` | `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/` | 301 | implemented |
| `/discipleship-habit-formation-guide/` | `/the-3-core-habits-of-a-disciple/` | 301 | implemented |

### Legacy articles — 301 only where a surviving page substantially answers the same intent; else 410

| Old URL | Disposition | Rationale |
|---|---|---|
| `/how-to-share-the-gospel-with-friends-and-family-members/` | 301 → `/how-to-evangelize-ultimate-step-by-step-guide/` | Same how-to-share-the-gospel intent |
| `/unleashing-the-power-of-pauls-methods-how-to-multiply-apostolic-leaders-in-the-modern-church/` | 301 → `/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church/` | Same Paul's-multiplication-method intent |
| `/what-is-a-disciple-making-movement-and-why-does-it-matter/` | 301 → `/disciple-making-movement-dmm-key-characteristics-and-definition/` | Same DMM-definition intent |
| `/are-disciple-making-movements-anti-institutional/` | 301 → `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | "Anti-institutional" is one of the objections this page answers |
| `/how-to-revitalize-christian-revival-with-disciple-making/` | 410 | No surviving page substantially covers "revival"; no vague-hub redirect |
| `/empowering-transformation-unleashing-the-power-of-making-disciples/` | 410 | Generic; no specific surviving equivalent |
| `/how-leaders-make-decisions-in-uncertainty/` | 410 | Decision-making-under-uncertainty not covered by any surviving page |
| `/how-to-overcome-the-effects-of-movement-method-inoculation/` | 410 | Niche "method inoculation" topic; no equivalent |
| `/strategic-persistence-how-to-plan-for-decades-and-live-for-today/` | 410 | No specific surviving equivalent |
| `/is-your-strategy-blinding-you-to-gods-harvest/` | 410 | Reflective piece; no page substantially answers the framing |

### Retired sticker products — 301 (category `/stickers/` survives)

| Old URL | New URL | Status |
|---|---|---|
| `/the-four-fields-sticker-simple/` | `/the-four-fields-sticker-simple-2x2/` | implemented (specific surviving product) |
| `/2-kingdoms-stickers/` | `/stickers/` | implemented |
| `/3-circles-stickers-2x2/` | `/stickers/` | implemented |
| `/3-circles-stickers-with-qr-code/` | `/stickers/` | implemented |
| `/the-church-circle-10-sticker/` | `/stickers/` | implemented |

### `/get-coaching/` — evaluated separately → 301

`/get-coaching/` → `/contact-us/` (301). The Connect page collects
"Getting trained to make disciples" interest plus a free-text message and
promises a personal follow-up, which genuinely supports a coaching
request — so a redirect is appropriate rather than a 410.

### Retired transactional / utility / merch — 410 (no real replacement)

`/cart/`, `/checkout/`, `/my-account/`, `/1-hour-training-seat-saved/`,
`/10321-2/`, `/links/`, `/2025-family-wall-calendar/`, `/christ-clothing/`,
`/christian-clothing-apparel/`, `/return-policy/`, `/terms-and-conditions/`
— all 410 via `api/gone.js`. No current equivalent exists for any of
these (the site has a `/privacy-policy/` but no return/terms page).

## Status as of Phase 5

**No redirects are currently planned.** The Phase 5 protected URL
audit (`docs/archive/PHASE_5_PROTECTED_URL_AUDIT.md`) re-confirmed, via a scripted
diff against the generated `dist/` output, that all 34 migrated
tier-1/tier-2 URLs are live at their exact original WordPress path —
zero renames, zero merges, zero redirects needed. This file remains
correctly empty.

## Status as of Phase 4 Batch 4

**No redirects are currently planned.** Nothing has been renamed, merged,
or removed — including through Phase 3, which migrated 7 more tier-1
pages (all at their exact original real URLs, several of which differed
from what the migration brief originally guessed — see the corrections
table in `docs/archive/PROTECTED_URLS.md`; those were caught and fixed *before*
publishing, not via redirect), and through Phase 4 Batches 1-4, which
migrated all 22 tier-2 pages (see `docs/archive/PHASE_4_TIER_2_BATCH_PLAN.md`),
again all at their exact original real URLs with no slug changes, no
merges, and no collisions with existing hub or protected URLs. This
includes the 2 pages that shared a deferred "Won't fix" media file and
the 1 page with a featured-image filename mismatch migrated in Batch
3, and the Batch 4 page (`/stickers/`) which despite a nonstandard
product-page layout decision and a resolved missing-media flag, was
still preserved at its exact original URL with no redirect needed —
none of these required a redirect or slug change, only documented
layout/media-handling decisions (see `MEDIA_ACQUISITION_CHECKLIST.md`
and `docs/archive/MIGRATION_PLAN.md`). All URLs in `URL_INVENTORY.md` are being
preserved at their exact original path. Tier 2 is now 100% migrated
(22 of 22). This file exists as the mechanism for the *future* case
where a path genuinely cannot be preserved (see rule 8 in the brief's
SEO rules).

## Article removal (2026-07-12) — the-leadership-phase-everyone-skips-why-investment-matters

Removed at the site owner's request during Batch 3 of the field-manual-v2
rollout (not part of the 2026-07-11 content-simplification pass above).

| Old URL | New URL / destination | Type | Reason | Status |
|---|---|---|---|---|
| `/the-leadership-phase-everyone-skips-why-investment-matters/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | 301 | Article deleted. **Repointed 2026-07-19** from the `/church-planting-movements/` hub to the article — same leadership-investment cluster, and the exact successor the two sibling redirects below already use. Under the redirect policy an article may not fall back to a hub | implemented |

Two existing redirects that previously pointed *at* this now-deleted article
were repointed to the closest surviving match (same investment/leadership-
pipeline theme):

| Old URL | Previous destination | New destination | Status |
|---|---|---|---|
| `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | `/the-leadership-phase-everyone-skips-why-investment-matters/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | implemented |
| `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | `/the-leadership-phase-everyone-skips-why-investment-matters/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | implemented |

Also removed as a `related_articles`/`key_articles` entry from: the
`church-planting-movements` hub, `jesus-the-leader-examining-...`,
`the-secret-ingredient-of-trustworthy-leaders-...`,
`content-vs-systems-the-game-changer-...`, and
`setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting`.

## Format for future entries

| Old URL | New URL / destination | Type | Reason | Status |
|---|---|---|---|---|
| _(none yet)_ | | 301 | | pending / implemented / verified |

- **Type**: almost always `301` (permanent). Never use a 302 for a
  permanent content move.
- **Reason**: why the old path couldn't be preserved (e.g. genuine
  duplicate, WordPress-only URL like `?p=123`, taxonomy path with no
  Astro equivalent).
- **Status**:
  - `pending` — identified, not yet implemented anywhere.
  - `implemented` — redirect rule exists in the hosting config
    (Netlify `_redirects`, Vercel `vercel.json`, etc. — not yet chosen).
  - `verified` — tested live, returns 301 and lands on the right page.

## Hosting note

This repo doesn't yet specify a hosting provider. Whichever is chosen
(Netlify, Vercel, Cloudflare Pages, etc.) needs a redirects config file
added at that time — do not rely on client-side or meta-refresh
redirects, which are not equivalent for SEO.

## Before launch

`LAUNCH_CHECKLIST.md` requires every row in this file to be `verified`,
and requires confirming there are no entries silently missing (cross-check
against every `not-migrated` URL in `URL_INVENTORY.md` once the full
sitemap/GSC export is in).

## Media paths (absorbed from docs/archive/MEDIA_URLS_TO_PRESERVE.md, 2026-07-12)

Old `/wp-content/uploads/...` media paths (PDFs, images) can rank in
Google Images, earn direct impressions, and be hotlinked — every such
path must be **preserved exactly** (the file lives at the same path
under `public/`) or **301-redirected here**, never silently dropped.
Astro serves `public/` files at the same root-relative path, so
preservation is the default and requires no redirect entry.
Per-file status lives in MEDIA_ACQUISITION_CHECKLIST.md (the
authoritative media table); the original path inventory is archived
at docs/archive/MEDIA_URLS_TO_PRESERVE.md.
