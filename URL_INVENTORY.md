# URL Inventory

Master tracking sheet for every known WordPress URL and its migration
status. This should have started from `sitemap.xml` — it couldn't, because
this build environment has no outbound network access (see
`MIGRATION_PLAN.md`). It currently starts from the 45 known URLs in the
migration brief instead.

**The brief states there are at least 179 pages with Search Console
performance data in the last 3 months. Only 45 are listed below. ~134+
pages are not yet enumerated anywhere in this repo.** Do not treat this
file as complete. See `/imports/README.md` for what closes that gap.

## Priority tiers (once real GSC data is available)

- **Tier 1** — more than 1,000 impressions or more than 10 clicks in the
  last 3 months.
- **Tier 2** — 100 to 999 impressions.
- **Tier 3** — everything else.
- **Unknown** — no data yet.

Every row below is marked `tier-1 (provisional)` because the brief flagged
this whole list as high-priority, not because impressions/clicks have
actually been measured yet. Re-tier every row once the CSV export lands.

## Status legend

- `not-migrated` — nothing built in Astro yet.
- `draft-migrated` — an Astro page/file exists, but content is a
  structural placeholder (`status: source-pending` in frontmatter). Not
  safe to launch.
- `migrated` — real content ported in, lightly improved, ready for review.
- `published` — reviewed and launch-ready.

## Inventory

| URL | Content type | Status | Priority | Preserve exactly | Redirect needed | Notes |
|---|---|---|---|---|---|---|
| `/` | page | draft-migrated | tier-1 (provisional) | yes | no | Placeholder homepage at `src/pages/index.astro`; real content pending. |
| `/discover-the-12-disciples-of-jesus-christ/` | article | draft-migrated | tier-1 (provisional) | yes | no | "Especially important." Placeholder at `src/content/articles/discover-the-12-disciples-of-jesus-christ.md`. Uses 2 media files, see MEDIA_URLS_TO_PRESERVE.md. |
| `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked as related content from the testimony hub and the 15-second testimony article. |
| `/bible-verses-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/15-second-testimony-examples-ignite-your-faith/` | article | draft-migrated | tier-1 (provisional) | yes | no | "Especially important." Previously ranked well — preserve, do not rewrite. Placeholder at `src/content/articles/15-second-testimony-examples-ignite-your-faith.md` with target queries documented in its `notes` field. |
| `/use-the-circles-gospel-presentation-step-by-step/` | article | draft-migrated | tier-1 (provisional) | yes | no | "Especially important." |
| `/movement-resources/7-stories-of-hope-complete-facilitation-guide/` | resource | draft-migrated | tier-1 (provisional) | yes | no | "Especially important." Nested path preserved via `slug` frontmatter, not folder structure. |
| `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/how-to-evangelize-ultimate-step-by-step-guide/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/unlocking-the-power-of-apostle-the-ultimate-guide/` | article | not-migrated | tier-1 (provisional) | yes | no | Likely overlaps with the "apostles-meaning" article — do not merge in initial migration even if content is similar. |
| `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/the-three-thirds/` | article | not-migrated | tier-1 (provisional) | yes | no | "Especially important." Not in Phase 1 batch but flagged for early Phase 2 priority. |
| `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/how-to-get-started-in-four-fields-training/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/disciple-making-movement-books-top-25-must-reads/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/fornier-essential-12-key-prayer-points-for-disciple-making-movements/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/stickers/` | page | not-migrated | tier-1 (provisional) | yes | no | Likely a physical/print resource page — confirm content type once source is available. |
| `/wp-content/uploads/2023/04/Church-Waffle-English-04-2023.pdf` | media | not-migrated | tier-1 (provisional) | yes | maybe | Preserve path under `public/wp-content/uploads/2023/04/`. File not yet supplied — see MEDIA_URLS_TO_PRESERVE.md. |
| `/seven-words-of-jesus-on-the-cross/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/movement-resources/12-practice-church-circle/` | resource | not-migrated | tier-1 (provisional) | yes | no | "Especially important." Nested path, same pattern as the 7 Stories of Hope guide. |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called-with-Bible-References.webp` | media | not-migrated | tier-1 (provisional) | yes | maybe | Used by the 12-disciples article. File not yet supplied. |
| `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/strategy-coordinator/` hub. |
| `/breakthrough-guide-for-a-modern-day-disciple/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/prayer/` hub. |
| `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/the-power-of-sharing-your-testimony-scripture-a-biblical-reasons-you-cant-stay-silent/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/testimony/` hub. |
| `/4-stages-of-movement-unlock-your-next-steps/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/ridiculously-simple-3-ways-to-make-disciples/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/disciple-making/` hub. |
| `/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/church-planting-movements/` hub. |
| `/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/simple-church/` hub. |
| `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/disciple-making-movement-dmm-key-characteristics-and-definition/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/church-planting-movements/` hub. |
| `/10-qualities-present-in-every-church-planting-movement-key-to-sustainable-growth-and-multiplication/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/blog/` | page | not-migrated | tier-1 (provisional) | yes | no | Likely a WordPress post archive/listing page — needs its own layout decision in Phase 2/3. |
| `/disciple-making-resources-for-churches-that-will-multiply/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked as the "next step" from the new `/disciple-making/` hub. |
| `/wp-content/uploads/2025/01/12-Disciples-of-Jesus-in-Order-Called.webp` | media | not-migrated | tier-1 (provisional) | yes | maybe | Used by the 12-disciples article. File not yet supplied. |
| `/under-the-hood-of-disciple-making-movements/` | article | not-migrated | tier-1 (provisional) | yes | no | |
| `/starter-tools/` | page | not-migrated | tier-1 (provisional) | yes | no | Likely a tools hub/listing page — linked from primary nav. |
| `/what-are-disciple-making-movements-5-examples-from-around-the-world/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/church-planting-movements/` hub. |
| `/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/church-planting-movements/` hub. |
| `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/church-planting-movements/` hub. |
| `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/` | article | not-migrated | tier-1 (provisional) | yes | no | Linked from the new `/share-the-gospel/` hub. |

## Not yet enumerated

~134+ additional URLs (of the "at least 179 pages with performance data")
are not listed here because neither `sitemap.xml` nor a GSC export has
been provided yet. Once supplied, append them here with `status:
not-migrated` and real tier data, per `/imports/README.md`.

## New pages not in this inventory (by design)

11 hub pages (`/jesus-and-the-twelve/`, `/testimony/`, `/share-the-gospel/`,
`/3-circles/`, `/stories-of-hope/`, `/prayer/`, `/disciple-making/`,
`/simple-church/`, `/four-fields/`, `/church-planting-movements/`,
`/strategy-coordinator/`) are new information-architecture, not migrated
WordPress URLs. Before launch, verify none of these collide with an
existing WordPress category/tag archive at the same path.
