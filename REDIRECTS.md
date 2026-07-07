# Redirects

Every old URL must either exist in Astro at the exact same path, or have
a planned 301 documented here before launch. This file is the single
source of truth for redirects — do not launch with an entry still marked
`pending`.

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
