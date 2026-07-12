# ARTICLE_SYSTEM.md

How every article on the site is structured and authored. There is one
article layout — `src/layouts/ArticleLayout.astro` (the "field manual"
system) — used by all articles, `.md` and `.mdx` alike. The old
two-system split (legacy `ArticleLayout` vs opt-in `ArticleLayoutV2`)
was retired in the 2026-07 consistency pass; the `article_system`
frontmatter flag no longer exists.

Historical design rationale lives in ARTICLE_DESIGN_SYSTEM.md; this
file is the current authoring reference.

## Article structure (top to bottom)

1. **Breadcrumb** — `Home / <Hub>` only. Never the article's own title.
2. **Article hero** (`ArticleHero`) — optional rare eyebrow; one
   left-aligned human headline (`display_title`, falling back to
   `title`); optional one-sentence subheading; quiet mono meta line
   (date · updated · reading time); optional hero image with caption.
   Calm and person-first: no tag stacks, no category pills, no SEO
   clutter.
3. **Share row** — small icon links (skipped on utility pages).
4. **Table of contents** — automatic for 3+ H2s; opt out per-article
   with `hide_toc: true`.
5. **Body** — 44rem reading column; markdown/MDX. Body headings start
   at `##`.
6. **Hub link, Related Articles (max 3), Tools for this** — quiet
   closing boxes, only when configured in frontmatter.
7. **One ArticleCTA** — see CTA_GUIDE.md. Never more than one.

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
| `og_image` | social-card image; also the thumbnail on /blog/ and hub lists |
| `date` / `updated` | drive the meta line and list sorting |
| `hub` | hub filename slug, e.g. `testimony` — drives breadcrumb + hub link |
| `related_articles` | slug paths; first 3 render in the Related box |
| `related_tools` | tool titles for the "Tools for this" box |
| `hide_toc` | suppress the automatic contents box |
| `article_cta` | end-of-article CTA config — see CTA_GUIDE.md |
| `exclude_from_blog` | marks a utility page (see below) |

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
| `ArticleIntro` | the one visibly-larger opening paragraph | exactly 1, immediately after the hero |
| `ArticleImage` | a supporting image + relevance caption (`wide` for a desktop breakout) | captions explain relevance, never invent specifics |
| `InsightCard` | key idea, definition, framework, summary (required `label`; optional `accent`/`icon` for parallel named categories) | 0–2 per normal article, ~1 per 600–900 words max |
| `PracticeCard` | one concrete action for the reader | 0–1 per article |
| `WarningCard` | a real misconception or mistake | 0–1, sparing |
| `ScriptureBlock` | verbatim Scripture only, with `reference` | paraphrase stays a plain blockquote |
| `PullQuote` | one memorable sentence from the article's own text | 1 (2 in a very long article) |
| `FieldNote` | a real, approved field story by id | see "Field Notes" below |
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
