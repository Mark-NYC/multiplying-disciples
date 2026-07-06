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

| Hub | Key articles wired so far | Related tools |
|---|---|---|
| Jesus and the Twelve | 12 disciples, apostles meaning, unlocking apostle, 7 words on the cross | — |
| Testimony | 15-second testimony, testimony in the Bible, sharing your testimony | 3 Circles, Stories of Hope |
| Share the Gospel | how to evangelize, bible verses for spreading gospel, 3 circles guide, 5 strategies, finding persons of peace | 3 Circles, Stories of Hope |
| 3 Circles | 3 circles step-by-step guide, how to evangelize | 3 Circles |
| Stories of Hope | 7 stories of hope guide, 12 practice church circle | Stories of Hope |
| Prayer | prayer walking guide, prayer wheel, Fornier 12 prayer points | — |
| Disciple Making | biblical discipleship guide, 3 ways to make disciples, radical discipleship, high price of discipleship, disciple-making resources, top 25 books | 3 Circles, Stories of Hope |
| Simple Church | simple church article, 12 practice church circle, the three thirds | — |
| Four Fields | four fields article, getting started in four fields training | — |
| Church Planting Movements | power of multiplication, 10 qualities, DMM characteristics, 5 examples, under the hood, equipping your church, breaking down barriers, 4 stages of movement | — |
| Strategy Coordinator | strategy coordinator role article | — |

Tool entries themselves (`src/content/tools/`) are not yet created —
`ToolCTA` renders "(coming soon)" for tool names with no matching entry.
Creating real tool pages (3 Circles, Stories of Hope, etc.) is future
work, not part of the Phase 1 batch.

## Sister sites

CoVo Multipliers (training/tribe/next-step pathways) and Obey.Tools
(practical tools) are linked from the site footer (`src/data/site.ts`
→ `SISTER_SITES`). Do not duplicate their content here — link out
instead, per the brief's core strategy.
