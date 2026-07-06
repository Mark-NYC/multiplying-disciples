# Media URLs to Preserve

WordPress media (PDFs, images) can rank in Google Images or get direct
impressions/clicks, and other pages/sites may hotlink to the exact path.
Old `/wp-content/uploads/...` paths must be preserved exactly, or 301
redirected — never just dropped.

Source data: the WordPress export XML and the Google Search Console Pages
CSV supplied on 2026-07-06. No binary media files have been supplied yet
— only their paths and metadata are known. See `/imports/README.md`.

**Phase 3 update:** the 7 Tier 1 pages migrated in Phase 3 (see
`PHASE_3_TIER_1_BATCH.md`) added 42 more media files hosted on
multiplyingdisciples.us, none supplied yet. `MEDIA_ACQUISITION_CHECKLIST.md`
is now the single authoritative, up-to-date table for every media file
across every migrated page (103 files total) — this file's tables below
cover the original 5 Phase 1/2 pages only and are kept for history.
`/movement-resources/12-practice-church-circle/` also links to 12 images
correctly hosted on `obey.tools` (the sister site) — those are external
and need no local preservation.

## How this works in Astro

Static files placed under `public/` are served at the same path relative
to the site root. So a file at:

```
public/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf
```

is served at:

```
https://multiplyingdisciples.us/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf
```

— identical to the WordPress URL. No redirect needed if the file is
physically present at that path. Every migrated article's image `src`
already points at its final relative `/wp-content/uploads/...` path in
anticipation of this.

## Media with confirmed Search Console impressions (real data)

Ranked by impressions. `Church-Waffle-English-04-2023.pdf` in particular
has a very high CTR (16.71%) for a PDF — worth prioritizing.

| Media path | Used by (migrated pages) | Clicks | Impressions |
|---|---|---:|---:|
| `/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf` | not on a migrated page yet | 58 | 347 |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | `/discover-the-12-disciples-of-jesus-christ/` | 0 | 266 |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | featured image for `/discover-the-12-disciples-of-jesus-christ/` | 0 | 89 |
| `/wp-content/uploads/2023/06/Virtual-Training-Packet.pdf` | not on a migrated page yet | 0 | 41 |
| `/wp-content/uploads/2023/05/Church-Waffle-English-112222-1.pdf` | not on a migrated page yet | 0 | 36 |
| `/wp-content/uploads/2023/04/4-Fields-Toolbox-Updated-03.31.23.pdf` | not on a migrated page yet | 0 | 36 |
| `/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1.webp` | featured image for `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 10 |
| `/wp-content/uploads/2023/09/3-Circles-Sticker-QR-Code.pdf` | not on a migrated page yet | 0 | 5 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-5.jpg` | `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 5 |
| `/wp-content/uploads/2025/11/Bible-Verse-About-Spreading-the-Gospel-Matthew-28.18-20-Great-Commission-Infographic.webp` | not on a migrated page yet | 0 | 4 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible.webp` | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 0 | 4 |
| `/wp-content/uploads/2025/11/Bible-Verses-About-Spreading-the-Gospel-Complete-Scripture-Guide.webp` | not on a migrated page yet | 0 | 4 |
| `/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | not on a migrated page yet | 0 | 3 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-3.jpg` | `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 3 |
| `/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | not on a migrated page yet | 0 | 3 |
| `/wp-content/uploads/2023/05/Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.webp` | `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 2 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1.jpg` | `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 2 |
| `/wp-content/uploads/2025/11/Testimony-in-the-bible.webp` | not on a migrated page yet | 0 | 2 |
| `/wp-content/uploads/2023/05/Screen-Shot-2023-08-16-at-8.47.48-AM-1024x499.png` | not on a migrated page yet | 0 | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-4.jpg` | `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-1.jpg` | `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 1 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | not on a migrated page yet | 0 | 1 |
| `/wp-content/uploads/2023/04/3-5.jpg` | `/discover-the-12-disciples-of-jesus-christ/` | 0 | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-2.jpg` | `/the-three-circles-gospel-presentation-step-by-step/` | 0 | 1 |

## Additional media referenced by the 5 migrated pages (no individual GSC data yet)

These don't show up in the known Pages export individually (0 recorded
impressions), but they're real images embedded in real migrated content
— the 12-disciples article alone references ~24 numbered per-disciple
thumbnails.

| Media path | Used by |
|---|---|
| `/wp-content/uploads/2023/04/8-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/2-4-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/05/4-1-1-YFC-5-e1684599818569.png` | `/15-second-testimony-examples-ignite-your-faith/` |
| `/wp-content/uploads/2025/03/maxresdefault-7-1024x576.jpg` | `/` (homepage) |
| `/wp-content/uploads/2023/04/1-4-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/11-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-3.webp` | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` |
| `/wp-content/uploads/2023/04/6-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/9-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/12-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/05/Copy-of-Experience-confidence-in-your-disciple-making-1.png` | `/` (homepage) |
| `/wp-content/uploads/2023/04/2-5.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2026/02/Multiply-disciples-in-real-life.webp` | `/` (homepage, not currently used in the lightly-simplified version) |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-47-1024x1024.webp` | `/` (homepage, not currently used) |
| `/wp-content/uploads/2023/04/5-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/10-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/11-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-48-1024x1024.webp` | `/` (homepage, not currently used) |
| `/wp-content/uploads/2025/01/e3adfe1623cfb8a49a60f903b1515adb.Screen-Shot-2023-08-05-at-8.26.31-AM-1.webp` | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` |
| `/wp-content/uploads/2023/04/7-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/05/1-1.webp` | `/` (homepage, not currently used) |
| `/wp-content/uploads/2023/04/5-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2025/03/gen-z-bible-study.jpg` | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` |
| `/wp-content/uploads/2023/04/8-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/1-5.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/05/4-1-1-YFC-e1684600391124-768x430.jpg` | `/15-second-testimony-examples-ignite-your-faith/` |
| `/wp-content/uploads/2023/04/7-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/05/4-1-1-YFC-1-e1684600816203.jpg` | `/15-second-testimony-examples-ignite-your-faith/` |
| `/wp-content/uploads/2023/04/4-2.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2025/01/Untitled-design-52.webp` | `/` (homepage, not currently used) |
| `/wp-content/uploads/2023/05/Untitled-design-2025-01-13T131631.873-1024x1024.png` | `/the-three-circles-gospel-presentation-step-by-step/` |
| `/wp-content/uploads/2023/04/12-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/06/1-2-1-1.png` | `/` (homepage, not currently used) |
| `/wp-content/uploads/2023/04/6-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/10-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/9-1.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/06/1-2-1-1-1.png` | `/` (homepage, not currently used) |
| `/wp-content/uploads/2023/04/4-1-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |
| `/wp-content/uploads/2023/04/3-4-1024x1024.jpg` | `/discover-the-12-disciples-of-jesus-christ/` |

## Process once files are supplied

1. Drop files into `imports/media/` preserving their original
   year/month subfolder structure (e.g. `imports/media/2025/01/...webp`).
2. Move (don't re-encode or rename) into
   `public/wp-content/uploads/<year>/<month>/<filename>` — the exact
   paths above.
3. Confirm each migrated article's image `src` (already written as the
   final relative path) resolves.
4. Mark rows above as preserved and cross-reference in `URL_INVENTORY.md`.

## If a media URL truly cannot be preserved

Document it in `REDIRECTS.md` with a planned 301 from the old path to
wherever the asset now lives. Do not let a media URL 404.
