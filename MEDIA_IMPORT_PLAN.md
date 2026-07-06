# Media Import Plan

Every media file referenced by an already-migrated page, a real Tier 1
page (all 12 — done), or a real Tier 2 page (22 — not yet migrated, but
cataloged ahead of time so we know what to collect). Source: WordPress
export XML + Google Search Console Pages CSV (supplied 2026-07-06).

**Most of these files have not been supplied yet.** Ten month folders
have now been received and extracted: `2023/02` (559 files, one file
marked "Won't fix" — see below), `2023/04` (47 files, all 47 tracked
rows matched exactly), `2023/05` (39 files, all 39 tracked rows matched
exactly), `2023/06` (3 files, all 3 tracked rows matched exactly),
`2023/07` (6 files, all 6 tracked rows matched exactly), `2023/08` (56
files landed, all 5 tracked rows matched exactly plus 51 untracked size
variants), `2023/09` (6 files across two uploads, all 6 tracked rows
now matched exactly), `2025/11` (136 files landed, all 19 tracked rows
matched exactly plus 117 untracked size variants), `2025/01` (375 files
landed, all 23 tracked rows matched exactly plus 352 untracked size
variants), and `2025/02` (132 files landed, but only 1 of 9 tracked
rows matched — **8 still genuinely missing, including all 5 Priority B
files needed by the already-live `apostles-meaning` page** — see
"Received uploads log" below for detail). Every other row still reads
"No" under Present — this environment has only ever received paths and
metadata (via WordPress attachment records and the GSC export) for the
rest, never the actual image/PDF bytes.

## Rule — do not violate this during import

- **Preserve `/wp-content/uploads/...` paths exactly.** Do not rewrite
  to prettier URLs, do not move anything to `/images/` or any other
  directory.
- Files must land at `public/wp-content/uploads/<year>/<month>/<filename>`
  — the same relative path Astro will serve at the same URL as the old
  WordPress site.
- The only exception is a documented 301 in `REDIRECTS.md` — none exist
  currently (see `SLUG_VERIFICATION_AUDIT.md`), so there is no exception
  in practice right now.

## Priority groups

- **A — Search Console impressions.** These files have real recorded
  impressions/clicks in the known GSC export — they're actively being
  found by Google right now, on the live WordPress site. Highest
  priority regardless of which page (if any) uses them.
- **B — Used by migrated Tier 1 pages.** No individual GSC data of
  their own, but they're embedded in the 12 pages already live in this
  Astro repo. Missing these means broken images on real, published
  pages today.
- **C — Used by upcoming Tier 2 pages.** Cataloged by scanning the 22
  real tier-2 pages' WordPress content directly (not yet migrated to
  Astro) so this list is ready before that migration starts. Nice to
  collect now, not urgent.
- **D — Everything else.** No entries currently — every media file this
  project knows about is accounted for in A, B, or C. (This bucket
  exists for completeness; it will start filling in once tier-3 pages
  or category/tag archives are cataloged in a future phase.)

### Priority A (24 files)

| WordPress path | Type | Source page(s) | Present? | Impressions |
|---|---|---|---|---:|
| `/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf` | pdf | (GSC only, no known page) | Yes | 347 |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | webp | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 266 |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | webp | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 89 |
| `/wp-content/uploads/2023/06/Virtual-Training-Packet.pdf` | pdf | (GSC only, no known page) | Yes | 41 |
| `/wp-content/uploads/2023/04/4-Fields-Toolbox-Updated-03.31.23.pdf` | pdf | (GSC only, no known page) | Yes | 36 |
| `/wp-content/uploads/2023/05/Church-Waffle-English-112222-1.pdf` | pdf | (GSC only, no known page) | Yes | 36 |
| `/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1.webp` | webp | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 10 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-5.jpg` | jpg | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 5 |
| `/wp-content/uploads/2023/09/3-Circles-Sticker-QR-Code.pdf` | pdf | (GSC only, no known page) | Yes | 5 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible.webp` | webp | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | Yes | 4 |
| `/wp-content/uploads/2025/11/Bible-Verse-About-Spreading-the-Gospel-Matthew-28.18-20-Great-Commission-Infographic.webp` | webp | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | Yes | 4 |
| `/wp-content/uploads/2025/11/Bible-Verses-About-Spreading-the-Gospel-Complete-Scripture-Guide.webp` | webp | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | Yes | 4 |
| `/wp-content/uploads/2023/04/12044-small-group-bible-study-gettyimages-rawpixel.jpeg` | jpeg | `/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/` | Yes | 3 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-3.jpg` | jpg | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 3 |
| `/wp-content/uploads/2025/11/7-Scripture-Based-Reasons-Your-Testimony-Is-a-Spiritual-Weapon.webp` | webp | `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/` | Yes | 3 |
| `/wp-content/uploads/2023/05/Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.webp` | webp | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 2 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1.jpg` | jpg | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 2 |
| `/wp-content/uploads/2025/11/Testimony-in-the-bible.webp` | webp | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | Yes | 2 |
| `/wp-content/uploads/2023/04/3-5.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 1 |
| `/wp-content/uploads/2023/05/Screen-Shot-2023-08-16-at-8.47.48-AM-1024x499.png` | png | (GSC only, no known page) | Yes | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-1.jpg` | jpg | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-2.jpg` | jpg | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 1 |
| `/wp-content/uploads/2023/05/screen-shot-2018-03-19-at-5-23-09-pm-1-4.jpg` | jpg | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 1 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-4.svg` | svg | `/4-stages-of-movement-unlock-your-next-steps/` | Yes | 1 |
### Priority B (79 files)

| WordPress path | Type | Source page(s) | Present? | Impressions |
|---|---|---|---|---:|
| `/wp-content/uploads/2023/04/1-1-1024x1024.png` | png | `/unlocking-the-power-of-apest-the-ultimate-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/04/1-4-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/1-5.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/10-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/10-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/11-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/11-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/12-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/12-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/2-1-1024x1024.png` | png | `/unlocking-the-power-of-apest-the-ultimate-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/04/2-4-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/2-5.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/3-2-1024x1024.png` | png | `/unlocking-the-power-of-apest-the-ultimate-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/04/3-4-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/4-1-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/4-2-1024x1024.png` | png | `/unlocking-the-power-of-apest-the-ultimate-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/04/4-2.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/5-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/5-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/5-1024x1024.png` | png | `/unlocking-the-power-of-apest-the-ultimate-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/04/6-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/6-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/7-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/7-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/8-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/8-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/9-1.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/9-1024x1024.jpg` | jpg | `/discover-the-12-disciples-of-jesus-christ/` | Yes | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.08-AM-1024x804.jpg` | jpg | `/three-thirds/` | Yes | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-1024x766.png` | png | `/three-thirds/` | Yes | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-1536x1149.png` | png | `/three-thirds/` | Yes | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-300x224.png` | png | `/three-thirds/` | Yes | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM-768x574.png` | png | `/three-thirds/` | Yes | 0 |
| `/wp-content/uploads/2023/04/Screen-Shot-2023-04-02-at-7.11.17-AM.png` | png | `/three-thirds/` | Yes | 0 |
| `/wp-content/uploads/2023/04/Untitled-design-14.png` | png | `/unlocking-the-power-of-apest-the-ultimate-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/05/1-1.webp` | webp | `/` | Yes | 0 |
| `/wp-content/uploads/2023/05/3-Circles-Gospel-Presentation-1-1024x576.webp` | webp | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/05/4-1-1-YFC-1-e1684600816203.jpg` | jpg | `/15-second-testimony-examples-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2023/05/4-1-1-YFC-5-e1684599818569.png` | png | `/15-second-testimony-examples-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2023/05/4-1-1-YFC-e1684600391124-768x430.jpg` | jpg | `/15-second-testimony-examples-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Copy-of-Experience-confidence-in-your-disciple-making-1.png` | png | `/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Three-Thirds-Meeting-Format.webp` | webp | `/three-thirds/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Untitled-design-2025-01-13T131631.873-1024x1024.png` | png | `/the-three-circles-gospel-presentation-step-by-step/` | Yes | 0 |
| `/wp-content/uploads/2023/05/pexels-charlotte-may-5965923-1024x683.jpg` | jpg | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/06/1-2-1-1-1.png` | png | `/` | Yes | 0 |
| `/wp-content/uploads/2023/06/1-2-1-1.png` | png | `/` | Yes | 0 |
| `/wp-content/uploads/2023/07/personal-evangelism-main-header-1024x576.png` | png | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.26.03-PM-1024x575.png` | png | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.27.25-PM-1024x575.png` | png | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.28.45-PM-1024x573.png` | png | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/08/Screen-Shot-2023-08-07-at-8.29.37-PM-1024x577.png` | png | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2023/08/Step-by-Step-Guide-to-Evangelizing-Confident-Conversations-About-Faith.webp` | webp | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet-1024x576.webp` | webp | `/movement-resources/12-practice-church-circle/` | Yes | 0 |
| `/wp-content/uploads/2025/01/4-1-1-12-Stories-Packet.webp` | webp | `/movement-resources/12-practice-church-circle/` | Yes | 0 |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-47-1024x1024.webp` | webp | `/` | Yes | 0 |
| `/wp-content/uploads/2025/01/Copy-of-Untitled-48-1024x1024.webp` | webp | `/` | Yes | 0 |
| `/wp-content/uploads/2025/01/Untitled-design-52.webp` | webp | `/` | Yes | 0 |
| `/wp-content/uploads/2025/01/e3adfe1623cfb8a49a60f903b1515adb.Screen-Shot-2023-08-05-at-8.26.31-AM-1.webp` | webp | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | Yes | 0 |
| `/wp-content/uploads/2025/02/5520c44066fbc694ac1c2e207151fe125162f59d.jpeg` | jpeg | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | No | 0 |
| `/wp-content/uploads/2025/02/760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg` | jpg | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | No | 0 |
| `/wp-content/uploads/2025/02/Jesus-with-disciples-1024x513.jpg` | jpg | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | No | 0 |
| `/wp-content/uploads/2025/02/Paul-in-Athens.jpg` | jpg | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | No | 0 |
| `/wp-content/uploads/2025/02/jesus_chooses_twelve_apostles.webp` | webp | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | No | 0 |
| `/wp-content/uploads/2025/03/gen-z-bible-study.jpg` | jpg | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | No | 0 |
| `/wp-content/uploads/2025/03/maxresdefault-7-1024x576.jpg` | jpg | `/` | No | 0 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-1.webp` | webp | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | Yes | 0 |
| `/wp-content/uploads/2025/11/7-Stories-of-Hope-in-the-Bible-3.webp` | webp | `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | Yes | 0 |
| `/wp-content/uploads/2025/11/A-Mans-Testimony-of-Faith-in-the-Midst-of-Struggle.webp` | webp | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/GREAT-COMMISSION-LANDING-1-1.webp` | webp | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/Mid-30s-Professor-Shares-Personal-Testimony-with-Students.webp` | webp | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.jpg` | jpg | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/Personal-Relational-Network-Oikos-Map-Template.webp` | webp | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/Sharing-the-Gospel-Over-Coffee-Evangelism-Conversation.webp` | webp | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/Two-Gen-Z-Young-People-Having-Spiritual-Conversation-on-Park-Bench.webp` | webp | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/short-christian-testimony-examples-1024x576.webp` | webp | `/how-to-evangelize-ultimate-step-by-step-guide/` | Yes | 0 |
| `/wp-content/uploads/2025/11/short-christian-testimony-examples.webp` | webp | `/15-second-testimony-examples-ignite-your-faith/`, `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/testimony-in-the-bible-20-powerful-verses-real-examples.webp` | webp | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2025/11/two-young-men-sharing-their-faith-in-Jesus.jpg` | jpg | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | Yes | 0 |
| `/wp-content/uploads/2026/02/Multiply-disciples-in-real-life.webp` | webp | `/` | No | 0 |
### Priority C (68 files)

| WordPress path | Type | Source page(s) | Present? | Impressions |
|---|---|---|---|---:|
| `/wp-content/uploads/2020/12/Screenshot-2023-09-02-at-4.18.46-PM.png` | png | `/stickers/` | No | 0 |
| `/wp-content/uploads/2023/02/nonresident-JTW6AUbCLC4-unsplash-3-1.jpg` | jpg | `/4-stages-of-movement-unlock-your-next-steps/`, `/breakthrough-guide-for-a-modern-day-disciple/` | Won't fix — see note | 0 |
| `/wp-content/uploads/2023/04/75598-scaled.webp` | webp | `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` | Yes | 0 |
| `/wp-content/uploads/2023/04/eliott-reyna-jCEpN62oWL4-unsplash.jpg` | jpg | `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/` | Yes | 0 |
| `/wp-content/uploads/2023/04/image-1024x576.jpg` | jpg | `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | Yes | 0 |
| `/wp-content/uploads/2023/04/maxresdefault-3.jpg` | jpg | `/10-qualities-present-in-every-church-planting-movement-keys-to-sustainable-growth-and-multiplication/` | Yes | 0 |
| `/wp-content/uploads/2023/04/multiplication.jpeg` | jpeg | `/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/` | Yes | 0 |
| `/wp-content/uploads/2023/04/pexels-photo-2258251.jpeg` | jpeg | `/prayer-is-essential-12-key-prayer-points-for-disciple-making-movements/` | Yes | 0 |
| `/wp-content/uploads/2023/04/pexels-photo-5543374.jpeg` | jpeg | `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` | Yes | 0 |
| `/wp-content/uploads/2023/04/pexels-photo-6860404.jpeg` | jpeg | `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | Yes | 0 |
| `/wp-content/uploads/2023/05/4-Fields-1-e1685451774487.jpg` | jpg | `/how-to-get-started-in-four-fields-training/` | Yes | 0 |
| `/wp-content/uploads/2023/05/4-Fields-Nathan-Shank-2014.pdf` | pdf | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | Yes | 0 |
| `/wp-content/uploads/2023/05/4-Fields-e1685451695430.jpg` | jpg | `/how-to-get-started-in-four-fields-training/` | Yes | 0 |
| `/wp-content/uploads/2023/05/DBS_2-e1686219964976-1024x538.jpeg` | jpeg | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | Yes | 0 |
| `/wp-content/uploads/2023/05/DBS_2-e1686219964976-300x158.jpeg` | jpeg | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | Yes | 0 |
| `/wp-content/uploads/2023/05/DBS_2-e1686219964976-768x403.jpeg` | jpeg | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | Yes | 0 |
| `/wp-content/uploads/2023/05/DBS_2-e1686219964976.jpeg` | jpeg | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Includes-3-Circles-Video-1-1024x576.jpg` | jpg | `/disciple-making-movement-books-top-25-must-reads/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Screen-Shot-2023-04-02-at-7.11.17-AM-copy-2-1024x766.jpg` | jpg | `/ridiculously-simple-3-ways-to-make-disciples/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Screen-Shot-2023-05-20-at-12.10.25-PM-scaled.jpg` | jpg | `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Screenshot-2023-05-06-at-10.05.09-AM.jpg` | jpg | `/how-to-get-started-in-four-fields-training/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Untitled-design-5-1024x576.jpg` | jpg | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Untitled-design-5-1536x864.jpg` | jpg | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Untitled-design-5-300x169.jpg` | jpg | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Untitled-design-5-768x432.jpg` | jpg | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | Yes | 0 |
| `/wp-content/uploads/2023/05/Untitled-design-5.jpg` | jpg | `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | Yes | 0 |
| `/wp-content/uploads/2023/05/books.jpeg` | jpeg | `/disciple-making-movement-books-top-25-must-reads/` | Yes | 0 |
| `/wp-content/uploads/2023/05/pexels-photo-4051134.jpeg` | jpeg | `/ridiculously-simple-3-ways-to-make-disciples/` | Yes | 0 |
| `/wp-content/uploads/2023/05/pexels-photo-5543191.jpeg` | jpeg | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | Yes | 0 |
| `/wp-content/uploads/2023/05/pexels-photo-977659.jpeg` | jpeg | `/seven-words-of-jesus-on-the-cross/` | Yes | 0 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-2.svg` | svg | `/4-stages-of-movement-unlock-your-next-steps/` | Yes | 0 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement-3.svg` | svg | `/4-stages-of-movement-unlock-your-next-steps/` | Yes | 0 |
| `/wp-content/uploads/2023/07/5-Levels-of-Movement-_-4-Stages-of-Movement.svg` | svg | `/4-stages-of-movement-unlock-your-next-steps/` | Yes | 0 |
| `/wp-content/uploads/2023/07/personal-evangelism-main-header.png` | png | `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | Yes | 0 |
| `/wp-content/uploads/2023/09/Four-Fields-1024x1024.png` | png | `/stickers/` | Yes | 0 |
| `/wp-content/uploads/2023/09/Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.png` | png | `/stickers/` | Yes | 0 |
| `/wp-content/uploads/2023/09/Untitled-design-2023-09-03T125747.090-1024x1024.png` | png | `/stickers/` | Yes | 0 |
| `/wp-content/uploads/2023/09/Untitled-design-2023-09-03T132350.205-1024x1024.png` | png | `/stickers/` | Yes | 0 |
| `/wp-content/uploads/2023/09/Untitled-design-2023-09-03T134034.787-1024x1024.jpg` | jpg | `/stickers/` | Yes | 0 |
| `/wp-content/uploads/2025/01/1-2.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/1-4.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/2-3.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/2-5.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/3-3.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/3-5.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/4-3.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/4-4.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/5-2.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/6-3.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/68471e1fad432c1ff6f1c342ff450a0d.Target.webp` | webp | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/Untitled-design-2025-01-21T095505.451.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/Untitled-design-2025-01-22T193434.274.jpg` | jpg | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | Yes | 0 |
| `/wp-content/uploads/2025/01/disciple-making-leader.webp` | webp | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | Yes | 0 |
| `/wp-content/uploads/2025/01/reading-the-bible.webp` | webp | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | Yes | 0 |
| `/wp-content/uploads/2025/02/2-1024x1024.jpg` | jpg | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/02/3-Circles-Sticker-Multiplying-Disciples.webp` | webp | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/02/3.jpg` | jpg | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/02/Untitled-design-2025-11-28T172403.122.webp` | webp | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | Yes | 0 |
| `/wp-content/uploads/2025/10/3-circles-sticker-cheap-1024x792.webp` | webp | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/10/3-circles-sticker-dark-mode-1024x788.webp` | webp | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/10/4-Fields-Sticker-4-Fields-of-Kingdom-Growth-1024x1024.webp` | webp | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/10/church-waffle-sticker-1024x1024.webp` | webp | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/11/Sharing-Your-Testimony-Scripture-7-Biblical-Reasons-You-Cant-Stay-Silent.webp` | webp | `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/` | Yes | 0 |
| `/wp-content/uploads/2025/12/15-Second-Testimony-Sticker-Personal-Testimony-Evangelism-Tool-1024x458.webp` | webp | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/12/Christian-Prayer-Wheel-diagram-showing-12-prayer-segments.webp` | webp | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` | No | 0 |
| `/wp-content/uploads/2025/12/Christian-Prayer-Wheel-diagram-with-12-segments.webp` | webp | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` | No | 0 |
| `/wp-content/uploads/2025/12/christian-prayer-wheel-sticker-1024x1024.webp` | webp | `/stickers/` | No | 0 |
| `/wp-content/uploads/2025/12/christian-prayer-wheel-sticker.webp` | webp | `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` | No | 0 |

### Priority D (0 files)

None identified yet. Will populate as tier-3 pages and category/tag
archives get cataloged in later phases.

## Received uploads log

Tracks each media zip supplied so far, extracted straight into
`public/wp-content/uploads/<year>/<month>/` with original filenames and
folder structure untouched (no renames, no re-encoding, no move to
`/images/`).

| Date | Month folder | Files | Notes |
|---|---|---|---|
| 2026-07-06 | `2023/02` | 559 | Only 1 file in this folder is tracked in this doc (`nonresident-JTW6AUbCLC4-unsplash-3-1.jpg`, Priority C) and it does not exist in the upload at its exact filename — only 23 differently-suffixed size variants (e.g. `nonresident-JTW6AUbCLC4-unsplash-3-1-1024x452.jpg`, `nonresident-JTW6AUbCLC4-unsplash-3-e1675705283323-*.jpg`). No Priority A or B files exist in `2023/02`, so this has zero effect on any currently-migrated page. **Decision (2026-07-06): will not chase this file further.** It's left blank pending a redesign of the two tier-2 pages that reference it (`4-stages-of-movement-unlock-your-next-steps`, `breakthrough-guide-for-a-modern-day-disciple`) — not blocking, not re-requested in future upload batches. |
| 2026-07-06 | `2023/04` | 47 | **All 47 tracked rows in this folder matched exactly** (4 Priority A, 35 Priority B, 8 Priority C) — every one flipped to "Yes" above. This fixes every currently-broken image on the 3 already-live migrated pages that reference `2023/04` assets (12-disciples, unlocking-APEST, three-thirds). The 1 Priority A row tagged to `what-is-a-simple-church-...` and the 8 Priority C rows are for tier-2 pages not yet migrated, so they're collected ahead of need rather than fixing anything live today. |
| 2026-07-06 | `2023/05` | 39 | **All 39 tracked rows in this folder matched exactly** (10 Priority A, 9 Priority B, 20 Priority C) — every one flipped to "Yes" above. This fixes every currently-broken image on the 5 already-live migrated pages that reference `2023/05` assets (homepage, three-circles-step-by-step, how-to-evangelize, 15-second-testimony, three-thirds). The remaining Priority C rows (four-fields, DBS, disciple-making-movement, and other tier-2 pages) are collected ahead of need, not fixing anything live today. |
| 2026-07-06 | `2023/06` | 3 | **All 3 tracked rows in this folder matched exactly** (1 Priority A — `Virtual-Training-Packet.pdf`, 2 Priority B — both used on the homepage) — every one flipped to "Yes" above. This upload arrived as a zip containing macOS `.DS_Store`/`__MACOSX` junk alongside the 3 real files; the junk was excluded during extraction and never touched the repo. |
| 2026-07-06 | `2023/07` | 6 | **All 6 tracked rows in this folder matched exactly** (1 Priority A, 5 Priority B) — every one flipped to "Yes" above. Same macOS junk pattern as `2023/06` (excluded during extraction). One Priority B file, `personal-evangelism-main-header-1024x576.png`, is tagged to the already-live `/how-to-evangelize-ultimate-step-by-step-guide/` page — confirmed present in that page's `dist/` output. The rest (4 svg icons + 1 header image) are tagged to tier-2 pages not yet migrated (`4-stages-of-movement-unlock-your-next-steps`, `5-proven-strategies-...`), collected ahead of need. |
| 2026-07-06 | `2023/08` | 56 landed, 5 tracked | **All 5 tracked rows in this folder matched exactly** (5 Priority B, all tagged to the already-live `/how-to-evangelize-ultimate-step-by-step-guide/` page) — every one flipped to "Yes" above. This fixes 5 real broken images on that page. Same macOS junk pattern as `2023/06`/`2023/07` (excluded during extraction). The other 51 files that landed are untracked WordPress-generated size variants of the same 4 base screenshots (e.g. `Screen-Shot-2023-08-07-at-8.24.33-PM-1300x1117.png`) — preserved at their exact original paths since they're real WordPress media, just not individually referenced by any known page or GSC row. |
| 2026-07-06 | `2023/09` | 5 (first upload) + 1 (follow-up) = 6 | **First upload:** 5 of 6 tracked rows matched (1 Priority A — `3-Circles-Sticker-QR-Code.pdf` — and 4 of 5 Priority C rows, all tagged to `/stickers/`, a tier-2 page not yet migrated). **Still missing after first upload:** `Screenshot-2023-09-02-at-7.30.01-PM-1-1024x1024.png`. **Follow-up upload (same day):** that exact missing file was supplied individually and now matches exactly — **all 6 tracked `2023/09` rows are present.** No Priority B files exist in `2023/09`, so neither upload affects any currently-migrated page either way (`/stickers/` isn't migrated). Same macOS junk pattern as prior uploads (excluded during extraction). |
| 2026-07-06 | `2025/11` | 136 landed, 19 tracked | **All 19 tracked rows in this folder matched exactly** (5 Priority A, 13 Priority B, 1 Priority C) — every one flipped to "Yes" above. 17 of these 19 (4 A + 13 B) are tagged to 5 already-live migrated pages (7-stories-of-hope, bible-verse-about-spreading-the-gospel, testimony-in-the-bible, how-to-evangelize, 15-second-testimony) — this fixes real broken images on all 5. The remaining 2 rows (1 A + 1 C) are tagged to `/the-power-of-sharing-your-testimony-scripture-...`, a tier-2 page not yet migrated. Same macOS junk pattern as prior uploads (excluded during extraction). The other 117 files that landed are untracked size variants and unrelated media in the same month folder — preserved at their exact original paths. |
| 2026-07-06 | `2025/01` | 375 landed, 23 tracked | **All 23 tracked rows in this folder matched exactly** (2 Priority A, 6 Priority B, 15 Priority C) — every one flipped to "Yes" above. Verified against `dist/` output: 5 of these 23 files are genuinely embedded and now fix real broken images on 3 already-live pages (2 on discover-the-12-disciples, 2 on 12-practice-church-circle, 1 on 7-stories-of-hope). 3 more Priority B rows (`Untitled-design-52`, `Copy-of-Untitled-47`, `Copy-of-Untitled-48`) are tagged to the homepage but confirmed **not** embedded in its rendered output. The remaining 15 Priority C rows are tagged to 2 tier-2 pages not yet migrated (`what-is-a-strategy-coordinator-...`, `understanding-biblical-discipleship-...`). Same macOS junk pattern as prior uploads (excluded during extraction). The other 352 files that landed are untracked size variants and unrelated media in the same month folder. |
| 2026-07-06 | `2025/02` | 132 landed, 9 tracked | **Only 1 of 9 tracked rows matched** (`Untitled-design-2025-11-28T172403.122.webp`, Priority C, tagged to `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/`, a tier-2 page not yet migrated — no live impact). **8 tracked rows are still genuinely missing**, and this is the most consequential gap so far: **all 5 Priority B files needed by the already-live `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` page** (`5520c44066fbc694ac1c2e207151fe125162f59d.jpeg`, `760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg`, `Jesus-with-disciples-1024x513.jpg`, `Paul-in-Athens.jpg`, `jesus_chooses_twelve_apostles.webp`) plus 3 more Priority C rows for `/stickers/` (`2-1024x1024.jpg`, `3-Circles-Sticker-Multiplying-Disciples.webp`, `3.jpg`). This upload appears to be a thumbnail/crop-only export — the 132 files that landed are almost entirely small `100x100`/`150x150` variants, and near-miss checks confirm size-variant versions of most missing filenames exist (e.g. `5520c44066fbc694ac1c2e207151fe125162f59d-100x100.jpeg`) but never the full-size originals actually referenced by the pages. Confirmed via fresh `astro build` + `dist/` check that the `apostles-meaning` page does reference these exact 5 filenames and they do not resolve — **this page currently has 5 broken images.** |

## Note on `/movement-resources/12-practice-church-circle/`

That page's body also embeds 12 images, but they're hosted on
`obey.tools` (the sister site), not multiplyingdisciples.us — confirmed
by checking each image URL's domain directly. They're excluded from
every table above on purpose; they need no local preservation.

## Total

- Priority A: 24 files
- Priority B: 79 files
- Priority C: 68 files
- Priority D: 0 files
- **Total distinct files tracked: 171**
- **Present so far: 149 of 171 tracked rows** (all 47 `2023/04` rows —
  4 A, 35 B, 8 C — plus all 39 `2023/05` rows — 10 A, 9 B, 20 C — plus
  all 3 `2023/06` rows — 1 A, 2 B — plus all 6 `2023/07` rows — 1 A,
  5 B — plus all 5 `2023/08` rows — 5 B — plus all 6 `2023/09` rows —
  1 A, 5 C — plus all 19 `2025/11` rows — 5 A, 13 B, 1 C — plus all 23
  `2025/01` rows — 2 A, 6 B, 15 C — plus 1 of 9 `2025/02` rows — 1 C.
  The `2023/02` file is marked "Won't fix" (not counted as a gap). The
  **8 still-genuinely-missing `2025/02` files are the most
  consequential gap remaining** — 5 of them are Priority B, causing 5
  real broken images on the live `apostles-meaning` page right now —
  see "Received uploads log" above)
