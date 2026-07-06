# Media Acquisition Checklist

Every media file referenced by an already-migrated page or a Phase 3
Tier 1 page (the 7 in `PHASE_3_TIER_1_BATCH.md`), cross-referenced
against Search Console impressions. Source: WordPress export XML +
Google Search Console Pages CSV (supplied 2026-07-06).

**Binary status: 63 of 103 files have now been supplied.** These are
every row that lives in `2023/04`, `2023/05`, `2023/06`, or `2023/07`,
all received in full. All other rows below still read "No — not
supplied" because this environment has never received their actual
image/PDF bytes, only their paths and metadata (via WordPress
attachment records and the GSC export). See `/imports/README.md`.

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
  Next recommended folder: `2025/11` (see `MEDIA_IMPORT_PLAN.md`).

## Rule

Old URLs like `/wp-content/uploads/...` must keep working. Media files
must live under `public/wp-content/uploads/...` (the exact same path,
served by Astro at the exact same URL) unless a 301 is explicitly
planned and documented in `REDIRECTS.md`. No 301s are planned for any
media file below — every one is expected to be preserved at its exact
original path.

## Full list — 103 distinct files

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
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | `public/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | No — not supplied | `/discover-the-12-disciples-of-jesus-christ/` | 266 |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | `public/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | No — not supplied | `/discover-the-12-disciples-of-jesus-christ/` (featured) | 89 |
| `/wp-content/uploads/2023/06/Virtual-Training-Packet.pdf` | `public/wp-content/uploads/2023/06/Virtual-Training-Packet.pdf` | Yes | not on a migrated/tier-1 page yet | 41 |
| `/wp-content/uploads/2023/05/Church-Waffle-English-112222-1.pdf` | `public/wp-content/uploads/2023/05/Church-Waffle-English-112222-1.pdf` | Yes | not on a migrated/tier-1 page yet | 36 |
| `/wp-content/uploads/2023/04/4-Fields-Toolbox-Updated-03.31.23.pdf` | `public/wp-content/uploads/2023/04/4-Fields-Toolbox-Updated-03.31.23.pdf` | Yes | not on a migrated/tier-1 page yet | 36 |
| `/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1.webp` | `public/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1.webp` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` (featured) | 10 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-5.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-5.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 5 |
| `/wp-content/uploads/2023/09/3-Circles-Sticker-QR-Code.pdf` | `public/wp-content/uploads/2023/09/3-Circles-Sticker-QR-Code.pdf` | No — not supplied | not on a migrated/tier-1 page yet | 5 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible.webp` | `public/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible.webp` | No — not supplied | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 4 |
| `/wp-content/uploads/2025/11/Bible-Verse-About-Spreading-the-Gospel-Matthew-28.18-20-Great-Commission-Infographic.webp` | `public/wp-content/uploads/2025/11/Bible-Verse-About-Spreading-the-Gospel-Matthew-28.18-20-Great-Commission-Infographic.webp` | No — not supplied | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 4 |
| `/wp-content/uploads/2025/11/Bible-Verses-About-Spreading-the-Gospel-Complete-Scripture-Guide.webp` | `public/wp-content/uploads/2025/11/Bible-Verses-About-Spreading-the-Gospel-Complete-Scripture-Guide.webp` | No — not supplied | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending — featured) | 4 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-3.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-3.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 3 |
| `/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | `public/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | No — not supplied | not on a migrated/tier-1 page yet | 3 |
| `/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | `public/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | Yes | not on a migrated/tier-1 page yet | 3 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 2 |
| `/wp-content/uploads/2023/05/Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.webp` | `public/wp-content/uploads/2023/05/Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.webp` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 2 |
| `/wp-content/uploads/2025/11/Testimony-in-the-bible.webp` | `public/wp-content/uploads/2025/11/Testimony-in-the-bible.webp` | No — not supplied | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 2 |
| `/wp-content/uploads/2023/04/3-5.jpg` | `public/wp-content/uploads/2023/04/3-5.jpg` | Yes | `/discover-the-12-disciples-of-jesus-christ/` | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-2.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-2.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-4.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-4.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-1.jpg` | `public/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-1.jpg` | Yes | `/the-three-circles-gospel-presentation-step-by-step/` | 1 |
| `/wp-content/uploads/2023/05/Screen-Shot-2023-08-16-at-8.47.48-AM-1024x499.png` | `public/wp-content/uploads/2023/05/Screen-Shot-2023-08-16-at-8.47.48-AM-1024x499.png` | Yes | not on a migrated/tier-1 page yet | 1 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | `public/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | Yes | not on a migrated/tier-1 page yet | 1 |
| `/wp-content/uploads/2025/01/e3adfe1623cfb8a49a60f903b1515adb.Screen-Shot-2023-08-05-at-8.26.31-AM-1.webp` | `public/wp-content/uploads/2025/01/e3adfe1623cfb8a49a60f903b1515adb.Screen-Shot-2023-08-05-at-8.26.31-AM-1.webp` | No — not supplied | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 0 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-3.webp` | `public/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-3.webp` | No — not supplied | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 0 |
| `/wp-content/uploads/2025/03/gen-z-bible-study.jpg` | `public/wp-content/uploads/2025/03/gen-z-bible-study.jpg` | No — not supplied | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | 0 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-1.webp` | `public/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-1.webp` | No — not supplied | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` (featured) | 0 |
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
| `/wp-content/uploads/2025/11/short-christian-testimony-examples.webp` | `public/wp-content/uploads/2025/11/short-christian-testimony-examples.webp` | No — not supplied | `/15-second-testimony-examples-ignite-your-faith/` (featured), `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2026/02/Multiply-disciples-in-real-life.webp` | `public/wp-content/uploads/2026/02/Multiply-disciples-in-real-life.webp` | No — not supplied | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/06/1-2-1-1-1.png` | `public/wp-content/uploads/2023/06/1-2-1-1-1.png` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/01/Untitled-design-52.webp` | `public/wp-content/uploads/2025/01/Untitled-design-52.webp` | No — not supplied | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/03/maxresdefault-7-1024x576.jpg` | `public/wp-content/uploads/2025/03/maxresdefault-7-1024x576.jpg` | No — not supplied | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-48-1024x1024.webp` | `public/wp-content/uploads/2025/01/Copy-of-Untitled-48-1024x1024.webp` | No — not supplied | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/05/1-1.webp` | `public/wp-content/uploads/2023/05/1-1.webp` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-47-1024x1024.webp` | `public/wp-content/uploads/2025/01/Copy-of-Untitled-47-1024x1024.webp` | No — not supplied | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/06/1-2-1-1.png` | `public/wp-content/uploads/2023/06/1-2-1-1.png` | Yes | `/` (homepage, not currently used) | 0 |
| `/wp-content/uploads/2023/05/Copy-of-Experience-confidence-in-your-disciple-making-1.png` | `public/wp-content/uploads/2023/05/Copy-of-Experience-confidence-in-your-disciple-making-1.png` | Yes | `/` (homepage, hero image, in use) | 0 |
| `/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet-1024x576.webp` | `public/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet-1024x576.webp` | No — not supplied | `/movement-resources/12-practice-church-circle/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet.webp` | `public/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet.webp` | No — not supplied | `/movement-resources/12-practice-church-circle/` (tier-1, pending — featured) | 0 |
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
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.26.03-PM-1024x575.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.26.03-PM-1024x575.png` | No — not supplied | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/short-christian-testimony-examples-1024x576.webp` | `public/wp-content/uploads/2025/11/short-christian-testimony-examples-1024x576.webp` | No — not supplied | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1-1024x576.webp` | `public/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1-1024x576.webp` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.29.37-PM-1024x577.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.29.37-PM-1024x577.png` | No — not supplied | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/07/personal-evangelism-main-header-1024x576.png` | `public/wp-content/uploads/2023/07/personal-evangelism-main-header-1024x576.png` | Yes | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.28.45-PM-1024x573.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.28.45-PM-1024x573.png` | No — not supplied | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.27.25-PM-1024x575.png` | `public/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.27.25-PM-1024x575.png` | No — not supplied | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2023/08/Step-by-Step-Guide-to-Evangelizing-Confident-Conversations-About-Faith.webp` | `public/wp-content/uploads/2023/08/Step-by-Step-Guide-to-Evangelizing-Confident-Conversations-About-Faith.webp` | No — not supplied | `/how-to-evangelize-ultimate-step-by-step-guide/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2025/02/Jesus-with-disciples-1024x513.jpg` | `public/wp-content/uploads/2025/02/Jesus-with-disciples-1024x513.jpg` | No — not supplied | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/5520c44066fbc694ac1c2e207151fe125162f59d.jpeg` | `public/wp-content/uploads/2025/02/5520c44066fbc694ac1c2e207151fe125162f59d.jpeg` | No — not supplied | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/Paul-in-Athens.jpg` | `public/wp-content/uploads/2025/02/Paul-in-Athens.jpg` | No — not supplied | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg` | `public/wp-content/uploads/2025/02/760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg` | No — not supplied | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/02/jesus_chooses_twelve_apostles.webp` | `public/wp-content/uploads/2025/02/jesus_chooses_twelve_apostles.webp` | No — not supplied | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2025/11/two-young-men-sharing-their-faith-in-Jesus.jpg` | `public/wp-content/uploads/2025/11/two-young-men-sharing-their-faith-in-Jesus.jpg` | No — not supplied | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/A-Mans-Testimony-of-Faith-in-the-Midst-of-Struggle.webp` | `public/wp-content/uploads/2025/11/A-Mans-Testimony-of-Faith-in-the-Midst-of-Struggle.webp` | No — not supplied | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Mid-30s-Professor-Shares-Personal-Testimony-with-Students.webp` | `public/wp-content/uploads/2025/11/Mid-30s-Professor-Shares-Personal-Testimony-with-Students.webp` | No — not supplied | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/testimony-in-the-bible-20-powerful-verses-real-examples.webp` | `public/wp-content/uploads/2025/11/testimony-in-the-bible-20-powerful-verses-real-examples.webp` | No — not supplied | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` (tier-1, pending — featured) | 0 |
| `/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.webp` | `public/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.webp` | No — not supplied | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Sharing-the-Gospel-Over-Coffee-Evangelism-Conversation.webp` | `public/wp-content/uploads/2025/11/Sharing-the-Gospel-Over-Coffee-Evangelism-Conversation.webp` | No — not supplied | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.jpg` | `public/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.jpg` | No — not supplied | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/Two-Gen-Z-Young-People-Having-Spiritual-Conversation-on-Park-Bench.webp` | `public/wp-content/uploads/2025/11/Two-Gen-Z-Young-People-Having-Spiritual-Conversation-on-Park-Bench.webp` | No — not supplied | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |
| `/wp-content/uploads/2025/11/GREAT-COMMISSION-LANDING-1-1.webp` | `public/wp-content/uploads/2025/11/GREAT-COMMISSION-LANDING-1-1.webp` | No — not supplied | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` (tier-1, pending) | 0 |

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
