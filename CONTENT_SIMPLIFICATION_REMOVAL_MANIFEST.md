# Content Simplification — Removal Manifest

**Date:** 2026-07-11
**Scope:** 29 named articles + 1 hub retirement (Strategy Coordinator), per user-directed
positioning shift from "disciple-making encyclopedia" to practice-first field manual.
No pages outside this list are touched by this pass.

This is the authoritative record of what was removed, why, where it now points (or
why it doesn't), and what search/backlink data informed each call. Redirect
hierarchy applied to every row:

1. Redirect to the closest strong surviving **article** when one clearly matches
   original search intent.
2. Redirect to a **pillar hub** only when no better article-level match exists.
3. **410 Gone** when the content is intentionally retired and nothing relevant
   survives to send it to.
4. Never force a loosely related redirect just to avoid a 404.

GSC clicks/impressions below are the real, previously-collected Search Console
figures already on record in `URL_INVENTORY.md` (lifetime-to-migration totals, not
a fresh pull). Backlink column = internal links found repo-wide at audit time;
this site has no external-backlink data source, so "none found" means none found
in this repo's own content, not a verified absence of any external link anywhere.

## Redirect / removal table

| # | Old URL | Destination | Type | Reason | Confidence | Clicks / Impr. | Flag |
|---|---|---|---|---|---|---:|---|
| 1 | `/seven-words-of-jesus-on-the-cross/` | — | **410** | Pure devotional content (the 7 sayings on the cross); no practice-oriented pillar covers this search intent | n/a | 1 / 339 | **Flagged**: highest impressions of the three 410s. 0.3% CTR over the tracked period = effectively no real engagement despite the impression count. 3 internal backlinks found (hub `jesus-and-the-twelve`, 2 articles) — all being removed in this pass. Recommend proceeding with 410. |
| 2 | `/bible-passages-about-love-what-scripture-really-says/` | — | **410** | Generic verse roundup; no hub is about "love" as a topic | n/a | 0 / 41 | None. 0 internal backlinks found. |
| 3 | `/5-insightful-keys-into-the-biblical-jesus/` | — | **410** | Generic "who is Jesus" listicle; not about the Twelve or a practice | n/a | 0 / 49 | None. 2 internal backlinks found (hub `jesus-and-the-twelve`, 1 article), both cleaned up in this pass. |
| 4 | `/missionary-verses-in-the-bible-reveal-gods-heart/` | `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/` | 301 | Near-identical topic (verses on spreading the gospel) already covered by a surviving, more complete article | Strong | 0 / 48 | None |
| 5 | `/discovering-the-disciple-meaning-a-life-changing-journey/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | "What does disciple mean" is directly answered by the retained authoritative guide | Strong | 0 / 20 | None |
| 6 | `/radical-discipleship-understanding-what-it-means-and-how-to-live-it/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | Same core question (what real discipleship costs/means) as the authoritative guide | Strong | 1 / 181 | None |
| 7 | `/love-and-obedience-exploring-the-biblical-relationship-between-the-two/` | `/the-3-core-habits-of-a-disciple/` | 301 | Obedience is literally one of the 3 core habits — tighter match than the hub root | Strong | 1 / 134 | None |
| 8 | `/the-high-price-of-discipleship-what-it-really-costs-to-follow-jesus/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | "Cost of discipleship" is explicitly part of the authoritative guide's territory | Strong | 2 / 165 | None |
| 9 | `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/` | `/how-to-evangelize-ultimate-step-by-step-guide/` | 301 | Thin evangelism listicle, consolidating into the retained authoritative evangelism guide | Strong | 0 / 906 | **Flagged**: highest impressions in the entire batch. 0 clicks across 906 impressions is itself the thin-content signature, but flagging given the visibility — verify this redirect specifically after deploy. |
| 10 | `/ridiculously-simple-3-ways-to-make-disciples/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | Thin disciple-making listicle, consolidating into the authoritative guide | Strong | 0 / 164 | None |
| 11 | `/get-ready-to-be-empowered-evangelists-revolutionize-disciple-making/` | `/how-to-evangelize-ultimate-step-by-step-guide/` | 301 | Same evangelism-listicle consolidation as #9 | Strong | 0 / 2 | None |
| 12 | `/breakthrough-guide-for-a-modern-day-disciple/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | Same disciple-making consolidation as #10 | Strong | 0 / 228 | None |
| 13 | `/unlock-biblical-principles-for-multiplying-disciples/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | Same disciple-making consolidation as #10 | Strong | 1 / 52 | None |
| 14 | `/under-the-hood-of-disciple-making-movements/` | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | 301 | Surviving definitional article is a tighter match than the CPM hub root | Strong | 0 / 86 | None |
| 15 | `/7-surprising-disciple-making-movement-examples/` | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | 301 | Same reasoning as #14 | Strong | 1 / 43 | None |
| 16 | `/what-are-disciple-making-movements-5-examples-from-around-the-world/` | `/disciple-making-movement-dmm-key-characteristics-and-definition/` | 301 | Same reasoning as #14 | Strong | 1 / 74 | None |
| 17 | `/disciple-making-resources-for-churches-that-will-multiply/` | `/disciple-making/` (hub) | 301 | It's itself a resource index — the hub root serves that exact function; no single surviving article substitutes | Moderate–Strong | 1 / 92 | None |
| 18 | `/equipping-your-church-for-disciple-making-movements-a-pastors-guide-to-effective-training/` | `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | 301 | Both are pastor-facing "bring your church into movement thinking" content — tighter than the CPM hub root | Strong | 0 / 71 | None |
| 19 | `/breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy/` | `/breaking-down-barriers-addressing-pastors-objections-to-disciple-making-movements/` | 301 | Same reasoning as #18 | Strong | 0 / 33 | None |
| 20 | `/discover-the-game-changing-secrets-starfish-and-the-spirit-review/` | `/church-planting-movements/` (hub) | 301 | DMM strategy book review; no surviving article reviews strategy books, hub is the correct broader landing | Moderate | 1 / 17 | None |
| 21 | `/disciple-making-movement-books-top-25-must-reads/` | `/church-planting-movements/` (hub) | 301 | Reading-list adjunct to movement strategy; no single-article substitute exists | Moderate | 3 / 415 | **Flagged**: second-highest impressions in the batch. 0.7% CTR is consistent with the thin-listicle pattern; recommend proceeding, noted for visibility. |
| 22 | `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/` | `/church-planting-movements/` (hub) | 301 | Movement-multiplication theme, no closer surviving article | Moderate | 0 / 55 | None |
| 23 | `/spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication/` | `/the-leadership-phase-everyone-skips-why-investment-matters/` | 301 | Both about intentional investment in raising up leaders — tighter than the CPM hub root | Strong | 0 / 20 | None |
| 24 | `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/` | `/movement-resources/strategy-coordinator/` | 301 | Hub retired (see below); redirects straight to the one surviving, practical SC article | Strong | 4 / 228 | **Flagged**: highest click count of any page in this entire batch (4 clicks). Least "dead" page here — it's a generic narrative duplicate of the practical URLPEG article it now points to, so redirecting (not deleting outright) preserves that traffic. Recommend proceeding. |
| 25 | `/the-hidden-power-of-bonhoeffers-discipleship-model-and-why-its-more-relevant-than-ever/` | `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/` | 301 | Both about a discipleship pattern/model | Strong | 0 / 42 | None |
| 26 | `/start-strengthen-sustain-core-insights-on-building-lasting-ministry/` | `/content-vs-systems-the-game-changer-for-leadership-development/` | 301 | Both about building sustainable ministry systems — tighter than the CPM hub root | Strong | 0 / 5 | None |
| 27 | `/next-gen-local-owners-building-beachheads-of-the-kingdom/` | `/church-planting-movements/` (hub) | 301 | Local-ownership/localization theme, no closer surviving article | Moderate | 0 / 4 | None |
| 28 | `/go-slow-to-go-fast-could-transform-your-leadership-pipeline/` | `/the-leadership-phase-everyone-skips-why-investment-matters/` | 301 | Both about the leadership pipeline/investment phase | Strong | 0 / 7 | None |
| 29 | `/filtering-unlock-this-essential-for-disciple-making-movements/` | `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/` | 301 | "Filtering" = identifying/prioritizing persons of peace — direct topical twin, tighter than the CPM hub root | Strong | 0 / 10 | None |

## Hub retirement: Strategy Coordinator

| Old URL | Destination | Type | Reason |
|---|---|---|---|
| `/strategy-coordinator/` | `/movement-resources/strategy-coordinator/` | 301 | After removing row #24 above, the hub would retain only 1 of its 2 key articles (the practical URLPEG tool doc). A hub with a single linked article isn't a hub — it's a signpost pointing at one page. Retiring it and sending traffic straight to that one real, practical article is a cleaner outcome, and moves the site toward the "10 world-class hubs" target instead of keeping an 11th, mostly-empty one. |

`src/content/hubs/strategy-coordinator.md` is deleted. No other file referenced
that hub path (`/strategy-coordinator/`) besides its own frontmatter — confirmed
by repo-wide search. The retained article
(`src/content/articles/movement-resources-strategy-coordinator.md`) has its now-dangling
`hub: "strategy-coordinator"` frontmatter field removed.

## Out of scope for this pass

- No other pages beyond the 29 + hub retirement above were touched.
- Triage of the remaining ~56 non-hub content pages toward the stated
  ~25-article target is separate future work.
- No hub intro copy was rewritten to absorb ideas from removed articles
  (user chose "links only" for hub cleanup in this pass).
- "Paul and the Ephesus Movement" was in the original candidate list but is
  kept as-is — it's one of only 3 pilot articles on the new `field-manual-v2`
  template, and is a candidate for a future rewrite (not deletion).
- `/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/`
  and `/how-to-evangelize-ultimate-step-by-step-guide/` are now receiving a
  meaningfully larger share of redirected traffic (7 and 2 old URLs
  respectively). Per instruction, these should be reviewed and strengthened
  as the site's actual authoritative guides — flagged here as recommended
  follow-up content work, not done in this pass.

## Verification status

- ✅ Redirect/410 destinations confirmed to exist as real, generated pages
  before this manifest was finalized.
- ✅ Internal backlinks to all 29 removed slugs identified and scheduled for
  cleanup (hub `key_articles` / article `related_articles` / `next_step`
  fields) so no "(coming soon)" placeholder or dead link survives the removal.
- ⚠️ True end-to-end HTTP verification (confirming each old URL actually
  returns 301/410 in production) requires a live Vercel deployment — this
  cannot be executed from a local build/dev server, since `vercel.json`
  redirect/rewrite rules are applied by Vercel's edge routing layer, not by
  `astro build`/`astro preview`. Recommend a post-deploy smoke test of all 29
  URLs (see `vercel.json` for the rule set) before calling this "verified" in
  `REDIRECTS.md`.
