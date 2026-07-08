# Phase 10C — Article Formatting System + Page-by-Page Polish Plan

Goal per this phase's instructions: a repeatable, reusable formatting
system for blog articles (reduce wall-of-text, improve scanability,
callouts, steps, quotes, tables), proven on a 5-article pilot set
before scaling to all 73 posts. This is a **formatting pass, not a
content rewrite** — no wording changes beyond what's needed to
restructure a dense paragraph into a list/box, no slug/canonical/meta
changes, no new content invented.

## Method

1. Read all 5 pilot articles in full and identified, per article,
   which of the 10 requested box/pattern types actually fit its real
   content — not force-fitting every pattern into every article.
2. Designed the CSS system in `src/styles/global.css` as a small,
   reusable `.callout`/`.callout--variant` family plus two standalone
   patterns (`.steps` for numbered processes, an enhanced `article
   blockquote` for quotes) — all global, none page-specific.
3. Applied the patterns only where they demonstrably help scanability,
   per pilot article (see "Pilot articles" below for exactly what
   changed in each).
4. Rebuilt and ran the full QA suite (astro check/build, Phase 8 link
   audit, sitewide mobile-overflow sweep) after every article.
5. Captured desktop/mobile screenshots of all 5 pilot articles and
   compared against the WordPress reference article screenshots
   supplied in this session (the callout-box-heavy article screenshot
   and the sidebar/CTA-band article screenshot from Phase 10B).

## The 10 reusable patterns

All defined once in `src/styles/global.css`; content authors use them
by wrapping markdown directly inside a `<div>` with the right class
(raw HTML passthrough inside `.md` files — the same technique already
used for `.resource-grid`/`.resource-card` in Phase 10B). Keep the
markdown inside each box simple: a label, a sentence or two, or a
short list — these are for scanability, not a place to write more
prose than the surrounding article.

### 1. Key idea box — `callout callout--key-idea`

A short, important takeaway pulled out of the surrounding paragraph.
Soft blue gradient background, no border.

```html
<div class="callout callout--key-idea">

**Key idea:** Missions started in Genesis 1, not Matthew 28.

</div>
```

### 2. Scripture box — `callout callout--scripture`

A direct Bible quotation. Light blue-to-lavender gradient background
(not just a plain blockquote) so Scripture reads as visually distinct
from the article's own commentary or from someone else's quoted words.

```html
<div class="callout callout--scripture">

"Whatever house you enter, first say, 'Peace be to this house!'"

<cite>Luke 10:5-6</cite>

</div>
```

### 3. Tool box — `callout callout--tool`

Introduces or spotlights a named tool/resource (3 Circles, the
15-Second Testimony, Four Fields, etc). White background with a full
border, so it reads as a small card — the only variant that keeps a
border, since it's a card outline rather than an accent edge.

```html
<div class="callout callout--tool">

**The 15-Second Testimony Tool** is a simple framework for sharing your
faith in a brief, memorable way.

</div>
```

### 4. Step/process box — `.steps` wrapping a plain ordered list

Wrap an ordinary markdown `1. 2. 3.` list in `<div class="steps">` to
get numbered-circle steps instead of default browser numerals — no
change to the list itself, so it's still plain, portable markdown.

```html
<div class="steps">

1. **Pray for guidance.** Ask God to show you who to talk to.
2. **Build relationships.** Spend real time with people in your community.
3. **Look for social influence.** Notice who people already trust.
4. **Listen to the Holy Spirit.** Follow where He leads.

</div>
```

### 5. Warning / correction box — `callout callout--warning`

A caution or common-misconception note. Reuses the amber already
established for `.source-pending-banner` elsewhere in this codebase —
not a new brand color, now as a soft amber gradient background.

```html
<div class="callout callout--warning">

**Common misconception:** a Person of Peace doesn't have to already be
a believer — they just have to be open.

</div>
```

### 6. Practice / try-this box — `callout callout--practice`

An actionable next step for the reader. Soft teal gradient background
(distinct from key-idea's blue) to differentiate "here's an idea" from
"go do this" without relying on a border treatment.

```html
<div class="callout callout--practice">

**Try this:** Write your own 15-second testimony using the four-part
structure above, then say it out loud to one other person this week.

</div>
```

### 7. Quote / pullquote — plain markdown blockquote (`>`)

No new markup needed — every `> quoted text` in every article
automatically gets the enhanced style: a thicker accent-blue left
border, larger italic text, no background fill (so it stays visually
lighter than the boxed callouts, since a quote is someone's words, not
the site's own commentary). Optionally close with `<cite>` for
attribution.

### 8. Related resources block — existing `RelatedArticles` component

Unchanged structurally from Phase 10; already a bordered, rounded-card
box with a label heading. No new pattern needed here.

### 9. CTA block — existing `.cta-band` (Phase 10B) / `ToolCTA` component

Unchanged from Phase 10B. Every real article already gets an automatic
closing "Be a movement multiplier" CTA band from `ArticleLayout`. Two
of the pilot articles had their **own hand-written duplicate CTA text**
left over from the original migration — removed as part of this pass
(see per-article notes below), since it's now redundant with the
automatic one and was pure wall-of-text/chrome.

### 10. Responsive table — existing `article table` styling, enhanced

Table markup and the `display: block; overflow-x: auto` responsive
behavior from Phase 10 are unchanged. Added subtle zebra-striping
(`tbody tr:nth-child(even)`) for readability on long, dense tables —
benefits every article with a table automatically, no markup changes
needed anywhere.

## Pilot articles

### 1. `/the-three-circles-gospel-presentation-step-by-step/`

- Wrapped the "Next Steps in 3 Questions" numbered list in `.steps`.
- Converted the two spoken opening lines ("Have you heard of the Three
  Circles?" / "I'd really like to show it to you...") into
  blockquotes, since they're literal words to say out loud — the
  enhanced quote style now visually signals "say this" versus the
  surrounding narration.
- Removed the hand-written "Be a movement multiplier" CTA block at the
  end (5 lines) — redundant with the automatic `ArticleLayout` CTA
  band added in Phase 10B.
- No content wording changed beyond that restructuring.

### 2. `/15-second-testimony-examples-ignite-your-faith/`

- Wrapped the 7 short "Quick List" testimony examples
  (darkness-to-light, healing, addiction, etc.) in `callout--practice`
  boxes — these are literally reusable examples the reader can copy,
  and boxing them breaks up what was 7 near-identical H3+paragraph
  pairs in a row.
- Converted the 3 longer bolded example quotes ("There was a time in
  my life when...") into blockquotes — same "these are words to say"
  treatment as article 1.
- Wrapped the "How do you write a 15 second testimony?" 5-step list in
  `.steps`.
- Wrapped the "Simplicity / Biblical / Reproducibility" 3-part summary
  in a `callout--key-idea` box.
- Removed the hand-written "Get hands-on training" section at the end
  — redundant with the automatic CTA band.

### 3. `/missionary-verses-in-the-bible-reveal-gods-heart/`

- Converted all 12 "**Key Action Points:**" bullet lists (one per
  numbered section) into `callout--practice` boxes — the single
  highest-impact change in this pilot set, since the repeated
  bold-label-plus-bullets pattern was the main source of "wall of
  text" across this very long article.
- Left all 12 tables as tables (they're genuinely tabular
  scripture-reference data, not proseable into a box) — they now pick
  up the new zebra-striping automatically.
- No content wording changed.

### 4. `/the-multiplier-mandate-revealed-from-genesis-to-revelation/`

- No markup changes needed to the ~15 existing `>` blockquotes — they
  automatically pick up the enhanced quote styling.
- Converted the bullet lists that follow each blockquote (recapping
  what the quote means) into `callout--key-idea` boxes — this was the
  single most repetitive pattern in the article (quote → bullet recap,
  ~10 times) and the highest-impact place to add visual rhythm.
- Converted the closing "What have we discovered along the way?"
  summary list into a `callout--key-idea` box.
- No content wording changed.

### 5. `/finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making/`

- Converted the Luke 10:5-6 quotation (previously inline plain text)
  into a `callout--scripture` box with a `<cite>` reference.
- Wrapped the "How to find Persons of Peace" 4-step list in `.steps`.
- Wrapped the "Messenger / Message / Mission" 3-part framework in a
  `callout--key-idea` box.
- No content wording changed.

## Build status

- `astro check`: 0 errors, 0 warnings, 54 hints (unchanged, pre-existing).
- `astro build`: clean, 98 pages (unchanged).
- Sitemap: 98 `<loc>` entries (unchanged).
- Link audit (Phase 8 suite): 0 broken internal links, 0 SEO issues
  (still exactly one H1 per page, canonical/title/description all
  intact, no accidental noindex).
- Sitewide mobile-overflow sweep (98 pages × 375px/1440px): 0
  offenders.
- `/blog/` still lists all 74 eligible articles correctly (none of the
  5 pilot articles' `exclude_from_blog`/`hub`/`related_articles`
  frontmatter changed).

## Screenshots tested

Desktop (1440×900) and mobile (390×844) for all 5 pilot articles,
before and after.

## What worked

- The `.steps` numbered-circle treatment reads very close to the
  reference screenshots' red-circle step pattern (same idea, blue to
  match this site's accent) with zero markdown restructuring — just a
  wrapper div around an existing ordered list.
- `callout--practice` boxing the repeated "Key Action Points" bullets
  in the missionary-verses article is the single biggest scanability
  win of the whole pilot: a 12-section, very long article now has
  visible rhythm and a scannable spine instead of reading as one long
  gray block.
- Turning spoken/quoted lines into blockquotes required zero new CSS
  work (the enhanced quote style from item 7 handles it) and reads
  naturally — "this is what you say" vs. "this is the narration."
- Removing the two leftover hand-written CTA blocks (now duplicated by
  the automatic band) simplified those articles without losing
  anything real.

## What still feels weak

- The `callout--tool` pattern (white card + accent border) wasn't
  actually needed in any of the 5 pilots as written — none of them
  introduce a *named, downloadable* tool mid-article the way
  `/starter-tools/` does. It's designed and ready, but its first real
  use will likely be on an article that name-drops a specific resource
  (e.g. an article that mentions "Four Fields" or "Church Waffle" by
  name partway through). Not a defect — just an untested pattern until
  a real article calls for it.
- The `callout--warning` pattern is similarly designed but unused in
  this pilot — none of the 5 articles contained a genuine
  misconception/correction to flag. Same status: ready, not yet proven
  on real content.
- Very long articles (missionary-verses, the-multiplier-mandate) are
  still long after this pass — the formatting system makes them more
  scannable, not shorter. That's the correct scope for this phase
  (formatting, not rewriting), but it's worth naming: these two will
  still read as "long" even when well-formatted.
- `RelatedArticles` (pattern 8) didn't get any visual refresh this
  phase — it already looked reasonably consistent with the new
  callout boxes (same border-radius/border-color tokens), so it was
  left alone rather than changed for its own sake.

## Recommendation for scaling to the remaining 68 blog posts

Roll out in small batches (7-10 articles at a time, similar to the
Tier 3 migration batches earlier in this project), applying only the
patterns that genuinely fit each article's real content — never force
all 10 patterns onto one article. Prioritize articles with:

- A repeated bullet-list-after-prose structure (like
  missionary-verses) — `callout--practice`/`callout--key-idea` pays
  off fastest there.
- A numbered how-to sequence already written as an ordered list — an
  almost-free `.steps` win.
- Direct Scripture quotations currently sitting as plain inline text —
  an almost-free `callout--scripture` win.
- Leftover hand-written CTA text at the end that's now redundant with
  the automatic CTA band — check every article for this, it's
  low-risk cleanup with no formatting-system work required.

### Recommended first 10 articles for the next full formatting pass

1. `/testimony-in-the-bible-20-verses-to-ignite-your-faith/` — same
   family as the 15-second-testimony pilot, likely has the same
   quote/example structure.
2. `/the-power-of-sharing-your-testimony-scripture-7-biblical-reasons-you-cant-stay-silent/`
   — "7 reasons" numbered structure, strong `.steps` candidate.
3. `/how-to-evangelize-ultimate-step-by-step-guide/` — "step-by-step"
   in the title strongly suggests a `.steps` candidate.
4. `/bible-verse-about-spreading-the-gospel-complete-guide-for-sharing-your-faith/`
   — likely Scripture-quote-heavy, same family as
   finding-persons-of-peace.
5. `/disciple-making-resources-for-churches-that-will-multiply/` — a
   hub key article, likely to benefit from `callout--tool` boxes for
   the resources it names.
6. `/5-proven-strategies-unlock-the-secrets-of-effective-personal-evangelism/`
   — "5 proven strategies" numbered structure.
7. `/royal-priest-strategy-explodes-disciple-making-movement-worldwide/`
   — same theological-long-form family as the-multiplier-mandate.
8. `/under-the-hood-of-disciple-making-movements/` — same family,
   likely quote/key-idea heavy.
9. `/four-stages-of-movement-unlock-your-next-steps/` (`/4-stages-of-movement-unlock-your-next-steps/`)
   — "stages"/"next steps" framing, `.steps` candidate.
10. `/what-is-a-strategy-coordinator-their-role-framework-and-impact-in-modern-missions/`
    — long-form with a named framework/tool (URLPEG), a real test case
    for the still-unproven `callout--tool` pattern.

## Page-by-page polish plan (main pages — not implemented this phase)

Per this phase's explicit instruction, this phase built and proved the
article system only. The following is a **plan**, not work completed,
for a future phase to polish main site pages one at a time:

1. **Homepage** — already polished in Phase 10/10B (pill buttons,
   feature badges, CTA band, "Explore the library"). Remaining: no
   real lifestyle hero photo exists (documented gap from Phase 10B);
   otherwise low priority for further work.
2. **`/start-here/`** — orientation page for new visitors; check
   whether it could use a `.steps` treatment for its own multi-tool
   walkthrough, and whether its resource links should adopt the
   `.resource-card` grid pattern from Phase 10B instead of plain text
   links.
3. **`/vision/`** — long-form theological prose (similar family to the
   article pilot); a strong candidate for `callout--key-idea` boxes
   around its most quotable lines, and blockquote treatment for its
   Romans/Acts citations, which currently sit as plain inline text.
4. **`/free-training/`** — already polished in Phase 10B (pill CTAs);
   remaining: its FAQ section could adopt the same lightly-boxed FAQ
   row treatment used on the homepage.
5. **`/starter-tools/`** — already has the resource-grid treatment from
   Phase 10B; low priority for further work.
6. **`/stickers/`** — already has the resource-grid treatment from
   Phase 10B; low priority for further work.
7. **`/blog/`** — deliberately kept as a plain list (Phase 10B
   decision, to avoid clutter); revisit only if user feedback says the
   list itself is hard to scan, not before.
8. **All 11 hub pages** — already have the pill next_step button and
   clean key-articles list from Phase 10B; consider whether
   `key_articles` lists over ~10 items (disciple-making has 15) would
   benefit from a two-column layout on desktop for scannability.
9. **Key resource pages** (`/movement-resources/`,
   `/movement-resources/4-fields-toolbox/`,
   `/kingdom-ministry-training/`, etc.) — check each for the same
   leftover-duplicate-CTA issue found in 2 of the 5 pilot articles, and
   for Scripture-box/step-box opportunities where they contain direct
   Bible quotations or numbered processes.

This plan is intentionally not executed in this phase — per the
instructions, Phase 10C proves the article system on its 5-article
pilot and stops there for user review before either scaling the
article system or starting the page-by-page plan.

## Addendum: gradient backgrounds, no border-left accents

Follow-up user feedback: the `callout--practice` dashed left border
read as an unwanted "dotted line." Removed border-left accents from
every callout variant (key-idea, scripture, warning, practice) and
replaced each variant's flat/tinted background with a soft two-tone
gradient in the same hue, so each still reads as visually distinct
without relying on a border. `callout--tool` keeps its full 1px border
since that's a card outline, not an accent edge, and wasn't part of
the complaint. `callout--practice` also picked up a new hue (soft
teal) since removing its border meant it needed its own color
identity, not just key-idea's blue with a different border style.
Applied via `src/styles/global.css`, so it takes effect on all 5
pilot articles automatically — no per-article markdown changes
needed.
