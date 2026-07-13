# Phase 11 — Article Design System Field Test

> **Superseded by Phase 12** (`PHASE_12_ARTICLE_SYSTEM_REFINEMENT.md`
> and `ARTICLE_DESIGN_SYSTEM.md`). Kept for history — the raw-HTML-div
> component approach and card-heavy density described below were
> refined into real `.astro` components, MDX articles, and a much more
> restrained card frequency. Don't build on the approach described in
> this file; use the current docs instead.

Goal: validate a reusable article component system that makes articles
feel like pages inside the homepage's "field manual," on exactly 3
articles, before touching the other ~120. Not a site-wide rollout, not
a copy rewrite — layout, typography, spacing, imagery, and reusable
content blocks only.

This supersedes and overwrites Phase 10C's callout-box experiment
(`PHASE_10C_ARTICLE_FORMATTING_SYSTEM.md`) as the article-design
direction. Phase 10C's `.callout`/`.steps` system is untouched and
still runs on the other ~120 articles (including the other 4 Phase 10C
pilot articles), but it is no longer the direction for new work.

## What was built

- `src/layouts/ArticleLayoutV2.astro` — opt-in layout, used only when
  an article's frontmatter sets `article_system: field-manual-v2`.
  Every other article keeps rendering through the original
  `ArticleLayout.astro`, completely unmodified.
- `src/components/ArticleHero.astro` — category, headline, subhead,
  meta, then a hero image + editorial caption (never text-over-photo).
- `src/components/ArticleEndCTA.astro` — the one closing CTA:
  "Ready to practice this?" / "Join the Next Live Lab" / "Start with
  the Conversation Box."
- `src/styles/field-manual-article.css` — every other component
  (Large Intro Paragraph, Insight Card, Practice Card, Warning Card,
  Scripture Block, Pull Quote, Image + Caption), all `fm-`-prefixed so
  nothing collides with the existing `.callout` system. Content
  authors use them the same way Phase 10C's callouts already worked:
  wrap markdown in `<div class="fm-insight-card">…</div>` directly in
  the `.md` body. Loaded only by `ArticleLayoutV2`, never sitewide.
- `src/content.config.ts` — added optional frontmatter fields
  (`article_system`, `hero_category`, `hero_subheading`, `hero_image`,
  `hero_image_alt`, `hero_image_caption`), all optional so every
  existing article validates unchanged.
- Reading column: 704px (`--fm-content-width: 44rem`), inside the
  requested 680–740px range, with 1.75 line-height — independent of
  the sitewide `--content-max-width` used by every other article.
- One serif typeface (Lora) loaded only on these 3 pages via a new
  `<slot name="head" />` in `BaseLayout.astro`, used only for Scripture
  Block and Pull Quote text.

## The 3 field-test articles

1. **Pillar/educational** — [The Multiplier Mandate: Revealed from
   Genesis to Revelation](src/content/articles/the-multiplier-mandate-revealed-from-genesis-to-revelation.md)
   (~4,200 words). Also the article being reclaimed from Phase 10C —
   all 10 `callout--key-idea` boxes converted 1:1 to Insight Cards.
2. **Narrative/story** — [Unleashing the Movement: How Paul Catalyzed
   a Disciple-Making Movement in Ephesus](src/content/articles/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church.md).
3. **Practical how-to** — [A Step-by-Step Guide to Prayer Walking
   Scriptures](src/content/articles/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives.md).

No article copy was rewritten. Every block conversion reused the
article's own existing sentences; the only text actually removed was
redundant chrome (duplicate "JUMP TO" links now covered by the
Table of Contents, a second closing CTA sentence now redundant with
`ArticleEndCTA`).

**Field Note was intentionally left out of all 3 articles.** It's a
strong, signature component and it's fully designed, but populating it
honestly requires real, approved field stories — the same bar the
homepage already holds itself to (see its own `TODO: real, approved
testimonial` placeholder). Fabricating story-shaped copy to fill the
component would have undermined the "improve trust" goal this whole
redesign is for. Recommendation: source 3–5 real stories from labs/
coaches before adding Field Note anywhere.

## 1. Before/after

Screenshots (desktop + mobile, all 3 articles) are attached separately.

## 2. Components that worked well

- **Article Hero** — category/headline/subhead/meta reading cleanly on
  white before the photo appears reads exactly like the "cover of the
  field manual" brief. No text-over-image, so it never fights
  legibility.
- **Insight Card, Practice Card, Warning Card** — direct, low-risk
  reuse of homepage tokens (white card, soft sage, clay accent). These
  are the safest components to roll out immediately.
- **Pull Quote** — large serif, no box, used once or twice per
  article. Reads as a genuine editorial device, not decoration.
- **Scripture Block** — where the underlying text is real, verbatim
  Scripture (prayer-walking article), this is the strongest new
  component on the page.
- **Image + Caption** — one meaningful image per article beyond the
  hero, each with a specific, honest caption. Kept the "restrained
  styling" goal instead of turning into a stock-photo scroll.
- **End CTA** — one clear action instead of the old CTA band's
  dynamically-loaded lab card. Simpler and impossible to miss.
- Reused as-is, no redesign needed: Breadcrumbs, TableOfContents,
  ShareButtons, RelatedArticles, ToolCTA — all already used homepage
  tokens and didn't compete visually with the new components.

## 3. Components that need adjustment before wider rollout

- **Scripture Block only has an honest fit when the source article
  quotes actual, verbatim Bible text.** The pillar article's ~15
  quotes are a podcast host paraphrasing verses in conversation, not
  Scripture itself — forcing those into Scripture Block styling would
  have mislabeled commentary as the Bible. Left those as plain
  blockquotes. Rule for future authors: Scripture Block is for direct
  quotations only, never paraphrase.
- **Warning Card and Scripture Block don't have a natural fit in every
  article type.** Only the how-to article used both. Don't make either
  a required block in the component checklist — require them only
  where the source content actually has a "common mistake" or a
  verbatim verse to hold.
- **Practice Card scales down awkwardly on think-piece content.** It
  worked great wrapping the how-to article's 7-step list; on the pillar
  article it had to settle for a single closing rhetorical question,
  which reads thinner than the sage-card treatment implies. Consider a
  lighter-weight "close in a card" only when there are 2+ concrete
  action items — otherwise leave it as a Pull Quote instead.
- **Long legacy titles blow out the Hero H1.** The Ephesus article's
  original WordPress title ("Unleashing the Movement: How Paul
  Catalyzed a Disciple-Making Movement in Ephesus – Lessons for
  Today's Church") wraps to 6 lines at the hero's H1 size on desktop.
  Before wider rollout: either add an optional shorter `hero_title`
  override field, or step the hero H1 size down automatically past a
  character-count threshold.

## 4. Spacing/typography adjustments recommended

- Keep the 704px reading column and 1.75 line-height as the new
  standard — it read comfortably at both the pillar article's length
  and the how-to's dense reference sections.
- The Google Font (Lora) is currently loaded per-article via a head
  slot. Fine for a 3-article test; before wider rollout, load it once
  sitewide (or self-host it) instead of repeating the `<link>` tags
  per article.
- No other sitewide type-scale changes needed — everything reuses
  `--fs-h1`/`--fs-h2`/`--fs-h3` and the existing eyebrow system as-is.

## 5. Should anything be removed?

Nothing needs to be cut outright. The one component that shouldn't
ship with fabricated content is Field Note (see above) — it stays in
the system, just unpopulated until real stories exist.

## 6. Reusable article component library — recommendation

Ship this as the standing system for all future articles:

- **Structural (real components):** `ArticleHero.astro`,
  `ArticleEndCTA.astro`, `ArticleLayoutV2.astro`.
- **Content blocks (CSS classes, raw-HTML-in-markdown, same pattern as
  the existing `.callout` system):** `.fm-intro`, `.fm-insight-card`,
  `.fm-practice-card`, `.fm-warning-card`, `.fm-scripture`,
  `.fm-pull-quote`, `.fm-image`, `.fm-field-note` (designed, not yet
  content-populated).
- **Rollout gate:** opt in per article via
  `article_system: field-manual-v2` in frontmatter — migrate articles
  one hub at a time rather than a single flag-day flip, so each batch
  can be spot-checked the way these 3 were.
- **Before the next batch:** fix the hero-title-length issue above,
  decide the Field Note sourcing pipeline, and move the Lora font load
  to `BaseLayout` proper if more than a handful of articles adopt it.
