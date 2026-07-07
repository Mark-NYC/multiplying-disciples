# Internal Linking Plan

## Model

Every article should link to:

1. **Parent hub** — one link, via the `hub` frontmatter field (matched
   against `src/content/hubs/<id>.md`). Rendered automatically at the
   bottom of `ArticleLayout` as "Part of the [Hub Name] hub."
2. **3–5 related articles** — via the `related_articles` frontmatter
   field (array of exact site-relative paths). Rendered by
   `RelatedArticles.astro`.
3. **Related tools** — via the `related_tools` frontmatter field (array
   of tool names, e.g. `"3 Circles"`). Rendered by `ToolCTA.astro`.
4. **One next step** — a single clear call-to-action link. Hubs support
   this via the `next_step` field (`{ label, href }`); articles can
   include a next-step link in body copy or lean on their related-tools
   CTA.

Hubs link to:

- **Key articles** — 3+ articles that anchor the topic
  (`key_articles` field, also rendered via `RelatedArticles.astro`).
- **Related tools** — same mechanism as articles.
- **One next step.**

## Why paths, not IDs

`related_articles` and `key_articles` store the exact site-relative
**path** (e.g. `/three-thirds/`), matched at render time against
each collection entry's `slug` field — not the Astro/Markdown filename.
This means:

- Links keep working even if a file gets renamed for editing
  convenience, as long as `slug` stays the same.
- Links to **not-yet-migrated** pages still render as plain crawlable
  `<a href>` tags pointing at the real eventual URL, with a small
  "(coming soon)" label if no matching collection entry exists yet.
  This means the internal link graph for the whole site can be wired up
  now, ahead of full content migration, without ever producing a
  JavaScript-gated or missing link.

## Crawlability rule

All internal links (`Breadcrumbs`, `RelatedArticles`, `ToolCTA`, header
nav, footer nav) render as server-side HTML `<a href>` elements with no
client-side JavaScript required to reveal or resolve them. This is
required by rule 10 in the SEO brief and is true by construction in
Astro's static output (no hydration needed for plain links).

## Hub → article → tool graph (Phase 1 hubs)

**Bold** = migrated, real content. Plain text = key article slot planned
but not yet migrated (renders as "(coming soon)" via `RelatedArticles`).

| Hub | Key articles wired so far | Related tools |
|---|---|---|
| Jesus and the Twelve | **12 disciples**, **apostles meaning**, **unlocking APEST**, **7 words on the cross** | — |
| Testimony | **15-second testimony**, **testimony in the Bible**, sharing your testimony | 3 Circles, Stories of Hope |
| Share the Gospel | **how to evangelize**, **bible verse about spreading the gospel**, **3 circles guide**, **5 strategies**, **finding persons of peace** | 3 Circles, Stories of Hope |
| 3 Circles | **3 circles step-by-step guide**, **how to evangelize** | 3 Circles |
| Stories of Hope | **7 stories of hope guide**, **12 practice church circle (Church Waffle)** | Stories of Hope |
| Prayer | **prayer walking guide**, **prayer wheel**, **prayer is essential (12 key prayer points)** | — |
| Disciple Making | **biblical discipleship guide**, **3 ways to make disciples**, **radical discipleship**, **high price of discipleship**, **disciple-making resources**, **top 25 books**, **breakthrough guide for a modern day disciple**, **love and obedience** | 3 Circles, Stories of Hope |
| Simple Church | **simple church article**, **12 practice church circle (Church Waffle)**, **three thirds** | — |
| Four Fields | **four fields (Nathan &amp; Kari Shank manual)**, **getting started in four fields training** | — |
| Church Planting Movements | **power of multiplication**, **10 qualities**, **DMM characteristics**, **5 examples**, **under the hood**, **equipping your church**, **breaking down barriers**, **4 stages of movement** | — |
| Strategy Coordinator | **strategy coordinator role article** | — |

As of Phase 3, 12 real tier-1 pages are migrated (all of them — see
`PHASE_3_TIER_1_BATCH.md`). Every other key-article slot above still
renders a real, crawlable link to its final planned URL (verified
against `URL_INVENTORY.md`, not guessed) — it just shows "(coming soon)"
until that page is migrated in a later phase.

As of Phase 4 Batch 1, 7 more tier-2 pages are migrated (bolded above
alongside the tier-1 set — see `PHASE_4_TIER_2_BATCH_PLAN.md`): the
5 strategies personal evangelism article, the biblical discipleship
guide, the four fields Nathan &amp; Kari Shank manual, getting started
in four fields training, the top 25 disciple-making books list, prayer
is essential (12 key prayer points), and 7 words on the cross.

As of Phase 4 Batch 2, 7 more tier-2 pages are migrated: the prayer
walking guide, the prayer wheel, the strategy coordinator role article,
3 ways to make disciples, radical discipleship, the high price of
discipleship, and the power of sharing your testimony scripture. This
fully completes the Prayer hub (3/3), the Testimony hub (3/3), and the
Strategy Coordinator hub (1/1, its only slot).

As of Phase 4 Batch 3, 7 more tier-2 pages are migrated: the
breakthrough guide for a modern day disciple, 4 stages of movement, the
power of multiplication, the simple church article, love and
obedience, DMM key characteristics, and 10 qualities of church planting
movements. This fully completes the Simple Church hub (3/3) and the
Church Planting Movements hub's tier-2 scope (4 of its 8 listed slots
are now migrated — 5-examples, under-the-hood, equipping-your-church,
and breaking-down-barriers remain tier-3, out of this phase). It also
adds 2 more slots to Disciple Making (breakthrough guide, love and
obedience — added directly to that hub's key_articles alongside this
migration, since neither had a pre-reserved slot from earlier phases).
As of Phase 4 Batch 4, `/stickers/` is migrated — the last of the 22
real tier-2 URLs. It has no hub assignment (empty WordPress
categories, no clean topical fit), so it isn't added to any hub's
`key_articles` table above. It links out to 5 related articles (one
per sticker theme: 3 Circles, 15 Second Testimony, Prayer Wheel, 4
Fields, Church Waffle) and back-links already existed from the
Christian Prayer Wheel article's `related_articles`. Tier 2 is now
100% migrated (22 of 22) — see `PHASE_4_TIER_2_BATCH_PLAN.md`.

As of Phase 7B Batch 1, 6 more articles are migrated (bolded above),
plus `/movement-resources/` (no hub assignment — see below): the
disciple-making resources for churches article, under the hood of
disciple-making movements, 5 examples of disciple-making movements
around the world, equipping your church for disciple-making
movements, finding persons of peace, and breaking down barriers
addressing pastors' objections. This **fully completes the Church
Planting Movements hub (8 of 8 key-article slots)** — the hub's last
4 open slots (5-examples, under-the-hood, equipping-your-church,
breaking-down-barriers) were all pre-reserved from Phase 4 Batch 3 and
now all resolve to real pages — and fills the **Share the Gospel
hub's last open slot** (finding-persons-of-peace) and the **Disciple
Making hub's** reserved slot + `next_step` target
(disciple-making-resources-for-churches-that-will-multiply, also
already linked from primary site nav). `/movement-resources/` gets no
hub assignment (its curated external-resource content spans too many
topics for a single clean fit, per the Phase 6 finding) — instead it
links directly to its 2 already-migrated children and 2 real
not-yet-migrated children via `related_articles`, tying the whole
`/movement-resources/` subtree together. See
`PHASE_7B_TIER_3_BATCH_1.md` for the full batch plan.

As of Phase 7B Batch 2, 7 more pages are migrated: `/starter-tools/`
(no hub assignment — the page links out to many different topics
rather than belonging to one, same reasoning as `/stickers/` and
`/movement-resources/`; it is a GenerateBlocks resource/tool grid
migrated into the existing `articles` collection + `ArticleLayout`,
same page-type precedent as `/stickers/`), plus 6 articles each added
to a hub's `key_articles`: royal-priest-strategy and 7-surprising
disciple-making-movement-examples both add to **Church Planting
Movements** (now 10 slots, beyond its original 8-slot framing — hubs
have no hard cap), unlock-biblical-principles adds to **Disciple
Making**, missionary-verses-in-the-bible adds to **Share the Gospel**,
the-clear-pathway-of-jesus adds to **Four Fields**, and
5-insightful-keys-into-the-biblical-jesus adds to **Jesus and the
Twelve**. See `PHASE_7B_TIER_3_BATCH_2.md` for the full batch plan.

As of Phase 7B Batch 3, 7 more pages are migrated: `/start-here/` (no
hub assignment, same reasoning as `/starter-tools/` — a near-duplicate
resource grid with unrelated podcast-theme demo content dropped as
chrome, migrated into the existing `articles` collection +
`ArticleLayout`) and `/vision/` (no hub assignment — the site's
foundational "No Place Left" vision statement, deliberately kept
outside any single hub so it doesn't narrow or collide with a hub's
own topic framing), plus 5 articles:
the-hidden-power-of-bonhoeffers-discipleship-model adds to **Disciple
Making**; breaking-the-mold-a-guide-to-shifting-your-church-to-movement-strategy
and the-multiplier-mandate-revealed-from-genesis-to-revelation both add
to **Church Planting Movements** (now 12 slots); and
bible-passages-about-love-what-scripture-really-says and
how-to-spot-a-lone-wolf-and-not-become-one get no hub assignment
(a scripture roundup and a team/community-dynamics article,
respectively — neither is a clean fit for any single existing hub).
See `PHASE_7B_TIER_3_BATCH_3.md` for the full batch plan.

As of Phase 7B Batch 4, 7 more pages are migrated: `/beliefs-values/`
(no hub assignment — the ministry's doctrinal statement, linked from
`/vision/`, deliberately kept outside any single hub) and
`/privacy-policy/` (no hub assignment, no tool CTA, no
related_articles — a legal page; also the first page to use the new
`exclude_from_blog: true` frontmatter field so it doesn't appear in
the `/blog/` index), plus 5 articles:
jesus-the-leader-examining-how-he-identified-trained-and-sent-leaders-in-the-gospel-of-mark
adds to **Jesus and the Twelve**;
the-leadership-phase-everyone-skips-why-investment-matters adds to
**Church Planting Movements** (now 13 slots);
discovering-the-disciple-meaning-a-life-changing-journey adds to
**Disciple Making**; 5-surprising-ways-to-attract-multiplying-leaders
adds to **Four Fields** (its "Model, Assist, Watch, & Launch"
framework directly mirrors the hub's existing content); and
the-secret-ingredient-of-trustworthy-leaders-what-paul-knew-about-diligence
gets no hub assignment (a general leadership-diligence principle, no
clean fit among the existing hubs). See `PHASE_7B_TIER_3_BATCH_4.md`
for the full batch plan.

As of Phase 7B Batch 5, 7 more pages are migrated:
`/kingdom-ministry-training/` (no hub assignment, no tool CTA — a
5-module training/curriculum landing page, not blog prose; the second
page after `/privacy-policy/` to use `exclude_from_blog: true`) and
`/the-four-fields-sticker-simple-2x2/` (no hub assignment, related to
`/stickers/` — a single sticker-product page, judged even less
blog-like than `/stickers/` itself and also given
`exclude_from_blog: true`), plus 5 articles:
spiritual-fatherhood-peter-and-pauls-shift-from-reform-to-multiplication,
unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church,
and content-vs-systems-the-game-changer-for-leadership-development all
add to **Church Planting Movements** (now 16 slots); and
unlock-the-power-of-friendly-accountability and
discover-the-game-changing-secrets-starfish-and-the-spirit-review both
add to **Disciple Making**. See `PHASE_7B_TIER_3_BATCH_5.md` for the
full batch plan.

As of Phase 7B Batch 6, 7 more pages are migrated: `/contact-us/` (no
hub assignment, no tool CTA, no related_articles — a utility contact
page whose Brevo subscription form could not be migrated and was
replaced with a `mailto:` fallback; the third page after
`/privacy-policy/` and `/kingdom-ministry-training/` to use
`exclude_from_blog: true`), plus 6 articles: the-3-core-habits-of-a-disciple
adds to **Disciple Making**; and
filtering-unlock-this-essential-for-disciple-making-movements,
setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting,
go-slow-to-go-fast-could-transform-your-leadership-pipeline,
start-strengthen-sustain-core-insights-on-building-lasting-ministry,
and next-gen-local-owners-building-beachheads-of-the-kingdom all add
to **Church Planting Movements** (now 21 slots). See
`PHASE_7B_TIER_3_BATCH_6.md` for the full batch plan.

As of Phase 7B Batch 7 (the seventh and final Tier 3 batch), the
remaining 5 pages are migrated: `/action-plan/` (no hub, no tool CTA
— a stale cohort coaching-plan landing page, `exclude_from_blog:
true`), `/the-church-waffle-sticker/` (no hub, related to
`/stickers/` — a single sticker-product page, `exclude_from_blog:
true`, same treatment as `/the-four-fields-sticker-simple-2x2/`), and
`/elementor-10714/` (no hub — an orphaned past-event confirmation
page, migrated minimally as a documented legacy-preservation page,
`exclude_from_blog: true`), plus 2 articles:
get-ready-to-be-empowered-evangelists-revolutionize-disciple-making
adds to **Church Planting Movements** (now 22 slots); and
4-responses-to-the-gospel adds to **Simple Church**. See
`PHASE_7B_TIER_3_BATCH_7.md` for the full batch plan. This closes out
Tier 3 migration completely — all 48 original Tier 3 URLs are now
migrated.

**Phase 8 full-site audit** crawled every internal link across all 93
generated pages — see `PHASE_8_FULL_SITE_AUDIT.md` §5 for the full
breakdown. 0 empty `href=""`, 0 broken `#` anchors, 0 `javascript:`
links, all header/footer nav links resolve. 33 links across several
articles point to 6 distinct URLs that are real, confirmed, and
tracked in `URL_INVENTORY.md` but not yet migrated —
`/3-circles/` (the real Google Slides tool, deliberately distinct from
this site's `/3-circles-guide/` hub, per `PROTECTED_URLS.md`),
`/free-training/`, `/4-1-1/`, `/4-fields/` (distinct from the
`/four-fields/` hub), `/movement-resources/strategy-coordinator/`, and
`/movement-resources/4-fields-toolbox/`. These are documented,
intentional links per the established "confirmed but not yet migrated
URLs may be linked" policy — not guessed slugs — and will resolve
automatically once those 4 pages (2 of which are `/movement-resources/`
children) are migrated in a future batch.

Tool entries themselves (`src/content/tools/`) are not yet created —
`ToolCTA` renders "(coming soon)" for tool names with no matching entry.
Creating real tool pages (3 Circles, Stories of Hope, etc.) is future
work, not part of the Phase 1 batch.

## Blog index (`/blog/`)

Built in Phase 7A (`src/pages/blog/index.astro`) as a new site-wide
directory, not a per-hub mechanism: it dynamically lists every
migrated article (33 at launch, 40 after Phase 7B Batch 1, 47 after
Phase 7B Batch 2, 54 after Phase 7B Batch 3, 60 after Phase 7B Batch 4,
65 after Phase 7B Batch 5, 71 after Phase 7B Batch 6, 73 after Phase
7B Batch 7 — excluding `/privacy-policy/`, `/kingdom-ministry-training/`,
`/the-four-fields-sticker-simple-2x2/`, `/contact-us/`,
`/action-plan/`, `/the-church-waffle-sticker/`, and `/elementor-10714/`
via their `exclude_from_blog` flags,
growing automatically as more are migrated — sorted
by tier, then by best-available date) and links out to all 11
hubs for topic browsing. It's linked from header and footer nav on
every page (`src/data/navigation.ts`), giving every migrated article a
second real, crawlable inbound path beyond its hub and
`related_articles` links. Not part of the hub → article → tool graph
above — it sits above it as a flat, chronological index.

## Sister sites

CoVo Multipliers (training/tribe/next-step pathways) and Obey.Tools
(practical tools) are linked from the site footer (`src/data/site.ts`
→ `SISTER_SITES`). Do not duplicate their content here — link out
instead, per the brief's core strategy.
