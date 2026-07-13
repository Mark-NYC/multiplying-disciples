# INTERNAL_LINKING.md

The 2026-07 internal-linking and topical-authority **audit of the live
site** — what the link graph actually looks like, what was fixed in
this pass, and what remains. Companion docs:

- **INTERNAL_LINKING_PLAN.md** — the forward-looking linking
  architecture (mechanics + rules). This audit measured the site
  against it and implemented the low-risk deltas.
- **CONTENT_GRAPH.md** — the full cluster → pillar → supporting →
  tools → labs → community graph.
- **TOPICAL_AUTHORITY.md** — cluster-by-cluster authority ranking.
- CONTENT_CLUSTER_ROADMAP.md / CONTENT_AUDIT.md — the strategy and
  page-quality evidence this audit inherits (GSC numbers live there).

Method: every entry in `src/content/` (55 articles, 10 hubs) was
parsed for `hub`, `related_articles`, `article_cta`, and in-body
links; inbound counts include hub `key_articles`/`next_step`,
related-article boxes (first 3 render), in-body links, and the
navigation/footers in `src/data/navigation.ts` + `Footer.astro`.

## Pillar pages (current, de facto)

A page is listed as a pillar if it is the broadest page its cluster
has today — five clusters still lack their true head-term pillar
(marked ☆ missing, per the roadmap).

| Cluster | De facto pillar | True pillar |
|---|---|---|
| Sharing the Gospel | How to Evangelize (`/how-to-evangelize-ultimate-step-by-step-guide/`) | ☆ How to Share the Gospel |
| Testimony | 15-Second Testimony Examples (`/15-second-testimony-examples-ignite-your-faith/`) | ☆ How to Share Your Christian Testimony |
| Making Disciples | Understanding Biblical Discipleship (`/understanding-biblical-discipleship-a-complete-guide-to-following-jesus/`) | ☆ How to Make Disciples |
| Simple Church | What Is a Simple Church? (`/what-is-a-simple-church-meeting-christ-in-a-spiritual-family/`) | exists — needs pillar-depth expansion |
| Prayer & the Field | How to Pray Walk Your Neighborhood (`/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives/`) | exists |
| Leadership & CPM | The Power of Multiplication (`/the-power-of-multiplication-how-church-planting-movements-accomplish-the-great-commission/`) | ☆ What Is a Church Planting Movement? |
| Meet Jesus | The 12 Disciples of Jesus (`/discover-the-12-disciples-of-jesus-christ/`) | exists (needs CTR work, not depth) |
| Disciple Training | Kingdom Ministry Training (`/kingdom-ministry-training/`) — a tool landing, not an article | ☆ Disciple Training pillar + ☆ `/disciple-training/` hub |

## Supporting pages by hub

- **`/share-the-gospel/`** (sub-hubs `/3-circles-guide/`,
  `/stories-of-hope/`): How to Evangelize · Bible Verses About
  Spreading the Gospel · The 3 Circles Gospel Presentation · Finding
  a Person of Peace · 3 Circles (tool) · 7 Stories of Hope (guide).
- **`/testimony/`**: 15-Second Testimony Examples · Testimony in the
  Bible: 20 Verses · 7 Biblical Reasons You Can't Stay Silent.
- **`/disciple-making/`**: Understanding Biblical Discipleship · The
  3 Core Habits of a Disciple · Unlock the Power of Friendly
  Accountability (+ cross-listed 3 Circles, 7 Stories).
- **`/simple-church/`**: What Is a Simple Church? · Church Waffle
  (12 Practice Church Circle) · Three Thirds · 4 Responses to the
  Gospel (stub).
- **`/prayer/`**: Prayer Walking · Christian Prayer Wheel · 12 Key
  Prayer Points.
- **`/church-planting-movements/`**: Power of Multiplication · 10
  Qualities of Every CPM · DMM: Key Characteristics · Pastors'
  Objections · 4 Stages of Movement · Multiplier Mandate · Paul in
  Ephesus · Content vs. Systems · Trustworthy Leaders (added this
  audit) · Lone Wolf (added this audit) · Muddy Boots (merge target).
- **`/four-fields/`** (sub-hub of Leadership/Training): Four Fields
  book · Four Fields training · Clear Pathway of Jesus · 5 Ways to
  Attract Multiplying Leaders.
- **`/jesus-and-the-twelve/`**: 12 Disciples · Apostles Meaning ·
  APEST · Jesus the Leader (Mark).

## Hub relationships

- Article → hub: automatic "Part of the [Hub] hub" + breadcrumb from
  the `hub` frontmatter field. Every editorial article now has a hub.
- Hub → articles: `key_articles` (rendered list) + `next_step`.
  Every hub now has a `next_step` (Prayer's was added this audit).
- Hubs in navigation: 5 of 10 hubs are in the hamburger "Browse
  Topics" (Share the Gospel, Disciple Making, Simple Church, Prayer,
  CPM — deliberate, per NAVIGATION_MAP.md); all 10 with ≥1 article
  get pills on `/blog/`. Journey chain between hubs (testimony →
  gospel → disciple-making → …) exists in the bridge map but is **not
  yet expressed as hub-intro links** — still open (Phase 3 of
  INTERNAL_LINKING_PLAN.md).

## Orphan pages

**Editorial orphans: none remaining.** Fixed this audit: Lone Wolf
and Trustworthy Leaders (hub + inbound related links added).

Remaining zero-inbound pages, all utility/legacy and deliberate:

| Page | Status | Recommendation |
|---|---|---|
| `/start-here/` | duplicate of `/starter-tools/` (same 8-card grid) | **301 → `/starter-tools/`** (Mark's call — see redirects below) |
| `/elementor-10714/` | expired event confirmation | **301 → `/free-training/`** (already flagged "Retire, Mark's call" in CONTENT_AUDIT.md) |
| `/action-plan/` | stale 2023 cohort syllabus | keep quiet, or 301 → `/free-training/` if the cohort model is retired |
| `/the-church-waffle-sticker/`, `/the-four-fields-sticker-simple-2x2/` | legacy per-product pages (Printify) while `/stickers/` sells via Sticker Mule | either link them from the matching `/stickers/` cards or 301 them to `/stickers/`. **Bug found:** the Four Fields sticker page's "Order Now" points at a *3 Circles* Printify product — fix or retire. |
| `/privacy-policy/`, `/vision/`, `/kingdom-ministry-training/`, `/contact-us/` | not orphans — linked from footer/nav/menu | none |

Deliberately unpromoted (never link prominently): Strategy
Coordinator (by direction) · privacy policy · contact page ·
elementor-10714 · action-plan · the two sticker product pages ·
`/movement-resources/4-fields-toolbox/` (excluded from menu by
direction).

## Links added in this audit (implemented)

Frontmatter (hub / related_articles):

1. Lone Wolf — `hub: church-planting-movements`; related now
   Friendly Accountability · Trustworthy Leaders · Biblical
   Discipleship.
2. Trustworthy Leaders — `hub: church-planting-movements`; related
   adds Lone Wolf.
3. CPM hub — Trustworthy Leaders + Lone Wolf added to
   `key_articles`.
4. Prayer hub — `next_step` → Prayer Walking guide.
5. 5 Ways to Attract Leaders — Trustworthy Leaders now a visible
   related link.
6. Friendly Accountability — Lone Wolf + 3 Core Habits now visible.
7. Power of Multiplication — Multiplier Mandate now visible.
8. DMM — Pastors' Objections now visible.
9. Pastors' Objections — Paul in Ephesus added.
10. Apostles Meaning + 12 Disciples — Jesus the Leader added.
11. 7 Biblical Reasons (testimony) — 3 Circles added (the
    testimony → gospel forward bridge).
12. Kingdom Ministry Training — related box created (Free Training ·
    Content vs. Systems · Four Fields training).

In-body contextual links:

13. 10 Qualities → 12 Key Prayer Points ("vibrant culture of
    prayer") and → What Is a Simple Church ("cell churches of 10-30
    members meeting in homes").
14. Paul in Ephesus → Jesus the Leader ("equipping others to carry
    on the work") and → How to Evangelize ("effectively share the
    gospel").
15. Multiplier Mandate → `/four-fields/` hub ("Four Fields" process)
    and → Content vs. Systems ("development of leaders").
16. Clear Pathway of Jesus → Person of Peace, 3 Circles, 15-Second
    Testimony, Friendly Accountability, Church Waffle (five
    previously-unlinked framework mentions).
17. Bible Verses About Spreading the Gospel → 15-Second Testimony
    ("2-minute testimony").
18. Prayer Walking → 12 Key Prayer Points ("intercede for the people
    and places around you").
19. Lone Wolf → Friendly Accountability ("friendly accountability").
20. Trustworthy Leaders → Jesus the Leader ("Jesus's pattern of
    gradually increasing responsibility").
21. Content vs. Systems → Kingdom Ministry Training (new sentence in
    "Connect With Us").

Anchor-text fixes:

22. `/vision/`: "Click Here." → "Beliefs & Values statement";
    "[link]" → "millions of people".
23. `/stickers/`: "Click here for $10 Credit…" → "Get $10 credit on
    Sticker Mule".
24. Content vs. Systems: "Get in touch with us" (which actually
    pointed at `/free-training/`) → "Join a free 1-hour live
    disciple-making training".

Known-acceptable generic anchors left alone: the "View" buttons in
the `/starter-tools/` + `/start-here/` card grids and "Buy Now" on
`/stickers/` (card-pattern buttons with the item name adjacent) and
the "← BACK" links on sticker product pages.

## Duplicate topics & competing pages

| Pages | Issue | Action |
|---|---|---|
| `/start-here/` vs `/starter-tools/` | Same 8-tool grid, same intent; starter-tools has 30+ inbound links, start-here has none | Redirect start-here → starter-tools |
| Muddy Boots (`/setting-the-stage-…/`) vs Clear Pathway of Jesus | Same thesis ("Jesus' model for church planting"), Clear Pathway is 6× deeper | **Merge** Muddy Boots into Clear Pathway, then 301 (already the CONTENT_AUDIT recommendation; roadmap Phase 3) |
| `/4-responses-to-the-gospel/` vs `/movement-resources/12-practice-church-circle/` | Both pages embed the *same* 12 Practice Church Circle slide deck; 4 Responses' own slides were never distinct | Either expand 4 Responses into a real explainer (audit's "Improve") or 301 it to the Church Waffle page; don't leave two thin pages on one deck |
| DMM article vs future "What Is a CPM?" pillar | The DMM article explicitly treats DMM/CPM as interchangeable — once the CPM pillar exists they will compete | Write the CPM pillar with a distinct head-term focus and cross-link the two as siblings ("DMM vs CPM" section), per roadmap |
| How to Evangelize vs future "How to Share the Gospel" pillar | Distinct GSC query families, but adjacent | Interlink tightly on publication; keep intents separate (roadmap already notes this) |

## Redirect recommendations (all need Mark's sign-off; none implemented)

Add to `vercel.json` (see REDIRECTS.md conventions):

1. `/start-here/` → `/starter-tools/` (duplicate intent, zero inbound).
2. `/elementor-10714/` → `/free-training/` (expired event page).
3. `/setting-the-stage-jesus-as-the-model-for-muddy-boots-church-planting/`
   → `/the-clear-pathway-of-jesus-a-biblical-model-for-disciple-making/`
   — **after** the merge pass, not before.
4. Optional: `/action-plan/` → `/free-training/`; the two sticker
   product pages → `/stickers/` (or fix + link them instead).

## Missing articles (highest-priority, from the roadmap's evidence)

1. How to Share Your Christian Testimony (Testimony pillar).
2. How to Share the Gospel (pillar) + What Is the Gospel?
   (definitional anchor).
3. How to Make Disciples (pillar) + What Is a Disciple?
4. Disciple Training pillar + **new `/disciple-training/` hub** (the
   only major cluster with no hub; highest business value).
5. What Is a Church Planting Movement? (11 existing articles orbit
   the missing center).
6. What Is an Oikos? / How to Pray for Lost Friends (completes the
   Prayer & Field triangle with Person of Peace).
7. What Are the Commands of Christ? (bridge article — the menu links
   obey.tools with no on-site page explaining it).

## Strongest / weakest authority clusters

Strongest (full ranking + reasoning in TOPICAL_AUTHORITY.md):

1. **Sharing the Gospel** — most inbound links (3 Circles guide: 20;
   How to Evangelize: 12; 7 Stories: 11), three hub pages, the
   site's best converters.
2. **Testimony** — tight reciprocal triangle, proven impressions,
   now bridged forward to the gospel cluster.
3. **Simple Church / practice tools** — Three Thirds (16 inbound)
   and Church Waffle (13) are the most-linked practice pages.

Weakest:

1. **Disciple Training** — no hub, no pillar, KMT was a near-orphan
   until this audit; highest priority to build.
2. **Meet Jesus** — one giant asset (116k impressions) with a very
   small supporting cast; authority is broad-traffic, not deep.
3. **Prayer & the Field** — healthy micro-cluster but missing its
   oikos/person-of-peace interior (Person of Peace currently lives
   in the gospel hub).

## Maintenance

The rules in INTERNAL_LINKING_PLAN.md § "Maintenance rules" stand.
Re-run this audit's checks (orphans, broken related/key targets,
generic anchors) quarterly; the parse used here is reproducible from
frontmatter + body links alone.
