# Redirects

Every old URL must either exist in Astro at the exact same path, or have
a planned 301 documented here before launch. This file is the single
source of truth for redirects — do not launch with an entry still marked
`pending`.

## Content simplification (2026-07-11) — 26 article redirects, 3 retirements, 1 hub retirement

Positioning shift from "disciple-making encyclopedia" to a practice-first
field manual. 29 thin/generic articles removed; full rationale, search-intent
confidence rating, and GSC clicks/impressions for every row are in
`CONTENT_SIMPLIFICATION_REMOVAL_MANIFEST.md`. Unlike every row below this
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
| `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | `/church-planting-movements/` | 301 | implemented |
| `/disciple-making-movement-books-top-25-must-reads/` | `/church-planting-movements/` | 301 | implemented |
| `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/` | `/church-planting-movements/` | 301 | implemented |
| `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | 301 | implemented |
| `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | `/movement-resources/strategy-coordinator/` | 301 | implemented |
| `/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | implemented |
| `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | `/content-vs-systems-the-game-changer-for-leadership-development/` | 301 | implemented |
| `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | `/church-planting-movements/` | 301 | implemented |
| `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/` | 301 | implemented |
| `/filtering-unlock-this-essential-for-disciple-making-movements/` | `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/` | 301 | implemented |
| `/the-leadership-phase-everyone-skips-why-investment-matters/` | `/church-planting-movements/` | 301 | implemented |
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
was preserved throughout. See `PHASE_8_FULL_SITE_AUDIT.md` §8 for the
full breakdown. Still `pending` — not implemented anywhere.

## Status as of Phase 6

**20 redirects proposed (not yet implemented anywhere)** — all 7
WordPress category archives and all 13 tag archives, each 301'd to
its closest matching hub page. See `PHASE_6_ARCHIVE_URL_DECISION.md`
for the full evidence and per-URL reasoning (all 20 have 0 GSC clicks
despite having impressions — the classic thin-taxonomy-page signature
— and a stronger, curated hub replacement already exists for every
topic). These are added below as `pending` rows: identified and
documented, but no hosting/redirect config exists yet to implement
them in (see "Hosting note" below, unchanged from earlier phases).

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
redirect target) — see `PHASE_6_ARCHIVE_URL_DECISION.md` section 5.

### Proposed archive redirects (pending)

| Old URL | New URL / destination | Type | Reason | Status |
|---|---|---|---|---|
| `/category/movements/` | `/church-planting-movements/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/category/four-fields-training/` | `/four-fields/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/category/entry-strategies/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/category/discipleship-tools/` | `/disciple-making/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/category/missionary-strategies/` | `/strategy-coordinator/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/category/spiritual-gifts/` | `/jesus-and-the-twelve/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/category/great-commission/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/apostle/` | `/jesus-and-the-twelve/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/conversation-quadrant/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/disciple-making-movement/` | `/church-planting-movements/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/sustainable-disciple-making/` | `/disciple-making/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/oikos-mapping/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/disciple-making/` | `/disciple-making/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/community/` | `/simple-church/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/apostolic/` | `/jesus-and-the-twelve/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/hybrid-model/` | `/simple-church/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/revival/` | `/church-planting-movements/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/prayer-walking/` | `/prayer/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/precision-harvesting/` | `/share-the-gospel/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |
| `/tag/15-second-testimony-examples/` | `/testimony/` | 301 | Taxonomy archive, 0 clicks, stronger hub replacement exists | pending |

## Status as of Phase 5

**No redirects are currently planned.** The Phase 5 protected URL
audit (`PHASE_5_PROTECTED_URL_AUDIT.md`) re-confirmed, via a scripted
diff against the generated `dist/` output, that all 34 migrated
tier-1/tier-2 URLs are live at their exact original WordPress path —
zero renames, zero merges, zero redirects needed. This file remains
correctly empty.

## Status as of Phase 4 Batch 4

**No redirects are currently planned.** Nothing has been renamed, merged,
or removed — including through Phase 3, which migrated 7 more tier-1
pages (all at their exact original real URLs, several of which differed
from what the migration brief originally guessed — see the corrections
table in `PROTECTED_URLS.md`; those were caught and fixed *before*
publishing, not via redirect), and through Phase 4 Batches 1-4, which
migrated all 22 tier-2 pages (see `PHASE_4_TIER_2_BATCH_PLAN.md`),
again all at their exact original real URLs with no slug changes, no
merges, and no collisions with existing hub or protected URLs. This
includes the 2 pages that shared a deferred "Won't fix" media file and
the 1 page with a featured-image filename mismatch migrated in Batch
3, and the Batch 4 page (`/stickers/`) which despite a nonstandard
product-page layout decision and a resolved missing-media flag, was
still preserved at its exact original URL with no redirect needed —
none of these required a redirect or slug change, only documented
layout/media-handling decisions (see `MEDIA_ACQUISITION_CHECKLIST.md`
and `MIGRATION_PLAN.md`). All URLs in `URL_INVENTORY.md` are being
preserved at their exact original path. Tier 2 is now 100% migrated
(22 of 22). This file exists as the mechanism for the *future* case
where a path genuinely cannot be preserved (see rule 8 in the brief's
SEO rules).

## Article removal (2026-07-12) — the-leadership-phase-everyone-skips-why-investment-matters

Removed at the site owner's request during Batch 3 of the field-manual-v2
rollout (not part of the 2026-07-11 content-simplification pass above).

| Old URL | New URL / destination | Type | Reason | Status |
|---|---|---|---|---|
| `/the-leadership-phase-everyone-skips-why-investment-matters/` | `/church-planting-movements/` | 301 | Article deleted; no single surviving article fully replaces its Identify/Equip/Invest/Entrust framework, so it falls back to the hub | implemented |

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
