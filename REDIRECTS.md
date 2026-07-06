# Redirects

Every old URL must either exist in Astro at the exact same path, or have
a planned 301 documented here before launch. This file is the single
source of truth for redirects — do not launch with an entry still marked
`pending`.

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
