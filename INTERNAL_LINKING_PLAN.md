# Internal Linking Plan

The linking architecture for the cluster strategy in
CONTENT_CLUSTER_ROADMAP.md. This supersedes the migration-era version
of this file (whose hub→article graph is now expressed through the
clusters below); the implementation mechanics are unchanged and are
restated first because they still govern how every link is wired.

## Mechanics (unchanged)

1. **Parent hub** — one link per article via the `hub` frontmatter
   field; rendered automatically as "Part of the [Hub] hub."
2. **Related articles** — 3–5 exact site-relative paths in
   `related_articles`; rendered by `RelatedArticles.astro` (first 3
   shown).
3. **Related tools** — tool names in `related_tools`; rendered by
   `ToolCTA.astro`.
4. **One CTA** — the `article_cta` block (see CTA_GUIDE.md). One per
   article, never stacked.
5. Paths, not IDs: links match each entry's `slug`, so file renames
   never break the graph, and links can be wired before a target page
   exists (rendered "(coming soon)").
6. Crawlability: every internal link is a server-rendered `<a href>`;
   no JS required. True by construction in Astro static output.

## Linking rules for the cluster architecture

- **Pillar ↔ supporting, always bidirectional.** Every supporting
  article's `related_articles` includes its pillar; every pillar
  links (in body prose, not just the related box) to each supporting
  article in its cluster.
- **Hub lists pillar first.** Each hub's `key_articles` opens with
  the cluster pillar, then supports in journey order.
- **In-body links beat boxes.** Aim for 3–6 contextual in-prose links
  per article to sibling articles/tools; the related box is a floor,
  not the strategy.
- **One forward bridge per article.** Every article links one step
  *forward* along the journey (see bridge map below) — this is the
  architectural expression of "obvious next steps."
- **No orphans.** Every editorial article has a `hub` and appears in
  at least one other article's `related_articles`. Current orphans to
  fix when Phase 1 touches them: Lone Wolf and Trustworthy Leaders
  (assign `hub: church-planting-movements`). Strategy Coordinator
  stays deliberately unlinked from clusters (by direction) but keeps
  its movement-resources breadcrumb.
- **Tools are terminals, not thoroughfares.** Tool pages (3 Circles,
  4-1-1, Church Waffle sticker pages) link back to their teaching
  article and nothing else — they exist to be used, not browsed.

## The journey bridge map (pillar → pillar)

```
Meet Jesus (12 Disciples)
  → Testimony pillar (your story is the first tool)
    → Sharing the Gospel pillar
      → Making Disciples pillar
        → Disciple Training pillar → KMT / Commands of Christ
          → Simple Church pillar (What Is a Simple Church?)
            → Leadership pillar (What Is a CPM?)
              → Community (CoVo)
```

Each pillar carries exactly one prominent forward link to the next
pillar (a short "ready for the next step?" paragraph before the CTA),
and one quiet backward link for readers who arrived too far
downstream.

## Hub relationships

- Primary cluster hubs: `/testimony/`, `/share-the-gospel/`,
  `/disciple-making/`, `/disciple-training/` (new), `/simple-church/`,
  `/prayer/`, `/church-planting-movements/`, `/jesus-and-the-twelve/`.
- Sub-hubs feeding a primary: `/3-circles-guide/` and
  `/stories-of-hope/` → Share the Gospel; `/four-fields/` → split
  between Disciple Training (the training article) and Leadership
  (the book + frameworks).
- Each hub's `next_step` points at its cluster's primary CTA
  destination (see CTA flow) — never generically at the homepage.
- Hubs cross-link along the journey: each hub intro ends with a
  one-line link to the next hub in the chain (matches the bridge map).

## Cluster-interior linking (summary)

- **Testimony:** 15-Second ↔ How to Write ↔ Short Examples form the
  practice triangle; all → pillar; pillar → Sharing the Gospel.
- **Sharing the Gospel:** What Is the Gospel is the anchor every
  article's first section links to; 3 Circles article ↔ 3 Circles
  tool; situational articles (work/family/introverts) → pillar and →
  a method article (3 Circles or testimony).
- **Making Disciples:** What Is a Disciple ← linked from every
  definitional mention sitewide (it becomes the canonical anchor);
  3 Core Habits ↔ Friendly Accountability ↔ Three Thirds.
- **Disciple Training:** every article links KMT in prose AND carries
  the KMT CTA; curriculum article links every named tool once.
- **Simple Church:** What Makes a Church ↔ Church Waffle (same
  Acts 2 frame); Commands of Christ article → obey.tools (external)
  and → Three Thirds (internal practice).
- **Prayer & Field:** oikos ↔ person of peace ↔ pray-for-lost-friends
  triangle; all three → Sharing the Gospel pillar.
- **Leadership:** new CPM pillar rolls up DMM, 10 Qualities, 4
  Stages, Power of Multiplication, Multiplier Mandate; APEST ↔
  leadership character articles (Trustworthy Leaders, Lone Wolf, 5
  Ways to Attract); Four Fields book ↔ Generational Mapping ↔ MAWL.
- **Meet Jesus:** 12 Disciples links each named disciple's themes to
  practice articles (testimony, gospel, training) — its 116k
  impressions currently flow nowhere; this is Phase 1 work.

## CTA flow (one primary CTA per cluster — see CTA_GUIDE.md)

| Cluster | Primary CTA | Destination |
|---|---|---|
| Meet Jesus | Tool | 7 Stories of Hope (seeker-facing); Commands of Christ on the commands article |
| Testimony | Practice (tool) | 15-Second Testimony exercise; Lab secondary on pillar |
| Sharing the Gospel | Lab (pillar/situational) · Tool (method articles) | Live lab / 3 Circles |
| Making Disciples | Lab | Live lab |
| Disciple Training | Kingdom Ministry Training | `/kingdom-ministry-training/`; Commands of Christ CTA on the commands-training article (obey.tools) |
| Simple Church | Tool (Church Waffle) · Commands of Christ | Waffle / obey.tools; Community on pillar |
| Prayer & Field | Practice (tool) | Oikos map / prayer-walk exercise |
| Leadership & Multiplication | Community | CoVo Multipliers |

All of these use the existing three CTA types (`tool`, `lab`,
`community`) — "Kingdom Ministry Training" and "Commands of Christ"
CTAs are `tool`-type CTAs with those destinations; no new CTA
machinery is needed.

## Maintenance rules

- New article checklist: hub set · pillar in related_articles ·
  ≥1 inbound link added to an existing sibling · one forward bridge ·
  CTA matches the cluster table.
- Quarterly: crawl for orphans (no inbound `related_articles`
  references) and for pillars whose supporting lists have drifted.
- Never link to a URL that isn't in the slug inventory or vercel.json
  redirects (the "(coming soon)" rendering makes accidental future
  links visible in review).
