# Media Acquisition Checklist

Every media file referenced by an already-migrated page or a Phase 3
Tier 1 page (the 7 in `PHASE_3_TIER_1_BATCH.md`), cross-referenced
against Search Console impressions. Source: WordPress export XML +
Google Search Console Pages CSV (supplied 2026-07-06).

**Binary status: 104 of 109 files have now been supplied.** These are
every row that lives in `2023/04`, `2023/05`, `2023/06`, `2023/07`,
`2023/08`, `2023/09`, `2025/11`, or `2025/01`, plus 3 of the 5
`2025/02` rows, all received in full. All other rows below still read
"No — not supplied" because this environment has never received their
actual image/PDF bytes, only their paths and metadata (via WordPress
attachment records and the GSC export). See `/imports/README.md`.

**Known gap — deferred, not blocking:** 3 of the 5 rows tagged to
`/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/`
were resupplied at full size and now marked "Yes" below. **2 rows are
still not supplied** — `5520c44066fbc694ac1c2e207151fe125162f59d.jpeg`
and `760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg` —
the follow-up upload still only contained `-100x100` thumbnail crops of
these two exact filenames. **This already-live page currently has 2
broken images (down from 5)**, confirmed via a fresh `astro build` +
`dist/` check. **By explicit decision (2026-07-06), this is deferred**
— will be examined and resolved later once the site is live, not
chased further in this phase.

**Phase 5 re-confirmation:** the protected URL audit
(`PHASE_5_PROTECTED_URL_AUDIT.md`) re-checked every one of the 92
distinct `/wp-content/uploads/` image references across all 45 built
pages plus 31 `og:image` values — the 2 `apostles-meaning` files above
remain the **only** broken images anywhere on the migrated site.
Nothing new is missing.

**Phase 7B Batch 1 gap — deferred, not blocking:** migrating the
first Tier 3 batch surfaced 8 more genuinely missing files, none
previously tracked (they weren't referenced by any migrated page
until now). 5 are featured/`og_image`-only (omitted, same as every
prior phase's pattern — no inline image lost): `pexels-photo-
8383470.jpeg` (disciple-making-resources), `weds-night-
discipleship__1608243288.jpeg` (under-the-hood),
`19369-gettyimages-1097758946-morsaimagesjpeg.jpeg` (5-examples),
`Untitled-design-2023-03-28T085102.000.webp` (equipping-your-church),
`Untitled-design-2023-03-12T170248.450.webp` (finding-persons-of-peace).
1 is a decorative download-button icon, also omitted: `1.webp`
(disciple-making-resources). 2 are inline supporting images on
`/under-the-hood-of-disciple-making-movements/`, dropped from the body
with their surrounding prose left intact: `picture1-
e1692189886892.jpeg` and `Table-of-Math.jpeg`. None are above-the-fold
hero-only necessities or direct-access PDFs, so none of this blocks
the batch — see `PHASE_7B_TIER_3_BATCH_1.md` for the full breakdown.
No broken *visible* images resulted: none of these files are actually
referenced in the shipped HTML (unlike the `apostles-meaning` gap,
where the `<img>` tags remain and are genuinely broken) — all 8 were
simply left out of the migrated content instead.

**Phase 7B Batch 2 gap — deferred, not blocking:** migrating the
second Tier 3 batch surfaced 11 more genuinely missing files across 5
of the 7 pages. 7 are featured/`og_image`-only (omitted, same pattern
as every prior phase — no inline image lost): `2023/06/pexels-leonardo-
dourado-13011294-1.jpg` (unlock-biblical-principles),
`2023/04/pexels-photo-8383489.jpeg` (5-insightful-keys),
`2025/02/prayer-walking-in-city.webp` (the-clear-pathway-of-jesus — only
a `-100x100` thumbnail crop exists, full size missing), and
`2023/05/B89DECCC-91D3-4DA4-8CCD-F1482F0DB33F.webp`
(7-surprising-disciple-making-movement-examples). `/starter-tools/`
is missing 2 card thumbnails (Three Thirds, 4 Fields — the cards keep
their label and link, just without an image) and 1 decorative CTA
background image (purely decorative, omitted). 4 are inline supporting
images on `/unlock-biblical-principles-for-multiplying-disciples/`,
dropped from the body with their surrounding prose left intact:
`pexels-tara-winstead-8383460-1024x683.jpg`,
`lightstock_69771_xsmall_jared_callais.jpeg`,
`pexels-photo-4400997-e1686571140942.jpeg`, and
`pexels-photo-14933981.jpeg`. None are above-the-fold hero-only
necessities or direct-access PDFs, so none of this blocks the batch —
see `PHASE_7B_TIER_3_BATCH_2.md` for the full breakdown.
`/royal-priest-strategy-explodes-disciple-making-movement-worldwide/`
and `/missionary-verses-in-the-bible-reveal-gods-heart/` have zero
missing media — all referenced files (including 3 inline images on
royal-priest-strategy and the featured image on missionary-verses)
confirmed present.

**Phase 7B Batch 3 gap — deferred, not blocking:** migrating the
third Tier 3 batch surfaced 12 more genuinely missing files across 5
of the 7 pages. 4 are featured/`og_image`-only (omitted, same pattern
as every prior phase): `2023/04/pexels-photo-976866.jpeg`
(breaking-the-mold), `2024/08/unsplash-image-Hzi7U2SZ2GE.jpg`
(the-multiplier-mandate — the entire `2024/08` month folder was never
supplied), `2023/06/pexels-photo-6146961.jpeg` (vision), and
`2023/08/lonewolf-big-2018-May17-1.jpg` (how-to-spot-a-lone-wolf — the
`2023/08` folder exists but doesn't contain this filename). `/vision/`
is also missing its decorative hero image
(`2020/12/2827019a-b6c6-4e5d-83b2-93290955c933-e1693686473697.png` —
the `2020/12` folder only contains one unrelated screenshot), dropped
with the surrounding text kept intact (purely decorative banner, not a
diagram). `/start-here/` is missing 1 of 8 grid-image size variants
(`2023/02/Untitled-design-34-1024x1024.png` for the Church Circle
card) — substituted with the already-present `-300x300` variant of the
same image, the same substitution `starter-tools.md` made for its
identical Church Waffle card. 2 are inline supporting images on
`/how-to-spot-a-lone-wolf-and-not-become-one/`, dropped from the body
with their captions kept as plain text: `2023/08/maxresdefault-2.jpg`
and `2023/08/ChristianAlley-1.jpg`. None are above-the-fold hero-only
necessities or direct-access PDFs, so none of this blocks the batch —
see `PHASE_7B_TIER_3_BATCH_3.md` for the full breakdown.
`/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/`
and `/bible-passages-about-love-what-scripture-really-says/` have zero
missing media — all referenced files (including the inline infographic
on bible-passages-about-love) confirmed present. `/start-here/`'s
demo-content junk section (fake testimonials, Vimeo icon, Patreon
button) referenced 4 more `2020/12` images that were dropped along
with that section itself — not real site content, so not tracked here
as a media gap.

**Phase 7B Batch 4 gap — deferred, not blocking:** migrating the
fourth Tier 3 batch surfaced 8 more genuinely missing files across 4
of the 7 pages, plus 1 unresolvable text-only reference. 5 are
featured/`og_image`-only (omitted, same pattern as every prior phase):
`2023/04/4-ways-multiply-disciples-way-jesus-did.jpeg`
(jesus-the-leader), `2025/02/photo-1555122125-7cea8b612ca0.avif`
(the-secret-ingredient — only `-100x100`/`-150x150` crops of a
differently-suffixed `-e1740396668837` variant exist),
`2025/02/making-disciples.jpeg` (the-leadership-phase), and
`2023/05/pexels-photo-194094.jpeg` (5-surprising-ways). 3 are inline
supporting images on `/the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence/`,
dropped with their surrounding prose left intact:
`2024/11/diligence-in-disciple-making-movements.jpeg`,
`2024/11/diligence-in-discipleship.webp`, and
`2024/11/diligence-in-discipleship-Jesus.webp` (the entire `2024/11`
month folder was never supplied). A 4th inline image on that same page
(`2023/08/personal-evangelism-main-header-1-1024x576.png`) is present
under a slightly different filename/month
(`2023/07/personal-evangelism-main-header-1024x576.png` — same photo
family, missing only a WordPress dedup `-1` suffix) — kept. 1
unresolvable reference: `/beliefs-values/`'s "*Download PDF below for
Scripture References" has no actual `<a href>` or attachment anywhere
in the export — no postmeta attachment captured, no matching filename
in supplied uploads — kept as plain text since there is no real
destination, not a broken link to defer. None of the missing files
block the batch — see `PHASE_7B_TIER_3_BATCH_4.md` for the full
breakdown. `/discovering-the-disciple-meaning-a-life-changing-journey/`
has zero missing media — its featured image confirmed present
(exact filename match). `/privacy-policy/` and
`/the-leadership-phase-everyone-skips-why-investment-matters/`
(beyond its missing featured image) reference no inline images at all.

**Phase 7B Batch 5 gap — deferred, not blocking:** migrating the
fifth Tier 3 batch surfaced 8 more genuinely missing files across 5
of the 7 pages. 5 are featured/`og_image`-only (omitted, same pattern
as every prior phase): `2023/04/group.jpeg`
(unleashing-the-movement), `2023/05/pexels-photo-2962229.jpeg`
(unlock-the-power-of-friendly-accountability), the Amazon book-cover
hash filename (discover-the-game-changing-secrets-starfish-and-the-
spirit-review — never supplied under any filename), and 2 files on
`/the-four-fields-sticker-simple-2x2/`:
`2023/09/Screenshot-2023-09-02-at-8.02.39-PM.png` (product photo) and
`2024/04/Printify_Logo-1024x320.png` (decorative badge — the entire
`2024` month folder has never been supplied). 1 is an inline
supporting image, dropped with its caption kept as plain italic text:
`2023/05/Friendly-Accountability-Checklist-for-Disciple-Making-Movements.png`
(unlock-the-power-of-friendly-accountability). Separately,
`Includes-3-Circles-Video` (also referenced on
unlock-the-power-of-friendly-accountability) is present but under a
dedup `-1` suffix (`2025/01/Includes-3-Circles-Video-1-1024x576.webp`)
— same pattern as Batch 4's personal-evangelism-main-header, kept as-is,
not counted as missing. None of the missing files block the batch —
see `PHASE_7B_TIER_3_BATCH_5.md` for the full breakdown.
`/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/`,
`/content-vs-systems-the-game-changer-for-leadership-development/`, and
`/kingdom-ministry-training/` reference no missing media (the latter's
featured image and linked screenshot/PDF are all confirmed present).

**Phase 7B Batch 6 gap — deferred, not blocking:** migrating the
sixth Tier 3 batch surfaced 5 more genuinely missing files across 3
of the 7 pages. 2 are featured/`og_image`-only (omitted, same pattern
as every prior phase): `2023/06/pexels-photo-6146961.jpeg`
(filtering-unlock-this-essential-for-disciple-making-movements) and
`2024/10/Muddy-Boots-Leadership.jpg`
(setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting
— the entire `2024/10` month folder has never been supplied). 3 are
inline supporting images on `/the-3-core-habits-of-a-disciple/`,
dropped with their surrounding prose left intact:
`2025/03/oikos-map-example.jpg`, `2025/03/15-Second-Testimony-Format.jpg`,
and `2025/03/3-Circles-English-presentation.jpg` (the `2025/03` month
folder was supplied but only contains 2 unrelated files). Separately,
2 files were resolved as present, not missing: the
"Includes-3-Circles-Video" image referenced on
`/filtering-unlock-this-essential-for-disciple-making-movements/` is
present under a dedup `-1` suffix
(`2023/05/Includes-3-Circles-Video-1-1024x576.jpg`, same pattern as
Batches 4-5), and 2 `images.pexels.com` hotlinked images on the same
page were kept as external hotlinks per the established precedent
(e.g. `/7-surprising-disciple-making-movement-examples/`), not treated
as local media at all. `/contact-us/` references no media (its Brevo
subscription form was replaced with a `mailto:` fallback — see
`PHASE_7B_TIER_3_BATCH_6.md`). None of the missing files block the
batch — see `PHASE_7B_TIER_3_BATCH_6.md` for the full breakdown.
`/go-slow-to-go-fast-could-transform-your-leadership-pipeline/`,
`/start-strengthen-sustain-core-insights-on-building-lasting-ministry/`,
and `/next-gen-local-owners-building-beachheads-of-the-kingdom/`
reference no missing media — all featured and inline images confirmed
present.

**Phase 7B Batch 7 gap — deferred, not blocking (final Tier 3 batch):**
migrating the seventh and final Tier 3 batch surfaced 9 more genuinely
missing files across 4 of the 5 pages. 2 are featured/`og_image`-only
(omitted, same pattern as every prior phase):
`2023/05/pexels-photo-6150581.jpeg`
(get-ready-to-be-empowered-evangelists-revolutionize-disciple-making)
and `2024/04/Printify_Logo-1024x320.png` (the-church-waffle-sticker —
the entire `2024/04` month folder has never been supplied, same file
already missing on `/the-four-fields-sticker-simple-2x2/` in Batch 5).
1 is a decorative brandmark image on the legacy-preservation page
`/elementor-10714/`: `2025/02/Biglife_Brandmark_cyan-1024x324-1.png`
(only `-100x100`/`-150x150` crops exist, not the referenced size) —
dropped, non-blocking since this page is a minimal legacy-preservation
migration by design. 4 are on `/action-plan/`: 1 button image
(`2023/06/FUL.png`) and 3 week-illustration photos
(`2023/04/2-2.jpg`, `2023/04/3-2.jpg`, `2023/04/4.jpg`) — all dropped,
non-blocking (decorative photos, not the checkpoint links or PDF
download itself, which are both intact). 2 are screenshot preview
images on `/4-responses-to-the-gospel/`:
`2023/04/Screen-Shot-2023-04-02-at-6.40.51-AM-1024x701.jpg` and
`2023/04/Screen-Shot-2023-04-02-at-6.40.40-AM-1024x802.jpg` — dropped,
kept the real Google Slides links each screenshot wrapped. None of the
missing files block the batch — see `PHASE_7B_TIER_3_BATCH_7.md` for
the full breakdown. This closes out Tier 3 media tracking; all 48
original Tier 3 URLs have now been migrated.

**Phase 8 full-site audit finding — fixed:** a scripted audit of every
`/wp-content/...` reference across all 93 generated pages (123 unique
references) found 1 genuine bug: on `/kingdom-ministry-training/`, the
linked screenshot image
(`2025/01/Screenshot-2025-01-22-at-9.10.54%20AM.webp`) used a regular
URL-encoded space (`%20`), but the actual supplied file has a Unicode
**narrow no-break space (U+202F)** in that exact position in its
filename — a WordPress/macOS screenshot-naming artifact, confirmed via
byte-level inspection. The `%20` encoding pointed at a filename that
doesn't exist, so the image would have silently 404'd in production
despite the underlying file being present. **Fixed**: corrected the
percent-encoding to `%E2%80%AF` (the correct UTF-8 encoding of U+202F)
in `src/content/articles/kingdom-ministry-training.md`; rebuilt and
confirmed the corrected path resolves. This is not a missing-media
gap — the file was always present; only the reference was wrong. The
other 121 of 123 `/wp-content/` references resolved correctly on
first pass; the remaining 2 (`5520c44066fbc694ac1c2e207151fe125162f59d.jpeg`
and `760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg`,
both on `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/`)
are the same already-documented Tier 1 gap above — not new. See
`PHASE_8_FULL_SITE_AUDIT.md` §7 for the full breakdown.

**Received-uploads log:**

- 2026-07-06 — `2023/02` month folder (559 files) supplied and extracted
  into `public/wp-content/uploads/2023/02/`. None of this checklist's
  103 tracked files live in that folder — see `MEDIA_IMPORT_PLAN.md`'s
  "Received uploads log" for the one broader-scope (Priority C) file
  this upload was checked against. No rows in this doc changed status.
- 2026-07-06 — `2023/04` month folder (47 files) supplied and extracted
  into `public/wp-content/uploads/2023/04/`. All 39 of this checklist's
  tracked files that live in `2023/04` matched exactly and are now
  marked "Yes" below (the other 8 tracked `2023/04` files are Priority C
  in `MEDIA_IMPORT_PLAN.md`, out of this doc's migrated/tier-1 scope).
- 2026-07-06 — `2023/05` month folder (39 files) supplied and extracted
  into `public/wp-content/uploads/2023/05/`. All 19 of this checklist's
  tracked files that live in `2023/05` matched exactly and are now
  marked "Yes" below (the other 20 tracked `2023/05` files are Priority
  C in `MEDIA_IMPORT_PLAN.md`, out of this doc's migrated/tier-1 scope).
- 2026-07-06 — `2023/06` month folder (3 files) supplied as a zip that
  also contained macOS `.DS_Store`/`__MACOSX` junk (excluded during
  extraction, never touched the repo) and extracted into
  `public/wp-content/uploads/2023/06/`. All 3 of this checklist's
  tracked files that live in `2023/06` matched exactly and are now
  marked "Yes" below.
- 2026-07-06 — `2023/07` month folder (6 files) supplied as a zip with
  the same macOS junk pattern (excluded during extraction) and extracted
  into `public/wp-content/uploads/2023/07/`. The 2 of this checklist's
  tracked files that live in `2023/07` matched exactly and are now
  marked "Yes" below (the other 4 tracked `2023/07` files are Priority C
  in `MEDIA_IMPORT_PLAN.md`, out of this doc's migrated/tier-1 scope).
- 2026-07-06 — `2023/08` month folder (56 files landed, same macOS junk
  pattern excluded) supplied and extracted into
  `public/wp-content/uploads/2023/08/`. All 5 of this checklist's
  tracked files that live in `2023/08` matched exactly and are now
  marked "Yes" below — all 5 are on the already-live
  `/how-to-evangelize-ultimate-step-by-step-guide/` page, so this fixes
  5 real broken images. The other 51 files that landed are untracked
  WordPress-generated size variants of the same 4 base screenshots, not
  individually referenced by any known page.
- 2026-07-06 — `2025/11` month folder (136 files landed, same macOS
  junk pattern excluded) supplied and extracted into
  `public/wp-content/uploads/2025/11/`. All 18 of this checklist's
  tracked files that live in `2025/11` matched exactly and are now
  marked "Yes" below — this fixes real broken images on 5 already-live
  pages (7-stories-of-hope, bible-verse-about-spreading-the-gospel,
  testimony-in-the-bible, how-to-evangelize, 15-second-testimony). The
  other 117 files that landed are untracked size variants and unrelated
  media in the same month, not individually referenced by any known
  page.
- 2026-07-06 — `2023/09` file `3-Circles-Sticker-QR-Code.pdf`
  (supplied earlier as part of that folder's import) was found still
  marked "No" in this doc during a cross-check — corrected to "Yes"
  below.
- 2026-07-06 — `2025/01` month folder (375 files landed, same macOS
  junk pattern excluded) supplied and extracted into
  `public/wp-content/uploads/2025/01/`. All 8 of this checklist's
  tracked files that live in `2025/01` matched exactly and are now
  marked "Yes" below. Verified against `dist/` output: 5 of these 8
  files are genuinely embedded and now fix real broken images on 3
  already-live pages (2 on discover-the-12-disciples, 2 on
  12-practice-church-circle, 1 on 7-stories-of-hope). The remaining 3
  files (`Untitled-design-52`, `Copy-of-Untitled-47`,
  `Copy-of-Untitled-48`) are tagged to the homepage but confirmed not
  embedded in its rendered output — matches this doc's pre-existing
  "not currently used" annotation. The other 367 files that landed are
  untracked size variants and unrelated media in the same month.
- 2026-07-06 — `2025/02` month folder attempted (132 files landed, same
  macOS junk pattern excluded) into `public/wp-content/uploads/2025/02/`
  — but **none of this checklist's 5 tracked `2025/02` rows matched.**
  The upload was almost entirely `100x100`/`150x150` thumbnail crops;
  near-miss checks confirm size-variant versions of these filenames
  exist (e.g. `5520c44066fbc694ac1c2e207151fe125162f59d-100x100.jpeg`)
  but never the full-size originals the page actually references.
  **The `apostles-meaning` page has 5 broken images right now** as a
  result.
- 2026-07-06 — `2025/02` follow-up upload supplied 3 of the 5 needed
  files at full size (`Jesus-with-disciples-1024x513.jpg`,
  `Paul-in-Athens.jpg`, `jesus_chooses_twelve_apostles.webp`) — now
  marked "Yes" below. Confirmed via fresh `astro build` + `dist/` check
  that these 3 now resolve on the live page. **2 files remain
  genuinely missing** — the follow-up upload still only contained
  `-100x100` thumbnail crops for `5520c44066fbc694ac1c2e207151fe125162f59d.jpeg`
  and `760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg`.
  **`apostles-meaning` now has 2 broken images (down from 5).**
- 2026-07-06 — Phase 4 Batch 4 migrated `/stickers/`, adding 6 files to
  this checklist (all already present from earlier `2025/10`/`2025/12`
  uploads, now marked "Yes" above). The page's originally-flagged 3
  missing files (`2-1024x1024.jpg`, `3-Circles-Sticker-Multiplying-
  Disciples.webp`, `3.jpg`, tracked in `MEDIA_IMPORT_PLAN.md`'s
  Priority C list) are confirmed **not needed** — they only appeared
  inside a GenerateBlocks container hidden on every breakpoint
  (`hideOnDesktop`+`hideOnTablet`+`hideOnMobile` all `true`) in the
  WordPress export, i.e. dead chrome never rendered on the live site,
  and were dropped along with the rest of that section during
  migration. Not added to this checklist since they're not used by the
  migrated page. **This closes out the last open media question from
  Phase 4.**

## Rule

Old URLs like `/wp-content/uploads/...` must keep working. Media files
must live under `public/wp-content/uploads/...` (the exact same path,
served by Astro at the exact same URL) unless a 301 is explicitly
planned and documented in `REDIRECTS.md`. No 301s are planned for any
media file below — every one is expected to be preserved at its exact
original path.

## Full list — 109 distinct files

Sorted by Search Console impressions (real data), then by page.

Note: `/movement-resources/12-practice-church-circle/` embeds 12 more
images in its body content, but those are hosted on `obey.tools` (the
sister site), not multiplyingdisciples.us — confirmed by checking each
image URL's domain directly. An earlier pass of this checklist
mis-attributed them as local media due to a regex that didn't check the
domain; they've been removed here. They need no local preservation —
they're legitimate external links, consistent with this site's
"link to Obey.Tools for practical tools" strategy.

| WordPress path | Expected public path | Binary present? | Used by | GSC impressions |
|---|---|---|---|---:|
| `/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf` | `public/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf` | Yes | not on a migrated/tier-1 page yet | 347 |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | `public/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 266 |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | `public/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | Yes | `/discover-the-12-disciples-of-jesus-christ/` (featured) | 89 |
| `/wp-content/uploads/2023/06/Virtual-Training-Packet.pdf` | `public/wp-content/uploads/2023/06/Virtual-Training-Packet.pdf` | Yes | not on a migrated/tier-1 page yet | 41 |
| `/wp-content/uploads/2023/05/Church-Waffle-English-112222-1.pdf` | `public/wp-content/uploads/2023/05/Church-Waffle-English-112222-1.pdf` | Yes | `/disciple-making-resources-for-churches-that-will-multiply/` (tier-3, migrated — direct-access PDF) | 36 |
| `/wp-content/uploads/2023/04/4-Fields-Toolbox-Updated-03.31.23.pdf` | `public/wp-content/uploads/2023/04/4-Fields-Toolbox-Updated-03.31.23.pdf` | Yes | not on a migrated/tier-1 page yet | 36 |
| `/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1.webp` | `public/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1.webp` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` (featured) | 10 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-5.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-5.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 5 |
| `/wp-content/uploads/2023/09/3-Circles-Sticker-QR-Code.pdf` | `public/wp-content/uploads/2023/09/3-Circles-Sticker-QR-Code.pdf` | Yes | not on a migrated/tier-1 page yet | 5 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible.webp` | `public/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible.webp` | Yes | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 4 |
| `/wp-content/uploads/2025/11/Bible-Verse-About-Spreading-the-Gospel-Matthew-28.18-20-Great-Commission-Infographic.webp` | `public/wp-content/uploads/2025/11/Bible-Verse-About-Spreading-the-Gospel-Matthew-28.18-20-Great-Commission-Infographic.webp` | Yes | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 4 |
| `/wp-content/uploads/2025/11/Bible-Verses-About-Spreading-the-Gospel-Complete-Scripture-Guide.webp` | `public/wp-content/uploads/2025/11/Bible-Verses-About-Spreading-the-Gospel-Complete-Scripture-Guide.webp` | Yes | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending — featured) | 4 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-3.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-3.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 3 |
| `/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | `public/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | Yes | not on a migrated/tier-1 page yet | 3 |
| `/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | `public/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | Yes | not on a migrated/tier-1 page yet | 3 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 2 |
| `/wp-content/uploads/2023/05/Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.webp` | `public/wp-content/uploads/2023/05/Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.webp` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 2 |
| `/wp-content/uploads/2025/11/Testimony-in-the-bible.webp` | `public/wp-content/uploads/2025/11/Testimony-in-the-bible.webp` | Yes | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 2 |
| `/wp-content/uploads/2023/04/3-5.jpg` | `public/wp-content/uploads/2023/04/3-5.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-2.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-2.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-4.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-4.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-1.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-1.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 1 |
| `/wp-content/uploads/2023/05/Screen-Shot-2023-08-16-at-8.47.48-AM-1024x499.png` | `public/wp-content/uploads/2023/05/Screen-Shot-2023-08-16-at-8.47.48-AM-1024x499.png` | Yes | `/under-the-hood-of-disciple-making-movements/` (tier-3, migrated — inline) | 86 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | `public/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | Yes | not on a migrated/tier-1 page yet | 1 |
| `/wp-content/uploads/2025/01/e3adfe1623cfb8a49a60f903b1515adb.Screen-Shot-2023-08-05-at-8.26.31-AM-1.webp` | `public/wp-content/uploads/2025/01/e3adfe1623cfb8a49a60f903b1515adb.Screen-Shot-2023-08-05-at-8.26.31-AM-1.webp` | Yes | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 0 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-3.webp` | `public/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-3.webp` | Yes | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 0 |
| `/wp-content/uploads/2025/03/gen-z-bible-study.jpg` | `public/wp-content/uploads/2025/03/gen-z-bible-study.jpg` | No — not supplied | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 0 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-1.webp` | `public/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-1.webp` | Yes | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` (featured) | 0 |
| `/wp-content/uploads/2023/04/10-1024x1024.jpg` | `public/wp-content/uploads/2023/04/10-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/12-1024x1024.jpg` | `public/wp-content/uploads/2023/04/12-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/10-1.jpg` | `public/wp-content/uploads/2023/04/10-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/5-1024x1024.jpg` | `public/wp-content/uploads/2023/04/5-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/2-4-1024x1024.jpg` | `public/wp-content/uploads/2023/04/2-4-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/5-1.jpg` | `public/wp-content/uploads/2023/04/5-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/6-1.jpg` | `public/wp-content/uploads/2023/04/6-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/1-5.jpg` | `public/wp-content/uploads/2023/04/1-5.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/7-1.jpg` | `public/wp-content/uploads/2023/04/7-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/3-4-1024x1024.jpg` | `public/wp-content/uploads/2023/04/3-4-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/4-2.jpg` | `public/wp-content/uploads/2023/04/4-2.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/12-1.jpg` | `public/wp-content/uploads/2023/04/12-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/11-1.jpg` | `public/wp-content/uploads/2023/04/11-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/9-1.jpg` | `public/wp-content/uploads/2023/04/9-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/8-1024x1024.jpg` | `public/wp-content/uploads/2023/04/8-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/4-1-1024x1024.jpg` | `public/wp-content/uploads/2023/04/4-1-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/2-5.jpg` | `public/wp-content/uploads/2023/04/2-5.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/8-1.jpg` | `public/wp-content/uploads/2023/04/8-1.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/7-1024x1024.jpg` | `public/wp-content/uploads/2023/04/7-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/6-1024x1024.jpg` | `public/wp-content/uploads/2023/04/6-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/9-1024x1024.jpg` | `public/wp-content/uploads/2023/04/9-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/1-4-1024x1024.jpg` | `public/wp-content/uploads/2023/04/1-4-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/04/11-1024x1024.jpg` | `public/wp-content/uploads/2023/04/11-1024x1024.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 0 |
| `/wp-content/uploads/2023/05/Untitled-design-2025-01-13T131631.873-1024x1024.png` | `public/wp-content/uploads/2023/05/Untitled-design-2025-01-13T131631.873-1024x1024.png` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 0 |
| `/wp-content/uploads/2023/05/4-1-1-YFC-5-e1684599818569.png` | `public/wp-content/uploads/2023/05/4-1-1-YFC-5-e1684599818569.png` | Yes | `/15-second-testimony-examples-ignite-your-faith/` | 0 |
| `/wp-content/uploads/2023/05/4-1-1-YFC-1-e1684600816203.jpg` | `public/wp-content/uploads/2023/05/4-1-1-YFC-1-e1684600816203.jpg` | Yes | `/15-second-testimony-examples-ignite-your-faith/` | 0 |
| `/wp-content/uploads/2023/05/4-1-1-YFC-e1684600391124-768x430.jpg` | `public/wp-content/uploads/2023/05/4-1-1-YFC-e1684600391124-768x430.jpg` | Yes | `/15-second-testimony-examples-ignite-your-faith/` | 0 |
| `/wp-content/uploads/2025/11/short-christian-testimony-examples.webp` | `public/wp-content/uploads/2025/11/short-christian-testimony-examples.webp` | Yes | `/15-second-testimony-examples-ignite-your-faith/` (featured), `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2026/02/Multiply-disciples-in-real-life.webp` | `public/wp-content/uploads/2026/02/Multiply-disciples-in-real-life.webp` | No — not supplied | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/06/1-2-1-1-1.png` | `public/wp-content/uploads/2023/06/1-2-1-1-1.png` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/01/Untitled-design-52.webp` | `public/wp-content/uploads/2025/01/Untitled-design-52.webp` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/03/maxresdefault-7-1024x576.jpg` | `public/wp-content/uploads/2025/03/maxresdefault-7-1024x576.jpg` | No — not supplied | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-48-1024x1024.webp` | `public/wp-content/uploads/2025/01/Copy-of-Untitled-48-1024x1024.webp` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/05/1-1.webp` | `public/wp-content/uploads/2023/05/1-1.webp` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-47-1024x1024.webp` | `public/wp-content/uploads/2025/01/Copy-of-Untitled-47-1024x1024.webp` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/06/1-2-1-1.png` | `public/wp-content/uploads/2023/06/1-2-1-1.png` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/05/Copy-of-Experience-confidence-in-your-disciple-making-1.png` | `public/wp-content/uploads/2023/05/Copy-of-Experience-confidence-in-your-disciple-making-1.png` | Yes | `/` (homepage, hero image, in use) | 0 |
| `/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet-1024x576.webp` | `public/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet-1024x576.webp` | Yes | `/movement-resources/12-practice-church-circle/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet.webp` | `public/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet.webp` | Yes | `/movement-resources/12-practice-church-circle/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.08-AM-1024x804.jpg` | `public/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.08-AM-1024x804.jpg` | Yes | `/three-thirds/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-1536x1149.png` | `public/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-1536x1149.png` | Yes | `/three-thirds/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-768x574.png` | `public/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-768x574.png` | Yes | `/three-thirds/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM.png` | `public/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM.png` | Yes | `/three-thirds/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-300x224.png` | `public/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-300x224.png` | Yes | `/three-thirds/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-1024x766.png` | `public/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-1024x766.png` | Yes | `/three-thirds/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/05/Three-Thirds-Meeting-Format.webp` | `public/wp-content/uploads/2023/05/Three-Thirds-Meeting-Format.webp` | Yes | `/three-thirds/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2023/04/1-1-1024x1024.png` | `public/wp-content/uploads/2023/04/1-1-1024x1024.png` | Yes | `/unlocking-the-power-of-apest-the-ultimate-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/2-1-1024x1024.png` | `public/wp-content/uploads/2023/04/2-1-1024x1024.png` | Yes | `/unlocking-the-power-of-apest-the-ultimate-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/3-2-1024x1024.png` | `public/wp-content/uploads/2023/04/3-2-1024x1024.png` | Yes | `/unlocking-the-power-of-apest-the-ultimate-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/4-2-1024x1024.png` | `public/wp-content/uploads/2023/04/4-2-1024x1024.png` | Yes | `/unlocking-the-power-of-apest-the-ultimate-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/5-1024x1024.png` | `public/wp-content/uploads/2023/04/5-1024x1024.png` | Yes | `/unlocking-the-power-of-apest-the-ultimate-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/04/Untitled-design-14.png` | `public/wp-content/uploads/2023/04/Untitled-design-14.png` | Yes | `/unlocking-the-power-of-apest-the-ultimate-guide/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2023/05/pexels-charlotte-may-5965923-1024x683.jpg` | `public/wp-content/uploads/2023/05/pexels-charlotte-may-5965923-1024x683.jpg` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.26.03-PM-1024x575.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.26.03-PM-1024x575.png` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/short-christian-testimony-examples-1024x576.webp` | `public/wp-content/uploads/2025/11/short-christian-testimony-examples-1024x576.webp` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1-1024x576.webp` | `public/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1-1024x576.webp` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.29.37-PM-1024x577.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.29.37-PM-1024x577.png` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/07/personal-evangelism-main-header-1024x576.png` | `public/wp-content/uploads/2023/07/personal-evangelism-main-header-1024x576.png` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.28.45-PM-1024x573.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.28.45-PM-1024x573.png` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.27.25-PM-1024x575.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.27.25-PM-1024x575.png` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Step-by-Step-Guide-to-Evangelizing-Confident-Conversations-About-Faith.webp` | `public/wp-content/uploads/2023/08/Step-by-Step-Guide-to-Evangelizing-Confident-Conversations-About-Faith.webp` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2025/02/Jesus-with-disciples-1024x513.jpg` | `public/wp-content/uploads/2025/02/Jesus-with-disciples-1024x513.jpg` | Yes | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/5520c44066fbc694ac1c2e207151fe125162f59d.jpeg` | `public/wp-content/uploads/2025/02/5520c44066fbc694ac1c2e207151fe125162f59d.jpeg` | No — not supplied | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/Paul-in-Athens.jpg` | `public/wp-content/uploads/2025/02/Paul-in-Athens.jpg` | Yes | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg` | `public/wp-content/uploads/2025/02/760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg` | No — not supplied | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/jesus_chooses_twelve_apostles.webp` | `public/wp-content/uploads/2025/02/jesus_chooses_twelve_apostles.webp` | Yes | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2025/11/two-young-men-sharing-their-faith-in-Jesus.jpg` | `public/wp-content/uploads/2025/11/two-young-men-sharing-their-faith-in-Jesus.jpg` | Yes | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/A-Mans-Testimony-of-Faith-in-the-Midst-of-Struggle.webp` | `public/wp-content/uploads/2025/11/A-Mans-Testimony-of-Faith-in-the-Midst-of-Struggle.webp` | Yes | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Mid-30s-Professor-Shares-Personal-Testimony-with-Students.webp` | `public/wp-content/uploads/2025/11/Mid-30s-Professor-Shares-Personal-Testimony-with-Students.webp` | Yes | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/testimony-in-the-bible-20-powerful-verses-real-examples.webp` | `public/wp-content/uploads/2025/11/testimony-in-the-bible-20-powerful-verses-real-examples.webp` | Yes | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.webp` | `public/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.webp` | Yes | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Sharing-the-Gospel-Over-Coffee-Evangelism-Conversation.webp` | `public/wp-content/uploads/2025/11/Sharing-the-Gospel-Over-Coffee-Evangelism-Conversation.webp` | Yes | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.jpg` | `public/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.jpg` | Yes | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Two-Gen-Z-Young-People-Having-Spiritual-Conversation-on-Park-Bench.webp` | `public/wp-content/uploads/2025/11/Two-Gen-Z-Young-People-Having-Spiritual-Conversation-on-Park-Bench.webp` | Yes | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/GREAT-COMMISSION-LANDING-1-1.webp` | `public/wp-content/uploads/2025/11/GREAT-COMMISSION-LANDING-1-1.webp` | Yes | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |

### Phase 4 — Tier 2 Batch 1 media (2026-07-06)

All 14 media files referenced by the 7 Phase 4 Tier 2 Batch 1 pages
were confirmed already present under `public/wp-content/uploads/` —
no new uploads were needed for this batch.

| WordPress path | Expected public path | Binary present? | Referenced by | Impressions |
|---|---|---|---|---|
| `/wp-content/uploads/2023/07/personal-evangelism-main-header.png` | `public/wp-content/uploads/2023/07/personal-evangelism-main-header.png` | Yes | `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` (tier-2, migrated — featured) | 906 |
| `/wp-content/uploads/2025/01/disciple-making-leader.webp` | `public/wp-content/uploads/2025/01/disciple-making-leader.webp` | Yes | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` (tier-2, migrated) | 609 |
| `/wp-content/uploads/2025/01/reading-the-bible.webp` | `public/wp-content/uploads/2025/01/reading-the-bible.webp` | Yes | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` (tier-2, migrated) | 609 |
| `/wp-content/uploads/2025/02/Untitled-design-2025-11-28T172403.122.webp` | `public/wp-content/uploads/2025/02/Untitled-design-2025-11-28T172403.122.webp` | Yes | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` (tier-2, migrated — featured) | 609 |
| `/wp-content/uploads/2023/05/4-Fields-e1685451695430.jpg` | `public/wp-content/uploads/2023/05/4-Fields-e1685451695430.jpg` | Yes | `/how-to-get-started-in-four-fields-training/` (tier-2, migrated) | 495 |
| `/wp-content/uploads/2023/05/4-Fields-1-e1685451774487.jpg` | `public/wp-content/uploads/2023/05/4-Fields-1-e1685451774487.jpg` | Yes | `/how-to-get-started-in-four-fields-training/` (tier-2, migrated) | 495 |
| `/wp-content/uploads/2023/05/Screenshot-2023-05-06-at-10.05.09-AM.jpg` | `public/wp-content/uploads/2023/05/Screenshot-2023-05-06-at-10.05.09-AM.jpg` | Yes | `/how-to-get-started-in-four-fields-training/` (tier-2, migrated — featured) | 495 |
| `/wp-content/uploads/2023/04/pexels-photo-2258251.jpeg` | `public/wp-content/uploads/2023/04/pexels-photo-2258251.jpeg` | Yes | `/prayer-is-essential-12-key-prayer-points-for-disciple-making-movements/` (tier-2, migrated — featured) | 403 |
| `/wp-content/uploads/2025/10/3-circles-sticker-cheap-1024x792.webp` | `public/wp-content/uploads/2025/10/3-circles-sticker-cheap-1024x792.webp` | Yes | `/stickers/` (tier-2, migrated) | 359 |
| `/wp-content/uploads/2025/10/3-circles-sticker-dark-mode-1024x788.webp` | `public/wp-content/uploads/2025/10/3-circles-sticker-dark-mode-1024x788.webp` | Yes | `/stickers/` (tier-2, migrated) | 359 |
| `/wp-content/uploads/2025/10/4-Fields-Sticker-4-Fields-of-Kingdom-Growth-1024x1024.webp` | `public/wp-content/uploads/2025/10/4-Fields-Sticker-4-Fields-of-Kingdom-Growth-1024x1024.webp` | Yes | `/stickers/` (tier-2, migrated) | 359 |
| `/wp-content/uploads/2025/10/church-waffle-sticker-1024x1024.webp` | `public/wp-content/uploads/2025/10/church-waffle-sticker-1024x1024.webp` | Yes | `/stickers/` (tier-2, migrated) | 359 |
| `/wp-content/uploads/2025/12/15-Second-Testimony-Sticker-Personal-Testimony-Evangelism-Tool-1024x458.webp` | `public/wp-content/uploads/2025/12/15-Second-Testimony-Sticker-Personal-Testimony-Evangelism-Tool-1024x458.webp` | Yes | `/stickers/` (tier-2, migrated) | 359 |
| `/wp-content/uploads/2025/12/christian-prayer-wheel-sticker-1024x1024.webp` | `public/wp-content/uploads/2025/12/christian-prayer-wheel-sticker-1024x1024.webp` | Yes | `/stickers/` (tier-2, migrated) | 359 |
| `/wp-content/uploads/2023/05/pexels-photo-977659.jpeg` | `public/wp-content/uploads/2023/05/pexels-photo-977659.jpeg` | Yes | `/seven-words-of-jesus-on-the-cross/` (tier-2, migrated — featured) | 339 |
| `/wp-content/uploads/2023/05/books.jpeg` | `public/wp-content/uploads/2023/05/books.jpeg` | Yes | `/disciple-making-movement-books-top-25-must-reads/` (tier-2, migrated — featured) | 415 |
| `/wp-content/uploads/2023/05/Includes-3-Circles-Video-1-1024x576.jpg` | `public/wp-content/uploads/2023/05/Includes-3-Circles-Video-1-1024x576.jpg` | Yes | `/disciple-making-movement-books-top-25-must-reads/` (tier-2, migrated) | 415 |
| `/wp-content/uploads/2023/05/Untitled-design-5-1024x576.jpg` | `public/wp-content/uploads/2023/05/Untitled-design-5-1024x576.jpg` | Yes | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` (tier-2, migrated — featured) | 603 |
| `/wp-content/uploads/2023/05/4-Fields-Nathan-Shank-2014.pdf` | `public/wp-content/uploads/2023/05/4-Fields-Nathan-Shank-2014.pdf` | Yes | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` (tier-2, migrated — directly-linked PDF) | 603 |

Note: `/wp-content/uploads/2023/05/Screen-Shot-2023-05-20-at-12.10.25-PM-scaled.jpg`
is also referenced (inline, `how-to-get-started-in-four-fields-training`) but
was already tracked as Priority C in `MEDIA_IMPORT_PLAN.md` prior to this
batch and confirmed present there; not duplicated here.

### Phase 4 — Tier 2 Batch 2 media (2026-07-06)

All 24 distinct media files referenced by the 7 Phase 4 Tier 2 Batch 2
pages were confirmed already present under `public/wp-content/uploads/`
— no new uploads were needed for this batch. The strategy-coordinator
page alone accounts for 13 of these 24 (the highest media count of any
tier-2 page, as flagged in `PHASE_4_TIER_2_BATCH_PLAN.md`).

| WordPress path | Expected public path | Binary present? | Referenced by | Impressions |
|---|---|---|---|---|
| `/wp-content/uploads/2023/04/eliott-reyna-jCEpN62oWL4-unsplash.jpg` | `public/wp-content/uploads/2023/04/eliott-reyna-jCEpN62oWL4-unsplash.jpg` | Yes | `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/` (tier-2, migrated — featured) | 335 |
| `/wp-content/uploads/2025/01/Untitled-design-2025-01-21T095505.451.jpg` | `public/wp-content/uploads/2025/01/Untitled-design-2025-01-21T095505.451.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated — featured) | 228 |
| `/wp-content/uploads/2025/01/1-2.jpg` | `public/wp-content/uploads/2025/01/1-2.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/2-3.jpg` | `public/wp-content/uploads/2025/01/2-3.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/3-3.jpg` | `public/wp-content/uploads/2025/01/3-3.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/4-3.jpg` | `public/wp-content/uploads/2025/01/4-3.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/5-2.jpg` | `public/wp-content/uploads/2025/01/5-2.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/6-3.jpg` | `public/wp-content/uploads/2025/01/6-3.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/1-4.jpg` | `public/wp-content/uploads/2025/01/1-4.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/2-5.jpg` | `public/wp-content/uploads/2025/01/2-5.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/3-5.jpg` | `public/wp-content/uploads/2025/01/3-5.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/4-4.jpg` | `public/wp-content/uploads/2025/01/4-4.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/68471e1fad432c1ff6f1c342ff450a0d.Target.webp` | `public/wp-content/uploads/2025/01/68471e1fad432c1ff6f1c342ff450a0d.Target.webp` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/01/Untitled-design-2025-01-22T193434.274.jpg` | `public/wp-content/uploads/2025/01/Untitled-design-2025-01-22T193434.274.jpg` | Yes | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` (tier-2, migrated) | 228 |
| `/wp-content/uploads/2025/12/Christian-Prayer-Wheel-diagram-showing-12-prayer-segments.webp` | `public/wp-content/uploads/2025/12/Christian-Prayer-Wheel-diagram-showing-12-prayer-segments.webp` | Yes | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` (tier-2, migrated — featured) | 190 |
| `/wp-content/uploads/2025/12/Christian-Prayer-Wheel-diagram-with-12-segments.webp` | `public/wp-content/uploads/2025/12/Christian-Prayer-Wheel-diagram-with-12-segments.webp` | Yes | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` (tier-2, migrated) | 190 |
| `/wp-content/uploads/2025/12/christian-prayer-wheel-sticker.webp` | `public/wp-content/uploads/2025/12/christian-prayer-wheel-sticker.webp` | Yes | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` (tier-2, migrated) | 190 |
| `/wp-content/uploads/2023/04/pexels-photo-5543374.jpeg` | `public/wp-content/uploads/2023/04/pexels-photo-5543374.jpeg` | Yes | `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` (tier-2, migrated — featured) | 181 |
| `/wp-content/uploads/2025/11/Sharing-Your-Testimony-Scripture-7-Biblical-Reasons-You-Cant-Stay-Silent.webp` | `public/wp-content/uploads/2025/11/Sharing-Your-Testimony-Scripture-7-Biblical-Reasons-You-Cant-Stay-Silent.webp` | Yes | `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/` (tier-2, migrated — featured) | 166 |
| `/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | `public/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | Yes | `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/` (tier-2, migrated) | 166 |
| `/wp-content/uploads/2023/04/image-1024x576.jpg` | `public/wp-content/uploads/2023/04/image-1024x576.jpg` | Yes | `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` (tier-2, migrated) | 165 |
| `/wp-content/uploads/2023/04/pexels-photo-6860404.jpeg` | `public/wp-content/uploads/2023/04/pexels-photo-6860404.jpeg` | Yes | `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` (tier-2, migrated — featured) | 165 |
| `/wp-content/uploads/2023/05/Screen-Shot-2023-04-02-at-7.11.17-AM-copy-2-1024x766.jpg` | `public/wp-content/uploads/2023/05/Screen-Shot-2023-04-02-at-7.11.17-AM-copy-2-1024x766.jpg` | Yes | `/ridiculously-simple-3-ways-to-make-disciples/` (tier-2, migrated) | 164 |
| `/wp-content/uploads/2023/05/pexels-photo-4051134.jpeg` | `public/wp-content/uploads/2023/05/pexels-photo-4051134.jpeg` | Yes | `/ridiculously-simple-3-ways-to-make-disciples/` (tier-2, migrated — featured) | 164 |

### Phase 4 — Tier 2 Batch 3 media (2026-07-06)

10 of 12 distinct media files referenced by the 7 Phase 4 Tier 2
Batch 3 pages were confirmed already present under
`public/wp-content/uploads/` — no new uploads were needed. **2 rows
were already-known exceptions, both resolved per prior documented
decisions, neither blocking:**

- `breakthrough-guide-for-a-modern-day-disciple`'s only media
  dependency (its featured image,
  `/wp-content/uploads/2023/02/nonresident-JTW6AUbCLC4-unsplash-3-1.jpg`)
  is the file marked "Won't fix" on 2026-07-06 (see row above under
  the Tier 1/migrated section). The page body has zero inline images,
  so this migrated with `og_image` omitted from frontmatter rather
  than a broken path — no visible content is missing.
- `4-stages-of-movement-unlock-your-next-steps` also referenced that
  same "Won't fix" file, but only as a decorative low-opacity CSS
  background image inside the trailing Elementor CTA block, which was
  removed as chrome during migration (replaced by the article's own
  related_articles mechanism) — so this page has no unresolved media
  dependency at all once migrated.
- `love-and-obedience-exploring-the-biblical-relationship-between-the-two`'s
  featured image: WordPress's `_thumbnail_id` attachment record
  resolves to `/wp-content/uploads/2023/04/75598.webp` (no "-scaled"
  suffix), but only `75598-scaled.webp` was ever supplied. "-scaled"
  is WordPress's own auto-generated large-image label for oversized
  uploads, so this is the same source image at a different
  auto-generated size, not a different photo — used directly as
  `og_image`, confirmed present.

| WordPress path | Expected public path | Binary present? | Referenced by | Impressions |
|---|---|---|---|---|
| `/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | `public/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | Yes | `/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/` (tier-2, migrated — featured) | 142 |
| `/wp-content/uploads/2023/04/75598-scaled.webp` | `public/wp-content/uploads/2023/04/75598-scaled.webp` | Yes | `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` (tier-2, migrated — featured, substitute for mismatched `75598.webp`) | 134 |
| `/wp-content/uploads/2023/04/maxresdefault-3.jpg` | `public/wp-content/uploads/2023/04/maxresdefault-3.jpg` | Yes | `/10-qualities-present-in-every-church-planting-movement-keys-to-sustainable-growth-and-multiplication/` (tier-2, migrated — featured) | 107 |
| `/wp-content/uploads/2023/04/multiplication.jpeg` | `public/wp-content/uploads/2023/04/multiplication.jpeg` | Yes | `/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/` (tier-2, migrated — featured); also `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` (tier-3, migrated — featured, shared source photo) | 160 |
| `/wp-content/uploads/2023/05/DBS_2-e1686219964976-1024x538.jpeg` | `public/wp-content/uploads/2023/05/DBS_2-e1686219964976-1024x538.jpeg` | Yes | `/disciple-making-movement-dmm-key-characteristics-and-definition/` (tier-2, migrated) | 128 |
| `/wp-content/uploads/2023/05/pexels-photo-5543191.jpeg` | `public/wp-content/uploads/2023/05/pexels-photo-5543191.jpeg` | Yes | `/disciple-making-movement-dmm-key-characteristics-and-definition/` (tier-2, migrated — featured) | 128 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement.svg` | `public/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement.svg` | Yes | `/4-stages-of-movement-unlock-your-next-steps/` (tier-2, migrated) | 165 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-2.svg` | `public/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-2.svg` | Yes | `/4-stages-of-movement-unlock-your-next-steps/` (tier-2, migrated) | 165 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-3.svg` | `public/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-3.svg` | Yes | `/4-stages-of-movement-unlock-your-next-steps/` (tier-2, migrated) | 165 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | `public/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | Yes | `/4-stages-of-movement-unlock-your-next-steps/` (tier-2, migrated — featured) | 165 |
| `/wp-content/uploads/2023/02/nonresident-JTW6AUbCLC4-unsplash-3-1.jpg` | `public/wp-content/uploads/2023/02/nonresident-JTW6AUbCLC4-unsplash-3-1.jpg` | **No — "Won't fix" (2026-07-06)** | `/breakthrough-guide-for-a-modern-day-disciple/` (tier-2, migrated — `og_image` omitted, no inline images); `/4-stages-of-movement-unlock-your-next-steps/` (tier-2, migrated — was decorative CTA background only, chrome removed) | 228 / 165 |

## Acquisition priority

1. **Highest** — the 9 rows above with real Search Console impressions
   (top: `Church-Waffle-English-04-2023.pdf` at 347, both 12-disciples
   infographics, `3-Circles-Gospel-Presentation-1.webp`).
2. **High** — featured images for the 7 Tier 1 batch pages (7 files,
   flagged "featured" above) — these are what shows in social shares and
   search result rich previews.
3. **Normal** — everything else referenced by a migrated or Tier 1 page.
4. **Low** — the "not on a migrated/tier-1 page yet" rows; needed only
   when their page migrates in a future phase.

## Process once files are supplied

1. Drop into `imports/media/`, preserving the `<year>/<month>/` subfolder
   structure exactly as shown in the "WordPress path" column.
2. Move (don't re-encode or rename) into the matching "Expected public
   path" column above.
3. Confirm the referencing page's image renders — image `src` values in
   every migrated article already point at these exact relative paths.
4. Update this checklist's "Binary present?" column to "Yes" and
   cross-reference in `MEDIA_URLS_TO_PRESERVE.md`.

## If a media URL truly cannot be preserved

Document it in `REDIRECTS.md` with a planned 301. None are currently
planned — every file above is expected at its exact original path.
