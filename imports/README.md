# Imports — what to provide next

This folder is the drop zone for real source material so Phase 1's
placeholder pages (and the full site inventory) can become real. Nothing
in this repo invents article content — everything migrated must come
from an actual export or a copy you provide.

This build environment has **no outbound internet access** (confirmed:
even unrelated domains fail at the network proxy), so Claude Code cannot
fetch the live site, sitemap, or Search Console data itself. Everything
below has to be supplied manually.

## 1. Google Search Console — Pages export (CSV)

Search Console → Performance → Pages tab → date range: last 3 months (or
longer) → Export → CSV.

This is what turns every `tier-1 (provisional)` / `unknown` row in
`URL_INVENTORY.md` into a real tier-1/2/3 based on actual impressions and
clicks, and is required before the full ~179+ page inventory can be
built out. Drop it at `imports/search-console-pages.csv`.

## 2. WordPress export XML

WP Admin → Tools → Export → All Content → Download Export File.

This gives the full post/page list with real titles, bodies, dates, and
featured images in one file — the most reliable way to get real content
for every page without hand-copying each one. Drop it at
`imports/wordpress-export.xml`.

If dashboard access isn't available, saved HTML per page (see #5) is an
acceptable substitute for individual priority pages.

## 3. `sitemap.xml`, saved manually

Since this environment can't fetch `https://multiplyingdisciples.us/sitemap.xml`
itself, save it manually (open in a browser, View Source, Save As) and
drop it at `imports/sitemap.xml`. If it's a sitemap index (pointing to
sub-sitemaps), save those too, e.g. `imports/sitemap-posts.xml`,
`imports/sitemap-pages.xml`.

This is what lets `URL_INVENTORY.md` grow from 45 known URLs to the full
~179+ (or more) actual URL list.

## 4. Media files

Any media under `/wp-content/uploads/` that ranks, gets impressions, or
is linked from a page being migrated — especially the three already
identified in `MEDIA_URLS_TO_PRESERVE.md`:

- `2023/04/Church-Waffle-English-04-2023.pdf`
- `2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp`
- `2025/01/12-Disciples-of-Jesus-in-Order-Called.webp`

Drop these into `imports/media/`, preserving the `<year>/<month>/`
subfolder structure, e.g.:

```
imports/media/2023/04/Church-Waffle-English-04-2023.pdf
imports/media/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp
```

From there they get moved (not re-encoded) into
`public/wp-content/uploads/...` so the URL is preserved exactly.

## 5. Saved HTML for top-performing pages (optional but helpful)

For the highest-priority pages — especially the 6 "especially important"
ones in `PROTECTED_URLS.md` — a saved copy of the rendered page (browser
→ Save Page As → "Webpage, HTML Only", or View Source) is enough to
extract real body copy, headings, and existing internal links without
needing the full WordPress export. Drop these at
`imports/pages/<slug>.html`.

## What happens once these are provided

1. `URL_INVENTORY.md` and `PROTECTED_URLS.md` get rebuilt from the real
   sitemap + GSC data, with real tiers instead of "provisional."
2. The 5 `status: source-pending` placeholders in
   `src/content/articles/` and `src/pages/index.astro` get replaced with
   real content, lightly improved per `MIGRATION_PLAN.md` (not
   rewritten).
3. Media files move into `public/wp-content/uploads/...` at their exact
   original paths.
4. Any URL that genuinely can't be preserved gets a documented 301 in
   `REDIRECTS.md`.
5. Phase 3 (full site migration) can start from a complete inventory
   instead of the current 45-URL known subset.
