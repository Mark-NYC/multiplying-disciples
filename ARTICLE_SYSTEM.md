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
- **New articles must use the field** — it is part of the new-article
  protocol (see "Adding a new article"). Legacy articles are migrated to
  it article-by-article; an un-migrated article keeps its inline
  `<ArticleIntro>` and is unaffected until touched.

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
| `PodcastEmbed` | one H3X episode as supporting evidence, by id | pick on the episode's subject, not its title; missing/unknown id renders nothing. See "Supporting media" below and PODCAST_INTEGRATION_STRATEGY.md |
| `ArticleMediaBar` | the sticky "jump to this article's media" bar (Watch / Listen / Get the Guide) | cornerstone/pillar articles with 2+ media assets only; article-scoped MVP. See "Supporting media" below |
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

## Supporting media (video, podcast, and the sticky media bar)

A cornerstone article can carry its own supporting media — a video
walkthrough, an H3X podcast episode, and its tool download — plus a small
sticky bar that lets readers jump straight to them. This is opt-in and
**selective**: it earns its place only on a pillar/cornerstone article
that has **two or more** distinct media assets to point at. Do not add
the bar to an ordinary article, and do not make it sitewide (see "Scope"
below). Reference implementation: `what-makes-a-church-a-church.mdx`.

The three parts (video, podcast, tool) are independent — an article can
embed any of them on its own. The media bar is what ties them together
into wayfinding, and only makes sense once at least two are present.

### Video embeds

There is no video component; articles embed YouTube inline with the
site's standard privacy-enhanced pattern (already used by
`four-fields-of-kingdom-growth`, `the-three-circles-...`,
`biblical-fasting-and-prayer`, and others). Copy it as-is rather than
inventing a component:

```mdx
<section id="watch-<descriptive>" aria-label="Video: <what it shows>">

Watch Mark walk through <the specific thing>, straight from <source>.

<div style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: '12px' }}>
  <iframe
    src="https://www.youtube-nocookie.com/embed/<VIDEO_ID>"
    title="<A real, descriptive sentence — not just the article name>"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    style={{ width: '100%', height: '100%', border: 0 }}
  />
</div>

</section>
```

Rules: always `youtube-nocookie.com` (privacy-enhanced — the site
convention); always the `aspectRatio` wrapper so there is zero layout
shift and the frame stays 16:9 on mobile; `loading="lazy"`; a real
descriptive `title` for accessibility; never autoplay. Place the video
where it strengthens the article (near the claim it illustrates), not
dumped at the end. Wrap it in a `<section>` with a stable, descriptive
`id` when the media bar needs to target it.

### Podcast embeds (`PodcastEmbed`)

Embed one H3X episode by id; a missing or unknown id renders nothing
(never a placeholder). The full selection rubric, editorial placement
rules, and per-episode matrix live in **PODCAST_INTEGRATION_STRATEGY.md**
and **PODCAST_EPISODE_MAP.md** — read those before choosing. Choose on
the episode's actual subject (show notes, Scripture, metadata in
`PODCAST_EPISODE_CATALOG.csv` / `src/data/h3x-episodes.json`), never on
its title alone, and never force a weak match. If nothing fits, leave the
podcast (and the bar's Listen action) off; both can be added later with
no layout change. Frame it with the `intro` prop, and wrap it in a
`<section id="listen-...">` when the media bar targets it.

```mdx
import PodcastEmbed from '../../components/article/PodcastEmbed.astro';

<section id="listen-<descriptive>" aria-label="Podcast: <topic>">

Listen to a deeper conversation about <the specific angle>.

<PodcastEmbed id="<episode-id>" intro="Why this episode belongs here, framed to the article's own claim." />

</section>
```

### The sticky media bar (`ArticleMediaBar`) — a per-article media policy

The media bar is **not one fixed toolbar**. It is a flexible,
article-level component that adapts to the media and tool a given article
actually has. Its job is to:

1. surface the media formats the article actually contains,
2. surface a practical resource when one exists,
3. transition toward sharing after the reader has received value, and
4. stay visually balanced even when only one action is available.

It is **opt-in, article by article** — never applied to every article
automatically. Mount it deliberately from the article body, only where the
policy below says it earns its place. It is a compact, dismissible bar
fixed near the bottom of the viewport.

#### Core principle: only real destinations

Every action the bar shows must point at a real section that exists on
that same article. **Never render a dead, placeholder, or irrelevant
button.** An action whose target id is not on the page is dropped at
runtime, so a mis-set or not-yet-built target fails safe (the button
simply doesn't render) rather than offering a broken jump.

The possible actions are **Watch · Listen · Guide/Tool · Share · Close**.
Which of them appear is entirely a function of what the article provides.

#### When to render the bar at all

Render the bar only when the article has at least one of: a **video**, an
**audio** embed, or a **downloadable resource**. When it has none of
those, **do not render the bar** — the single exception is an article that
has *explicitly* opted into Share-only behavior (a page worth sharing that
carries no media or tool). Absent that opt-in, no media and no tool means
no bar.

#### Downloadable-resource (Guide/Tool) behavior

**When the article has a downloadable resource** (a Left/Right-Hand guide,
a tool PDF, and so on):

- Show the **Guide/Tool** button through the main reading portion.
- At roughly the **final 25%** of the article (the share threshold), the
  Guide/Tool button transitions **once** into a **Share** button.
- Use a subtle **fade/crossfade**; keep the button **width stable** so the
  bar does not jump (both live in one reserved slot).
- The transition happens **only once** per reading session and does not
  revert on scroll-up.
- **Before** the transition, clicking Guide/Tool **scrolls to the existing
  download section** — it never fires the download itself.
- **After** the transition, clicking Share uses the **Web Share API** with
  a graceful fallback (copy the canonical URL).
- **If JavaScript is unavailable, the Guide/Tool stays shown** (the swap is
  a progressive enhancement; the anchor still works).

**When the article has no downloadable resource:**

- **Do not render an empty Guide/Tool slot.**
- Show the **Share** button once the reader reaches ~the final 25%.
- Before that point, the bar carries only the available media actions and
  Close.
- Share fades into its reserved place **without a disruptive layout
  shift**; the bar stays stable and visually balanced.

#### Media availability — every combination

Only render actions with valid targets. Close is always present (omitted
from the table). "Threshold" is ~the final 25%.

| Article has | Before threshold | After threshold |
| --- | --- | --- |
| video + audio + resource | Watch · Listen · Guide | Watch · Listen · Share |
| video + audio, no resource | Watch · Listen | Watch · Listen · Share |
| video + resource | Watch · Guide | Watch · Share |
| audio + resource | Listen · Guide | Listen · Share |
| video only, no resource | Watch | Watch · Share |
| audio only, no resource | Listen | Listen · Share |
| resource only | Guide | Share |
| no media, no resource | *bar not rendered* (unless Share-only is explicitly enabled) | — |

#### Layout and alignment

**Mobile — a native bottom-toolbar model.** Available media buttons form a
**left-aligned action group** starting at the left edge of the bar, with
**consistent gaps within the group**. The **Close control stays pinned to
the far right**, with **flexible empty space** between the action group and
Close. This matters most when an article has only one media action: a lone
Watch or Listen sits at the **left**, never centered in the toolbar, and is
**not stretched** across the full width.

```
Video only:        Watch                          (×)
Audio only:        Listen                         (×)
Video + audio:     Watch · Listen                 (×)
Video + tool:      Watch · Guide                  (×)
Audio + tool:      Listen · Guide                 (×)
After threshold:   Watch · Share                  (×)
             or:   Listen · Share                 (×)
```

Do not center a single media button in the full toolbar, and do not
stretch one button across all available width (unless that behavior is
specifically approved later). The layout is: a left-aligned action group,
a right-aligned Close, consistent gaps within the group, and flexible
space between the group and Close.

**Desktop.** Keep the bar centered within its max width. Actions may remain
grouped together, with Close **visually separated and secondary**. Never
leave an empty button slot.

#### Article configuration model

Conceptually the bar is configured per article by *which targets exist*.
The current component exposes that as props; the intended fields map as
follows (name the concept in review; use the prop when authoring):

| Concept | Meaning | Current prop |
| --- | --- | --- |
| `videoTarget` | id of the video section → show **Watch** | `watch={{ target, label, shortLabel? }}` |
| `audioTarget` | id of the podcast section → show **Listen** | `listen={{ target, label, shortLabel? }}` |
| `toolTarget` / `toolLabel` | id + label of the download section → show **Guide/Tool** before the threshold | `tool={{ target, label, shortLabel? }}` |
| `shareEnabled` / `shareThreshold` | turn on Share and set the threshold | `share={{ url, title, label? }}` + `swapAt` (default `0.75`) |
| `showMediaBar` | render the bar at all | render (or omit) the component; `revealAt` sets when it appears |

Decision logic:

- `videoTarget` present → show **Watch**.
- `audioTarget` present → show **Listen**.
- `toolTarget` present → show **Guide/Tool** before the threshold, **Share**
  after it.
- no `toolTarget` + sharing enabled → introduce **Share** at the threshold.
- no valid targets → **do not render** the bar.

Authoring example (mount in the article body, after the media it points
at):

```mdx
import ArticleMediaBar from '../../components/article/ArticleMediaBar.astro';

<ArticleMediaBar
  slug="/what-makes-a-church-a-church/"
  watch={{ target: 'watch-the-five-ws', label: 'Watch' }}
  listen={{ target: 'listen-the-first-church', label: 'Listen' }}
  tool={{ target: 'get-the-guide', label: 'Get the Guide', shortLabel: 'Guide' }}
  share={{ url: frontmatter.canonical, title: frontmatter.title }}
/>
```

| Prop | Purpose |
| --- | --- |
| `slug` | required; emitted in analytics event data and keys the dismissal storage |
| `watch` / `listen` / `tool` | each `{ target, label, shortLabel? }`; `target` is the id of the on-page `<section>`/wrapper to scroll to, `shortLabel` is the narrow-width label. Omit an action the article doesn't have. `tool` is the Guide/Tool half of the contextual slot |
| `share` | optional `{ url?, title?, label? }`. With `tool` also set, it is the action the Guide/Tool crossfades to at the threshold; without `tool` it is the Share introduced at the threshold. Native share sheet on mobile (`navigator.share`), copy-link fallback on desktop. `url`/`title` fall back at runtime to the page's canonical link and title — pass `frontmatter.canonical` / `frontmatter.title` to be explicit |
| `eyebrow` | desktop lead-in label before the actions; defaults to "Explore this article" |
| `revealAt` | fraction scrolled before the bar appears (0–1); default `0.2` |
| `swapAt` | the share threshold — fraction of the article at which Guide/Tool → Share (0–1); default `0.75` |
| `headerOffset` | px left above a target when scrolling to it; default `24` (the site header is not sticky today, but this keeps targets clear of any future sticky header) |

#### Anchor requirements

Every enabled action must point at a **stable anchor on the same article**:
Watch → the video section, Listen → the podcast section, Guide/Tool → the
existing resource/download section. Use descriptive ids on the media
wrappers (`watch-the-five-ws`, `listen-the-first-church`, `get-the-guide`),
not generic ones, and pick names that won't collide with a heading's
github-slugger auto-slug. If you rename a section, update the matching
target. **Do not** link the bar directly to an external podcast platform
(Spotify/Apple/YouTube) and **do not** trigger a file download from the
bar — it always **scrolls to the embedded section first**.

#### Share behavior

Share uses the **current article title and canonical URL**. Prefer the
**Web Share API**; provide a graceful fallback (copy the canonical URL,
with a brief "Copied" state). Track Share **separately** from the media and
tool actions (see analytics).

#### Analytics

The bar pushes to the site's `window.dataLayer` (same convention as
`ecosystem-tracking.js` and `intro-video.js`), so events flow the moment
GA4/GTM is wired up — no new provider. Standard event names:

- `article_media_bar_view`
- `article_media_bar_watch`
- `article_media_bar_listen`
- `article_media_bar_tool`
- `article_media_bar_share`
- `article_media_bar_swap`
- `article_media_bar_dismiss`

Each event should carry: the **article slug**, the **action type**, the
**target id** where relevant, **whether a downloadable resource exists** on
the article, and the **current scroll stage** where useful (e.g. before vs
after the share threshold). Share additionally records its method
(`web_share` vs `copy`).

#### Accessibility and behavior invariants

Preserve these for **every** configuration:

- minimum **44px** tap targets;
- keyboard accessible, with **visible focus states**;
- **reduced-motion** support (crossfade and smooth-scroll become instant);
- **no autoplay** of video or audio;
- **no horizontal scrolling** at any width;
- **mobile safe-area** support (`env(safe-area-inset-bottom)`);
- **stable layout during transitions** (no jump/resize on the swap);
- **no wrapped button labels**;
- targets are not hidden behind a sticky header (`headerOffset`);
- **graceful behavior with no JavaScript** (anchors still work; Guide/Tool
  stays shown).

#### Scope and compliance status

**Scope (opt-in, not sitewide).** The bar is mounted from the article body
on purpose — that is what keeps it on the intended article. It is **not**
wired into `ArticleLayout`. Add it deliberately per article, following the
policy above. A later pass could lift it into the layout behind an opt-in
frontmatter flag (e.g. `media_bar:`) once measurement justifies it; until
then, keep it article-scoped.

**Current implementation vs this policy.** The shipped `ArticleMediaBar`
follows most of the policy (real-target-only rendering, the Guide→Share
crossfade with stable width and once-per-session behavior, no-JS Guide
default, anchor-only scrolling, Web Share + copy fallback, and every
accessibility invariant). Known gaps to reconcile before calling it fully
compliant across all article types:

1. **Mobile layout** stretches the media buttons to fill the width equally
   (`.amb__item { flex: 1 1 0 }`) instead of the left-aligned natural-width
   group + flexible space + right Close described above. Fixes: don't grow
   the items, left-align the action group, push Close right with an auto
   margin / spacer.
2. **Tool event name**: the tool action currently emits
   `article_media_bar_guide`, not the standard `article_media_bar_tool`.
   Rename for consistency with this policy (or document the alias).
3. **No-tool Share timing**: with `share` but no `tool`, Share currently
   renders as an always-on action from `revealAt`, not introduced at the
   threshold. Gate the no-tool Share on `swapAt` so it appears in the final
   quarter, matching the resource-less rule above.
4. **Analytics payload**: events currently carry `article_slug` (+
   `target_type`/`target_id`, and `method` on Share); they do **not** yet
   include whether a downloadable resource exists or the scroll stage. Add
   those fields.
5. **Config surface**: the component takes prop objects (`watch`/`listen`/
   `tool`/`share` + `swapAt`) rather than the flat `videoTarget`/
   `audioTarget`/`toolTarget`/`shareEnabled`/`shareThreshold`/`showMediaBar`
   field names. The mapping table above is the source of truth; either name
   is acceptable as long as behavior matches, but a future refactor may
   align the names.

#### Live rollout

The bar is deployed **only** on the articles below (each configured to the
real media that article actually has — no fabricated Watch/Listen targets;
an action appears only where a real embed/download exists):

| Article | Actions | Notes |
| --- | --- | --- |
| What Makes a Church a Church? | Watch · Listen · Guide | reference implementation |
| Four Fields of Kingdom Growth | Watch · Listen · Guide | full config (existing video + Toolbox PDF + Addison episode) |
| The Three Circles Gospel Presentation | Watch · Listen · Share | existing video + "Lost and Found Party" episode |
| What Makes a Church Healthy | Listen · Guide | Right-Hand guide + "Two Church Model" episode (Guide→Share at threshold) |
| How to Multiply Disciples and Churches | Listen · Share | "Why Just Make Disciples Isn't Enough" |
| How to Share the Gospel | Listen · Share | "How to Actually Have Spiritual Conversations" |
| Understanding Biblical Discipleship | Listen · Share | "Reading the NT Backwards"; article converted `.md` → `.mdx` for the components |
| Discover the 12 Disciples of Jesus | Guide · Share | printable chart download (no H3X episode exists for this cluster → no Listen) |

**Wave 1 rollout, 2026-08-04.** Podcast-only bars (How to Multiply, How to
Share the Gospel, Understanding) carry no Watch because no real companion
video exists yet — leave the `watch` prop off until one does, and the
button lights up automatically. **Deferred from Wave 1: 7 Stories of Hope**
— it has no video, no matching H3X episode, and no downloadable file, so a
Share-only bar wasn't worth it; revisit once a walkthrough video or a
facilitation-guide PDF exists. See MEDIA rollout waves in the review notes;
Waves 2–3 follow the same "real targets only" rule.

## CTA behavior and fallback

See CTA_GUIDE.md. Summary: `article_cta` picks one of three types
(`tool` = Practice, `lab` = Lab, `community` = Tribe) or `none`, and a
`placement` (`inline` for new articles, `end` for the fallback). No block
at all → editorial articles get the default Lab CTA at the end; utility
pages get none. New articles set `placement: inline` and place
`<ArticleCTAInline>` in the body (see "Adding a new article").

## Adding a new article — example

**New editorial articles are authored as `.mdx`** (so they can carry the
mid-article CTA) and follow the two layout defaults below: the opening
answer lives in the frontmatter `intro`, and the CTA is placed inline in
the body. See "New-article protocol" at the end of this section.

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
intro: >-
  The one opening paragraph that answers the reader's main search intent
  in the first sentence. The layout renders it above the table of
  contents.
related_articles:
  - "/an-existing-article/"
article_cta:
  type: lab
  placement: inline
  stakes_headline: "What it costs the reader to stop at reading."
  bridge_copy: "One sentence bridging the article to practice."
status: "published"
migration_priority: "unknown"
---
```

The body imports the inline CTA and drops it at the article's pivot —
there is no opening `ArticleIntro`, because the frontmatter `intro`
already carries the answer above the TOC:

```mdx
import ArticleCTAInline from '../../components/article/ArticleCTAInline.astro';

The article opens straight into its content and first `##` sections.

## First section

…enough for the reader to know what to do…

<ArticleCTAInline frontmatter={frontmatter} />

## The section where it turns to practice

…
```

Images get real alt text; the rehype pipeline adds dimensions and lazy
loading automatically.

### New-article protocol (both are the default)

1. **Intro in frontmatter, not inline.** Put the opening search-intent
   paragraph in `intro` so it renders above the TOC. Fall back to an
   inline `<ArticleIntro>` *only* when that opening genuinely needs an
   inline link or bold (a plain string can't carry either).
2. **CTA inline, at the pivot.** Set `article_cta.placement: inline` and
   place `<ArticleCTAInline frontmatter={frontmatter} />` where the
   article turns from "what/why" to "how/now" (often a third to halfway
   down). Keep `placement: end` only where mid-article reads awkwardly —
   a short single-idea piece, or a numbered listicle where the CTA
   belongs after the list. See CTA_GUIDE.md, "Placement".

(The `placement` schema default stays `end` so the many pre-protocol
articles that have no inline CTA in their body keep rendering one at the
end. "Inline by default" is an authoring convention for new pages, not a
schema default — setting `inline` without placing the component would
leave a page with no CTA.)

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
   document as an `.mdx` file, following the new-article protocol (intro
   in frontmatter, CTA placed inline — see "Adding a new article"); the
   writing follows EDITORIAL_VOICE.md for voice. Frontmatter `status`
   stays `migrated-draft` (or `migrated` for touched legacy pages) while
   in review.
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
- [ ] **Intro in frontmatter** — the opening search-intent paragraph is
      in the `intro` field (renders above the TOC), not an inline
      `<ArticleIntro>`. Inline is allowed only when the opening needs a
      link/bold; never set both.
- [ ] **CTA placed inline** — `article_cta.placement: inline` with
      `<ArticleCTAInline frontmatter={frontmatter} />` at the article's
      pivot, so exactly one CTA renders mid-flow. `placement: end` only
      for a short single-idea piece or a listicle (CTA after the list).
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
