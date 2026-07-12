# Phase 3 — Tier 1 Batch

Remaining tier-1 URLs not yet migrated, identified from `URL_INVENTORY.md`
/ `PROTECTED_URLS.md` (real Search Console tiers) and cross-checked
directly against the WordPress export XML. 5 of the 12 real tier-1 URLs
are already migrated (homepage, 12-disciples, 15-second-testimony,
3-circles, 7-stories-of-hope) — this batch is the remaining **7**.

This file is written before any migration work in this phase, per the
Phase 3 instructions. Do not treat anything below as migrated until
`URL_INVENTORY.md` says so.

## 1. `/testimony-in-the-bible-20-verses-to-ignite-your-faith/`

- **Clicks / Impressions:** 19 / 9,723
- **Current status:** not-migrated
- **Real WP title:** "Testimony in the Bible: 20 Verses to Ignite Your Faith" (post_id 13702)
- **Likely hub:** `testimony` (already referenced as a key article there)
- **Media dependencies:** 5 inline images + 1 featured image (6 total) — see `MEDIA_ACQUISITION_CHECKLIST.md`
- **Risk notes:** Already linked from the migrated `/15-second-testimony-examples-ignite-your-faith/` article and the `testimony` hub — those links will finally resolve once this migrates. High impressions, low clicks (19) — a future CTR/meta-description candidate, but no rewrite this phase.

## 2. `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/`

- **Clicks / Impressions:** 2 / 8,305
- **Current status:** not-migrated
- **Real WP title:** "Bible Verse About Spreading the Gospel: Complete Guide for Sharing Your Faith" (post_id 13787)
- **Likely hub:** `share-the-gospel` (already referenced as a key article there)
- **Media dependencies:** 6 inline images + 1 featured image (7 total)
- **Risk notes:** Very high impressions relative to clicks (2/8,305) — weakest CTR of any tier-1 page. Worth flagging for a future meta-description review, but out of scope for this phase (no rewrite). Confirm the brief's originally-wrong plural "verses" slug isn't used anywhere before writing frontmatter (already corrected in Phase 2 docs).

## 3. `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/`

- **Clicks / Impressions:** 0 / 2,430
- **Current status:** not-migrated
- **Real WP title:** "Apostles Meaning: Unlock Biblical Roles, Greek Origins, and Modern Mission" (post_id 12673)
- **Likely hub:** `jesus-and-the-twelve` (already referenced as a key article there)
- **Media dependencies:** 4 inline images + 1 featured image (5 total)
- **Risk notes:** Conceptually overlaps with `/unlocking-the-power-of-apest-the-ultimate-guide/` (both about apostleship). **Do not merge** — migrate both as separate pages, per the no-merge rule. Already flagged in `URL_INVENTORY.md`.

## 4. `/how-to-evangelize-ultimate-step-by-step-guide/`

- **Clicks / Impressions:** 0 / 1,817
- **Current status:** not-migrated
- **Real WP title:** "Evangelizing Made Simple: 5 Proven Steps Even Beginners Can Follow" (post_id 9681) — note the real title no longer matches the slug wording at all (common after a WP title edit that didn't change the permalink). Preserve the slug exactly regardless.
- **Likely hub:** `share-the-gospel` (already referenced as a key article there)
- **Media dependencies:** 8 inline images + 1 featured image (9 total) — most of any remaining tier-1 page
- **Risk notes:** Already linked from the migrated `/15-second-testimony-examples-ignite-your-faith/` article and the `share-the-gospel` hub.

## 5. `/unlocking-the-power-of-apest-the-ultimate-guide/`

- **Clicks / Impressions:** 4 / 1,290
- **Current status:** not-migrated
- **Real WP title:** "Unlocking the Power of APEST: The Ultimate Guide" (post_id 7212)
- **Likely hub:** `jesus-and-the-twelve` (already referenced as a key article there)
- **Media dependencies:** 5 inline images + 1 featured image (6 total)
- **Risk notes:** See #3 above — overlaps with `apostles-meaning`, do not merge. This is also the page whose slug the original migration brief got wrong (`apostle` vs `apest`) — already corrected everywhere in Phase 2.

## 6. `/three-thirds/`

- **Clicks / Impressions:** 13 / 737
- **Current status:** not-migrated
- **Real WP title:** "Three Thirds Bible Study Process" (post_id 5959)
- **Likely hub:** `simple-church` (already referenced as a key article and as its "next step" there)
- **Media dependencies:** 6 inline images (5 are resized variants of one screenshot) + 1 featured image (7 total)
- **Risk notes:** One of the 6 "especially important" pages named in the original brief (under the wrong slug `/the-three-thirds/`, corrected in Phase 2). No post_parent — a top-level page, not nested.

## 7. `/movement-resources/12-practice-church-circle/`

- **Clicks / Impressions:** 12 / 308
- **Current status:** not-migrated
- **Real WP title:** "Church Waffle" (post_id 5856) — the page has been rebranded from "12 Practice Church Circle" to "Church Waffle" without changing the slug. Preserve the slug exactly; use the real current title.
- **Likely hub:** `simple-church` (primary) — also referenced from the `stories-of-hope` hub as a secondary key article
- **Media dependencies:** only 2 files actually live on multiplyingdisciples.us (1 inline + 1 featured image). The page's body content embeds 12 more numbered images (`3` through `12`, plus "Untitled-design-29" and "3-1"), but on closer inspection **those are hosted on `obey.tools`, not this site** — an earlier draft of this doc mis-attributed them as local media due to a regex bug that didn't check the domain. They're legitimate external hotlinks to the sister site (consistent with this site's "link to Obey.Tools for practical tools" strategy) and need no local preservation.
- **Risk notes:** Nested under `/movement-resources/` (post_parent 2301), same pattern as the already-migrated 7-Stories-of-Hope guide — confirmed no folder-structure requirement, `slug` frontmatter drives routing. One of the 6 "especially important" pages named in the original brief. Page content links out to `obey.tools` for the practical "12 Practices" walkthrough — preserve those external links as-is, do not localize them.

## Hub collision check

All 7 pages' assigned hubs (`testimony`, `share-the-gospel`,
`jesus-and-the-twelve`, `simple-church`) already exist from Phase 1/2 —
no new hub URLs are being created in this phase, so there is nothing new
to collide with `URL_INVENTORY.md`. Confirmed by re-checking the
122-page real inventory: none of `/testimony/`, `/share-the-gospel/`,
`/jesus-and-the-twelve/`, `/simple-church/` collide with a real
WordPress URL (checked in Phase 2, re-verified here).

## Summary

| # | URL | Clicks | Impressions | Hub |
|---|---|---:|---:|---|
| 1 | `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | 19 | 9,723 | testimony |
| 2 | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | 2 | 8,305 | share-the-gospel |
| 3 | `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | 0 | 2,430 | jesus-and-the-twelve |
| 4 | `/how-to-evangelize-ultimate-step-by-step-guide/` | 0 | 1,817 | share-the-gospel |
| 5 | `/unlocking-the-power-of-apest-the-ultimate-guide/` | 4 | 1,290 | jesus-and-the-twelve |
| 6 | `/three-thirds/` | 13 | 737 | simple-church |
| 7 | `/movement-resources/12-practice-church-circle/` | 12 | 308 | simple-church |

Total new media files actually hosted on multiplyingdisciples.us across
these 7 pages: 42 (see `MEDIA_ACQUISITION_CHECKLIST.md` for the exact
per-file breakdown). `/movement-resources/12-practice-church-circle/`
also embeds 12 images legitimately hosted on `obey.tools` — those need
no local preservation.
