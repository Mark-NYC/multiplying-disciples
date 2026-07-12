# CTA_GUIDE.md

The end-of-article CTA system. One component
(`src/components/article/ArticleCTA.astro`), one frontmatter block
(`article_cta`), exactly three renderable CTA types. Every article
gets **at most one** CTA — never stacked.

## The three types

### 1. Practice CTA — `type: tool`
For articles where the clearest next step is trying a tool, exercise,
conversation, or obedience step. Renders the stakes headline, bridge
copy, and one primary button to the configured destination.
`destination` is **required** (there is no sitewide default tool).

```yaml
article_cta:
  type: tool
  stakes_headline: "Reading about the tool changes nothing. Drawing it once does."
  bridge_copy: "Grab the slides and walk through them once with a friend this week."
  destination:
    label: "Get the 3 Circles slides"
    href: "/3-circles/"
```

### 2. Lab CTA — `type: lab` (the default)
For articles where the reader would benefit from guided practice in an
upcoming live lab. Renders a dynamic card for the next lab **with an
open seat**, fetched client-side from CoVo's public-labs feed
(`src/lib/labs-feed.js`). Never hardcode a lab title, date, seat
count, or URL. Fallbacks are built in: "current labs are full" state
(confirmed no seats) and a restrained "See the next Live Lab" link
state (feed unreachable). Links out to the lab's landing page — the
full registration form is never embedded in articles.

```yaml
article_cta:
  type: lab
  stakes_headline: "Without practice, this stays another article you agreed with."
  bridge_copy: "A lab turns what you know into something you can do, with other people."
```

### 3. Tribe CTA — `type: community`
For readers already practicing who need ongoing relationships,
accountability, and collaboration (CoVo Multipliers community).
`destination` is **required**; a quiet secondary "See the next Live
Lab" link renders under the primary button.

```yaml
article_cta:
  type: community
  stakes_headline: "Practicing alone is how multipliers burn out."
  destination:
    label: "Join the CoVo Multipliers community"
    href: "https://www.covomultipliers.com/"
```

### Opting out — `type: none`
Renders nothing. Use for pages whose body already is the CTA.

## Fallback logic (no `article_cta` block at all)

- Editorial article → **Lab CTA** with default copy
  ("Ready to practice this?").
- Utility page (`exclude_from_blog: true`) → **none**.

This is implemented in `ArticleLayout.astro`; `ArticleCTA` itself
defaults undefined input to the Lab CTA.

## Destination rules

- `lab` links are always feed-driven and land on the lab's own landing
  page with UTM tagging (`utm_content` =
  `<page-slug>__training__article-cta`, tagged automatically).
- `tool` destinations should be on-site tool pages where possible.
- `community` destinations use the constants in `src/data/site.ts`
  (`COVO_COMMUNITY_URL`) — update the constant, not each article, when
  the community URL changes.
- Outbound CoVo links carry `data-ecosystem-cta` attributes for
  tracking — the component adds them; don't strip them.

## Copy principles

- `stakes_headline` names what it costs the reader to stop at reading
  — specific and honest, never hype ("Without a rhythm of practice,
  groups become Bible studies that never multiply").
- `bridge_copy` is one or two sentences connecting this article's
  content to the next step. Optional.
- No urgency theater, no invented scarcity, no exclamation marks.
  Seat counts shown in lab cards are live data, never fabricated.
- Each type has one fixed lead image, mapped in ArticleCTA — real
  photos, standardized sitewide, not configurable per article.

## How to assign a CTA to an article

1. Ask what the reader should actually do next: try something → `tool`;
   practice with guidance → `lab`; find ongoing people → `community`.
2. Add the `article_cta` block to the article's frontmatter (examples
   above).
3. Write the stakes headline from the article's own argument.
4. Leave the block off entirely if the default Lab CTA fits.
