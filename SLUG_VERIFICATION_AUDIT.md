# Slug Verification Audit

Requested before Phase 4, because Phase 3's summary flagged several
slug corrections and those need independent verification against
ground truth before further migration proceeds. This audit re-derives
each answer directly from the source files — not from memory of earlier
analysis.

## Sources checked

- **WordPress export XML** (`multiplyingdisciples.WordPress.20260706.xml`)
  — queried directly for `wp:post_name` and `<link>` on each candidate
  slug, both the suspected-real and suspected-wrong variants.
- **Google Search Console Pages export** (`Pages.csv`) — grepped for
  both variants of each URL.
- **Sitemap data** (`Sitemap_Index.xml`) — see limitation below.
- **Current Astro build** — fresh `astro build`, checked the actual
  `dist/` output directory and each file's `slug` frontmatter.

### Sitemap limitation (read this first)

We only have the **sitemap index**, which lists 5 sub-sitemap URLs
(`post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`,
`post_tag-sitemap.xml`, `gblocks_pattern_collections-sitemap.xml`) —
none of their contents. No individual page URL has been directly
confirmed from a sitemap file in this project.

This is a smaller gap than it sounds: AIOSEO (the plugin that generated
this sitemap index, per its own header comment) builds sitemap URLs
directly from each post's `post_name` / permalink in the WordPress
database — the exact same field the WordPress export's `<link>` element
is built from. There is no mechanism by which the sitemap would show a
different slug than the export XML for the same live post. So while we
haven't independently fetched a sitemap file, the export XML is not a
weaker source for this question — it's the same underlying data. The
sub-sitemaps would still be worth acquiring for **coverage** (confirming
we've found every real URL) but not for resolving **conflicting slugs**
on posts we've already identified.

## 1. Bible verse about spreading the gospel

| Source | Value |
|---|---|
| WordPress export — searched for `bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith` | **Found.** post_id 13787, type `post`, status `publish`, title "Bible Verse About Spreading the Gospel: Complete Guide for Sharing Your Faith", `<link>https://multiplyingdisciples.us/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/</link>` |
| WordPress export — searched for `bible-verses-about-spreading-the-gospel-complete-guide-for-sharing-your-faith` (plural) | **Not found.** No post with this `post_name` exists anywhere in the export. |
| GSC Pages.csv — singular "verse" | **Found.** `https://multiplyingdisciples.us/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/,2,8305,0.02%,15.87` |
| GSC Pages.csv — plural "verses" | **Not found** as a page row. (A *media filename* — `Bible-Verses-About-Spreading-the-Gospel-Complete-Scripture-Guide.webp` — does use plural "Verses," but that's an image file name, not the page URL. Don't confuse the two.) |
| Sitemap | Not independently checked — see limitation above. |
| Current Astro generated path | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/index.html` (confirmed in fresh `dist/` build) |
| Frontmatter `slug` | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` |
| **Verdict** | **Singular "verse" is correct.** Current implementation matches. No redirect needed. The plural variant never existed on the live site — it was a misremembering in the original migration brief, not a real alternate URL. |

## 2. APEST / apostle ultimate guide

| Source | Value |
|---|---|
| WordPress export — searched for `unlocking-the-power-of-apest-the-ultimate-guide` | **Found.** post_id 7212, type `post`, status `publish`, title "Unlocking the Power of APEST: The Ultimate Guide", `<link>https://multiplyingdisciples.us/unlocking-the-power-of-apest-the-ultimate-guide/</link>` |
| WordPress export — searched for `unlocking-the-power-of-apostle-the-ultimate-guide` | **Not found.** No post with this `post_name` exists anywhere in the export. |
| GSC Pages.csv — "apest" | **Found.** `https://multiplyingdisciples.us/unlocking-the-power-of-apest-the-ultimate-guide/,4,1290,0.31%,8.7`, plus 6 more rows for in-page anchor fragments on that same URL (e.g. `#What_is_APEST_Leadership`). |
| GSC Pages.csv — "apostle" | **Not found.** |
| Sitemap | Not independently checked — see limitation above. |
| Current Astro generated path | `/unlocking-the-power-of-apest-the-ultimate-guide/index.html` (confirmed in fresh `dist/` build) |
| Frontmatter `slug` | `/unlocking-the-power-of-apest-the-ultimate-guide/` |
| **Verdict** | **"apest" is correct.** Current implementation matches. No redirect needed. "apostle" never existed on the live site. (Note: this page is topically about the APEST framework — apostle is only one of its five roles — so "apest" is also the semantically correct slug, not just the empirically confirmed one.) |

## 3. Three Thirds

| Source | Value |
|---|---|
| WordPress export — searched for `three-thirds` | **Found.** post_id 5959, type `page`, status `publish`, title "Three Thirds Bible Study Process", `<link>https://multiplyingdisciples.us/three-thirds/</link>` |
| WordPress export — searched for `the-three-thirds` | **Not found.** No post with this `post_name` exists anywhere in the export. |
| GSC Pages.csv — "three-thirds" | **Found.** `https://multiplyingdisciples.us/three-thirds/,13,737,1.76%,9.3` |
| GSC Pages.csv — "the-three-thirds" | **Not found.** |
| Sitemap | Not independently checked — see limitation above. |
| Current Astro generated path | `/three-thirds/index.html` (confirmed in fresh `dist/` build) |
| Frontmatter `slug` | `/three-thirds/` |
| **Verdict** | **No "the-" prefix is correct.** Current implementation matches. No redirect needed. `/the-three-thirds/` never existed on the live site. |

## Summary

All 3 disputed slugs check out identically across every available
source (WordPress export, GSC clicks/impressions data, current Astro
build). **No redirects are needed for any of these three pages.** The
"wrong" variants named in the original migration brief were never real
URLs on the live WordPress site in the first place — they were errors
in how the brief's author recalled the URLs, not renames, redirects, or
legacy slugs that need preserving. This matches what Phase 2 and Phase 3
already concluded; this audit independently re-derives the same answer
from the raw source files rather than trusting that prior conclusion.

No corrective action needed on any of the 3 pages' content or routing.

## Full Protected URL Audit

Ran fresh (`rm -rf dist .astro && astro build`) rather than trusting
prior build output.

### Every Tier 1 URL generates exactly

All 12 real tier-1 URLs checked individually against the fresh
`dist/` output — path exists, canonical matches, no accidental
`noindex`:

| URL | Path generated | Canonical correct | noindex |
|---|---|---|---|
| `/` | yes | yes | no |
| `/discover-the-12-disciples-of-jesus-christ/` | yes | yes | no |
| `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | yes | yes | no |
| `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | yes | yes | no |
| `/15-second-testimony-examples-ignite-your-faith/` | yes | yes | no |
| `/the-three-circles-gospel-presentation-step-by-step/` | yes | yes | no |
| `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | yes | yes | no |
| `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | yes | yes | no |
| `/how-to-evangelize-ultimate-step-by-step-guide/` | yes | yes | no |
| `/unlocking-the-power-of-apest-the-ultimate-guide/` | yes | yes | no |
| `/three-thirds/` | yes | yes | no |
| `/movement-resources/12-practice-church-circle/` | yes | yes | no |

### No accidental alternate slugs

Full `dist/` directory listing (23 pages) shows exactly one path per
migrated page — no `use-the-circles-...`, no `the-three-thirds`, no
`unlocking-the-power-of-apostle-...`, no `bible-verses-about-...`
(plural) directory exists anywhere in the build output. Nothing is
being accidentally double-generated under both a right and wrong slug.

### REDIRECTS.md status

No update needed. `REDIRECTS.md` already states "No redirects are
currently planned" and that remains accurate — this audit found zero
cases where an old/wrong variant actually existed on the live site and
needs a 301. The 3 "wrong" slugs investigated above were errors in the
migration brief's memory, not real former URLs, so there is nothing to
redirect from.

### Hub path collisions

Re-checked all 11 hub slugs against the real 122-page WordPress
inventory directly (not reusing a cached conclusion):

| Hub slug | Collision? |
|---|---|
| `/jesus-and-the-twelve/` | clear |
| `/testimony/` | clear |
| `/share-the-gospel/` | clear |
| `/3-circles-guide/` | clear |
| `/stories-of-hope/` | clear |
| `/prayer/` | clear |
| `/disciple-making/` | clear |
| `/simple-church/` | clear |
| `/four-fields/` | clear |
| `/church-planting-movements/` | clear |
| `/strategy-coordinator/` | clear |

`/3-circles/` (without a bare hub at that path — it was renamed to
`/3-circles-guide/` in Phase 2 specifically to avoid this) remains a
real, untouched WordPress page. Confirmed nothing in the current
codebase routes to bare `/3-circles/` — the only reference to it is a
plain external-style link inside the migrated 3-Circles article's body
text, pointing at the real (not-yet-migrated) page, which is correct.

### Audit conclusion

Everything currently implemented is correct. No redirects, no slug
fixes, no hub renames needed. Safe to proceed to media acquisition
planning and, later, Tier 2 migration.
