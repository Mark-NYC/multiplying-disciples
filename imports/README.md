# Imports — status and what's still needed

## Received (2026-07-06)

The user supplied these directly as uploaded files (not placed in this
folder, since they came through chat rather than the repo):

- **Google Search Console Pages export (CSV)** — 179 rows, last 3 months.
  Used to compute real tiers in `URL_INVENTORY.md` / `PROTECTED_URLS.md`.
- **Google Search Console Queries export (CSV)** — 1,000 rows of
  query-level data. Not yet mined beyond a couple of articles' target-query
  lists; available for future keyword mapping.
- **Google Search Console Search Appearance export (CSV)** — 2 rows
  (Translated results, Product snippets). The "Product snippets" row
  (107 impressions) suggests at least one page carries Product schema,
  likely a sticker/merch page under WooCommerce.
- **WordPress export XML** (`Tools → Export → All Content`) — 122
  published posts/pages, 1,124 media attachments (metadata/URLs only, no
  binary files), reusable blocks, nav menus. This is what let all 12
  real tier-1 pages get real content (Phases 2–3).
- **Sitemap index XML** — confirms the live sitemap structure
  (`post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`,
  `post_tag-sitemap.xml`, `gblocks_pattern_collections-sitemap.xml`) but
  not the individual sub-sitemaps themselves. See
  `SLUG_VERIFICATION_AUDIT.md` for why this gap turned out not to matter
  for the slug questions it was originally meant to resolve.

This closed the network-access gap described in `MIGRATION_PLAN.md` for
everything except binary media files.

## Received (2026-07-06, later same day): first media month folder

The `2023/02` month folder (559 files) was supplied as a zip
(`f8b393f4-02.zip`), extracted, and moved into
`public/wp-content/uploads/2023/02/` — exact original filenames, no
re-encoding, no flattening. The zip itself was not committed (only its
extracted contents; the zip is also now covered by a `.gitignore` rule
for `imports/*.zip`).

Only one file tracked in `MEDIA_IMPORT_PLAN.md` falls in this folder
(`nonresident-JTW6AUbCLC4-unsplash-3-1.jpg`, Priority C, needed by two
not-yet-migrated tier-2 pages) — the upload has 23 differently-suffixed
size variants of that image but not the exact tracked filename. No
Priority A or B files exist in `2023/02`, so this doesn't affect any
currently-migrated page.

**Decision (2026-07-06): will not chase this file further.** Marked
"Won't fix" in `MEDIA_IMPORT_PLAN.md`. Left blank pending a redesign of
the two tier-2 pages that reference it
(`4-stages-of-movement-unlock-your-next-steps`,
`breakthrough-guide-for-a-modern-day-disciple`) — not requested in any
future upload batch.

## Received (2026-07-06, third upload): second media month folder

The `2023/04` month folder (47 files) was supplied as a zip
(`32f2a13d-media202304priority.zip`), extracted, and moved into
`public/wp-content/uploads/2023/04/` — exact original filenames, no
re-encoding, no flattening. The zip itself was not committed.

**All 47 tracked files in this folder matched exactly** (4 Priority A,
35 Priority B, 8 Priority C) — every row flipped to "Yes" in
`MEDIA_IMPORT_PLAN.md` and the 39 of them also tracked in
`MEDIA_ACQUISITION_CHECKLIST.md` flipped there too. `astro build` was
re-run clean (23 pages, no new errors) and the `dist/` output for the
three live pages using `2023/04` assets (12-disciples, unlocking-APEST,
three-thirds) was spot-checked — every referenced image path resolves
to a file that now exists on disk. This fixes every previously-broken
image on those three pages sourced from `2023/04`.

## Received (2026-07-06, fourth upload): third media month folder

The `2023/05` month folder (39 files) was supplied as a zip
(`4ec8866e-media202305priority.zip`), extracted, and moved into
`public/wp-content/uploads/2023/05/` — exact original filenames, no
re-encoding, no flattening. The zip itself was not committed.

**All 39 tracked files in this folder matched exactly** (10 Priority A,
9 Priority B, 20 Priority C) — every row flipped to "Yes" in
`MEDIA_IMPORT_PLAN.md` and the 19 of them also tracked in
`MEDIA_ACQUISITION_CHECKLIST.md` flipped there too. `astro build` was
re-run clean (23 pages, no new errors) and the `dist/` output for the
five live pages using `2023/05` assets (homepage, three-circles guide,
how-to-evangelize, 15-second-testimony, three-thirds) was spot-checked
— every referenced image path resolves to a file that now exists on
disk. This fixes every previously-broken image on those five pages
sourced from `2023/05`.

## Received (2026-07-06, fifth upload): fourth media month folder

The `2023/06` month folder (3 files) was supplied as a zip
(`586eff88-wpcontent.zip`), which also contained macOS `.DS_Store` and
`__MACOSX/` junk entries — these were excluded during extraction
(`unzip -x "__MACOSX/*" "*.DS_Store"`) and never touched the repo. The 3
real files were moved into `public/wp-content/uploads/2023/06/` — exact
original filenames, no re-encoding, no flattening. The zip itself was
not committed.

**All 3 tracked files in this folder matched exactly** (1 Priority A —
`Virtual-Training-Packet.pdf` — and 2 Priority B, both tagged to the
homepage) — every row flipped to "Yes" in `MEDIA_IMPORT_PLAN.md` and
`MEDIA_ACQUISITION_CHECKLIST.md`. `astro build` was re-run clean (23
pages, no new errors); confirmed the 2 Priority B images aren't
currently embedded in the homepage's rendered output or source content,
so this upload doesn't fix any visibly-broken image today — it's
collected ahead of need, same as the doc's pre-existing "not currently
used" annotation already said.

## Received (2026-07-06, sixth upload): fifth media month folder

The `2023/07` month folder (6 files) was supplied as a zip
(`190dda0e-wpcontent.zip`), which again contained macOS `.DS_Store` and
`__MACOSX/` junk — excluded during extraction, never touched the repo.
The 6 real files were moved into `public/wp-content/uploads/2023/07/` —
exact original filenames, no re-encoding, no flattening. The zip itself
was not committed.

**All 6 tracked files in this folder matched exactly** (1 Priority A —
4 SVG icons and header images for `4-stages-of-movement-...` and a
personal-evangelism header — 5 Priority B) — every row flipped to
"Yes" in `MEDIA_IMPORT_PLAN.md`, and the 2 also tracked in
`MEDIA_ACQUISITION_CHECKLIST.md` flipped there too. `astro build` was
re-run clean (23 pages, no new errors). One of the Priority B files,
`personal-evangelism-main-header-1024x576.png`, is genuinely embedded in
the already-live `/how-to-evangelize-ultimate-step-by-step-guide/` page
(despite that checklist's stale "(tier-1, pending)" label — the page
has actually been migrated since Phase 3) — confirmed present in that
page's `dist/` output, so this fixes a real broken image. The rest are
tagged to tier-2 pages not yet migrated, collected ahead of need.

## Received (2026-07-06, seventh upload): sixth media month folder

The `2023/08` month folder was supplied as a zip
(`e1adfedb-wpcontent.zip`), which again contained macOS `.DS_Store` and
`__MACOSX/` junk — excluded during extraction, never touched the repo.
56 real files were moved into `public/wp-content/uploads/2023/08/` —
exact original filenames, no re-encoding, no flattening. The zip itself
was not committed.

**All 5 tracked files in this folder matched exactly** (5 Priority B,
all tagged to the already-live
`/how-to-evangelize-ultimate-step-by-step-guide/` page) — every row
flipped to "Yes" in `MEDIA_IMPORT_PLAN.md` and
`MEDIA_ACQUISITION_CHECKLIST.md`. `astro build` was re-run clean (23
pages, no new errors), and the `dist/` output for that page was
spot-checked — all 5 referenced image paths resolve to files that now
exist on disk. **This fixes 5 real broken images** on that page. The
other 51 files that landed in this folder are untracked
WordPress-generated size variants of the same 4 base screenshots (e.g.
`Screen-Shot-2023-08-07-at-8.24.33-PM-1300x1117.png`) — preserved at
their exact original paths since they're real WordPress media, just not
individually referenced by any known page or GSC row.

## Received (2026-07-06, eighth upload): seventh media month folder

The `2023/09` month folder was supplied as a zip
(`20428b45-wpcontent.zip`), with the same macOS junk pattern excluded
during extraction. 5 real files were moved into
`public/wp-content/uploads/2023/09/` — exact original filenames, no
re-encoding, no flattening. The zip itself was not committed.

**4 of 5 tracked files matched** (1 Priority A —
`3-Circles-Sticker-QR-Code.pdf` — and 3 Priority C, all tagged to
`/stickers/`) — flipped to "Yes" in `MEDIA_IMPORT_PLAN.md`. **Still
missing:** `Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.png`
(Priority C, also for `/stickers/`) — genuinely absent from this
upload, not a naming mismatch this time. No Priority B files exist in
`2023/09`, and `/stickers/` isn't migrated yet, so this upload has zero
effect on any currently-live page either way. `astro build` was re-run
clean (23 pages, no new errors).

## Received (2026-07-06, ninth upload): eighth media month folder

The `2025/11` month folder was supplied as a zip
(`55c17dd9-wpcontent.zip`), with the same macOS junk pattern excluded
during extraction. 136 real files were moved into
`public/wp-content/uploads/2025/11/` — exact original filenames, no
re-encoding, no flattening. The zip itself was not committed.

**All 19 tracked files in this folder matched exactly** (5 Priority A,
13 Priority B, 1 Priority C) — every row flipped to "Yes" in
`MEDIA_IMPORT_PLAN.md`, and the 18 also tracked in
`MEDIA_ACQUISITION_CHECKLIST.md` flipped there too. `astro build` was
re-run clean (23 pages, no new errors), and the `dist/` output was
spot-checked across all 5 affected live pages — every referenced image
path resolves to a file that now exists on disk. **This fixes real
broken images on 5 already-live pages**: 7-stories-of-hope,
bible-verse-about-spreading-the-gospel, testimony-in-the-bible,
how-to-evangelize, and 15-second-testimony. The remaining 2 tracked rows
are for `/the-power-of-sharing-your-testimony-scripture-...`, a tier-2
page not yet migrated. The other 117 files that landed are untracked
size variants and unrelated media in the same month, preserved at their
exact original paths.

## Received (2026-07-06, tenth upload): missing 2023/09 file, resupplied correctly

The one file still missing from `2023/09`
(`Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.png`) was re-uploaded
as a proper file attachment (`647c63eb-wpcontent.zip`, same macOS junk
pattern excluded) after an earlier attempt to paste it inline in chat
couldn't be read as a file. Moved into
`public/wp-content/uploads/2023/09/` at its exact original filename —
**`2023/09` is now fully complete, 6 of 6 tracked rows present** (a
prior count of "5 tracked" for this folder was off by one; corrected in
`MEDIA_IMPORT_PLAN.md`). No Priority B files exist in this folder, so
`/stickers/` (still unmigrated) is the only page affected, and `astro
build` re-ran clean (23 pages, no new errors).

## Decision: `2023/02` near-miss file — won't fix

The one remaining `2023/02` file
(`nonresident-JTW6AUbCLC4-unsplash-3-1.jpg`) will not be chased further
per explicit instruction — marked "Won't fix" in `MEDIA_IMPORT_PLAN.md`
and `MEDIA_ACQUISITION_CHECKLIST.md`. Left blank pending a redesign of
the two tier-2 pages that reference it
(`4-stages-of-movement-unlock-your-next-steps`,
`breakthrough-guide-for-a-modern-day-disciple`) — not re-requested in
any future upload batch.

## Received (2026-07-06, eleventh upload): ninth media month folder

The `2025/01` month folder (375 files landed, same macOS junk pattern
excluded) was supplied as a zip (`e347baa4-wpcontent.zip`) and extracted
into `public/wp-content/uploads/2025/01/` — exact original filenames,
no re-encoding, no flattening. The zip itself was not committed.

**All 23 tracked files in this folder matched exactly** (2 Priority A,
6 Priority B, 15 Priority C) — every row flipped to "Yes" in
`MEDIA_IMPORT_PLAN.md`, and the 8 also tracked in
`MEDIA_ACQUISITION_CHECKLIST.md` flipped there too (that pass also
caught one stale row — `3-Circles-Sticker-QR-Code.pdf`, imported back
in the `2023/09` batch but never flipped in this doc — now corrected).
`astro build` was re-run clean (23 pages, no new errors), and the
`dist/` output was checked precisely: **5 of the 23 tracked files are
genuinely embedded**, fixing real broken images on 3 already-live pages
(discover-the-12-disciples, 12-practice-church-circle,
7-stories-of-hope). 3 more Priority B rows are tagged to the homepage
but confirmed **not** embedded in its rendered output (matches this
folder's existing "not currently used" annotation). The remaining 15
Priority C rows are for 2 tier-2 pages not yet migrated. The other 352
files that landed are untracked size variants and unrelated media in
the same month, preserved at their exact original paths.

## Received (2026-07-06, twelfth upload): tenth media month folder — mostly missed

The `2025/02` month folder was supplied as a zip
(`f8e1dc58-wpcontent.zip`), same macOS junk pattern excluded, and 132
real files were moved into `public/wp-content/uploads/2025/02/`.

**Only 1 of the 9 tracked files in this folder matched**
(`Untitled-design-2025-11-28T172403.122.webp`, Priority C, for a
not-yet-migrated tier-2 page — no live impact). **8 tracked files are
still genuinely missing**, and this is the most consequential gap
found so far:

- **5 Priority B files** needed by the already-live
  `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/`
  page: `5520c44066fbc694ac1c2e207151fe125162f59d.jpeg`,
  `760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg`,
  `Jesus-with-disciples-1024x513.jpg`, `Paul-in-Athens.jpg`,
  `jesus_chooses_twelve_apostles.webp`.
- 3 Priority C files for `/stickers/` (not yet migrated).

The upload appears to be a **thumbnail/crop-only export** — nearly all
132 files that landed are `100x100` or `150x150` size variants. Checked
for near-misses: size-variant versions of most missing filenames do
exist (e.g. `5520c44066fbc694ac1c2e207151fe125162f59d-100x100.jpeg`),
but never the full-size originals the pages actually reference.

**Verified via a fresh `astro build` and `dist/` check: the
`apostles-meaning` page currently has 5 broken images** — this is the
first live-page image break found across all uploads so far. Please
re-upload the full-size originals for those 5 files specifically if
possible (via WordPress Media Library search, or a fresh export of
`2025/02` from the actual `wp-content/uploads/` directory rather than a
thumbnail cache).

## Received (2026-07-06, thirteenth and fourteenth uploads): 2025/10 and 2025/12 folders

Both supplied same-day as separate zips (`d6b2abf8-wpcontent.zip` for
`2025/10`, `13d11966-wpcontent.zip` for `2025/12`), same macOS junk
pattern excluded, extracted into `public/wp-content/uploads/2025/10/`
(35 files) and `public/wp-content/uploads/2025/12/` (61 files).

**All tracked files matched exactly in both folders** — 4 of 4 in
`2025/10`, 5 of 5 in `2025/12`, all Priority C (tagged to `/stickers/`
and `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/`,
both tier-2 pages not yet migrated). No Priority A or B files exist in
either folder, so neither upload affects any currently-live page.
`astro build` re-ran clean (23 pages, no new errors). The remaining
files in each folder are untracked size variants.

## Still open: `2025/02` gap remains the one live-page issue

Resolving the 5 missing `apostles-meaning` files documented above still
takes priority over any other folder, since it's the only known broken
image on a live page right now.

**Next recommended month folder (after that): `2025/03`** — 2 tracked
files remaining (0 Priority A, 2 Priority B, 0 Priority C).

## Still needed: media binary files (this is the one blocking thing)

The WordPress export gives media *paths and metadata* only — never the
actual image/PDF bytes. `MEDIA_IMPORT_PLAN.md` has the full breakdown:
**171 distinct files**, split into:

- **Priority A (24 files)** — have real Search Console impressions
  right now on the live site. Most valuable to get first.
- **Priority B (79 files)** — embedded in the 12 pages already migrated
  and live in this repo. Missing these = broken images on real,
  published pages today.
- **Priority C (68 files)** — will be needed by the 22 real tier-2
  pages once those get migrated (not urgent yet, but nice to have ready).
- **Priority D (0 files)** — nothing here yet.

### How to package this for upload

**Best option: one zip of your WordPress `wp-content/uploads/` folder,
preserving its internal structure.** With 171 files spread across ~15
different year/month subfolders, uploading one archive is much less
error-prone than 171 individual file uploads, and it lets you just grab
the whole folder from your WordPress host (via SFTP, your hosting
control panel's file manager, or a hosting backup) without having to
hunt down each file individually from `MEDIA_IMPORT_PLAN.md` one at a
time.

- **If you can get the whole `wp-content/uploads/` directory:** zip it
  exactly as-is (don't flatten it, don't rename folders) and upload the
  zip. This covers Priority A/B/C/D in one shot and future-proofs Phase
  4+ migrations too, since you won't need to repeat this exercise for
  every future page.
- **If a full export isn't practical** (e.g. you only have dashboard
  access, not file/FTP access): download just the Priority A and
  Priority B files individually from the WordPress Media Library (search
  by filename — every filename is listed in `MEDIA_IMPORT_PLAN.md`) and
  zip those ~103 files instead, preserving their `<year>/<month>/`
  subfolder in the zip (create folders named e.g. `2023/04/`, put the
  matching files inside). Priority C/D can follow later, ahead of Phase
  4.
- **Do not** rename files, re-encode/re-compress images, or convert
  formats (e.g. don't convert `.png` to `.webp`) — the exact filename is
  part of the exact URL that must be preserved.

### Where to place it

Drop the zip (or the extracted folder) at `imports/media-upload/` in
this repo, e.g.:

```
imports/media-upload/wp-content-uploads.zip
```

or, if already extracted:

```
imports/media-upload/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf
imports/media-upload/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp
...
```

Once it's there, the next session will:

1. Extract (if zipped) and verify the folder structure matches
   `wp-content/uploads/<year>/<month>/<filename>`.
2. Cross-check every file present against `MEDIA_IMPORT_PLAN.md`'s
   path list — confirm the filenames match exactly (case-sensitive,
   since URLs are case-sensitive).
3. Move (not copy-and-leave, not re-encode) each matched file into
   `public/wp-content/uploads/<year>/<month>/<filename>` — the exact
   path Astro serves at the exact original URL.
4. Update `MEDIA_IMPORT_PLAN.md` and `MEDIA_ACQUISITION_CHECKLIST.md`,
   flipping "Present?" from "No" to "Yes" for every file actually found,
   and flagging anything listed but still missing.
5. Run `astro build` and spot-check that images actually render on a
   handful of pages (at minimum: the homepage hero image and the
   12-disciples featured image, since that's the highest-traffic page
   on the site).
6. Report back exactly which of the 171 files arrived and which are
   still missing — don't assume the whole zip matched.

### What if some files genuinely don't exist anymore

If a file was deleted from the WordPress media library and truly can't
be recovered, say so explicitly rather than leaving it silently missing
— it needs either a substitute image or a documented decision in
`REDIRECTS.md`/`MEDIA_IMPORT_PLAN.md` that the reference will be removed
from the page instead.

## Other still-open items (not blocking)

### Individual sitemap sub-files (optional)

`post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`,
`post_tag-sitemap.xml` would give an independent cross-check against the
WordPress export's 122-page list, and would include the individual
category/tag archive URLs already documented in `URL_INVENTORY.md` from
the GSC export instead. Not blocking — `SLUG_VERIFICATION_AUDIT.md`
found no case where this gap actually mattered for slug correctness.

### Real content for the remaining ~110 published pages (tier-2/tier-3)

The WordPress export already contains this — it just hasn't been
processed into Astro content files yet. This is Phase 4+ work
(`MIGRATION_PLAN.md`), not blocked on anything further from the user.

## What happens next

1. Supply media (see packaging instructions above) → moved into
   `public/wp-content/uploads/...` at their exact original paths.
2. Phase 4: migrate the 22 real tier-2 pages, following the same
   pattern as every page so far (real content, light cleanup, no
   rewrite, no merges, no slug changes).
3. Any URL that genuinely can't be preserved gets a documented 301 in
   `REDIRECTS.md` — none exist yet.
4. Once 100% of real URLs exist in Astro or are redirected, and all
   media is in place, work through `LAUNCH_CHECKLIST.md`.
