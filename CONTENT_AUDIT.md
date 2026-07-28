# CONTENT_AUDIT.md

Audit of every page in `src/content/` against the cluster strategy in
CONTENT_CLUSTER_ROADMAP.md. Evidence: real GSC data in
URL_INVENTORY.md (last-3-months clicks/impressions at migration time),
current frontmatter, word counts, and the redirect map in vercel.json.

**Quality** = editorial judgment of the current page against its
target query (Strong / Adequate / Thin / Utility).
**Traffic Tier** = the GSC-derived tier from URL_INVENTORY.md
(T1 >1,000 impressions or >10 clicks; T2 100–999; T3 <100; U =
unknown/no data).
**Recommendation** = Keep / Improve / Merge / Redirect / Retire /
Utility (not part of cluster strategy).

## Editorial articles

| Current Title | URL | Cluster | Quality | Tier | Search Intent | Rec. | Notes |
|---|---|---|---|---|---|---|---|
| The 12 Disciples of Jesus, in Order | /discover-the-12-disciples-of-jesus-christ/ | Meet Jesus | Strong | T1 (330c / 116,772i) | Informational: "12 disciples of jesus in order" | **Keep + Improve** | The site's biggest asset by far; CTR is only 0.28% — meta/title CTR work + stronger internal links out of it is the single highest-leverage task on the site. |
| Testimony in the Bible: 20 Verses | /testimony-in-the-bible-20-verses-to-ignite-your-faith/ | Testimony | Strong | T1 (19c / 9,723i) | Informational: "testimony in the bible" | **Keep** | Also serves "Bible verses about testimony" — do NOT create a separate verses article. |
| Bible Verses About Spreading the Gospel | /bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/ | Sharing the Gospel | Strong | T1 (2c / 8,305i) | Informational: verses about evangelism | **Improve** | 0.02% CTR on 8.3k impressions — title/description CTR fix, then bridge readers to How to Share the Gospel pillar. |
| Simple 15-Second Testimony Examples | /15-second-testimony-examples-ignite-your-faith/ | Testimony | Strong | T1 (13c / 7,669i) | Informational + practical: "15 second testimony", "testimony examples" | **Keep** | Cluster workhorse; becomes the practice-tool anchor under the new testimony pillar. ✅ Fulfills roadmap Phase 1 item 6 ("Short Christian Testimony Examples") — it owns that `primary_keyword` and search intent, so no separate page is created (a competing page would cannibalize this T1 article). Item 6 is resolved by this page, not an open gap. |
| The 3 Circles Gospel Presentation | /the-three-circles-gospel-presentation-step-by-step/ | Sharing the Gospel | Strong | T1 (62c / 6,670i) | How-to: "3 circles gospel" | **Keep** | Best click-earner per impression on the site; model article. |
| 7 Stories of Hope to Read With a Seeker | /movement-resources/7-stories-of-hope-complete-facilitation-guide/ | Sharing the Gospel (bridge to Simple Church) | Strong | T1 (75c / 5,396i) | Practical: discovery process with seekers | **Keep** | Highest-clicks page; already links per-story guides to Obey.Tools. |
| What Does "Apostle" Actually Mean? | /apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/ | Meet Jesus / Leadership | Strong | T1 (0c / 2,430i) | Informational: "apostle meaning" | **Improve** | 0 clicks on 2.4k impressions — CTR fix; two images still missing (see MEDIA_ACQUISITION_CHECKLIST.md and the roadmap's "Open editorial & technical debt" list). |
| How to Evangelize: 5 Simple Steps | /how-to-evangelize-ultimate-step-by-step-guide/ | Sharing the Gospel | Strong | T1 (0c / 1,817i) | How-to: "how to evangelize" | **Improve** | 0 clicks — CTR fix; will interlink tightly with the new How to Share the Gospel pillar (distinct query families). |
| Unlocking the Power of APEST | /unlocking-the-power-of-apest-the-ultimate-guide/ | Leadership & Multiplication | Strong | T1 (4c / 1,290i) | Informational: "APEST" | **Keep** | Cluster anchor for fivefold-gifting queries. |
| Three Thirds Bible Study Process | /three-thirds/ | Simple Church (shared with Making Disciples) | Strong | T1 (13c / 737i) | How-to: "three thirds process" | **Keep** | Core format article; bridge between discipleship and church practice. |
| Church Waffle | /movement-resources/12-practice-church-circle/ | Simple Church | Strong | T1 (12c / 308i) | Tool: "church circle" practices | **Keep** | The practice-church tool anchor. |
| Understanding Biblical Discipleship | /understanding-biblical-discipleship-a-complete-guide-to-following-jesus/ | Making Disciples | Strong | T2 (1c / 609i) | Informational: "biblical discipleship" | **Improve** | Long SEO H1, default CTA, AI-looking hero; carries four legacy redirects — worth a real refresh. Sits under the new How to Make Disciples pillar. |
| Four Fields of Kingdom Growth (book page) | /four-fields-of-kingdom-growth-…-shank/ | Leadership & Multiplication | Strong (48k words — the whole book) | T2 (7c / 603i) | Informational/reference: "four fields Shank" | **Keep** | Unique reference asset; needs a TOC-first reading experience eventually, but not a cluster gap. |
| How to Get Started in Four Fields Training | /how-to-get-started-in-four-fields-training/ | Disciple Training | Strong | T2 (5c / 495i) | How-to: four fields training | **Keep** | Reassign conceptually to the Training cluster; natural KMT feeder. |
| Prayer is Essential: 12 Key Prayer Points | /prayer-is-essential-12-key-prayer-points-for-disciple-making-movements/ | Prayer & the Field | Strong | T2 (2c / 403i) | Informational: movement prayer | **Keep** | |
| How to Pray Walk Your Neighborhood | /a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/ | Prayer & the Field | Strong | T2 (8c / 335i) | How-to: "prayer walking" | **Keep** | Cluster pillar candidate for prayer-walking queries. |
| Christian Prayer Wheel | /christian-prayer-wheel-a-structured-hour-of-prayer-that-actually-works/ | Prayer & the Field | Strong | T2 (4c / 190i) | How-to: "prayer wheel" | **Keep** | |
| 7 Biblical Reasons You Can't Stay Silent About Your Testimony | /the-power-of-sharing-your-testimony-scripture-…/ | Testimony | Strong | T2 (0c / 166i) | Informational: testimony scripture | **Keep** | |
| 4 Stages of Movement | /4-stages-of-movement-unlock-your-next-steps/ | Leadership & Multiplication | Strong | T2 (7c / 165i) | Informational: movement stages | **Keep** | |
| The Power of Multiplication | /the-power-of-multiplication-…-great-commission/ | Leadership & Multiplication | Adequate | T2 (0c / 160i) | Informational: multiplication | **Improve** | Becomes a supporting article under a new "What Is a Church Planting Movement" pillar. |
| What Is a Simple Church? | /what-is-a-simple-church-meeting-christ-in-a-spiritual-family/ | Simple Church | Strong | T2 (0c / 142i) | Definitional: "simple church" | **Keep + Improve** | Cluster pillar; 0 clicks on 142i — CTR pass and expansion as the pillar. |
| Disciple Making Movement (DMM): Key Characteristics | /disciple-making-movement-dmm-key-characteristics-and-definition/ | Leadership & Multiplication | Adequate | T2 (3c / 128i) | Definitional: "what is DMM" | **Improve** | Carries several redirected legacy DMM URLs; deserves pillar-grade depth. |
| 10 Qualities Present in Every CPM | /10-qualities-present-in-every-church-planting-movement-…/ | Leadership & Multiplication | Adequate | T2 (1c / 107i) | Informational | **Keep** | |
| Finding a Person of Peace | /finding-persons-of-peace-a-key-strategy-…/ | Prayer & the Field | Strong | T3 (0c / 66i) | Definitional + how-to: "person of peace" | **Keep** | Expanded 2026-07-27 (Phase 1, roadmap item 14) from ~700 words to head-term depth and rewritten in voice: added the Luke 10 sending pattern, biblical examples (woman at the well, Cornelius, Lydia, Gerasene man), a recognition section, a "what it is not" warning, and a forward bridge to the How to Share the Gospel pillar (bidirectional). primary_keyword set to "person of peace". Lab CTA. Still in the share-the-gospel hub; moving it to the Prayer & the Field cluster (where the roadmap lists it as a co-anchor with a Practice/tool CTA) is a positioning decision left for Mark. |
| Breaking Down Barriers: Pastors' Objections | /breaking-down-barriers-…/ | Leadership & Multiplication | Adequate | T3 (1c / 66i) | Pastor-facing objections | **Keep** | |
| Four Fields of Kingdom Growth (was The Clear Pathway of Jesus) | /four-fields-of-kingdom-growth/ | Making Disciples | Strong | T3 (0c / 46i) | Informational: Jesus' disciple-making model | **Keep (merge target)** | Consolidated into the definitive Four Fields video companion (2026-07-21); old `/the-clear-pathway-…/` slug 301s here. Absorbs "Setting the Stage: Muddy Boots" (below). |
| The Multiplier Mandate | /the-multiplier-mandate-revealed-from-genesis-to-revelation/ | Leadership & Multiplication | Strong | T3 (0c / 33i) | Theological foundation | **Keep** | |
| How to Spot a Lone Wolf | /how-to-spot-a-lone-wolf-and-not-become-one/ | Leadership & Multiplication | Adequate | T3 (0c / 30i) | Practitioner health | **Keep** | Currently hub-less (orphan) — assign to church-planting-movements hub. |
| Jesus the Leader (Gospel of Mark) | /jesus-the-leader-…-gospel-of-mark/ | Disciple Training | Adequate | T3 (0c / 29i) | Informational: how Jesus trained | **Improve** | Seed for the "How Jesus Trained His Disciples" training-cluster article — expand this rather than writing a duplicate. |
| The Secret Ingredient of Trustworthy Leaders | /the-secret-ingredient-of-trustworthy-leaders-…/ | Leadership & Multiplication | Adequate | T3 (1c / 24i) | Character/leadership | **Keep** | Orphan — assign to a hub. |
| The Leadership Phase… (redirected already) | — | — | — | — | — | — | Already redirected in vercel.json; listed for completeness. |
| How Paul Catalyzed a Movement in Ephesus | /unleashing-the-movement-…-ephesus-…/ | Leadership & Multiplication | Adequate | T3 (0c / 19i) | Biblical case study | **Keep** | |
| Content vs. Systems | /content-vs-systems-the-game-changer-for-leadership-development/ | Disciple Training | Strong | T3 (0c / 18i) | Leadership dev philosophy | **Keep** | Natural KMT feeder. |
| Unlock the Power of Friendly Accountability | /unlock-the-power-of-friendly-accountability/ | Making Disciples | Strong | T3 (0c / 17i) | Practical: accountability | **Keep** | |
| The 3 Core Habits of a Disciple | /the-3-core-habits-of-a-disciple/ | Making Disciples | Strong | T3 | Practical | **Keep** | Carries the "love and obedience" redirect. |
| Setting the Stage: Muddy Boots | /setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/ | Making Disciples | Thin (551 words) | T3 | Jesus' model | **Merge** | Merge into The Clear Pathway of Jesus (same thesis, stronger page); redirect after merging. |
| 5 Surprising Ways to Attract Multiplying Leaders | /5-surprising-ways-to-attract-multiplying-leaders/ | Leadership & Multiplication | Adequate | T3 (2c / 20i) | Practical: finding leaders | **Keep** | |
| 4 Responses to the Gospel | /4-responses-to-the-gospel/ | Sharing the Gospel | Thin (37 words) | T3 | Tool stub | **Improve** | A named starter tool with no article behind it — expand into a real explainer (parable of the soils / filtering). |
| Biblical Fasting and Prayer | /biblical-fasting-and-prayer/ | Prayer & the Field | Strong | U (new) | Informational: "why Christians fast" | **Keep** | New definitive companion article built on Mark Goering's fasting-and-prayer YouTube teaching (created 2026-07-21); added as the fourth key article in the Prayer hub. |
| How to Share Your Testimony | /how-to-share-your-testimony/ | Testimony | Strong | U (new) | How-to: "how to share your testimony" | **Keep** | New Testimony-cluster pillar created 2026-07-23 (Phase 1, roadmap item 5) — the head term the cluster previously ranked only fragments of. Added as the first key article in the Testimony hub and cross-linked from the 15-second examples, testimony-in-the-bible, and 7-biblical-reasons articles. Practice (tool) CTA to the 15-second testimony exercise. |
| How to Write Your Testimony | /how-to-write-your-testimony/ | Testimony | Strong | U (new) | How-to: "how to write your testimony" | **Keep** | New Testimony-cluster supporting article created 2026-07-24 (Phase 1, roadmap item 7) — the "how to write your testimony" query family, unowned at the primary-keyword level (the pillar owns "how to share", the 15-second page owns "short christian testimony examples"). Scoped to the writing/composition process; hands off to the pillar for sharing aloud and to the 15-second exercise for the short version. Added after the pillar in the Testimony hub key_articles and cross-linked from the pillar's writing section. Practice (tool) CTA to the 15-second exercise. Roadmap item 6 ("Short Christian Testimony Examples") intentionally not built as a separate page — that intent is already owned by the 15-second examples page. |
| How to Make Disciples | /how-to-make-disciples/ | Making Disciples | Strong | U (new) | How-to: "how to make disciples" | **Keep** | New Making Disciples-cluster pillar created 2026-07-24 (Phase 1, roadmap item 8) — the head term the site's namesake cluster lacked; the disciple-making hub previously had no pillar, and four redirected legacy URLs ("ridiculously-simple-3-ways-to-make-disciples" etc.) prove the family ranked before. Added as the first key article in the disciple-making hub (pillar first) and cross-linked from the 3 Core Habits and Understanding Biblical Discipleship siblings. Lab CTA. Re-pointing the four legacy make-disciples redirects to this pillar is left as a GSC-aware decision for Mark. |
| What Is a Disciple? | /what-is-a-disciple/ | Making Disciples | Strong | U (new) | Definitional: "what is a disciple" | **Keep** | New Making Disciples-cluster definitional cornerstone created 2026-07-25 (Phase 1, roadmap item 9) — the head "what is a disciple" query family, unowned at the primary-keyword level (Understanding Biblical Discipleship targets "biblical discipleship"; How to Make Disciples is the how-to pillar). Scoped to the definition (word meaning, the marks Jesus named, the three-legged stool of knowledge/obedience/sharing grown by reps, disciple vs. believer/Christian, disciple vs. apostle); hands off to the pillar for the how-to. Added after the pillar in the disciple-making hub key_articles (pillar first) and cross-linked inbound from the How to Make Disciples pillar. Lab CTA. Hero image pending from Mark (renders cleanly without one). The `/discovering-the-disciple-meaning.../` redirect (tier-3) still points at Understanding Biblical Discipleship; re-pointing it here is a GSC-aware decision left for Mark. |
| How to Share the Gospel | /how-to-share-the-gospel/ | Sharing the Gospel | Strong | U (new) | How-to: "how to share the gospel" | **Keep** | New Sharing the Gospel-cluster pillar created 2026-07-26 (Phase 1, roadmap item 10) — the head "how to share the gospel" query family, distinct from "how to evangelize" (owned by How to Evangelize, which also owns the Conversation Quadrant mechanics; both GSC-evidenced as separate families). Built as the head-term overview: states the gospel plainly (1 Cor 15:3-4), covers pray/find open people, turn a conversation toward Jesus, say it plainly, invite a response (Rom 10:9), keep going into discipleship, and the fear barrier (1 Cor 3:6-7). Routes to the method tools (3 Circles, testimony pillar, How to Evangelize / Conversation Quadrant, 7 Stories of Hope, 4 Responses, person of peace) rather than duplicating them. Added as the first key article in the share-the-gospel hub (pillar first, ahead of How to Evangelize) and cross-linked inbound from How to Evangelize. Lab CTA per the cluster. Forward bridge to How to Make Disciples. Deliberately does not link a `/what-is-the-gospel/` page (roadmap item 11, not built yet); wire that link when it ships. Hero/social image pending from Mark (renders cleanly without one). |
| What Is the Gospel? | /what-is-the-gospel/ | Sharing the Gospel | Strong | U (new) | Definitional: "what is the gospel" | **Keep** | New Sharing the Gospel-cluster definitional cornerstone created 2026-07-26 (Phase 1, roadmap item 11) — the head "what is the gospel" query family, unowned at the primary-keyword level (How to Share the Gospel is the how-to pillar; 3 Circles is a method/tool page; Bible Verses About Spreading the Gospel is a verses list). Scoped to the definition (the word euangelion/"good news", the 1 Cor 15:3-4 core, the four movements God/sin/Jesus/response, why it is good news, the kingdom/Lordship emphasis established across the cluster, how to respond, and what the gospel is not); hands off to the How to Share the Gospel pillar for the how-to. The anchor INTERNAL_LINKING_PLAN.md says every gospel article links back to: wired inbound from the How to Share the Gospel pillar's first gospel section and from Bible Verses About Spreading the Gospel, and added to the share-the-gospel hub key_articles after the pillar. Lab CTA per the cluster (matches the parallel what-is-a-disciple cornerstone precedent). Hero/social image pending from Mark (renders cleanly without one). |
| How to Train Disciples | /how-to-train-disciples/ | Disciple Training | Strong | U (new) | How-to: "how to train disciples" / "disciple training" | **Keep** | New Disciple Training-cluster pillar created 2026-07-27 (Phase 1, roadmap item 12), shipped with the new `/disciple-training/` hub (the only major cluster that lacked one). Head "how to train disciples" / "disciple training" / "discipleship training" family, unowned at the primary-keyword level (How to Make Disciples is the making pillar; How to Get Started in Four Fields Training targets the specific framework; Content vs. Systems is a philosophy piece; Kingdom Ministry Training is the destination landing page). Scoped to the training/equipping layer above making disciples: what training is, why it is the missing step, the MAWL pattern (framed as how Jesus trained, not a command by name), reproducibility, character/FATR, ongoing coaching, and multiplication. Lab CTA. Per Mark's direction (2026-07-27), Kingdom Ministry Training is deliberately not referenced or linked from this cluster (overriding the roadmap/INTERNAL_LINKING_PLAN "KMT is the primary CTA" line); the hub `next_step` points at Four Fields training instead. Forward bridge to the Simple Church pillar; cross-linked inbound from the How to Make Disciples pillar (its earlier KMT reference was removed too). Added first in the disciple-training hub key_articles. Hero/social image pending from Mark (renders cleanly without one). |
| 5 T's Strategy Coordinator Overview | /movement-resources/strategy-coordinator/ | — | Adequate | U | Niche practitioner role | **Not part of cluster strategy** | Per direction, Strategy Coordinator content stays out of the cluster/menu architecture. Keep the URL live as a quiet resource; no inbound cluster links. |

## Utility, tool, and legal pages (not part of the cluster strategy)

| Title | URL | Rec. | Notes |
|---|---|---|---|
| 3 Circles (slides page) | /3-circles/ | Utility/Tool — Keep | Tool destination for Practice CTAs; linked from 3 Circles article + hub. |
| 4-1-1 (slides page) | /4-1-1/ | Utility/Tool — Keep | 35 words; tool stub, fine as-is. |
| 4 Fields Toolbox | /movement-resources/4-fields-toolbox/ | Utility/Tool — Keep | Excluded from menu by direction; stays linked from Four Fields content. |
| Start Here | /start-here/ | Utility — Keep | Onboarding landing. |
| Starter Tools | /starter-tools/ | Utility — Keep | Primary "Tools" destination. |
| Stickers | /stickers/ | Utility — Keep (rebuilt 2026-07) | T2 (7c/359i) — genuine product interest. Rebuilt as a bespoke landing page (`src/pages/stickers.astro`) with a full-bleed vision-casting hero; all sticker images, prices, and Sticker Mule links unchanged. |
| Church Waffle Sticker / Four Fields Sticker | /the-church-waffle-sticker/, /the-four-fields-sticker-simple-2x2/ | Utility — Keep | |
| Movement Resources | /movement-resources/ | Utility — Keep | Index page; excluded from menu. |
| Kingdom Ministry Training | /kingdom-ministry-training/ | Utility — Keep (rebuilt 2026-07) | Named business priority; rebuilt from the bare slide-link list into a bespoke training landing page (`src/pages/kingdom-ministry-training.astro`) that Training-cluster articles send readers to. 19 impressions at migration — growth now depends on the Disciple Training cluster linking into it. |
| FREE 1-Hour Live Disciple Making Training | /free-training/ | Utility — Keep | Lab-adjacent landing; review vs. the live labs section for redundancy (Mark's call). |
| Harvest Group Resources & Coaching Plan | /action-plan/ | Utility — Keep | |
| The Vision / Doctrinal Center & Theological Values | /vision/, /beliefs-values/ | Utility — Keep | About pages. |
| Connect | /contact-us/ | Utility — Keep | |
| Privacy Policy | /privacy-policy/ | Utility — Keep | Excluded from search + blog. |
| Your seat is saved! | /elementor-10714/ | **Retire (Mark's call)** | Expired event confirmation kept only for the indexed URL; candidate for a 301 to /free-training/ once Mark confirms. |

## Already-redirected legacy URLs (31)

vercel.json holds 31 permanent redirects from the WordPress era (top
DMM listicles, discipleship guides, evangelism strategy posts, book
reviews, leadership series). Two facts matter for the roadmap:

1. Their redirect targets (biblical discipleship, DMM definition,
   how-to-evangelize, 3 core habits) inherit their query equity —
   those targets are "Improve" priorities above.
2. Their old query families ("ways to make disciples", "disciple
   making movement examples", "empowered evangelists", "seven words of
   Jesus") are demand evidence used in docs/archive/CONTENT_GAP_ANALYSIS.md — several
   Phase 2/3 roadmap articles deliberately re-open those topics with
   stronger, single-intent pages.

## Hubs (11)

All hubs are Keep. Under the roadmap each hub gains a designated
pillar article and a curated key-article order that mirrors its
cluster (see CONTENT_CLUSTER_ROADMAP.md). The **Disciple Training** hub
(`/disciple-training/`) was created 2026-07-27 with the pillar
`/how-to-train-disciples/`, closing the one major cluster that lacked a
hub and bringing the total to eleven; `/jesus-and-the-twelve/`,
`/stories-of-hope/`, `/3-circles-guide/`, and `/four-fields/` remain as
sub-hubs feeding larger clusters.
