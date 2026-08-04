# REPOSITORY_PLAYBOOK.md

**Read this first.** This is the orientation document for anyone — especially
future Claude sessions — working on multiplyingdisciples.us. It captures the
design decisions, principles, and rules established across the WordPress →
Astro migration, the field-manual redesign, the 2026-07 sitewide consistency
pass, and the content-cluster strategy work, so that new sessions evolve the
site in the same direction instead of rediscovering (or contradicting) these
decisions.

This playbook is the *why and how to think*. The detailed *what* lives in the
single-source-of-truth documents indexed in README.md. **Where this playbook
and a source-of-truth doc disagree, the source-of-truth doc wins — fix the
disagreement rather than working around it.**

*Last verified against the repository: 2026-07-13 (production build passing,
69 pages; every file, route, and frontmatter field named below checked
against `src/`).*

---

## 1. What this site is (and is not)

- **It is a practice-first field manual** for ordinary Christians who want to
  obey Jesus by making disciples. The 2026-07-11 content simplification
  deliberately moved the site *away* from "disciple-making encyclopedia" — 29
  thin/generic articles were removed and redirected (see
  docs/archive/CONTENT_SIMPLIFICATION_REMOVAL_MANIFEST.md). Do not drift back
  toward volume-for-volume's-sake.
- **It is not a ministry brochure, and not a random blog.** Target feel:
  *"Simple biblical tools for ordinary disciples who want to obey Jesus and
  multiply."*
- **It is one node in an ecosystem** (ECOSYSTEM_GROWTH_STRATEGY.md):
  Multiplying Disciples attracts the curious → Obey.Tools reveals the obedient
  → CoVo Multipliers trains the faithful → WhatsApp keeps them practicing.
  This site's job is search capture, clear answers, and *routing* — not doing
  everything itself. Commands of Christ content, for example, deliberately
  lives on obey.tools; this site links there rather than growing a rival set.
- **Audience — four visitor types** (ECOSYSTEM_GROWTH_STRATEGY.md): Bible
  Learners (broad curiosity, e.g. the 12 Disciples page), Evangelism
  Learners, Disciple-Making Practitioners, and Movement Practitioners /
  Leaders. Each has a defined funnel path and CTA weight — broad Bible pages
  get soft CTAs, leader pages get community/training CTAs.
- **The operating line:** *Rank broad. Answer fast. Route wisely. Train the
  obedient. Track fruit.*
- **The governing question for every page:** *What obedient step should this
  reader take next?* If a page can't answer that, it isn't finished. Traffic
  is not the win; moving the right people from curiosity to obedience is.

## 2. Repository map

Astro 7, fully static output, deployed on Vercel. `npm run dev` to work,
`npm run build` (= `astro check` + build) to verify, `npm run preview` to
serve the build.

| Path | What it is |
| --- | --- |
| `src/content/articles/` | all articles + utility pages (`.md`/`.mdx`); **routing comes from each entry's `slug` frontmatter (the exact original WordPress path), never the filename** |
| `src/content/hubs/` | 10 topic hub pages |
| `src/content/field-notes/` | real field stories; render nothing unless `approved: true` |
| `src/content/tools/` | empty today; schema wired, indexes/renders automatically when entries exist |
| `src/content.config.ts` | **the frontmatter source of truth** — all collection schemas, heavily commented |
| `src/pages/[...slug].astro` | one catch-all route rendering articles, tools, and hubs by `slug` |
| `src/pages/` | homepage, `/kingdom-ministry-training/`, `/stickers/`, and `/starter-tools/` (bespoke landing pages, hand-indexed for search and title-mapped in `RelatedArticles.astro`), `/blog/`, `/search/` (+ `search-index.json.ts`), 404 |
| `src/layouts/` | `BaseLayout` (shell/SEO), `ArticleLayout` (the ONE article layout), `HubLayout`, `ToolLayout` |
| `src/components/` | shared UI; `src/components/article/` = MDX article components (see COMPONENT_INVENTORY.md) |
| `src/styles/` | `global.css` (tokens + authorable patterns), `article.css` (article layer) |
| `src/lib/` | `labs-feed.js` (CoVo live labs), `ecosystem-tracking.js`, `site-search.js`, `image-dimensions.mjs` + `rehype-img-dimensions.mjs` (zero-CLS images), `intro-video.js` |
| `src/data/` | `site.ts` (canonical constants: domain, socials, CoVo URLs), `navigation.ts` (menu data) |
| `public/wp-content/…` | preserved WordPress media paths — **never rename** |
| `vercel.json` | executable redirects (documented in REDIRECTS.md); `api/gone.js` serves true 410s |
| `astro.config.mjs` | canonical domain, `trailingSlash: 'always'`, sitemap filter, MDX, image rehype plugin |
| `docs/archive/` | historical records, not guidance — living root docs win on any conflict |

## 3. Non-negotiable integrity rules

These are the most-enforced rules in the repo's history. Multiple sessions
have specifically removed content that violated them.

1. **Never invent testimonials, anecdotes, field stories, quotes, names,
   locations, outcomes, or numbers.** Several commits exist solely to strip
   invented anecdotes from articles. The homepage "Stories From the Field"
   slot renders *nothing* (a source comment marks the spot) until one real,
   approved quote naming a specific action exists. An empty slot always beats
   invented copy or a visible placeholder.
2. **Field Notes are real or they are nothing.** They live in
   `src/content/field-notes/` with `approved: false` until the person involved
   has approved the wording; unapproved or missing notes render nothing and
   the article must look complete without them (FIELD_NOTE_TEMPLATE.md).
3. **No urgency theater.** No invented scarcity, no exclamation-mark hype.
   Seat counts and lab dates in Lab CTAs come live from the CoVo feed
   (`src/lib/labs-feed.js`) — never hardcoded.
4. **No invented search volume.** Every keyword/traffic claim is classed as
   GSC-evidenced, redirect-equity, structural, or `hypothesis`
   (CONTENT_CLUSTER_ROADMAP.md follows this rigorously). Don't write
   "high-volume keyword" unless GSC or a research tool actually shows it.
5. **Biblical/historical accuracy over color.** The 12 Disciples article got a
   dedicated accuracy pass: conflations corrected, church legends explicitly
   flagged as legends. Keep that standard — flag tradition as tradition.
6. **CTA bridge copy never promises specific lab content.** Two separate
   sessions had to strip article-specific promises from Lab CTA copy because
   lab content varies. Keep bridge copy generic about what a lab contains.

## 4. Documentation discipline

The 2026-07-12 documentation audit (now archived at
docs/archive/DOCUMENTATION_AUDIT.md) collapsed 44 root docs into the living
set indexed in README.md, each the *one obvious place* for its topic. Rules
going forward:

- **One source of truth per topic. Never create a second document covering
  ground an existing doc owns.** Extend the existing doc. (This includes
  suggested-but-redundant filenames: there is no SEO_STRATEGY.md because SEO
  rules live in ARTICLE_SYSTEM.md + URL_INVENTORY.md + REDIRECTS.md + the
  roadmap; no COPY_GUIDE.md because voice rules live in EDITORIAL_VOICE.md
  (the single source of truth for voice) and CTA-specific copy in
  CTA_GUIDE.md; and so on.)
- **When you change a system, update its doc in the same branch.** The docs
  describe current reality, not history.
- **Archive, never silently delete.** Completed records go to
  `docs/archive/` with a row in its README. Where an archived file disagrees
  with a living doc, the living doc wins.
- **README.md is the entry point** — keep its documentation index current.
- MEDIA_ACQUISITION_CHECKLIST.md is temporary: archive it once the last
  outstanding media files land.

## 5. Design system principles

Full token reference: DESIGN_SYSTEM.md. Tokens in `src/styles/global.css`,
article layer in `src/styles/article.css`. The homepage is the reference
implementation; every other surface reuses its tokens.

The principles behind the tokens:

- **"Rooted Harvest" palette, and restraint above all.** The two greens
  (Primary `#174c3c`, Growth `#4f9d69`) carry the weight; Harvest Gold and
  Clay are minor accents only (borders, labels, dots, edges) — never a main
  fill. **Do not add new brand colors.** Pages are Warm Paper (`#f7f3ea`),
  never pure white; white appears only as card fill.
- **One shadow token** (`--fm-shadow`), one hero-image shadow. Never stack or
  darken beyond these.
- **Typography is quiet:** system sans for everything; mono only for
  eyebrows/labels/meta (never body); serif (Lora, article pages only) only for
  verbatim Scripture and pull quotes. Do not add font sizes outside the
  established scale.
- **Restrained emphasis is the house style.** "Not every section becomes a
  card — most paragraphs stay paragraphs." Component-family semantics: white
  card + border + shadow = highlight; Soft Sage wash = "do this / read this";
  colored left/top rule + pale wash = caution/quote.
- **Hand-drawn underlines** (`.fm-underline`, tapered brush strokes — the
  wavy squiggles were rejected) are for single words/short phrases only, match
  the underlined word's own text color, and in articles appear only in
  callouts/headers/quotes — never body text.
- **Images:** real ministry photographs, never stock-feel decoration. 8px
  radius everywhere. Every image gets real `width`/`height` (build-time lookup
  + rehype plugin) — zero layout shift is a hard requirement. Heroes load
  eager/`fetchpriority=high`; everything else lazy. Tall heroes crop to 3:2.
  Captions add context or credibility, never describe what's visible.
- The homepage's editorial arc was hard-won over many iterations: **one idea,
  one next step** in the hero; single-line headline; matched button rows. A
  "final polish pass" that added more borders/rhythm changes was *reverted* —
  when in doubt, do less.

## 6. Article and hub rules

Full reference: ARTICLE_SYSTEM.md (including the hub-authoring section and
the pre-publish checklist). The essentials future sessions get wrong at
their peril:

- **There is exactly one article layout** — `ArticleLayout.astro`, the
  field-manual system, for all `.md` and `.mdx` articles. The old two-system
  split is dead; never reintroduce per-article layout forks or the retired
  chrome (film-grain thumbnails, gold hub eyebrows with datelines, dark
  "movement multiplier" CTA bands, full-title breadcrumbs).
- **The hero is for people, not search engines.** `display_title` is the
  short human H1; `title` stays the long SEO/meta title. Breadcrumb is
  `Home / <Hub>`, never the article's own title. No tag stacks, no category
  pills, no SEO clutter in the hero. `hero_eyebrow` is rare — only when it
  adds context the breadcrumb/H1 don't.
- **Component restraint budgets are rules, not suggestions:** one
  `ArticleIntro`; 0–2 `InsightCard` (~1 per 600–900 words max); 0–1
  `PracticeCard`; 0–1 `WarningCard`; 1 `PullQuote` (2 only in very long
  articles); `ScriptureBlock` for verbatim Scripture only (paraphrase stays a
  plain blockquote).
- **Routing is frontmatter-driven:** `slug` (the exact original WordPress
  path) drives the URL, not the filename. TOC auto-renders at 3+ H2s
  (`hide_toc` to opt out). `exclude_from_blog: true` marks utility pages
  (skip share row, reading meta, blog index, auto-CTA);
  `exclude_from_search: true` is separate and rarer (legal/contact pages).
- **Hubs:** pillar first in `key_articles`; `next_step` points at the
  cluster's primary CTA destination, never the homepage; add every newly
  published article to its hub.
- Article-specific components (`DiscipleCard`, `RoleFact`) stay
  article-specific — don't generalize them without cause.
- **The sticky media bar (`ArticleMediaBar`) is a per-article policy, not a
  default.** Add it deliberately, article by article — never automatically
  to every article. It renders only the actions that have a real on-page
  target (Watch/Listen/Guide-or-Tool), transitions the Guide/Tool to Share
  after ~the final 25% (or introduces Share when there is no tool), and does
  not render at all when an article has no video, audio, or downloadable
  resource. It only ever scrolls to an embedded section — it never links to
  an external platform or fires a download. Full policy (combinations
  matrix, mobile/desktop alignment, config model, analytics, accessibility
  invariants, and the current-compliance gaps) lives in ARTICLE_SYSTEM.md,
  "The sticky media bar", which also carries the live-rollout list. It is
  live on 15 cornerstone articles as of the Wave 1-2 rollout (2026-08-04);
  each bar is configured to the real media that article has (no fabricated
  Watch/Listen targets), and only articles with a real video, H3X episode,
  or downloadable qualify.
- Bold key phrases in body text ("bold-keyword standard") is an accepted
  scanning aid from the leadership-batch rollout; use it sparingly and
  consistently.
- **Editorial workflow:** roadmap entry → draft (`status: migrated-draft`) →
  Mark approves copy → pre-publish checklist (in ARTICLE_SYSTEM.md) → flip
  `status: published`, add to hub `key_articles`, add ≥1 inbound sibling
  link, confirm CTA matches the cluster table. Don't write pages that aren't
  on the roadmap without adding them there first.

## 7. CTA rules

Full reference: CTA_GUIDE.md.

- **At most one CTA per article, ever. Never stacked.** Three renderable
  types only: `tool` (Practice), `lab` (Lab — the default), `community`
  (Tribe), plus `none`. No `article_cta` block → editorial articles get the
  default Lab CTA; utility pages get none.
- Choose by asking what the reader should *actually do next*: try something →
  tool; practice with guidance → lab; find ongoing people → community. The
  per-cluster assignments live in INTERNAL_LINKING_PLAN.md's CTA-flow table.
- `stakes_headline` names what it costs the reader to stop at reading —
  specific and honest, drawn from the article's own argument.
- Community/CoVo URLs come from constants in `src/data/site.ts`
  (`COVO_COMMUNITY_URL` etc.) — update the constant, never per-article links.
  Note `COVO_COMMUNITY_URL` is still a placeholder pointing at CoVo home; a
  real Field Room / WhatsApp link should replace it when confirmed.
- Outbound CoVo/ecosystem links carry `data-ecosystem-cta` tracking
  attributes and cross-domain UTM tagging (`utm_content =
  <page-slug>__<level>__<placement>`); components add these — never strip
  them. **No UTMs on same-domain internal links.**
- Each CTA type has one fixed real-photo lead image, standardized sitewide.
  A single article may override that default via `article_cta.image` +
  `image_alt` (both together) when the standard image doesn't fit its
  destination — kept rare and documented in CTA_GUIDE.md.

## 8. SEO guardrails

- **URL preservation is sacred.** Every migrated slug is the exact original
  WordPress path, `trailingSlash: 'always'`, directory build format.
  `public/wp-content/…` media paths are never renamed. Tier-1/2 URLs (by real
  GSC data, URL_INVENTORY.md) are *protected*: don't rename, merge, or heavily
  rewrite them without checking GSC. Any slug change must be logged in
  REDIRECTS.md **before** it ships; `vercel.json` is the executable copy
  (explicit `statusCode: 301`, never `permanent: true`, which Vercel makes a
  308; true 410s go through `api/gone.js`).
- **CTR before content.** The highest-leverage SEO work is title/meta/snippet
  fixes on pages that already earn impressions (12 Disciples: 116k impressions
  at 0.28% CTR). "Fixing titles on four pages out-earns any ten new articles
  this quarter." Check CONTENT_CLUSTER_ROADMAP.md Phase 1 before proposing new
  content.
- **Pillar-and-cluster architecture.** Eight clusters along one journey
  (Meet Jesus → Share the Gospel → Make Disciples → Train → Practice Church →
  Multiply Leaders → Multiply Churches), each with one pillar, one hub, one
  primary CTA, and one forward bridge to the next cluster. New articles slot
  into a cluster or don't get written. Topics deliberately left ungapped
  (DBS, apologetics, devotionals, book reviews, Strategy Coordinator) stay
  ungapped — they dilute the practical lane.
- **Linking rules** (INTERNAL_LINKING_PLAN.md): pillar ↔ supporting always
  bidirectional; 3–6 in-prose contextual links per article (the related box
  is a floor, not the strategy); one forward bridge per article; no orphans;
  tools are terminals, not thoroughfares. All internal links are plain
  server-rendered `<a href>` — true by construction; keep it that way.
- Per-page pre-publish checklist lives in ARTICLE_SYSTEM.md (title ≤60 chars,
  unique description ≤155, exact canonical, single H1, etc.).
- `/search/` is noindex and excluded from the sitemap. Sitemap/robots
  invariants are listed at the bottom of ARTICLE_SYSTEM.md.
- **Launch gate:** DNS cutover from WordPress is explicitly out of scope
  until LAUNCH_CHECKLIST.md passes and a human signs off. Never "launch."

## 9. Copy and voice rules

- **EDITORIAL_VOICE.md is the single source of truth for voice, and reading
  it is mandatory before drafting or substantially editing any public-facing
  prose** — articles, hubs, landing pages, resources, CTA copy, email. It
  owns tone, diction, rhythm, the AI-pattern blocklist, and the
  before-publishing check. Do not restate its rules here or in any other doc;
  when voice guidance disagrees with it, EDITORIAL_VOICE.md wins and the fix
  is to update EDITORIAL_VOICE.md, not to fork a second copy.
- Site-specific mechanics that *support* the voice but are not covered in
  EDITORIAL_VOICE.md, and so stay here:
  - Headlines are human, not keyword strings — that's what `display_title`
    exists for. Answer the search intent fast (definition or answer above the
    fold), then deepen.
  - Don't repeat the H1 as the first body heading (a whole cleanup pass
    removed these). Body headings start at `##`, no skipped levels.
  - Broad Bible-curiosity pages (12 Disciples, apostle meaning) get *soft*
    CTAs: route to practical disciple-making articles first, heavy asks never.
- CTA copy (`stakes_headline`, bridge copy) follows EDITORIAL_VOICE.md for
  voice; its CTA-specific mechanics live in CTA_GUIDE.md.

## 10. Component and engineering rules

- **Check COMPONENT_INVENTORY.md before building anything.** Reuse
  `ArticleList` for any article listing (blog index and hubs already share
  it). Plain `.md` bodies use the global CSS patterns (`.callout` family,
  `.steps`, `.resource-grid`, `.button-row`) — same visual family as the MDX
  components.
- **Bias against dependencies.** The image-dimension reader is
  dependency-free by design; MiniSearch was adopted only after Pagefind was
  explicitly rejected (binary dep, post-build step, 100KB+ for ~60 pages).
  Justify any new package the same way.
- **JS is opt-in per page.** The site is fully static; search JS loads only
  on `/search/`, labs-feed only where a lab card renders, video JS only on
  the homepage. Never add sitewide JS casually.
- **Native HTML first, no-JS fallbacks always.** The menu drawer is a real
  dialog with a checkbox fallback; search is a real GET form; the nav
  dropdown is `<details>`. No ARIA where HTML already solves it.
- **Accessibility floor** (DESIGN_SYSTEM.md has the full list): skip link
  first, global `:focus-visible` ring, ≥44px touch targets, AA contrast
  (use the `-bright` gold/clay variants for small text on Primary Green),
  `prefers-reduced-motion` guards every animation, one `<h1>` per page.
- **Verification standard** set by the consistency pass: production build
  must pass (`npm run build` runs `astro check` too), and visual work gets a
  real-browser pass (Playwright/Chromium is preinstalled) at
  375/390/430/768/1024/1440 with horizontal-overflow and console-error
  checks. No horizontal overflow, ever.
- Resource cards keep a fixed internal order (image, label, price, button
  pinned to bottom), reserved image area, 2-up grid below 540px.
- **Analytics reality check:** tracking pushes to `window.dataLayer` exist
  (ecosystem CTAs, site search, homepage video, the article media bar's
  `article_media_bar_*` events) but are **inert until GA4/GTM is wired up**
  — no analytics service is connected in this repo today. The full
  UTM/event schema for when it is lives in ECOSYSTEM_GROWTH_STRATEGY.md.
  Search analytics deliberately never include query text (privacy decision,
  SEARCH_SYSTEM.md).

## 11. Navigation principles

Full reference: NAVIGATION_MAP.md.

- Primary nav is five items + Join-a-Lab button + search icon. The hamburger
  opens a **restrained drawer, not a mega menu**: one level of nesting, no
  accordions, mono gold section labels, plain links.
- **Exclusion is a feature.** The menu deliberately omits utility pages,
  individual articles, five of the ten hubs, Start Here, and Beliefs &
  Values — each exclusion is reasoned in NAVIGATION_MAP.md. Don't add menu
  items without that same justification; listing everything turns the menu
  into a sitemap.
- External destinations (Commands of Christ → obey.tools) get a visible
  muted domain hint ("obey.tools ↗").
- Footer: Labs · Tools · Articles · About · Contact · Privacy Policy.
  Privacy stays footer-only.

## 12. How a Claude session should work here

1. **Orient:** read README.md's index, then the source-of-truth doc(s) for
   whatever you're touching. Check CONTENT_CLUSTER_ROADMAP.md — both its
   phases and its "Open editorial & technical debt" section — before
   proposing work; it may already be queued or deliberately rejected.
   **Before drafting or substantially editing any public-facing prose, read
   EDITORIAL_VOICE.md first** — it governs how the writing sounds.
2. **Small, reviewable increments.** The history is dozens of focused PRs
   with descriptive commit subjects, frequently refined over several rounds
   of Mark's feedback. Match that: one concern per branch, plain-language
   commit messages describing the change's intent.
3. **Prohibited without explicit direction from Mark:**
   - launching (DNS cutover) or anything the launch gate covers;
   - renaming/merging/heavily rewriting protected tier-1/2 URLs;
   - touching `public/wp-content/` paths;
   - changing the canonical domain, `trailingSlash`, or build format;
   - adding brand colors, fonts, or font sizes;
   - publishing testimonials, Field Notes, or quotes (approval is his);
   - adding menu items or new external destinations;
   - removing `data-ecosystem-cta` attributes or UTM tagging;
   - deleting documentation (archive instead).
4. **When content is missing (image, quote, story), leave a marked empty
   slot** — a source comment or an unapproved Field Note — rather than
   inventing or visibly placeholding. MDX comments marking future Field Note
   insertion points must stay in place.
5. **Standard workflow before committing:**
   - [ ] `npm run build` passes (`astro check` + full static build);
   - [ ] visual changes verified in a real browser at
         375/390/430/768/1024/1440 — no horizontal overflow, no console
         errors;
   - [ ] any slug/URL change logged in REDIRECTS.md first;
   - [ ] any drafted or substantially edited prose was checked against
         EDITORIAL_VOICE.md (including its before-publishing list);
   - [ ] new/edited articles pass ARTICLE_SYSTEM.md's pre-publish checklist;
   - [ ] the owning doc(s) updated in the same branch (§4);
   - [ ] editorial copy changes called out in the commit/PR for Mark's
         review.
6. **Anything ambiguous about copy, theology, positioning, external URLs, or
   removing content goes to Mark.** Precedent: the Commands of Christ menu
   URL, hub inclusions, and testimonial slots were all owner decisions.

## 13. Open decisions that require Mark

Current as of 2026-07-13 (also tracked in the roadmap's debt section):

1. One real, approved homepage testimonial quote (slot marked in
   `src/pages/index.astro`).
2. First Field Note approvals — the system is live with zero approved notes.
3. The real CoVo Field Room / WhatsApp community URL to replace the
   `COVO_COMMUNITY_URL` placeholder in `src/data/site.ts`.
4. Launch sign-off (LAUNCH_CHECKLIST.md) — including the post-deploy smoke
   test of the 29 content-simplification redirects.
5. The 5 outstanding media files (MEDIA_ACQUISITION_CHECKLIST.md).
6. Whether `/movement-resources/strategy-coordinator/` and
   `/4-responses-to-the-gospel/` should become utility pages
   (`exclude_from_blog`) instead of editorial articles.
7. Copy approval for every article moving to `status: published`.

## 14. Future work and recommendations

The queue of record is CONTENT_CLUSTER_ROADMAP.md (Phases 1–3 plus its
"Open editorial & technical debt" section). Highest leverage, in order:

1. **Phase 1 CTR arbitrage** — title/meta/intent passes on 12 Disciples,
   Spreading-the-Gospel verses, How to Evangelize, Apostles Meaning (~129k
   combined impressions, near-zero CTR).
2. **Missing pillars** — How to Share Your Christian Testimony, How to Share
   the Gospel, How to Make Disciples, the Disciple Training pillar + new
   `/disciple-training/` hub, What Is a CPM. Plus definitional cornerstones
   (What Is the Gospel / a Disciple / an Oikos / the Commands of Christ).
3. ~~**Kingdom Ministry Training page upgrade**~~ — done 2026-07:
   rebuilt as a bespoke landing page
   (`src/pages/kingdom-ministry-training.astro`, same URL, hand-indexed
   for site search). The remaining half of the mismatch is the Disciple
   Training cluster (pillar + hub) that routes searchers into it.
4. **Editorial debt** (roadmap debt section): human `display_title`s for
   migrated legacy articles; per-article `article_cta` stakes headlines for
   the 16 articles on default Lab copy; the Muddy Boots → Clear Pathway
   merge; hub assignment for Lone Wolf and Trustworthy Leaders.
5. **Deliberately deferred, revisit only with evidence:** responsive
   `srcset` generation (WordPress-era size variants exist on disk); Pagefind
   (only if the site grows past a few hundred pages); a DBS cluster (only
   with GSC evidence after Phase 2); richer search-query analytics (privacy
   trade-off documented in SEARCH_SYSTEM.md); GA4/GTM wiring (the dataLayer
   events are ready when it happens).

The direction in one sentence: **finish the journey spine (pillars + CTR +
linking) with the same restraint, honesty, and URL discipline that got the
site this far — and never publish anything a real person didn't actually
say, do, or approve.**
