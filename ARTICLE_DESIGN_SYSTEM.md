# Article Design System

The homepage is the cover of the field manual. Articles are pages
inside it — calmer than the homepage, built to teach, clarify,
challenge, and help someone act, not to persuade or convert. This
document is the reference for the component system that carries the
homepage's visual language into articles.

Applies only to articles with `article_system: field-manual-v2` in
frontmatter (currently 6 field-test articles). Every other article
keeps rendering through the original, unmodified `ArticleLayout`.

**Exception: the end-of-article CTA system (below) is sitewide.**
`article_cta` frontmatter works on every article regardless of
`article_system` — a legacy `ArticleLayout` article that sets
`article_cta` gets the same canonical `ArticleCTA` component as a
field-manual-v2 article. See "End-of-article CTA system" for the full
reference; everything else in this document is field-manual-v2-only.

## Core principle

**Reading comes first.** Every visual interruption must have a
purpose. Reach for whitespace before reaching for another component.
Most paragraphs should just stay paragraphs — do not box ordinary
text, and do not force visual variety into every section. A rough
target: one visual break every 600-900 words. A normal-length article
should use no more than 3-4 special blocks total; a long article can
use more, but spaced far apart.

## Body copy style

**Bold the phrases a skimming reader's eye should catch.** In every
article body (new or converted), bold the handful of words or short
phrases per section that carry the actual point — a key term being
defined, the specific consequence, the name of a framework or tool, the
one clause that matters if someone reads nothing else. This is a
regular, ongoing practice for all articles going forward, not a one-off
pass.

Guidelines:

- Bold *phrases*, not full sentences — 2-6 words at a time. A bolded
  sentence reads as shouting, not emphasis.
- Roughly 1-3 bolded phrases per section is tasteful; bolding every
  other line defeats the purpose by making nothing stand out.
- Bold the term or the stakes, not filler words around it. "**Labs turn
  knowledge into skill**" beats "*Labs* turn knowledge into *skill*."
- Don't bold something already inside a component (`InsightCard`,
  `PracticeCard`, `WarningCard`, `PullQuote`, `ScriptureBlock`, stakes
  headlines) — those already have their own visual weight; bold is for
  plain paragraph text.
- If nothing in a section is genuinely worth a reader's eye catching on
  a skim, leave it unbolded — this is not a per-paragraph quota.

## How an article is built

A field-manual-v2 article is a `.mdx` file (not `.md`) so it can use
real components instead of raw HTML — unless it needs no components at
all, in which case it can stay `.md` (see below). `ArticleLayoutV2`
always renders the shell — breadcrumbs, `ArticleHero`, table of
contents (if 2+ H2s), related articles (max 3), and `ArticleCTA`. The
`.mdx` body imports and places whichever content components actually
fit that article:

**`hide_toc: true`** opts a single article out of the automatic "In
This Article" table of contents (off by default everywhere — the TOC
still shows for every other field-manual-v2 article with 2+ H2s). Use
this only when the article's own search intent is better served by
getting straight to the content than by a contents box first — e.g.
`discover-the-12-disciples-of-jesus-christ`, where readers come for an
order/list infographic that a TOC would otherwise push below the fold.

**`article_system: field-manual-v2` doesn't require any content
components.** If an article's hero/CTA chrome is all you're changing —
e.g. the site's single highest-traffic page, where the safest move is
to touch nothing else — it's fine to set `article_system` and leave
the file as plain `.md` with zero body changes. Only convert to `.mdx`
when you actually need a component in the body.

```mdx
---
title: "A Step-by-Step Guide to Prayer Walking Scriptures and Changing Lives"
display_title: "How to Pray Walk Your Neighborhood"
article_system: "field-manual-v2"
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

## Article hero standard

**The core problem this section fixes:** the hero used to stack a
breadcrumb, an eyebrow, an H1, a subheading, metadata, and a featured
image — and several of those routinely repeated the same one or two
words (the hub name showing up in both the breadcrumb *and* the
eyebrow; the full SEO title showing up in the breadcrumb *and* the H1).
Read top to bottom, it felt like it was written for a crawler, not a
person. The hero must now read as exactly five things, in this order,
with nothing repeated between them:

1. A short breadcrumb
2. One human-readable H1
3. One supporting sentence
4. Compact metadata
5. The featured visual

### 1. Breadcrumb

`Home / [Hub]` — maximum three levels, and the article's own title
never appears in it (the H1 right below already says that). The final
breadcrumb segment is always the article's hub/category/resource
collection, not the page you're currently on. `ArticleLayoutV2` builds
this automatically from `hub` frontmatter; there is nothing to set by
hand. An article with no `hub` gets a bare `Home` breadcrumb — that's
fine, don't invent a fake middle level to fill space.

Never show a breadcrumb hub segment and a matching eyebrow saying the
same thing (see below) — pick one place to say "this article belongs
to Prayer," not two.

### 2. Eyebrow — off by default

`hero_eyebrow` is unset on every article unless there's a genuinely new
piece of context to add that the breadcrumb and H1 don't already
carry — e.g. **Field Guide**, **Case Study**, **Tool**, **Biblical
Framework**. It must never restate the hub/category (that's the
breadcrumb's job), a keyword, or the title. When in doubt, leave it
unset — a missing eyebrow is the correct default, not an oversight.

### 3. H1 — `display_title`, separate from the SEO `title`

`title` remains the full SEO/keyword title — it drives `<title>`, Open
Graph tags, Twitter cards, and structured data via `SEO.astro`, and a
reader never sees it directly. `display_title` is what actually renders
as the page's `<h1>`: a short, plain sentence written for a person
skimming the page, not a phrase engineered to catch every search
variant.

```yaml
title: "7 Stories of Hope in the Bible: A Discovery Process to Help Seekers Find Jesus"
display_title: "7 Stories of Hope to Read With a Seeker"
description: "A simple seven-week Bible discovery process that helps a spiritually curious friend encounter Jesus and respond in faith."
```

If `display_title` is omitted, the H1 falls back to `title` — this is
why legacy/unconverted articles need no changes at all. Only set
`display_title` when the SEO title would actually be a poor headline;
a title that's already short and conversational (e.g. "Three Thirds
Bible Study Process") doesn't need one.

**Sizing:** every field-manual-v2 article's H1 renders at the same
fixed size regardless of length (`clamp(2.1rem, 1.8rem + 1.4vw, 2.75rem)`
desktop, `1.6rem` mobile) — reduced 2026-07-12 alongside the
`display_title` standard, since headlines are now consistently short
and the previous size (tuned for a mix of short titles and full SEO
titles) read as oversized on mobile once paired with a short, human
sentence. A long title still wraps as confident lines via the fixed
`max-width: 34ch` measure, not a smaller font.

### 4. Supporting sentence

`hero_subheading` — exactly one sentence, distinct from both the H1
and the meta `description`. It should add a reason to keep reading,
not restate what the H1 or description already said in different
words. If a draft subheading is just the description reworded, cut it
or rewrite it to say something the H1/description haven't covered yet
(a stake, a specific promise, a scope boundary).

### 5. Compact metadata

Publish date, updated date, reading time — rendered automatically,
joined with `·`. Nothing to author by hand; this line is already as
compact as the standard requires.

### Featured visual

`hero_image` / `hero_image_alt` / `hero_image_caption`. The caption
should add information (what the image shows, why it's here) rather
than just repeating the title or subheading back.

## Components

All components live in `src/components/article/`.

### ArticleHero

**Purpose:** optional rare eyebrow, left-aligned human title,
restrained subheading, quiet metadata, then a wide image with a
specific caption. Never centered, never text-over-photo. See "Article
hero standard" above for the full authoring rules — this entry is just
the component reference.

**Rendered automatically** by `ArticleLayoutV2` from frontmatter — not
placed by hand in the `.mdx` body. `ArticleLayoutV2` passes
`eyebrow={data.hero_eyebrow}` (undefined by default — no fallback to
hub/category) and `title={data.display_title ?? data.title}`.

**Props:** `eyebrow?`, `title`, `subheading?`, `date?`, `updatedDate?`,
`readingTime?`, `image?`, `imageAlt?`, `imageCaption?`. Nothing is
required beyond title — an eyebrow-less, subheading-less, or
image-less article still renders a complete hero (eyebrow-less is now
the norm, not the exception).

**Title size is fixed, not length-based:** every article's `<h1>`
renders at the same size (`clamp(2.1rem, 1.8rem + 1.4vw, 2.75rem)`
desktop, `1.6rem` mobile) regardless of length — a short display title
and a longer legacy fallback title read at the same scale. A long
title still wraps as confident lines instead of a wall of text via the
fixed `max-width: 34ch` measure, not a smaller font.

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

**Optional `accent` and `icon` props** — off by default, so every
existing plain card is unaffected. Reach for these only when an
article has a genuine set of parallel, named categories worth telling
apart at a glance (one card per role/type in a framework) — not as
routine decoration on ordinary cards.

- `accent`: `'primary' | 'accent' | 'gold' | 'clay' | 'ink'` — adds a
  colored top edge and tints the label + icon badge with that token.
  These are the only 5 values; they map to existing brand colors
  (Primary Green, Growth Green, Harvest Gold, Burnt Clay, Deep Ink) —
  never invent a 6th color.
- `icon` / `iconAlt`: a small real image (a line icon, not a photo)
  rendered as a circular badge next to the label, inside the card —
  not floated above it as a separate `ArticleImage`.

```mdx
<InsightCard label="The Apostle" accent="clay" icon="/path/icon.png" iconAlt="Line icon of a running figure">
- Point one
- Point two
</InsightCard>
```

See `unlocking-the-power-of-apest-the-ultimate-guide.mdx` for the
reference implementation: 5 roles, 5 accents, one icon per card, plus
a hand-built `.fm-role-nav` pill strip (icon + color-coded link to
each role's real heading anchor) and a matching small `.fm-role-eyebrow`
pill above each role's deep-dive heading — both defined in
`field-manual-article.css`, written as plain HTML in the `.mdx` body
rather than as new components, since a fixed set of named roles is
specific to that one article, not a reusable pattern.

**Mobile:** full width, padding unchanged (already modest). The pill
nav wraps to multiple rows at narrow widths.

### RoleFact

**Purpose:** a small, tinted, low-key highlight box for one fact in a
*repeating* Q&A pattern across a named-role set (e.g. one gift's "NT
example," "immature expression," etc. in an APEST-style guide) —
lighter than `InsightCard` on purpose (no shadow, no white background),
so a long reference section doesn't repeat a heavy card many times
over. Whatever heading/paragraph markup is passed as children stays
real (an H4 stays a real `<h4>`, preserving heading structure/SEO) —
this only adds a tinted, padded container plus compact styling.

**When to use:** only for a genuinely repeating fact pattern across
3+ parallel named items in one article (e.g. 4 facts × 5 roles). Not a
general-purpose callout — use `InsightCard` for that.

**Props:** `accent` (required — same 5 values as `InsightCard`'s
`accent`: `'primary' | 'accent' | 'gold' | 'clay' | 'ink'`).

```mdx
<div class="fm-role-facts">
<RoleFact accent="clay">
#### Who is a New Testament example of an apostle?
Paul...
</RoleFact>
<RoleFact accent="clay">
#### What do immature expressions of the apostle look like?
...
</RoleFact>
</div>
```

`.fm-role-facts` (in `field-manual-article.css`) lays its `RoleFact`
children out as a 2-column grid with generous gaps on desktop,
collapsing to 1 column under 640px — this is what gives a long,
repeating reference section real breathing room instead of another
stack of headings running straight into each other.

**Mobile:** single column, full width.

### DiscipleCard

**Purpose:** wraps one full biography/profile section (its real H2 and
every subsection beneath it, text unchanged) in a bordered card with a
small portrait + position badge above the heading — used on
`discover-the-12-disciples-of-jesus-christ` so each of the 12 disciples'
long bios reads as one distinct "exploration card" instead of 12
identical walls of text back to back. The H2 inside `<slot />` keeps
its original text and id, so nothing about anchors/jump-nav/SEO
changes — this is a visual container only.

**Props:** `order` (number, e.g. calling order 1-12), `total` (number,
e.g. 12), `image`, `imageAlt`, `accent` (a real hex color, not one of
the 5 brand tokens — this card's accent is meant to match the specific
duotone already baked into that person's portrait image, and a set of
12+ people needs more distinct colors than the 5-token palette
provides).

```mdx
<DiscipleCard order={3} total={12} image="/path/portrait.jpg" imageAlt="..." accent="#a9842c">
## Simon Peter: The Rock of the Early Church
...rest of that disciple's original section, unchanged...
</DiscipleCard>
```

This is a one-article pattern (like RoleFact/role-nav above), not a
general-purpose component — reach for it only when an article profiles
a set of individually-named people/things with their own real photos,
each of which should feel like its own card rather than a section in a
long list.

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

**Purpose:** the one closing next step. Rendered automatically by both
`ArticleLayoutV2` (always) and `ArticleLayout` (only when `article_cta`
is set) — configure it via the `article_cta` frontmatter block, don't
place it by hand in the body. See **"End-of-article CTA system"** below
for the full reference: supported types, frontmatter schema, dynamic
lab behavior, fallbacks, and the author checklist.

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

## End-of-article CTA system

### 1. Purpose

Every article should move the reader from information to practice.
The CTA is not an advertisement. It is the natural next step in the
disciple-making journey — the page's own last paragraph, not a footer
banner that happens to sit at the bottom. It begins by naming the real
cost of stopping at "read the article" (the pain, frustration, stalled
outcome, or missed obedience that continues if the reader only
consumes and doesn't act), then invites the one concrete next step.

### 2. Supported CTA types

Exactly four. `lab` is the default once an `article_cta` block exists
without an explicit `type` — it's the right next step for most
practical articles, so it's the one you get for free.

- **`lab`** — dynamic next-available Live Multiplying Lab card. Use for
  practical disciple-making tools, gospel-sharing articles,
  disciple-making frameworks, simple church practices, and field
  stories. The most common type on this site.
- **`tool`** — one configured destination, no lab card. Use when the
  reader needs a concrete first step before a lab makes sense:
  theology articles, inspirational articles, Bible-reference articles.
- **`community`** — one configured community destination, optional
  secondary lab link. Use for leadership, coaching, long-term
  practice, multiplication, CFC, simple church stewardship, and
  community-of-practice articles.
- **`none`** — renders nothing. Use only when an article genuinely has
  no natural next step.

### 3. Frontmatter schema

```yaml
article_cta:
  type: lab
  stakes_headline: "Without accountability, good intentions keep turning into another week of inaction."
  bridge_copy: "You do not need another article. You need a place to practice, set a clear next step, and come back with the story."
```

```yaml
article_cta:
  type: tool
  stakes_headline: "Nothing changes until you start a real spiritual conversation."
  bridge_copy: "Use the Conversation Box to identify one person and take one simple step this week."
  destination:
    label: "Start with the Conversation Box"
    href: "/conversation-box/"
```

```yaml
article_cta:
  type: community
  stakes_headline: "Trying to multiply alone will eventually leave you isolated and stuck."
  bridge_copy: "Practice alongside people who are taking real steps and bringing back honest stories from the field."
  destination:
    label: "Join the Community"
    href: "https://www.covomultipliers.com/"
```

```yaml
article_cta:
  type: none
```

**Required:** nothing, strictly — even an empty `article_cta: {}`
block is valid and renders a generic `type: lab` CTA. In practice,
always write `stakes_headline` and `bridge_copy` (see rules below);
`type: tool` and `type: community` also require `destination` (there
is no sitewide default tool/community URL to fall back to — the
component simply won't render a button without one).

**Optional:** `type` (defaults to `lab`), `stakes_headline`,
`bridge_copy`, `destination`.

**Default behavior:** an article with no `article_cta` key at all gets
no new-system CTA — see "Fallback behavior" below for exactly what
each layout does instead.

**Never hard-code:** a lab title, date, time, seat count, capacity, or
URL. That data only ever comes from CoVo's live public-labs feed (see
"Dynamic lab behavior"). If you find yourself typing a specific lab
name or date into an article, stop — that's the bug this system was
built to fix.

### 4. Stakes-headline rules

The stakes headline must:

- be specific to the article
- describe a real consequence of inaction
- connect directly to the article's main problem
- sound human
- avoid fake urgency, manipulation, fearmongering, or clickbait
- stay under ~18 words when practical
- make the transition into the next step feel natural

**Good** (spanning different article categories):

- Without accountability, good intentions keep turning into another week of inaction.
- Knowing the gospel tool will not help if you never draw it with someone.
- Your story cannot open a spiritual conversation while it stays inside your head.
- Without a rhythm of practice and accountability, groups slowly become Bible studies that never multiply.
- If you keep carrying everything yourself, the people around you will never become leaders.
- Trying to multiply alone will eventually leave you isolated and stuck.

**Bad:**

- Do not miss this life-changing opportunity before it is too late.
- Your future depends on clicking here now.
- This one secret will change everything.

**Bridge copy for `type: lab` must not promise this article's specific
content, tool, or outcome will be practiced or achieved in the lab the
reader joins.** Labs vary in what they actually cover session to
session — we run labs, not guarantee that any given one rehearses this
exact tool, story, or framework, and we never promise a specific
result. The bridge copy has exactly two jobs, every time:

1. Communicate that knowledge without practice does not lead to change.
2. Communicate that labs turn knowledge into skill through shared practice.

Nothing else belongs in it — no naming this article's tool, no "you'll
say/draw/walk/lead ___," no specific outcome. Just the two points
above, in the article's own voice so eight lab CTAs in a row don't
read as the same sentence with nouns swapped.

- Bad: "A lab is where you practice drawing it with real feedback,
  before the conversation that actually matters." (promises this
  session covers 3 Circles specifically)
- Bad: "A lab won't script your testimony for you, but it's where you
  say it out loud for the first time." (still names this article's
  specific activity — "say it out loud" — as something the lab
  delivers)
- Good: "Knowing a tool exists doesn't mean you can use it. That only
  comes from practice — which is exactly what a lab is for." (states
  the knowledge/skill gap and labs' role in closing it, nothing
  article-specific)
- Good: "Information alone doesn't change anyone. A lab turns what you
  know into something you can actually do, through practice with other
  people."

### 5. Dynamic lab behavior

Article authors never manually specify a lab title, date, time, seats
remaining, capacity, button URL, or description — `type: lab` always
resolves live, at request time, from CoVo's public `public-labs` feed
(`src/lib/labs-feed.js`, the same source the CoVo Multipliers homepage
uses). The component:

- excludes past labs
- excludes labs with zero seats remaining
- excludes labs marked full, closed, cancelled, or unavailable
- sorts all eligible labs chronologically and selects the earliest one
  with at least one open seat (`selectNextAvailableLab()` in
  `labs-feed.js` — a pure, unit-testable function; it does **not**
  just take the soonest lab off the feed, since the feed itself
  doesn't filter by availability)
- links to that lab's real landing page (`lab.url`, tagged with the
  standard `utm_source=multiplyingdisciples` / `utm_medium=site_cta` /
  `utm_campaign=labs` params, plus a page-specific `utm_content`)
- updates automatically the moment CoVo's shared lab data changes —
  nothing here needs a Markdown edit or a redeploy when a lab fills up
  or a new one is published

### 6. Fallback behavior

| Situation | Behavior |
|---|---|
| Nearest chronological lab is full | Skipped — the next lab with an open seat is shown instead. Never displays a full lab. |
| Every upcoming lab is full (or none upcoming) | "The current labs are full." / "New Live Multiplying Labs are added regularly. View the full schedule or join the community to hear when the next lab opens." Primary: **View All Labs**. Secondary: **Join the Community**. No empty card, no broken state, no fake availability. |
| The public-labs request itself fails | Restrained fallback: "See the next Live Lab." Primary: **View All Labs**. No stale/hard-coded data, no fabricated seat count. Error is logged to the console for debugging. |
| Article has no `article_cta` at all | `ArticleLayoutV2` articles: defaults to `type: lab` (every field-manual-v2 article already showed *some* CTA before this system existed — this preserves that, it isn't "silently adding" a new one). `ArticleLayout` (legacy) articles: the existing built-in cta-band renders exactly as before — nothing new is added. |
| `type: none` | Renders nothing at all. |

### 7. Design rules

- One eyebrow (`TAKE THE NEXT STEP`), one stakes headline, one short
  paragraph, one primary action, one optional secondary link, plus the
  lab card when `type: lab`. Never more than one primary button or one
  secondary link.
- Container: warm-paper/white (`--color-surface`), restrained border +
  shadow (`--fm-shadow`), generous padding — not a dark band. The
  headline and copy carry the weight, not the container.
- Headline: `--fs-h3` size, Primary Green, centered, one line of
  breathing room above the body copy.
- Eyebrow: small, uppercase, gold-text — same treatment as
  `ArticleHero`'s (rare, opt-in) eyebrow, for visual continuity.
- Button hierarchy: exactly one primary `.button` (green); a secondary
  link, if present, is plain underlined text, never a second button.
- Lab card: same content hierarchy as the sitewide `.lab-card` /
  `.featured-lab-card` (date, time, time zone, title, description,
  seats, one button labeled **View Lab Details**), adapted in color
  only to sit inside this lighter container — see "Lab-card content"
  and "Lab-card design" below.
- Mobile: single column throughout, no side-by-side layouts, full-width
  card and buttons, no reduced padding (already modest).
- No clutter, no multiple competing cards, no tiny copy.

### 8. Assignment guide

| Article category | CTA type |
|---|---|
| Practical disciple-making tool | lab |
| Gospel-sharing article | lab |
| Disciple-making framework | lab |
| Simple church practice | lab |
| Leadership practice | lab or community |
| Coaching article | community or lab |
| Theology article | tool |
| Inspirational article | tool |
| Bible reference article | tool |
| Field story | lab |
| Article with no natural next step | none |

`lab` should be the most common type by a wide margin.

### 9. Author checklist

- [ ] Stakes headline written
- [ ] Stakes headline communicates a real consequence of inaction
- [ ] Correct CTA type selected
- [ ] Bridge copy is short
- [ ] For `type: lab`, bridge copy says only (1) knowledge without practice doesn't create change and (2) labs turn knowledge into skill through shared practice — no article-specific tool, activity, or outcome named
- [ ] No lab details are hard-coded
- [ ] Dynamic lab card resolves correctly
- [ ] Full labs are skipped
- [ ] Destination links are correct
- [ ] Mobile layout checked
- [ ] CTA feels like the natural next step
- [ ] No duplicate CTA markup exists inside the article body

### 10. Future article-generation rules

When creating or rewriting an article:

1. Identify the article category.
2. Assign the correct CTA type (see the assignment guide).
3. Write a unique stakes headline (see the writing rules).
4. Write short bridge copy.
5. Add only the required frontmatter — `article_cta.type` plus
   `stakes_headline`/`bridge_copy`, and `destination` for `tool`/
   `community`.
6. Never hard-code live lab data — title, date, time, seats, or URL.
7. Never duplicate `ArticleCTA` markup inside the article body — it's
   rendered automatically by the layout, once, per article.
8. Verify the CTA on both mobile and desktop before shipping.

### Lab-card content

The dynamic lab card matches the CoVo Multipliers card in content:
**Live Lab** badge, date, time (with time zone), lab title, short
description, seats remaining, and one button — **View Lab Details** —
linking straight to that lab's real landing page. It never embeds the
full registration form; an article reader who wants to register clicks
through to CoVo's own lab page, same as the sitewide `.lab-card` used
elsewhere on this site.

### Lead image

Every CTA (except `type: none`) shows one real photo above the eyebrow,
fixed per type — not configurable per article, not an `article_cta`
field. Defined once in `ArticleCTA.astro` (`CTA_IMAGES`), sourced from
`public/images/CTA-Article-Images/`:

| Type | Image | What it shows |
|---|---|---|
| `lab` | `Join a Lab.webp` | A group of about ten people outdoors after a lab — most pictured are not yet following Jesus, met through ordinary relationships. |
| `tool` | `Get the Conversation Box Tool.webp` | The hand-drawn Conversation Quadrant (Casual / Meaningful / Spiritual / Discovery). |
| `community` | `Join The Community.webp` | Four people around a café table with laptops open, meeting to practice together. |

Real photos, not stock — same rule as `ArticleImage` and `FieldNote`
elsewhere in this system: the alt text describes only what's actually
known to be true about the photo (per the site owner), nothing
invented. To change the image for a type sitewide, replace the file
(or the path in `CTA_IMAGES`) in one place — never add an `image`
override to an individual article's frontmatter.

### Lab-card design

Matches the sitewide `.lab-card`/`.featured-lab-card` closely in
content hierarchy, labels, typography, spacing, border radius, the
pulsing "Live" badge, seat-count treatment, and button styling — see
`.fm-lab-card*` in `field-manual-article.css`. Colors are adapted to
sit inside `ArticleCTA`'s lighter container (the sitewide cards live on
a dark or homepage background); it is not a redesigned, unrelated card
— it should read as clearly part of the same lab ecosystem.

### Legacy CTA fields (deprecated)

The original field-manual-v2 CTA used `cta_variant` / `cta_heading` /
`cta_body` / `cta_primary_label` / `cta_primary_url` /
`cta_secondary_label` / `cta_secondary_url` frontmatter fields. These
remain in the schema (harmless if present) but `ArticleCTA` no longer
reads them — no article currently sets them beyond defaults, so there
was nothing to migrate in practice. Do not add new usages; use
`article_cta` instead. If an old article is ever found using them, it
just needs an `article_cta` block added — the two systems are not both
active for any single article today.

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
