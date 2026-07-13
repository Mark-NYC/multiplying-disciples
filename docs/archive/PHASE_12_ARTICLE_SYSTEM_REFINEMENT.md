# Phase 12 — Article Design System Refinement

Refines the Phase 11 field test into a calmer, more restrained system,
per the brief: "the homepage is the cover of the field manual, articles
are pages inside it" — articles should read as editorial pages, not a
polished-blog stack of cards. Implemented and refined directly on the
3 field-test articles; not rolled out further. See
`ARTICLE_DESIGN_SYSTEM.md` for the standing component reference and
`FIELD_NOTE_TEMPLATE.md` for the Field Note authoring flow.

## 1. Which two existing test articles were updated

- **The Multiplier Mandate: Revealed from Genesis to Revelation**
  (pillar/educational, ~4,350 words)
- **A Step-by-Step Guide to Prayer Walking Scriptures and Changing
  Lives** (practical how-to, ~3,700 words)

## 2. Which third article was selected

Per your mid-task correction, all three original field-test articles
were kept and updated rather than swapping the narrative one out:

- **Unleashing the Movement: How Paul Catalyzed a Disciple-Making
  Movement in Ephesus** (narrative/story, ~1,500 words) — Acts 19, a
  single sustained story with real tension (half-taught disciples,
  a public confrontation with counterfeit exorcists, a city publicly
  burning its occult books) and one clearly quotable line ("He met
  them where they were at").

## 3. All files changed

**New:**
- `src/components/article/ArticleHero.astro`
- `src/components/article/ArticleIntro.astro`
- `src/components/article/InsightCard.astro`
- `src/components/article/PracticeCard.astro`
- `src/components/article/WarningCard.astro`
- `src/components/article/ScriptureBlock.astro`
- `src/components/article/PullQuote.astro`
- `src/components/article/ArticleImage.astro`
- `src/components/article/FieldNote.astro`
- `src/components/article/ArticleCTA.astro`
- `src/components/article/RelatedArticles.astro`
- `src/content/field-notes/_example-dev-preview.md` (unapproved,
  dev-only styling reference — never renders publicly)
- `ARTICLE_DESIGN_SYSTEM.md`
- `FIELD_NOTE_TEMPLATE.md`
- `PHASE_12_ARTICLE_SYSTEM_REFINEMENT.md` (this file)

**Changed:**
- `astro.config.mjs` — added the `@astrojs/mdx` integration
- `package.json` / `package-lock.json` — added `@astrojs/mdx`
- `src/content.config.ts` — broadened the articles loader to
  `**/*.{md,mdx}`; added the `fieldNotes` collection; added
  `cta_*` frontmatter fields
- `src/layouts/ArticleLayoutV2.astro` — rewritten to use the new
  component locations, compute reading time, cap related articles at
  3, and wire `ArticleCTA` from frontmatter
- `src/styles/field-manual-article.css` — rewritten: increased H2
  spacing, green H2 / ink H3 hierarchy, resized ArticleIntro, added a
  single shared shadow token, restyled Scripture Block (sage wash,
  upright serif instead of italic), added Field Note styles, fixed a
  long-title hero overflow, added explicit focus states
- `PHASE_11_ARTICLE_FIELD_TEST.md` — marked superseded, left in place
  for history

**Renamed `.md` → `.mdx` (via `git mv`, history preserved) and
rewritten:**
- `src/content/articles/the-multiplier-mandate-revealed-from-genesis-to-revelation.mdx`
- `src/content/articles/a-step-by-step-guide-to-prayer-walking-scriptures-and-changing-lives.mdx`
- `src/content/articles/unleashing-the-movement-how-paul-catalyzed-a-disciple-making-movement-in-ephesus-lessons-for-todays-church.mdx`

**Removed (superseded by the `src/components/article/` versions):**
- `src/components/ArticleHero.astro`
- `src/components/ArticleEndCTA.astro`

## 4. New shared components created

11 components in `src/components/article/`: `ArticleHero`,
`ArticleIntro`, `InsightCard`, `PracticeCard`, `WarningCard`,
`ScriptureBlock`, `PullQuote`, `ArticleImage`, `FieldNote`,
`ArticleCTA`, `RelatedArticles`. Full prop docs, usage examples, and
frequency guidance for each are in `ARTICLE_DESIGN_SYSTEM.md`.

The 3 test articles were converted from `.md` to `.mdx` so these could
be used as real Astro components (`<InsightCard label="...">`) instead
of raw HTML `<div class="...">` blocks — this is also what makes
`FieldNote` possible: it does a live lookup against the `fieldNotes`
collection and needs to be a real component, not a static class.

## 5. Old experimental styles removed

- The Phase 11 field-test CSS/markup (raw-HTML `fm-insight-card` divs
  written directly in markdown, hero built inline in the layout
  instead of as a component) was replaced in place — same file
  (`field-manual-article.css`), same class names where they carried
  over, but the *authoring* pattern changed from hand-written HTML
  divs to real components.
- The older Phase 10C callout-box system (`.callout`,
  `.callout--key-idea`, etc. in `global.css`) was already fully
  removed from all 3 of these articles back in Phase 11 and remains
  untouched (and still in use) on the other ~120 articles that never
  opted into `article_system: field-manual-v2` — it was not touched
  again in this pass, since it doesn't conflict with anything these 3
  articles render.
- Nothing was deleted from `global.css` — this system only ever adds
  scoped `fm-` prefixed rules on top of it.

## 6. How optional Field Notes are stored

A separate Astro content collection, `src/content/field-notes/`
(schema in `src/content.config.ts`). Each note is its own markdown
file — filename (minus `.md`) is the id an article references via
`<FieldNote id="..." />`. Fields: `number`, `location`, `date`,
`headline`, `image`, `image_alt`, `image_caption`, `attribution`,
`related_tool`, `related_article` (all optional) and `approved`
(required, defaults to `false`). The `FieldNote` component looks up
the collection at render time and renders **nothing** — no
placeholder, no "story coming soon," no empty card — unless a note
with that exact id exists and `approved: true`. Confirmed by build: 0
of the 98 built pages reference the one example note in the
collection, and that note is `approved: false`, so it produces no
output anywhere.

## 7. Exact steps for adding a Field Note later

1. Copy `FIELD_NOTE_TEMPLATE.md`, fill it in, save as
   `src/content/field-notes/<your-id>.md`.
2. Leave `approved: false` while drafting/reviewing.
3. Once genuinely cleared for public use, flip `approved: true`.
4. In the target article's `.mdx` body: import the component
   (`import FieldNote from '../../components/article/FieldNote.astro';`)
   and place `<FieldNote id="your-id" />` wherever it fits naturally
   (after an introduction, after a section, before the conclusion —
   your call as the author).
5. No CSS or layout changes needed — the component and its styling
   already exist and render inline with the rest of the article.

## 8. Which components were used in each test article

| Component | Pillar (Multiplier Mandate) | How-to (Prayer Walking) | Narrative (Ephesus) |
|---|---|---|---|
| ArticleHero | 1 | 1 | 1 |
| ArticleIntro | 1 | 1 | 1 |
| InsightCard | 6 (labels vary: The Core Idea, Key Distinction, What This Means, The Pattern, Movement Principle, Summary) | 1 ("The Core Idea") | 1 ("Summary") |
| PracticeCard | 1 ("Your Next Step") | 1 ("Try This This Week") | 1 ("Your Next Step") |
| WarningCard | 0 — no honest fit | 1 ("Common Mistake") | 0 — no honest fit |
| ScriptureBlock | 0 — see note below | 4 | 0 — no verbatim Scripture in the source |
| PullQuote | 2 | 1 | 1 |
| ArticleImage | 1 | 1 | 0 |
| FieldNote | 0 | 0 | 0 |
| ArticleCTA | 1 (default) | 1 (default) | 1 (default) |
| RelatedArticles | 1 (capped to 3) | 1 (capped to 3) | 1 (capped to 3) |

Multiplier Mandate's 6 Insight Cards is a large cut from Phase 11's
10 (all identically labeled "Insight") — now spread roughly one per
700 words across the article's 6 major sections, each with a label
describing what kind of point it actually is. The other 4 former
cards are now plain bullet lists.

Note on ScriptureBlock: the Multiplier Mandate and Ephesus articles
have zero, on purpose. Both are full of quoted lines in quotation
marks, but almost none of it is verbatim Bible text — it's a podcast
host paraphrasing a passage, or narration of a Bible story. Forcing
those into Scripture Block would mislabel commentary as Scripture.
Prayer Walking's 4 Scripture Blocks are real, verbatim verses, which
is exactly what the component is for.

## 9. Content gaps that still need real stories or images

- **No Field Notes exist yet for any of the 3 articles.** This is
  expected and intentional per your instruction not to invent one —
  but it means the system's signature component is currently unproven
  with real content. Once 1-3 real, approved stories exist (ideally
  one per article type), add them via `FIELD_NOTE_TEMPLATE.md` and
  re-review the rhythm — a real Field Note may replace an Insight Card
  or Pull Quote rather than stacking on top of them.
- The Multiplier Mandate and Prayer Walking hero images are both
  reused from elsewhere on the site (a homepage-adjacent Bible-study
  photo and an existing og_image) rather than photos taken for these
  specific articles — accurate captions were written for what's
  actually shown, but neither is a purpose-shot editorial photo.
- The Ephesus hero image is the same photo already used on the
  homepage's "Community of Practice" section — reused deliberately
  (see that article's migration notes) but means 2 pages on the site
  currently share one photo.

## 10. Mobile QA results

Checked at 390×844 (iPhone-class viewport) for all 3 articles:

- Hero: category/title/subhead/meta stack correctly; long titles
  (Ephesus, previously 9 lines) now cap at 6 lines via the new
  length-based size step-down; image runs full-bleed inside the page
  padding.
- Cards (Insight/Practice/Warning/Scripture) go full width, padding
  holds up without feeling cramped, no horizontal overflow.
- Table of Contents, Related Articles, and the end CTA all render
  full-width and legible; the CTA's primary/secondary actions stack
  vertically with a large tap target.
- No side-by-side layouts anywhere in this system at any width.
- Confirmed via Playwright screenshots at each step of the build; no
  visual regressions found after the H2-promotion and card-density
  changes.

## 11. Desktop QA results

Checked at 1440×900:

- Reading column holds at 704px (44rem) throughout — no ordinary
  paragraph stretches wide.
- H2 sections now have visibly more room above than below (3.5rem
  above / 1rem below), confirmed to make the Multiplier Mandate's long
  scroll feel like distinct chapters instead of one dense wall.
- Insight/Practice/Warning cards read as clearly secondary to body
  text — single shared shadow token, no stacked or nested cards found.
- `astro build` completes cleanly at 98 pages (same count as before
  this change — nothing new got a public route, including the
  unapproved Field Note example).
- Spot-checked one untouched article
  (`finding-persons-of-peace-a-key-strategy-for-evangelism-and-disciple-making`)
  to confirm zero visual change outside the 3 opted-in articles —
  confirmed (h1 color, layout, and markup all identical to before this
  phase).

## 12. Parts of this prompt that could not be implemented and why

- **"Choose one appropriate story-driven article as the third test
  article"** — superseded mid-task by your explicit instruction to
  "update all three articles" instead of swapping one out. Ephesus was
  kept and refined rather than replaced.
- **Field Notes in all 3 articles** — not implemented, on purpose: no
  real, approved story currently exists for any of the 3, and the
  brief explicitly prohibits inventing one. The component is fully
  built and verified (see §6, §9) but ships unused until real content
  exists.
- **"Preserve analytics and tracking"** — nothing in this system
  touches `src/lib/ecosystem-tracking.js` or any tracking attributes,
  so there was nothing to actively preserve beyond not removing
  anything already there; noting it here rather than silently
  asserting it was "done."
- Everything else in the brief (component set, color system, shadow
  token, CTA props, slot-style optional placement via MDX imports,
  mobile/desktop rules, accessibility, documentation, Field Note
  schema and template) was implemented as specified.
