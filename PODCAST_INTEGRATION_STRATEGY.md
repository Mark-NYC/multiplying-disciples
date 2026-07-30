# PODCAST_INTEGRATION_STRATEGY.md

How the H3X podcast catalog should feed the Multiplying Disciples
knowledge graph. Companion to CONTENT_GRAPH.md, TOPICAL_AUTHORITY.md,
CONTENT_CLUSTER_ROADMAP.md, and CTA_GUIDE.md — this doc adds the
**audio layer** those docs don't yet cover.

**Governing thesis:** the article is the knowledge asset. H3X episodes
are not content to be summarized into new pages — they are the *raw
material of authority*: the stories, objections, field experience, and
practitioner voice that turn a competent article into the page Google
and ChatGPT cite. We optimize for a *coherent knowledge graph*, not
content volume. A new article is the exception, not the default.

---

## 0. Data-access status (read this first)

This analysis was produced inside a locked-down execution environment.
The egress policy blocks **every** external host — `anchor.fm`,
`podcasts.apple.com`, `open.spotify.com`, `podscan.fm`, and general web
hosts all return `403` to both direct fetch and the page-fetch tool.
Only server-side web *search* works, which returns result snippets, not
full show notes or the RSS body.

Consequence, stated plainly so nothing here is mistaken for guesswork:

| Deliverable | Status | Why |
|---|---|---|
| Ecosystem analysis (Step 1) | **Complete** | Built from the repo |
| Classification **rubric** (Step 2) | **Complete** | Method, not data |
| Coverage evaluation + heatmap (Steps 3, 5) | **Complete (asset side)** | Built from the repo |
| Evergreen **scoring model** (Step 4) | **Complete** | Method, not data |
| Tiered roadmap (Step 6) | **Complete** | Infra + article-side |
| Per-article reception plan (Steps 8, 9) | **Complete** | Built from the repo |
| Per-**episode** classification (Step 2) | **Done for recent 25 → PODCAST_EPISODE_MAP.md**; back-catalog needs full feed | rss.app export gave the last 25; anchor.fm serves all ~257 |
| **Top-20 evergreen** list (Step 4) | **Scored for recent 25**; full Top-20 needs full feed | Same |
| Master-matrix **episode column** (Step 7) | **Populated for recent 25** | Same |

> **Update:** the recent 25 episodes have now been classified, scored,
> and mapped from **real feed data** — see **PODCAST_EPISODE_MAP.md**.
> The rss.app feed truncates to a recent window; capturing the full
> ~257-episode archive needs the anchor.fm feed via the CI-cache Action
> (§6, items 1–2).

The catalog is **~223–257 episodes** (search results disagree; the RSS
`<item>` count is authoritative), weekly, hosted by **Mark & Dave**
(Oklahoma City, #NoPlaceLeft / DMM world), format = interviews +
practitioner conversation + simple-tool training, framed around *head,
heart, hands*.

**To finish the feed-dependent 20%,** supply the catalog by any one of:
1. Commit the RSS XML to the repo (e.g. `imports/h3x-feed.xml`) — best;
   it version-controls the source and I can re-run against it.
2. Export show notes (title + date + description per episode) to a CSV
   or `.md` in `imports/`.
3. Have the environment's egress policy allowlist `anchor.fm`.

The moment any of those lands, the three scaffolded sections fill in
against the finished rubric below — no rework of anything else.

---

## 1. The ecosystem as it actually stands (Step 1)

Eight topic clusters, one journey, three CTA destinations. From
TOPICAL_AUTHORITY.md, strongest → weakest:

1. **Sharing the Gospel** — best CTR + most-linked article (3 Circles,
   20 inbound). Missing the head-term pillar.
2. **Testimony** — the model cluster: reciprocal triangle, ~17.5k
   impressions, lowest-friction practice step. Missing its pillar.
3. **Simple Church** — most-linked *tools* (Three Thirds 16, Church
   Waffle 13); authority rests on tools, not articles.
4. **Leadership / CPM** — the deepest library (13+ articles) but *no
   pillar owns the head term*; authority is breadth without a center.
5. **Meet Jesus** — one colossal asset (12 Disciples, 116k impressions,
   ~45% of site impressions) wasted by 0.28% CTR; only 4 articles deep.
6. **Making Disciples** — strong de facto pillar (Understanding
   Biblical Discipleship, 13 inbound) but misses both namesake head
   terms.
7. **Prayer & the Field** — healthy micro-cluster; the "field" half
   (oikos, Luke 10) is missing.
8. **Disciple Training** — weakest, highest stakes: no hub, no pillar,
   yet the shortest path from search to the ministry's actual paid
   offering (Kingdom Ministry Training).

**The journey every cluster feeds** (CONTENT_GRAPH.md):

```
Meet Jesus → Share the Gospel → Make Disciples → Train Disciple Makers
     → Practice Church → Multiply Leaders → Multiply Churches → Community
```

**The four content types an episode can become** (this is the whole
toolkit — there is nothing else to route into):

- **Article** — the authoritative destination. Schema supports FAQ
  `questions` (deep-linking pills), `related_articles`, `related_tools`,
  `external_links`, and exactly one `article_cta`.
- **Field Note** — a separate, approval-gated collection of short, real
  proof-of-practice stories, referenced into an article by id
  (`FieldNote` component). This is where episode *stories* belong.
- **Tool** — on-site or external (obey.tools, CoVo). Episodes rarely
  become tools; they *point at* them.
- **Hub** — cluster landing pages. Episodes never become hubs.

### 1a. The blocking infrastructure gap

**There is no podcast-embed mechanism in the codebase.** No
`PodcastEmbed.astro`, no `episodes` content collection, no audio player.
The WordPress→Astro migration deliberately *stripped* podcast iframes
down to plain links (see the migration notes in
`content-vs-systems-...mdx` — an Apple Podcasts iframe became a bare
"Listen to the episode" link; `movement-resources-strategy-coordinator.md`
keeps bit.ly episode links only).

**This means "embed the episode into the article" is currently
impossible — it can only be a text link.** Every recommendation below
that says "embed" is blocked until this is built. It is therefore
**Tier-1, item #1** (see §6). The rest of the strategy is downstream of
it.

---

## 2. Classification rubric (Step 2)

Every episode resolves to exactly one primary disposition. Do **not**
match on title — read the description for the *asset* inside it (a
story, an objection, a definition, a worked example) and route that
asset. Decision order (first match wins):

```
START
│
├─ Does an existing article already own this exact search intent?
│   │
│   ├─ YES → is the episode's value a STORY / testimony / field win?
│   │         ├─ YES → (A) EMBED + mine it for a FIELD NOTE
│   │         └─ NO  → does it add teaching depth the article lacks
│   │                  (framework, objection answered, example)?
│   │                   ├─ substantial → (B) IMPROVE the article, embed as evidence
│   │                   └─ light       → (A) EMBED as "go deeper" + maybe an FAQ
│   │
│   └─ NO → does it span 2+ existing articles' intents?
│            ├─ YES → (D) SPLIT across those articles (embed the relevant
│            │             segment in each; never duplicate the whole)
│            └─ NO  → is the intent evergreen + searched + uncovered?
│                      ├─ YES → (C) NEW evergreen article (rare; must clear §9 test)
│                      └─ NO  → (E) PODCAST-ONLY (news, inside-baseball,
│                                    guest-specific, time-bound)
```

**The five dispositions:**

- **(A) Embed into an existing article.** Default outcome. The episode
  deepens a page that already ranks/should rank. Usually also yields a
  Field Note (if it contains a story) and/or an FAQ entry (if it answers
  an objection).
- **(B) Substantially improve an article.** The episode contains
  teaching the article is missing — a framework, a distinction, an
  answered objection. The *article text* changes; the episode embeds as
  the citation/expert-experience signal.
- **(C) New evergreen article.** Only when the episode addresses a
  distinct, searched, currently-uncovered intent **and** clears the
  cannibalization test in §9. Expect this to be **<10%** of the catalog.
- **(D) Split across multiple articles.** Wide-ranging episodes
  (roundtables, "state of the movement," decade-in-review). Route each
  segment to its home article; the episode may also anchor a hub.
- **(E) Podcast-only.** Genuinely time-bound, guest-idiosyncratic, or
  inside-baseball. Little long-term search value. Keep in the feed; do
  not force a page.

**Per-episode record to produce (once the feed lands):** Episode title ·
Existing article(s) · Why it belongs there · Search intent supported ·
Strengthens topical authority? · Adds original expertise/experience? ·
Improves AI understanding? · Creates FAQ content? · Story → Field Note? ·
Suggested embed intro text.

### 2a. Worked examples on real, sourced episodes

To prove the rubric produces defensible output (these five are the only
episodes recoverable via search — used here as method demonstrations,
**not** as the finished classification):

| Episode (sourced) | Disposition | Home article(s) | Why / asset inside |
|---|---|---|---|
| **"The Inefficient Strategy Behind Lasting Movements"** — precision harvesting; Jesus filtered and invested in the few | **B** | `jesus-the-leader...`, `how-to-make-disciples`, `finding-persons-of-peace` | Reframes disciple-selection; answers the "why not go broad?" objection → also an **FAQ** on Jesus the Leader |
| **"High Invitation, High Challenge"** — Jesus modeled both; shapes leader development | **B** | `the-secret-ingredient-of-trustworthy-leaders`, `how-to-train-disciples` | A reproducible leadership *distinction*; strengthens the leadership-character spine |
| **David & Keri Campbell testimony** — broad sowing → healing → Berlin, work among Muslims | **A + Field Note** | `finding-persons-of-peace`, `a-step-by-step-guide-to-prayer-walking...`, testimony cluster | High story quality, real field experience → mine a **Field Note**, embed on person-of-peace |
| **H3X #230 "Take or Toss: A Decade Inside #NoPlaceLeft"** — decade inventory: what they kept/ditched | **D** | CPM pillar (planned), `disciple-making-movement-dmm-...`, `breaking-down-barriers-...-objections` | Roundtable spanning many intents; segment it — also the single best **credibility/E-E-A-T** asset on the site |
| **"Distributed Networks: Unpacking the Genesis of H3X"** — about the show itself | **E** (or About) | `/about/` at most | Origin story, not a search intent |

---

## 3. Coverage evaluation (Step 3)

What the repo tells us before a single episode is classified:

**Articles that should host multiple embeds** (deep intent, high
traffic, or pillar status — these are episode *magnets*):
- `discover-the-12-disciples-of-jesus-christ` (116k impressions — every
  Jesus/leadership teaching episode can deepen it)
- The CPM pillar (planned) + `the-power-of-multiplication-...` — the
  movement library's center; the catalog's richest vein
- `understanding-biblical-discipleship` (de facto Making-Disciples pillar)
- `the-three-circles-gospel-presentation-step-by-step` (20 inbound)
- `what-is-a-simple-church-...` and `three-thirds`

**Pillars / high-value pages with no podcast support today** (all of
them — because no embed mechanism exists; listed by priority):
CPM pillar, How to Make Disciples, How to Share the Gospel, the
Testimony pillar, Disciple Training pillar, What Is a Simple Church,
prayer-walking. **Every pillar is podcast-orphaned.** This is the
single largest authority-building opportunity on the site.

**Podcast topics likely to have no article home** (candidates for (C),
to confirm against the feed): specific *field stories* by region/people
group; guest-practitioner interviews; "state of the movement" reviews;
possibly MAWL, generational mapping, and oikos — all three are
*documented content gaps* (CONTENT_CLUSTER_ROADMAP.md) that the podcast
very likely already teaches. If the feed confirms strong episodes there,
those flip from (C)-new-article to "article + embed" simultaneously.

**Duplicate-topic / cannibalization watch:** `4-responses-to-the-gospel`
(35-word stub sharing a slide deck with Church Waffle) and Muddy Boots
(merging into Clear Pathway) must be resolved *before* pointing episodes
at them, or an embed reinforces a page slated to disappear.

**Consolidation opportunity:** the movement library (13+ articles,
breadth without a center) is where consolidating episode embeds under
the future CPM pillar will produce the biggest topical-authority jump.

---

## 4. Evergreen scoring model (Step 4)

Score each episode 1–10 on seven dimensions, then compute a weighted
**Integration Priority Score (IPS)**. Weights reflect what this site
actually needs — an authoritative, citable knowledge graph — not raw
audio quality.

| Dimension | Weight | 1 (low) | 10 (high) |
|---|---|---|---|
| Evergreen value | 0.20 | tied to a date/event | true 3-yr-from-now relevance |
| Search value | 0.20 | no query behind it | maps to a real head/long-tail term |
| AI-citation value | 0.15 | opinion/vibe | quotable definition, framework, data |
| Original experience | 0.15 | generic teaching | first-hand field practice (E-E-A-T) |
| Story quality | 0.10 | none | vivid, specific, Field-Note-worthy |
| Practical application | 0.10 | inspiration only | reproducible steps/tool |
| Strengthens an existing article | 0.10 | no home | slots into a pillar/high-traffic page |

`IPS = Σ(score × weight)`. Then bucket:

- **IPS ≥ 7.5** → Tier-1 integration (Top-20 candidates).
- **6.0–7.4** → Tier-2.
- **4.0–5.9** → Tier-3 / embed-only when convenient.
- **< 4.0** → disposition (E), podcast-only.

**Top-20 Evergreen Episodes (Step 4 output): scaffolded.** This list is
produced by ranking all episodes by IPS and keeping the top 20 that also
map to a distinct article home (so the 20 spread across clusters rather
than stacking on one). It fills in the moment the feed is supplied. The
five sourced episodes above would all clear Tier-1 or Tier-2 on their
descriptions alone — a signal the catalog is rich in high-IPS material.

---

## 5. Coverage heatmap (Step 5)

Existing-asset coverage per topic. `A`=Article `P`=Podcast embed
`T`=Tool `L`=Lab CTA `F`=Field Note `V`=Video. Legend: 🟩 strong ·
🟨 partial · 🟥 weak/none.

| Topic | Article | Podcast | Tool | Lab | Field Note | Video | Coverage | Priority |
|---|---|---|---|---|---|---|---|---|
| Meet Jesus / 12 Disciples | 🟩 | 🟥 | 🟨 | 🟥 | 🟥 | 🟥 | 🟨 | **P1** (huge traffic, no depth-audio, no story) |
| Testimony | 🟩 | 🟥 | 🟩 | 🟩 | 🟨 | 🟥 | 🟨 | **P1** (model cluster, add voice + stories) |
| Share the Gospel / 3 Circles | 🟩 | 🟥 | 🟩 | 🟩 | 🟥 | 🟥 | 🟨 | **P1** (best CTR, no field stories) |
| Making Disciples | 🟨 | 🟥 | 🟩 | 🟩 | 🟥 | 🟥 | 🟨 | **P1** (namesake; pillar gap) |
| Leadership / CPM | 🟩 | 🟥 | 🟩 | 🟨 | 🟥 | 🟥 | 🟨 | **P1** (deepest library, no center, no audio) |
| Simple Church | 🟨 | 🟥 | 🟩 | 🟨 | 🟥 | 🟥 | 🟨 | P2 |
| Prayer & the Field | 🟩 | 🟥 | 🟨 | 🟨 | 🟥 | 🟥 | 🟨 | P2 (field half missing) |
| Disciple Training (KMT) | 🟥 | 🟥 | 🟨 | 🟨 | 🟥 | 🟥 | 🟥 | **P1** (weakest + business-critical) |

**The vertical red stripe down the Podcast and Field-Note columns is the
whole story:** the site has articles and tools but almost no
practitioner *voice* or *proof* wired into pages. That is exactly what
223+ episodes of first-hand field experience supply — once §1a's embed
mechanism exists. Disciple Training is red across the board and is the
paid offering: highest ROI.

---

## 6. Tiered roadmap (Step 6) — ranked by impact, not effort

### Tier 1 — highest ROI

1. **Build the podcast-embed mechanism.** An `episodes` content
   collection (title, slug, audio/embed URL, date, hosts, one-line
   description, `related_articles[]`) + a `PodcastEmbed.astro` component
   (lazy-loaded player + transcript slot + "listen on" links). *Nothing
   else in this document ships without it.* Add a transcript slot now —
   transcripts are the highest-value AI-citation and long-tail-SEO asset
   a podcast can produce.
2. **Feed → asset intake pipeline.** A repeatable weekly ritual: new
   episode → run the §2 rubric → §4 score → route to article/Field
   Note/FAQ. Bake it into the existing weekly Tuesday release.
3. **Wire the Top-20 (once scored) into their home pillars**, starting
   with the five P1 clusters. Each embed comes with (a) an FAQ entry if
   it answers an objection, and (b) a Field Note if it carries a story.
4. **Disciple Training first.** It's red everywhere and it's the paid
   offering. Any strong training/KMT episode → build the hub + pillar
   *around* the episode's teaching, embed it, CTA → KMT.
5. **Mine field stories into Field Notes** across testimony / gospel /
   prayer-walking — the cheapest credibility win, and Field Notes already
   have first-class support in the schema.

### Tier 2 — important, secondary

6. Embed depth episodes into the two traffic giants (12 Disciples,
   Power of Multiplication) to convert impressions into engaged reads.
7. Use objection-heavy episodes to build out FAQ `questions` on
   `breaking-down-barriers-...-objections` and the DMM article.
8. Complete the CPM pillar and consolidate the movement library's
   embeds under it (topical-authority consolidation).
9. Add transcripts to the Top-40 episodes (AI-citation + long-tail).

### Tier 3 — nice-to-have

10. Embed into secondary long-tail articles as convenient.
11. Cross-link the podcast catalog page (if built) from hubs.
12. Repurpose evergreen episode audiograms as social feeders back to
    the article (top-of-funnel).

---

## 7. Master matrix (Step 7)

Article-keyed scaffold (the durable half). The **Episode #** column is
the one field pending the feed; every other column is decided now, so
each episode drops into a ready slot. Columns: Article · Hub · Cluster ·
Current CTA gap · Podcast support today · **Ideal episode profile to
slot** · Outputs (Embed / FAQ / Field Note) · Priority.

| Article | Hub / Cluster | Ideal episode profile to slot | Outputs | Priority |
|---|---|---|---|---|
| `discover-the-12-disciples-...` | Meet Jesus | Teaching on how Jesus chose/formed the Twelve; "precision harvesting" | Embed + FAQ | P1 |
| `jesus-the-leader-...` | Meet Jesus / Training | Leadership modeling; invitation/challenge; MAWL | Embed + FAQ | P1 |
| `the-three-circles-gospel-presentation-...` | Gospel | A real 3-Circles conversation told start-to-finish | Embed + Field Note | P1 |
| `how-to-evangelize-...` | Gospel | Field evangelism story; overcoming fear | Embed + Field Note | P1 |
| `finding-persons-of-peace-...` | Gospel / Prayer | Person-of-peace field story (Campbell testimony fits) | Embed + Field Note | P1 |
| `15-second-testimony-examples-...` | Testimony | Someone sharing a 15-sec testimony live | Embed + Field Note | P1 |
| `how-to-share-your-testimony` | Testimony | Coaching a nervous believer through it | Embed + FAQ | P1 |
| `understanding-biblical-discipleship` | Making Disciples | Definition/teaching: what a disciple *is* | Embed + FAQ | P1 |
| `how-to-make-disciples` | Making Disciples | Reproducible disciple-making pattern; invest-in-few | Embed + FAQ | P1 |
| `the-power-of-multiplication-...` | CPM | Multiplication math + a real multiplying story | Embed + Field Note | P1 |
| `disciple-making-movement-dmm-...` | CPM | DMM characteristics from practitioners | Embed + FAQ | P1 |
| `breaking-down-barriers-...-objections` | CPM | Episode answering a pastor's objection head-on | Embed + FAQ | P1 |
| `the-secret-ingredient-of-trustworthy-leaders` | Leadership | High invitation/high challenge; character | Embed | P2 |
| `how-to-spot-a-lone-wolf-...` | Leadership | Isolation/accountability failure + recovery story | Embed + Field Note | P2 |
| `four-fields-of-kingdom-growth` | Four Fields | Four Fields taught / worked through a real field | Embed + FAQ | P2 |
| `how-to-get-started-in-four-fields-training` | Training | Walkthrough of starting Four Fields training | Embed | P1 |
| `content-vs-systems-...` | Training | (already links an episode) upgrade link → embed | Embed | P2 |
| `kingdom-ministry-training` (page) | Training | Testimonial from someone KMT-trained | Embed + Field Note | P1 |
| `what-is-a-simple-church-...` | Simple Church | A real simple-church gathering described | Embed + Field Note | P2 |
| `three-thirds` | Simple Church | A three-thirds meeting run live | Embed | P2 |
| `a-step-by-step-guide-to-prayer-walking-...` | Prayer | Prayer-walk → open door field story | Embed + Field Note | P2 |
| `prayer-is-essential-12-key-prayer-points-...` | Prayer | Prayer catalyzing a movement, real account | Embed | P3 |
| *(new)* CPM pillar | CPM | #230 "Take or Toss" as the cornerstone credibility embed | Embed + splits | P1 |
| *(new)* Disciple Training pillar | Training | Best training-philosophy episode as cornerstone | Embed + FAQ | P1 |

---

## 8. Editorial placement rules (Step 8)

How to place an embed so it *strengthens* the page instead of
decorating it:

- **Embed at the point of proof, not the top.** Put the player where the
  article makes a claim the episode substantiates — right after the
  "here's the principle" paragraph, before "here's how." Audio as
  evidence, not as a header ornament.
- **Every story becomes a Field Note, not a summary paragraph.** Use the
  approval-gated `fieldNotes` collection and the `FieldNote` component.
  Set `related_article`/`related_tool`, get approval, flip `approved:
  true`. Stories carry E-E-A-T; keep them structured and reusable.
- **Every answered objection becomes an FAQ `questions` entry.** Add the
  Q, point `anchor` at the H2/H3 that answers it, and let the episode
  embed sit under that heading. This is what wins "people also ask" and
  AI answer boxes.
- **Definitions worth quoting get pulled into the body** (as a
  `PullQuote` or `InsightCard`) and attributed to the episode — a
  quotable, sourced definition is the single most AI-citable unit on a
  page.
- **One CTA rule is untouched.** Embeds never become a second CTA. The
  article keeps its single `article_cta` (CTA_GUIDE.md). An embed is
  evidence; the CTA is the next step.
- **Never let an embed replace the article's own answer.** The page must
  answer the search intent in text *first* (the `intro` paragraph);
  audio deepens, it does not substitute. A page that outsources its
  answer to a player ranks for nothing.

## 9. Ranking rules — think like Google and ChatGPT (Step 9)

- **Favor the pillar over the new page, always.** Before creating a (C)
  article, ask: does embedding this into an existing pillar make that
  pillar *more* authoritative than a thin new page would be on its own?
  Usually yes. Consolidate.
- **Cannibalization test for any new article:** it earns a page only if
  (a) a real query exists that no current page targets, (b) it won't
  compete with an existing page for the same term, and (c) it can be
  meaningfully more than a transcript. Fail any one → embed instead.
- **Transcripts are the AI-citation flywheel.** Full-text transcripts
  turn 40-minute episodes into thousands of words of long-tail,
  quotable, first-hand text under a pillar's authority. This is the
  highest-leverage single move for AIO after the embed mechanism itself.
- **One authoritative destination per intent.** The episode, the Field
  Note, the FAQ entry, and the transcript should all live on / point to
  the *one* page that owns the intent — never spread the same answer
  across three thin pages competing with each other.
- **Depth compounds.** Each episode embedded, story mined, objection
  FAQ'd, and definition quoted on a pillar makes that pillar harder to
  out-rank. Twelve enrichments on one pillar beat twelve new stubs.

---

## 10. What to do next

1. **Supply the feed** (any option in §0) so Steps 2/4/7 can be
   populated against this rubric.
2. **Approve/adjust the Tier-1 infra build** (§6 items 1–2) — the embed
   collection + component + weekly intake ritual.
3. I then produce: the full per-episode classification table, the
   ranked Top-20, and the completed master matrix — and, on approval,
   the first wave of embeds/Field Notes/FAQ entries into the P1 pillars.
