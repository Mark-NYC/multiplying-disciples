# Article Design System

The homepage is the cover of the field manual. Articles are pages
inside it — calmer than the homepage, built to teach, clarify,
challenge, and help someone act, not to persuade or convert. This
document is the reference for the component system that carries the
homepage's visual language into articles.

Applies only to articles with `article_system: field-manual-v2` in
frontmatter (currently 3 field-test articles). Every other article
keeps rendering through the original, unmodified `ArticleLayout`.

## Core principle

**Reading comes first.** Every visual interruption must have a
purpose. Reach for whitespace before reaching for another component.
Most paragraphs should just stay paragraphs — do not box ordinary
text, and do not force visual variety into every section. A rough
target: one visual break every 600-900 words. A normal-length article
should use no more than 3-4 special blocks total; a long article can
use more, but spaced far apart.

## How an article is built

A field-manual-v2 article is a `.mdx` file (not `.md`) so it can use
real components instead of raw HTML. `ArticleLayoutV2` always renders
the shell — breadcrumbs, `ArticleHero`, table of contents (if 2+ H2s),
related articles (max 3), and `ArticleCTA`. The `.mdx` body imports and
places whichever content components actually fit that article:

```mdx
---
title: "..."
article_system: "field-manual-v2"
hero_category: "Prayer"
hero_subheading: "..."
hero_image: "/path/to/image.jpg"
hero_image_alt: "..."
hero_image_caption: "..."
---

import ArticleIntro from '../../components/article/ArticleIntro.astro';
import InsightCard from '../../components/article/InsightCard.astro';

<ArticleIntro>Opening paragraph...</ArticleIntro>

Normal markdown body content, headings, lists, blockquotes...

<InsightCard label="The Core Idea">
- A bullet point
- Another one
</InsightCard>
```

## Components

All components live in `src/components/article/`.

### ArticleHero

**Purpose:** category, left-aligned title, restrained subheading, quiet
metadata, then a wide image with a specific caption. Never centered,
never text-over-photo.

**Rendered automatically** by `ArticleLayoutV2` from frontmatter — not
placed by hand in the `.mdx` body.

**Props:** `category`, `title`, `subheading?`, `date?`, `updatedDate?`,
`readingTime?`, `image?`, `imageAlt?`, `imageCaption?`. Nothing is
required beyond category/title — a subheading-less or image-less
article still renders a complete hero.

**Title size is fixed, not length-based:** every article's `<h1>`
renders at the same size (`clamp(2.25rem, 1.9rem + 1.6vw, 3rem)`
desktop, `1.875rem` mobile) regardless of title length — a 30-character
title and a 100-character migrated WordPress title read at the same
scale. This was a deliberate standardization (2026-07-11): the
component previously stepped the font down past 50 and 70 characters,
which meant short titles rendered larger than long ones and articles
looked inconsistent side by side. A long title still wraps as
confident lines instead of a wall of text via the fixed `max-width:
34ch` measure, not a smaller font.

**Mobile:** headline drops its max-width cap (lets the browser wrap
naturally) but stays the same fixed size as desktop's mobile
breakpoint — no per-title variation at any viewport.

### ArticleIntro

**Purpose:** the visibly larger opening paragraph (Wes McDowell
technique). ~24px desktop / ~20px mobile, medium weight (never fully
bold), never boxed.

**When to use:** exactly once, immediately after the hero. Return to
standard typography right after — don't extend the treatment to a
second paragraph.

```mdx
<ArticleIntro>Opening paragraph text.</ArticleIntro>
```

### InsightCard

**Purpose:** clarify a key idea, framework, definition, summary, or
theological distinction. White card, subtle border, restrained shadow,
small green eyebrow.

**When to use:** 0-2 per normal article; a long article may use more,
spaced far apart. Not every list or blockquote should become one —
most should just stay a plain paragraph or list.

**When not to use:** don't convert something just because it's a
list. If the surrounding prose already makes the point clearly, leave
it alone.

**Max frequency:** roughly one per 600-900 words in a long article.

**Props:** `label` (required — one of "The Core Idea", "Key
Distinction", "What This Means", "Movement Principle", "Summary", or
whatever actually describes that card; never default to the word
"Insight" on every card).

```mdx
<InsightCard label="Key Distinction">
- Point one
- Point two
</InsightCard>
```

**Mobile:** full width, padding unchanged (already modest).

### PracticeCard

**Purpose:** one concrete action for the reader. Soft sage background,
dark green text, no heavy shadow. Must read as complete on its own —
never depend on a Field Note to make sense.

**When to use:** 0-1 per article, only when there's a real, concrete
action (2+ steps or one unmistakable next step).

**Props:** `label?` (defaults to "Practice This Week").

```mdx
<PracticeCard label="Try This This Week">
1. Step one
2. Step two
</PracticeCard>
```

### WarningCard

**Purpose:** a common mistake, false assumption, or correction. White
background, clay left border. No alarm icon, no alarm-style language.

**When to use:** sparingly — 0-1 per article, only where the source
content already names a real misconception.

**Props:** `label?` (defaults to "Common Mistake").

```mdx
<WarningCard label="Common Mistake">
- Don't do X
- Don't do Y
</WarningCard>
```

### ScriptureBlock

**Purpose:** make a direct Bible quotation readable and distinct. Soft
sage wash, subtle left rule, larger serif text (not italic, so long
passages stay readable), reference underneath.

**When to use:** only for verbatim Scripture. Never for someone
paraphrasing or commenting on a verse — that stays a plain blockquote
or becomes a PullQuote. No numeric cap; use "where useful." An article
whose whole purpose is presenting Scripture (like a prayer-walking
guide) can reasonably use several.

**Props:** `reference` (required, e.g. `"Matthew 5:14-16"`).

```mdx
<ScriptureBlock reference="Matthew 5:14-16">
"You are the light of the world..."
</ScriptureBlock>
```

### PullQuote

**Purpose:** a visual pause around one memorable sentence already in
the article's own text. No box, large serif type, one accent color, no
decorative quotation marks.

**When to use:** 1 per normal article; a very long article may use 2.
Never add one just because an article doesn't have a Field Note.

```mdx
<PullQuote>He met them where they were at.</PullQuote>
```

### ArticleImage

**Purpose:** a single image that supports the argument. Consistent
radius, no shadow (it's a content image, not a card), caption directly
underneath that explains relevance.

**Captions:** must be truthful. If the real context of an existing
image isn't known, write a general-but-true caption, or omit the
caption — never invent a location, headcount, or outcome.

**Props:** `src`, `alt` (required), `caption?`, `wide?` (an
intentional, slightly wider breakout on desktop only — use rarely).

```mdx
<ArticleImage
  src="/path/to/image.jpg"
  alt="A small group opens Scripture together"
  caption="A small group opens Scripture together — the same pattern this article traces."
/>
```

### FieldNote

**Purpose:** the signature proof component — a real, approved
real-world story. See **"Adding a Field Note"** below for the full
authoring flow. The short version: it's backed by its own content
collection (`src/content/field-notes/`), referenced by id, and renders
**nothing at all** — no placeholder, no "story coming soon" — unless a
note with that id exists and has `approved: true`.

**When to use:** 0-1 per article, more likely on story-driven pieces.
Never fabricate one. It's fine, expected even, for an article to ship
with zero Field Notes.

```mdx
<FieldNote id="queens-conversation-box-01" />
```

### ArticleCTA

**Purpose:** the one closing next step. Homepage dark-band language:
heading, one primary button, one quiet secondary link.

**Rendered automatically** by `ArticleLayoutV2` — configure it via
frontmatter, don't place it by hand in the body.

**Props:** `heading?`, `body?`, `primaryLabel?`, `primaryUrl?`,
`secondaryLabel?`, `secondaryUrl?`, `variant?` ('default' |
'tool-first'). Defaults to "Ready to practice this?" / "Join the Next
Live Lab" / "Start with the Conversation Box". Set
`cta_variant: "tool-first"` in frontmatter for a strongly tool-focused
article to swap priority (tool becomes primary, lab becomes
secondary).

### RelatedArticles

Thin wrapper around the sitewide `RelatedArticles` component: caps at
3 links, fixed "Related Articles" eyebrow. Quiet by design — border
only, no shadow, never competes with `ArticleCTA`. Rendered
automatically from `related_articles` frontmatter; nothing to place by
hand.

## Color system

Use only the established tokens (`src/styles/global.css`): Primary
Green, Growth Green, Harvest Gold, Clay, Warm Paper, Deep Ink, Soft
Sage. No new accent colors. A category color may appear in an eyebrow,
a small rule, or a card border — never recolor a whole template by
category.

## Shadows

One shadow token (`--fm-shadow`, in `field-manual-article.css`), reused
everywhere a card lifts off the page. Softer and lighter than a SaaS
dashboard card. Never stack shadows or nest a card inside a card.

## Mobile behavior

- No side-by-side layouts anywhere in this system.
- Cards go full width; padding is already modest, so it isn't reduced
  further on mobile (nothing to trim without feeling cramped).
- Page padding stays at the sitewide 1.25rem (20px).
- Hero headline drops its max-width cap but keeps its long-title size
  steps.
- Scripture Block font size steps down slightly (1.25rem → 1.1rem) so
  a long passage doesn't overflow.
- Buttons stay full comfortable tap size; the Warning/Practice/Insight
  card padding is unchanged from desktop (already right-sized).

## How to add a Field Note later

1. Copy `FIELD_NOTE_TEMPLATE.md` and fill it in.
2. Save it as `src/content/field-notes/<your-id>.md` — the filename
   (minus `.md`) is the id you'll reference.
3. Set `approved: true` only once the story is actually cleared for
   public use. Leave it `false` while drafting; it will not render
   anywhere while `false`.
4. In the article's `.mdx` body, import and place it where it fits:
   ```mdx
   import FieldNote from '../../components/article/FieldNote.astro';

   <FieldNote id="your-id" />
   ```
5. If the id doesn't exist yet, or `approved` isn't `true`, the
   component renders nothing — the surrounding layout collapses
   naturally, no build error, no visible gap.

## How to add an image and caption

Use `ArticleImage` (inside the body) for a supporting image, or the
`hero_image*` frontmatter fields for the hero. Every caption must be
true to what's actually shown — a specific-but-honest general
description ("A small group opens Scripture together") beats either a
generic label ("Bible study") or an invented specific claim ("...in
Jackson Heights after three weeks of outreach") you can't verify.

## How to choose the final CTA

Default (`cta_variant` unset or `"default"`): "Ready to practice
this?" → primary **Join the Next Live Lab**, secondary **Start with
the Conversation Box**. Use this for most articles.

`cta_variant: "tool-first"`: swaps priority — primary becomes **Use
the Conversation Box**, secondary becomes **Join the Next Live Lab**.
Use only for an article that centers on one specific, named tool
(e.g. a Conversation Box how-to) where sending the reader straight to
that tool is the more honest next step than a lab invite.

Override any individual piece (`cta_heading`, `cta_body`,
`cta_primary_label`, `cta_primary_url`, `cta_secondary_label`,
`cta_secondary_url`) in frontmatter if an article genuinely needs
different copy — but never add a second CTA anywhere else on the page.

## How to migrate an old article

1. Rename `.md` → `.mdx` (`git mv`, so history is preserved).
2. Add `article_system: "field-manual-v2"` plus the `hero_*`
   frontmatter fields.
3. Add `import` lines for whichever components the article actually
   needs, at the top of the body (after frontmatter).
4. Wrap the opening paragraph in `<ArticleIntro>`.
5. Look for headings: promote true major sections to H2 if the
   article was written flat (all H3s) — the Table of Contents only
   picks up H2s, and needs 2+ to render at all.
6. Convert at most a small number of existing lists/quotes into
   InsightCard/PracticeCard/WarningCard/PullQuote — pick the
   strongest few, not everything. Leave the rest as plain lists.
7. Improve captions on existing images if you can do so truthfully;
   otherwise leave them as-is.
8. Do not add a Field Note unless a real, approved one already exists.
9. Run `npx astro check` and `npx astro build`, then visually check
   desktop and mobile before shipping.

## What this system deliberately does not do

- It doesn't require a Field Note, a Pull Quote, or any specific card
  to "feel complete" — an article with only its hero, intro, body
  text, related articles, and CTA is a fully finished page.
- It doesn't add new colors, new shadows, or new animation.
- It doesn't touch any article that hasn't opted in via
  `article_system: "field-manual-v2"`.
