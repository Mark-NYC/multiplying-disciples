# Redirects

Every old URL must either exist in Astro at the exact same path, or have
a planned 301 documented here before launch. This file is the single
source of truth for redirects — do not launch with an entry still marked
`pending`.

## Status as of Phase 3

**No redirects are currently planned.** Nothing has been renamed, merged,
or removed — including through Phase 3, which migrated 7 more tier-1
pages (all at their exact original real URLs, several of which differed
from what the migration brief originally guessed — see the corrections
table in `PROTECTED_URLS.md`; those were caught and fixed *before*
publishing, not via redirect). All URLs in `URL_INVENTORY.md` are being
preserved at their exact original path. This file exists as the
mechanism for the *future* case where a path genuinely cannot be
preserved (see rule 8 in the brief's SEO rules).

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
