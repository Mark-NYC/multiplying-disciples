# ARTICLE_SYSTEM.md

How every article on the site is structured and authored. There is one
article layout — `src/layouts/ArticleLayout.astro` (the "field manual"
system) — used by all articles, `.md` and `.mdx` alike. The old
two-system split (legacy `ArticleLayout` vs opt-in `ArticleLayoutV2`)
was retired in the 2026-07 consistency pass; the `article_system`
frontmatter flag no longer exists.

Historical design rationale lives in docs/archive/ARTICLE_DESIGN_SYSTEM.md; this
file is the current authoring reference.

**Read EDITORIAL_VOICE.md before you draft or substantially edit any
article.** It is the single source of truth for how the writing sounds. This
document covers structure, frontmatter, and workflow; EDITORIAL_VOICE.md
covers voice, and its before-publishing check is part of the pre-publish
checklist below.

## Article structure (top to bottom)

1. **Breadcrumb** — `Home / <Hub>` only. Never the article's own title.
2. **Article hero** (`ArticleHero`) — optional rare eyebrow; one
   left-aligned human headline (`display_title`, falling back to
   `title`); optional one-sentence subheading; quiet mono meta line
   (date · updated · reading time); optional hero image with caption.
   Calm and person-first: no tag stacks, no category pills, no SEO
   clutter.
3. **Share row** — small icon links (skipped on utility pages).
4. **Article intro** — the one visibly-larger opening paragraph that
   answers the article's main search intent. Author it in the
   frontmatter `intro` field and the layout renders it **above** the
   table of contents, so the answer the reader came for sits before the
   contents box. (Legacy fallback: an inline `<ArticleIntro>` at the top
   of the body still works and renders just *below* the TOC — use it
   only when the opening needs inline links. See "Article intro" below.)
5. **Table of contents** — automatic for 3+ H2s; opt out per-article
   with `hide_toc: true`.
6. **Body** — 44rem reading column; markdown/MDX. Body headings start
   at `##`. An article can place its single CTA here, up in the reading
   flow, with `article_cta.placement: inline` + `<ArticleCTAInline>`
   (see CTA_GUIDE.md, "Placement") instead of leaving it at the end.
7. **Hub link, Related Articles (max 3), Tools for this** — quiet
   closing boxes, only when configured in frontmatter.
8. **One ArticleCTA** — see CTA_GUIDE.md. Never more than one. Renders
   here at the end by default; with `placement: inline` it moves up into
   the body (step 6) and nothing renders here.

## Article intro

Every article opens with one visibly-larger paragraph that answers the
main thing the reader searched for. Author it in the frontmatter `intro`
field:

```yaml
intro: >-
  One paragraph, plain text, that answers the article's main search
  intent in the first few sentences.
```

The layout renders it **above** the table of contents, so the answer
sits before the contents box and a reader sees it the moment the page
loads. Rules:

- **Exactly one, and pick one authoring path.** Set the frontmatter
  `intro` *or* keep an inline `<ArticleIntro>` in the body — never both
  (that renders two intros).
- **Plain text.** The field is a string, so it can't carry inline
  links. When the opening genuinely needs a link, keep the inline
  `<ArticleIntro>` component (it renders just below the TOC) instead.
- **New articles use the field**; legacy articles are migrated to it
  article-by-article during the content audit. An un-migrated article
  keeps its inline `<ArticleIntro>` and is unaffected.

## Frontmatter options

Required: `title`, `description`, `slug` (exact original URL path,
`/like-this/`), `canonical`, `status`, `migration_priority`.

Common optional fields:

| Field | Purpose |
| --- | --- |
| `display_title` | short human H1; `title` stays the SEO/meta title |
| `hero_eyebrow` | rare — only when it adds context the breadcrumb/H1 don't ("Field Guide", "Case Study") |
| `hero_subheading` | one supporting sentence under the H1 |
| `hero_image` / `hero_image_alt` / `hero_image_caption` | the lead visual; the ONLY source of the hero image (og_image is metadata-only) |
| `intro` | the opening search-intent paragraph, rendered by the layout **above** the table of contents. Plain text, one paragraph. Preferred over the inline `<ArticleIntro>` for new articles; see "Article intro" |
| `og_image` | social-card image; also the thumbnail on /blog/ and hub lists |
| `date` / `updated` | drive the meta line and list sorting |
| `hub` | hub filename slug, e.g. `testimony` — drives breadcrumb + hub link |
| `questions` | 2–3 "people also ask" questions this article answers, each `{ q, anchor }` — rendered as tappable pills on the article's /blog/ and hub card and fed to the ask-a-question search. Opt-in and selective; see "Question pills" below. |
| `related_articles` | slug paths; first 3 render in the Related box |
| `related_tools` | tool titles for the "Tools for this" box |
| `hide_toc` | suppress the automatic contents box |
| `article_cta` | end-of-article CTA config — see CTA_GUIDE.md |
| `exclude_from_blog` | marks a utility page (see below) |
| `featured` | showcases the article in /blog/'s featured band (3 slots; first flagged article becomes the large lead card; the band fills from the top of the index if fewer than 3 are flagged). Needs a strong og_image/hero_image. |

## Utility pages

`exclude_from_blog: true` marks utility/landing/legal pages (privacy
policy, contact, stickers, start-here, starter-tools, vision…). They
render through the same layout but skip: the blog index, the share
row, the reading-time meta, and the automatic CTA (their own body is
the call to action). They can still opt into a CTA explicitly via
`article_cta`.

## Available components (`src/components/article/`)

Import inside `.mdx` bodies. Plain `.md` articles can use the global
`.callout` classes and `resource-grid` markup instead (see
global.css); both belong to the same visual family.

| Component | Use for | Restraint rule |
| --- | --- | --- |
| `ArticleIntro` | the one visibly-larger opening paragraph, rendered *below* the TOC | legacy/inline option; prefer the frontmatter `intro` field (renders above the TOC). Use this only when the opening needs inline links. Exactly 1; never combine with a frontmatter `intro` |
| `ArticleCTAInline` | places the article's single CTA mid-body, in the reading flow | requires `article_cta.placement: inline`; see CTA_GUIDE.md |
| `ArticleImage` | a supporting image + relevance caption (`wide` for a desktop breakout) | captions explain relevance, never invent specifics |
| `InsightCard` | key idea, definition, framework, summary (required `label`; optional `accent`/`icon` for parallel named categories) | 0–2 per normal article, ~1 per 600–900 words max |
| `PracticeCard` | one concrete action for the reader | 0–1 per article |
| `WarningCard` | a real misconception or mistake | 0–1, sparing |
| `ScriptureBlock` | verbatim Scripture only, with `reference` | paraphrase stays a plain blockquote |
| `PullQuote` | one memorable sentence from the article's own text | 1 (2 in a very long article) |
| `FieldNote` | a real, approved field story by id | see "Field Notes" below |
| `FieldNoteImage` | a real ministry photo shown as a field record: mono `FIELD NOTE · LOCATION` line plus one plain sentence, thin green rule | 0–1 per article; owner-confirmed photo, real `location`, factual `caption` only — never invented details. See "Field Notes" below |
| `RelatedArticles` | rendered by the layout — don't place manually | — |
| `ArticleCTA` | rendered by the layout — don't place manually | — |
| `DiscipleCard`, `RoleFact` | article-specific patterns (12-disciples, APEST) | not general-purpose |

## Field Notes

Field Notes are real stories from disciple-making practice — never
invented, never placeholdered.

- Authored as separate entries in `src/content/field-notes/` (see
  FIELD_NOTE_TEMPLATE.md), each with `approved: false` until the
  person involved has approved the wording.
- An article references one with `<FieldNote id="..." />`. A missing
  id, an unapproved note, or an empty collection renders **nothing** —
  the article looks complete without it, and no layout change is
  needed when a real note arrives later.
- MDX comments in several articles mark the best insertion point for a
  future note; leave those comments in place.

There are two distinct "field note" elements, for two different jobs:

- `FieldNote` (above) renders a **written story** from the
  `fieldNotes` collection, gated by `approved`. Use it when the record
  is a short narrative someone has approved for publication.
- `FieldNoteImage` renders a **photo as the record**: a real ministry
  photograph with a `FIELD NOTE · LOCATION` line and one plain factual
  sentence beneath it. It is authored inline (not collection-backed and
  not `approved`-gated), so it carries the same integrity bar directly:
  use it only for an owner-confirmed real photo with a real `location`
  and a factual `caption`, never invented people, outcomes, quotes, or
  dates. It is the right choice when the photograph itself is the
  evidence and a one-line caption is all the story there is.

```mdx
import FieldNoteImage from '../../components/article/FieldNoteImage.astro';

<FieldNoteImage
  src="/images/<article-slug>/<photo>.webp"
  alt="What the photo actually shows (not the caption reworded)"
  location="Queens, NYC"
  caption="One factual sentence about what is happening in the photo."
/>
```

`src`, `alt`, `location`, and `caption` are required; `date` and
`credit` are optional. The image lives under `public/` (e.g.
`public/images/<article-slug>/`) so the rehype pipeline can add its
intrinsic `width`/`height` for zero layout shift.

## CTA behavior and fallback

See CTA_GUIDE.md. Summary: `article_cta` picks one of three types
(`tool` = Practice, `lab` = Lab, `community` = Tribe) or `none`.
No block at all → editorial articles get the default Lab CTA; utility
pages get none.

## Adding a new article — example

```yaml
---
title: "Long SEO Title That Ranks | Multiplying Disciples"
display_title: "The short human headline"
description: "One-sentence meta description."
slug: "/my-new-article/"
canonical: "https://multiplyingdisciples.us/my-new-article/"
date: 2026-07-12
hub: "disciple-making"
hero_subheading: "One sentence that frames why this matters."
hero_image: "/images/my-photo.webp"
hero_image_alt: "What the photo actually shows"
hero_image_caption: "Context that adds credibility."
related_articles:
  - "/an-existing-article/"
article_cta:
  type: lab
  stakes_headline: "What it costs the reader to stop at reading."
  bridge_copy: "One sentence bridging the article to practice."
status: "published"
migration_priority: "unknown"
---
```

Body starts with an `ArticleIntro` (or a strong plain paragraph in
`.md`), then `##` sections. Images get real alt text; the rehype
pipeline adds dimensions and lazy loading automatically.

## Hub pages

Hubs are the topic landing pages (`src/content/hubs/`, rendered by
`src/layouts/HubLayout.astro`). Ten exist today. A hub's frontmatter
(schema in `src/content.config.ts`):

| Field | Purpose |
| --- | --- |
| `title` / `description` / `slug` / `canonical` | as for articles; `slug` drives the route (e.g. `/testimony/`) |
| `intro` | 1–3 sentences framing the topic, shown under the H1 |
| `key_articles` | slug paths rendered as the hub's article list (shared `ArticleList` component — same visual family as /blog/). **Cluster pillar first**, then supports in journey order (see INTERNAL_LINKING_PLAN.md) |
| `related_tools` | tool titles for the tools box |
| `next_step` | `{label, href}` — the hub's one CTA box. Points at the cluster's primary CTA destination, never generically at the homepage |
| `status` / `migration_priority` | migration fields, as for articles |

Rules: each hub belongs to one cluster in CONTENT_CLUSTER_ROADMAP.md;
hub intros should end with a one-line link to the next hub along the
journey bridge map (a Phase 2/3 upgrade — most intros don't have this
yet); when an article is published, add it to its hub's
`key_articles`. Only five hubs appear in the menu's Browse Topics
section (NAVIGATION_MAP.md); the other five are reached from /blog/'s
topic pills and article breadcrumbs.

## Question pills ("people also ask")

Some articles carry 2–3 tappable question pills on their /blog/ and hub
cards; most don't. That selectivity is the point — pills mean "this page
answers a few discrete questions you can jump straight to," so they only
earn their place on the pages where that's true. They are opt-in: an
article gets pills only if it has a `questions` array. No field, no
pills — the default is off, and that's deliberate.

The `questions` field is a list of `{ q, anchor }`:

```yaml
questions:
  - q: "What is a person of peace?"
    anchor: "what-is-a-person-of-peace"     # id of the H2/H3 that answers it
  - q: "How do I recognize one?"
    anchor: "how-to-identify-a-person-of-peace"
```

Each pill deep-links to `/this-article/#anchor`. The same list also
feeds the ask-a-question search box (curated questions rank above raw
full-text matches), so a good question does double duty.

**Add pills only when all three are true:**

1. **Question intent** — readers arrive asking something specific: the
   title is a "what is / how to / why" explainer, or the page is a hub
   pillar / `key_article` that's a common landing point.
2. **Decomposable structure** — there are 2–3 distinct sections (ideally
   a real FAQ block, or question-shaped H2/H3s) with stable headings to
   anchor to.
3. **Worth the jump** — the article is long/scannable enough (~1,000+
   words, several sections) that a deep-link saves real scrolling.

**Skip pills when** the piece is narrative or devotional and read
start-to-finish (most Field Notes, testimony stories); it's short or
single-idea (the whole article is one answer — nowhere meaningful to
jump); or it has no stable question-shaped sections (don't invent
anchors just to have pills). Utility pages (`exclude_from_blog`) never
get them.

**When you do add them:**

- 2–3 per article, never more — the card stays tidy and the design
  assumes at most three.
- Phrase each pill as a short, natural reader question, not the SEO
  heading — "How do I recognize one?" not "How to Identify a Person of
  Peace in the North American Context."
- Lead with the question people most arrive with.
- `anchor` must be a real heading id — the github-slugger form of the
  H2/H3 text (lowercase, punctuation dropped, spaces → hyphens). Confirm
  it resolves (build and open `/slug/#anchor`); a stale anchor lands the
  reader at the top of the page instead of the section.
- If you later rename a heading, update the matching `anchor`.

**Where to spend the effort first:** the articles with real FAQ sections
already have the questions written as H3s (seed those first), then hub
`key_articles` / cluster pillars, then high-intent explainers. Coverage
is meant to grow gradually, not reach 100%.

## Editorial workflow

How an article moves from idea to published:

1. **Roadmap** — the article exists as a ☆ entry in
   CONTENT_CLUSTER_ROADMAP.md with a cluster, pillar relationship,
   and CTA already decided. Don't write pages that aren't on the
   roadmap without adding them there first.
2. **Draft** — read EDITORIAL_VOICE.md first, then author per this
   document; the writing follows EDITORIAL_VOICE.md for voice.
   Frontmatter `status` stays `migrated-draft` (or `migrated` for
   touched legacy pages) while in review.
3. **Review** — Mark approves copy. Field Notes require the
   subject's approval before `approved: true` is ever set (see
   FIELD_NOTE_TEMPLATE.md); testimonial-style claims are never
   invented or paraphrased into existence.
4. **Pre-publish checklist** — the section below passes.
5. **Publish** — flip `status` to `published`, add the article to
   its hub's `key_articles` (pillar first), add at least one inbound
   link from a sibling article, and confirm the CTA matches the
   cluster table in INTERNAL_LINKING_PLAN.md.

## Pre-publish checklist (SEO + linking)

Per page, before `status` moves to `published`:

- [ ] Voice checked against EDITORIAL_VOICE.md — read it before drafting
      or substantially editing, and run its before-publishing list on the
      final draft.
- [ ] `title` ≤ ~60 chars where possible; `display_title` set when
      the SEO title isn't a human headline.
- [ ] `description` unique, ≤ ~155 chars.
- [ ] `canonical` matches the live production URL exactly (protocol,
      domain, trailing slash).
- [ ] `slug` matches its established path exactly (or the change is
      logged in REDIRECTS.md).
- [ ] Open Graph title/description/URL/image render (view source).
- [ ] Single `<h1>` (the hero title); body headings start at `##`
      with no skipped levels.
- [ ] `hub` set; 3–5 `related_articles`; related tools where
      relevant; one clear next step (the CTA).
- [ ] `questions` added only if the article meets the "Question pills"
      test (question intent + 2–3 anchorable sections + worth the jump);
      if added, each `anchor` resolves to a real heading id. Most
      articles should have no `questions` — that's expected.
- [ ] All internal links are plain `<a href>` (true by construction —
      see INTERNAL_LINKING_PLAN.md's crawlability rule).
- [ ] Any referenced media resolves at its preserved path.
- [ ] Image `alt` text written by a human; captions add context, not
      description.

Site-wide invariants (check when config changes, not per page):
`site` in astro.config.mjs matches production; `trailingSlash:
'always'` + `build.format: 'directory'` remain set; sitemap excludes
`/search/` and any noindex placeholders; robots.txt points at the
real sitemap.
