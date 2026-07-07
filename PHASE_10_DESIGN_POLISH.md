# Phase 10 — Launch-Ready Design Polish

Scope per this phase's instructions: polish the existing Astro design for
launch readiness using existing components/layouts/CSS tokens only. Not a
brand rebuild. No new pages migrated (except where a bug required a
content fix), no slug changes, no article body rewrites, no redirects
implemented, no DNS/WordPress/launch actions taken.

## Method

1. Read every layout (`BaseLayout`, `ArticleLayout`, `HubLayout`,
   `ToolLayout`) and component (`Header`, `Footer`, `Breadcrumbs`,
   `RelatedArticles`, `ToolCTA`, `SEO`) plus `global.css`, `index.astro`,
   and `blog/index.astro` to understand the existing design system before
   changing anything.
2. Installed `playwright-core` (`npm install --no-save`, dev-only, not
   added to `package.json`/`package-lock.json`) and pointed it at the
   pre-installed system Chromium (`/opt/pw-browsers/chromium-1194`) since
   this repo has no Playwright dependency of its own.
3. Ran `astro dev` locally and captured **before** screenshots (desktop
   1440×900 and mobile 390×844) of: homepage, `/blog/`, `/disciple-making/`
   and `/share-the-gospel/` hubs, `/the-three-circles-gospel-presentation-step-by-step/`
   and `/15-second-testimony-examples-ignite-your-faith/` articles,
   `/free-training/`, and `/starter-tools/` — the pages named in this
   phase's instructions.
4. Attempted to fetch the live WordPress site
   (`https://multiplyingdisciples.us/`) for trust/context comparison
   screenshots, per this phase's instructions. **Blocked**: this
   environment's outbound network policy returns a 403 policy denial for
   requests to that host (confirmed via the proxy status endpoint —
   `curl` to the live domain fails with `CONNECT tunnel failed, response
   403`, and the proxy's `recentRelayFailures` log shows the same denial
   pattern for other external hosts). Per this phase's explicit
   instructions ("If browser/network access is blocked or pages are
   unavailable, document that and continue without them"), this is
   documented here and the phase proceeded using only the current Astro
   site's own before/after screenshots plus written descriptions of
   layout/spacing/typography from reading the source.
5. Reviewed the before screenshots and the underlying source/data files
   for concrete, fixable issues (not a subjective redesign).
6. Made the fixes below, rebuilt, re-screenshotted (**after**), and
   re-ran the full Phase 8 audit-script suite against the new build to
   confirm zero regressions.

## Design issues found and fixed

### 1. Sitewide "coming soon" bug in `related_tools` (highest-impact finding)

The `tools` content collection (`src/content/tools/`) has been **empty
(0 files) since the project began**. `ToolCTA.astro` resolves each
`related_tools` name against `getCollection('tools')`; any name that
doesn't match renders a permanent `(coming soon)` label. Because the
collection was always empty, **every single `related_tools` reference
anywhere on the site was permanently broken** — a direct violation of
this phase's explicit QA requirement, "Confirm no 'coming soon' confusion
except documented tool placeholders."

Investigation found 27 files (22 articles + 5 hubs) referencing 4 bogus
tool names — `"3 Circles"`, `"Stories of Hope"`, `"4 Fields"`, `"Three
Thirds"` — none of which have ever had a real `tools` entry to resolve
against. All 4 names correspond to **real, already-migrated articles**
(`/3-circles/`, `/movement-resources/7-stories-of-hope-complete-facilitation-guide/`,
the Four Fields article, `/three-thirds/`).

Fix (mechanical, via a small Python script operating on exact YAML list
lines, applied to all 27 files):

- **Articles (22 files):** removed the bogus `related_tools` entries
  (now `related_tools: []`). This removes the permanently-broken "Tools
  for this" box from these article pages entirely — it never worked, so
  removing it is a strict improvement, not a content loss. No article
  body/markdown content was touched.
- **Hubs (5 files — `3-circles`, `disciple-making`, `share-the-gospel`,
  `stories-of-hope`, `testimony`):** removed the bogus `related_tools`
  entries and, where the corresponding real article URL
  (`/3-circles/` and/or
  `/movement-resources/7-stories-of-hope-complete-facilitation-guide/`)
  wasn't already present, added it to that hub's `key_articles` array
  instead — the mechanism that actually resolves correctly. `3-circles`
  and `stories-of-hope` hubs already had their own real URL in
  `key_articles`, so only their broken `related_tools` entry was
  removed. `disciple-making`, `share-the-gospel`, and `testimony` each
  gained the missing 1-2 `key_articles` entries.

Verified via a full grep sweep: zero `related_tools` bogus references
remain anywhere, and zero occurrences of the string "coming soon" remain
anywhere in the built `dist/` output.

### 2. Duplicate heading directly under the page H1 (`/free-training/`)

The body markdown opened with `## FREE 1-HOUR Live Disciple Making
Training`, immediately duplicating the page's frontmatter `title`
("FREE 1-Hour Live Disciple Making Training") that `ArticleLayout`
already renders as the H1. Same duplicate-heading bug class caught twice
before in Phase 8/9 audits. Removed the redundant heading line; the body
now flows directly from the H1 into the opening paragraph.

### 3. Missing `width`/`height` on the homepage hero image (layout-shift risk)

`index.astro`'s hero image had no `width`/`height` attributes, so the
browser can't reserve its box before it loads — a layout-shift risk this
phase's Visual QA list explicitly calls out ("No layout shift caused by
media"). Checked the real file dimensions (1000×100) and added
`width="1000" height="100"`. This is the single most prominent
above-the-fold image on the site; the ~150 other inline images across
article bodies are lower-impact (below the fold, mostly small icons/
diagrams) and adding dimensions to all of them would mean converting
every markdown `![]()` image into raw HTML across dozens of files — out
of proportion for a polish pass and risking exactly the kind of content
rewrite this phase's instructions rule out. Documented here as a known,
lower-priority remaining item rather than bulk-edited.

### 4. Article typography and readability (`global.css`)

Previously `global.css` had no rules at all for paragraph/list/table/
blockquote spacing inside article bodies — only bare heading
line-height/weight. Added scoped `article ...` rules (matching the
`<article>` wrapper both `ArticleLayout` and `ToolLayout` already use, so
this doesn't touch hub pages, which render frontmatter fields directly,
not body markdown):

- Consistent heading rhythm (`margin: 2rem 0 0.75rem`, with the very
  first heading in the article — the H1 — zeroed to avoid doubled
  top-spacing).
- Paragraph/list/blockquote bottom margins for breathing room between
  blocks.
- A left-border blockquote treatment (previously default/unstyled).
- `overflow-wrap: break-word` on paragraphs/lists/tables/blockquotes —
  see the horizontal-scroll fix below.

### 5. Tables broke on mobile (11 articles have real markdown tables)

No table styling existed at all — default browser tables have no
borders/padding and don't reflow for narrow viewports. Added
`article table { display: block; overflow-x: auto; }` (the standard
CSS-only responsive-table pattern — the table scrolls horizontally
within its own box rather than breaking the page's layout) plus basic
`th`/`td` padding, border, and header-row shading for legibility.
Verified via a Playwright check on the one sampled table-heavy article
(`/understanding-biblical-discipleship-.../`, 6 tables) at 375px width:
every table now reports `overflowX: auto`, `display: block`, and the
page's `scrollWidth === clientWidth` (no page-level horizontal scroll).

### 6. Sitewide horizontal-scroll sweep found and fixed 2 real bugs

Beyond the sampled pages, ran a Playwright script that loaded **all 98
built pages** at 375px and 1440px and compared
`document.documentElement.scrollWidth` vs `clientWidth` to catch any
page with horizontal overflow. Found one offending page:
`/four-fields-of-kingdom-growth-starting-and-releasing-healthy-churches-by-nathan-and-kari-shank/`.
Drilling in with a second script (comparing every element's own
`scrollWidth`/`clientWidth`) found two distinct causes on that one page:

- **A text-extraction bug**: one numbered-list line read
  `2)Immediatelydiscipletheconvertstoreachouttofamily,` — every space had
  been dropped during the original WordPress export extraction (visible
  as a single unbroken ~50-character "word" that couldn't wrap). This is
  a genuine bug discovered during this phase's QA, not a design
  preference, so it was corrected to `2. Immediately disciple the
  converts to reach out to family,` (also fixing its list-marker style to
  match its sibling items). Grepped the rest of the site for the same
  pattern (`[A-Za-z]{35,}` with no spaces, excluding URLs) — no other
  instances found.
- **Legitimate long content** — two list items contain real slash-joined
  place-name chains (e.g. `Paphos/Pisidian Antioch/Iconium/Lystra/Derbe/
  Philippi/ Thessalonica/Berea/Athens/Corinth/Ephesus`) that some
  rendering engines don't wrap at every slash. Since this is real,
  correct content (not a bug), the fix was CSS-level: the
  `overflow-wrap: break-word` rule added in item 4 above, which lets any
  long unbroken token wrap rather than overflow, sitewide — a general
  safety net for this exact class of issue anywhere on the site, not
  just this one page.

Re-ran the full 98-page sweep after both fixes at both 375px and 1440px:
**zero pages with horizontal overflow**, at either width.

### 7. Header navigation pointed at articles instead of the now-published hubs

`src/data/navigation.ts`'s primary nav had 3 links
("Disciple Making", "Share the Gospel", "Testimony") pointing directly at
one article each, predating Phase 9's hub-status decision. Now that all
11 hubs are `published` and structurally verified (Phase 9), a hub page
is a better landing spot for a topic — it scans several key articles plus
a clear next step, rather than dropping a first-time visitor straight
into one article with no easy way to see the rest of that topic's
content. Repointed those 3 nav links to their corresponding hub
(`/disciple-making/`, `/share-the-gospel/`, `/testimony/`). No new nav
items were added (nav is the same 6 links as before) and no URLs were
renamed — only the destination of 3 existing links changed.

### 8. Homepage had zero path into the site's own content library

Before this phase, the homepage's only links (aside from header/footer
nav) were the hero's "Start Training" (external Zoom signup) and
"Connect" (contact form) buttons, followed by a long FAQ-style prose
block, followed by one more Zoom CTA. A visitor who wasn't ready to book
a live Zoom session had **no path at all** into the site's 74 articles,
11 hubs, or other resources from the homepage body. This directly
contradicts this phase's "Clear path for visitors" and "secondary paths
clear" priorities.

Added two small, plain-text (no new visual weight/"marketing fluff")
additions to `index.astro`:

- A one-line secondary path directly under the hero CTAs: "New here?
  Start Here to see the simple tools first." — linking to `/start-here/`,
  the page already built specifically to orient new visitors.
- A compact "Explore the library" section near the bottom (before the
  final Zoom CTA box) with 6 plain text links: the 4 topic hubs already
  in the header nav plus `/starter-tools/` and `/vision/` — giving
  visitors who scroll past the FAQ one more, low-friction way into the
  site's content before hitting the footer.

Neither addition competes with the primary CTA (still the first, boldest
button on the page) — both are deliberately understated secondary paths.

## Pages/screens tested

Screenshots captured before and after, at both desktop (1440×900) and
mobile (390×844):

- Homepage (`/`)
- `/blog/`
- `/disciple-making/` and `/share-the-gospel/` hubs
- `/the-three-circles-gospel-presentation-step-by-step/` and
  `/15-second-testimony-examples-ignite-your-faith/` articles
- `/free-training/`
- `/starter-tools/`

Additional targeted checks beyond the required list:
- `/understanding-biblical-discipleship-.../` (table-heavy article) at
  375px, to verify the responsive-table fix.
- All 98 built pages, at both 375px and 1440px, for sitewide
  horizontal-scroll regressions (see item 6 above).

## Remaining design concerns (documented, not blocking)

- **~150 inline article-body images** (across 40 files) have no
  `width`/`height` attributes and could cause minor layout shift while
  loading. Lower priority than the homepage hero (below the fold, mostly
  small), and fixing it properly would mean converting markdown image
  syntax to raw HTML across dozens of files — judged out of proportion
  for this polish pass. Left for a future, dedicated pass if desired.
- **Live WordPress site comparison screenshots were not obtainable** in
  this environment (outbound network blocked by policy, confirmed via
  the proxy status endpoint). Design decisions in this phase were made
  from the existing Astro site's own screenshots and source review only,
  per the fallback instruction in this phase's brief.
- Mobile header nav wraps to two lines at narrow widths (it did before
  this phase too). This is functional and not visually broken (confirmed
  in screenshots — no overlap, clipping, or unreadable text), and adding
  a collapsing/hamburger nav would be a bigger interactive-component
  change than "polish existing components" calls for, so it was left
  as-is.
- The Astro dev toolbar (visible as a floating icon cluster in some of
  the raw screenshot captures) is a dev-server-only artifact and does
  not appear in the production build; noted here only so it isn't
  mistaken for a real page element.

## Mobile status

Confirmed via automated check across all 98 pages at 375px width: **zero
pages with horizontal overflow** (`document.documentElement.scrollWidth
=== clientWidth` on every page). No clipped text, no overlapping
elements found in the visually-reviewed sample (homepage, blog, 2 hubs,
2 articles, `/free-training/`, `/starter-tools/`, plus the table-heavy
article). Tables reflow via internal horizontal scroll rather than
breaking page layout.

## Build status

- `astro check`: 0 errors, 0 warnings, 54 hints (pre-existing Zod
  deprecation hints in `content.config.ts`, unrelated to this phase).
- `astro build`: clean, **98 pages built** (unchanged from Phase 9 — no
  pages added or removed this phase, other than the one content bug fix
  in item 6, which didn't change the page count).
- Sitemap: **98 `<loc>` entries**, matching.
- Re-ran the full Phase 8 audit-script suite against the new build:
  - SEO sweep (H1/title/description/canonical/noindex): 0 issues across
    98 pages.
  - Hub `key_articles`/`next_step` resolution: 75 total `key_articles`
    entries (up from 69 — the additions in item 1 above), 0 broken; 0
    broken `next_step` links.
  - Internal link crawl: 0 broken internal links, 0 empty `href=""`, 0
    broken same-page anchors, 0 `javascript:` hrefs.
  - Blog index: 74 eligible articles, all correctly included; 0
    wrongly-included/excluded; 0 missing hub links.
  - Media: same pre-existing gaps as Phase 9 documented (no new
    regressions introduced by this phase's edits).

## Redirects

No change. Still 20 pending archive-taxonomy rows documented in
`REDIRECTS.md`, none implemented, per this phase's explicit "do not
implement redirects yet" instruction.

## Is the site ready for design polish?

This phase *is* the design-polish pass — completed. The design is now
internally consistent: no false "coming soon" placeholders, working
responsive tables, no horizontal-scroll bugs anywhere, a clear primary
CTA plus documented secondary paths on the homepage, and nav pointing at
the right (published) landing pages for each topic.

## Is the site ready for launch prep?

Structurally yes, with the same standing gates as before this phase:
redirects are documented but not implemented, and hosting/DNS/human
sign-off steps in `LAUNCH_CHECKLIST.md` remain outstanding. Nothing found
in this phase blocks moving into launch prep; the remaining concerns
above are non-blocking, documented follow-ups.
