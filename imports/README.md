# Imports — status and what's still needed

## Received (2026-07-06)

The user supplied these directly as uploaded files (not placed in this
folder, since they came through chat rather than the repo):

- **Google Search Console Pages export (CSV)** — 179 rows, last 3 months.
  Used to compute real tiers in `URL_INVENTORY.md` / `PROTECTED_URLS.md`.
- **Google Search Console Queries export (CSV)** — 1,000 rows of
  query-level data. Not yet mined beyond the 15-second-testimony
  article's target-query list; available for future keyword mapping.
- **Google Search Console Search Appearance export (CSV)** — 2 rows
  (Translated results, Product snippets). The "Product snippets" row
  (107 impressions) suggests at least one page carries Product schema,
  likely a sticker/merch page under WooCommerce.
- **WordPress export XML** (`Tools → Export → All Content`) — 122
  published posts/pages, 1,124 media attachments (metadata/URLs only, no
  binary files), reusable blocks, nav menus. This is what let the 5
  Phase 1 batch pages get real content.
- **Sitemap index XML** — confirms the live sitemap structure
  (`post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`,
  `post_tag-sitemap.xml`, `gblocks_pattern_collections-sitemap.xml`) but
  not the individual sub-sitemaps themselves.

This closed the network-access gap described in `MIGRATION_PLAN.md` for
everything except binary media files.

## Still needed

### 1. Media binary files

The WordPress export gives media *paths and metadata* (via attachment
records) but not the actual image/PDF bytes. See
`MEDIA_URLS_TO_PRESERVE.md` for the full list — 24 files with confirmed
Search Console impressions, ~39 more referenced by the 5 migrated pages.
Highest priority:

- `2023/04/Church-Waffle-English-04-2023.pdf` (58 clicks, 16.71% CTR)
- `2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` (featured image, #1 page)
- `2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` (266 impressions)
- `2023/05/3-Circles-Gospel-Presentation-1.webp` (featured image)
- `2025/11/short-christian-testimony-examples.webp` (featured image)
- `2025/11/7-Stories-of-Hope-in-the-Bible-1.webp` (featured image)

Drop these into `imports/media/`, preserving the `<year>/<month>/`
subfolder structure, e.g. `imports/media/2023/04/Church-Waffle-English-04-2023.pdf`.
From there they get moved (not re-encoded) into
`public/wp-content/uploads/...` so the URL is preserved exactly.

### 2. Individual sitemap sub-files (optional — the WordPress export already substitutes for this)

`post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`,
`post_tag-sitemap.xml` would give an independent cross-check against the
WordPress export's 122-page list, and would include the individual
category/tag archive URLs already documented in `URL_INVENTORY.md` from
the GSC export instead. Not blocking — nice to have for verification.

### 3. Real content for the remaining ~117 published pages

The WordPress export already contains this — it just hasn't been
processed into Astro content files yet. This is Phase 3 work
(`MIGRATION_PLAN.md`), not blocked on anything further from the user.

## What happens next

1. Supply media binaries (item 1 above) → move into `public/wp-content/uploads/...`.
2. Phase 3: process the remaining ~117 pages from the WordPress export
   into `src/content/articles/` following the same pattern as the 5
   Phase 1 batch pages (real content, light cleanup, no rewrite).
3. Any URL that genuinely can't be preserved gets a documented 301 in
   `REDIRECTS.md`.
4. Once 100% of real URLs exist in Astro or are redirected, work through
   `LAUNCH_CHECKLIST.md`.
