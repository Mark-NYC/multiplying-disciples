# COMPONENT_INVENTORY.md

Current inventory after the 2026-07 sitewide consistency pass.

## Layouts (`src/layouts/`)

| Layout | Purpose | Used by |
| --- | --- | --- |
| `BaseLayout.astro` | HTML shell: SEO, favicons, skip link, Header/Footer, ecosystem tracking | everything |
| `ArticleLayout.astro` | the one article layout (field-manual system) | every article via `[...slug].astro` |
| `HubLayout.astro` | topic hub: intro, key-article list, next-step CTA | all 10 hubs |
| `ToolLayout.astro` | tools collection pages | none yet (tools collection is empty) |

## Shared components (`src/components/`)

| Component | Purpose | Used by |
| --- | --- | --- |
| `SEO.astro` | meta/OG/Twitter/structured data | BaseLayout |
| `Header.astro` | logo, nav, Join-a-Lab CTA, socials, no-JS mobile menu | BaseLayout |
| `Footer.astro` | dark green footer: tagline, quick links, seal | BaseLayout |
| `Breadcrumbs.astro` | mono breadcrumb + BreadcrumbList JSON-LD | ArticleLayout, HubLayout, ToolLayout, blog index |
| `ArticleList.astro` | **new** — the shared article list row (thumbnail, title, description, meta) | blog index, HubLayout |
| header search link (in `Header.astro`) | icon link to /search/ (icon-only desktop, icon+word in mobile menu) | Header |
| `TableOfContents.astro` | "In This Article" box, auto from H2s (renders at 3+) | ArticleLayout |
| `ShareButtons.astro` | share row (FB/X/LinkedIn/email/copy) | ArticleLayout (editorial articles only) |
| `RelatedArticles.astro` | bordered related-links box | article/RelatedArticles wrapper, ToolLayout |
| `ToolCTA.astro` | "Tools for this" / hub next-step box | ArticleLayout, HubLayout |
| `CovoMark.astro` | CoVo brand mark | ForYouIfSection, ToolCTA |
| `RotatingSeal.astro` | circular-text brand seal | Footer, homepage |
| `ForYouIfSection.astro` | homepage "This is for you if…" pills | homepage |
| `HomeIntroVideo.astro` | homepage intro video (click-to-load) | homepage |

## Article components (`src/components/article/`)

| Component | Purpose | Notes |
| --- | --- | --- |
| `ArticleHero.astro` | person-first hero: headline, subhead, meta, image+caption | dimension-aware; tall images crop to 3:2 |
| `ArticleIntro.astro` | large opening paragraph | exactly one per article |
| `ArticleImage.astro` | supporting image + relevance caption | auto width/height + lazy |
| `InsightCard.astro` | key idea/definition card | label required |
| `PracticeCard.astro` | one concrete action | sage wash |
| `WarningCard.astro` | misconception/correction | clay rule |
| `ScriptureBlock.astro` | verbatim Scripture, serif | gold rule |
| `PullQuote.astro` | large serif pulled sentence | no box |
| `FieldNote.astro` | real approved field story by id; renders nothing otherwise | backed by `src/content/field-notes/` |
| `RelatedArticles.astro` | thin wrapper capping the shared box at 3 links | used by ArticleLayout |
| `ArticleCTA.astro` | the one end-of-article CTA (tool/lab/community/none) | see CTA_GUIDE.md |
| `DiscipleCard.astro` | per-disciple card (12-disciples article only) | article-specific |
| `RoleFact.astro` | APEST role fact box (APEST article only) | article-specific |

## Libraries (`src/lib/`)

| File | Purpose |
| --- | --- |
| `labs-feed.js` | single client-side integration with CoVo public-labs: homepage featured-lab section + article Lab CTA card |
| `ecosystem-tracking.js` | outbound CoVo click tracking |
| `intro-video.js` | homepage video behavior |
| `image-dimensions.mjs` | **new** — build-time intrinsic-size lookup for public/ images (PNG/JPEG/GIF/WebP, dependency-free) |
| `rehype-img-dimensions.mjs` | **new** — adds width/height + lazy/async to every markdown image |
| `site-search.js` | **new** — client search for /search/ (MiniSearch + rendering + URL sync); see SEARCH_SYSTEM.md |

## Search (see SEARCH_SYSTEM.md)

| Item | Purpose |
| --- | --- |
| `src/pages/search/index.astro` | the /search/ page (form, states, result styles) |
| `src/pages/search-index.json.ts` | build-time JSON search index from the content collections |
| `exclude_from_search` frontmatter | removes a page from the index (legal/contact/confirmation pages) |

## Deprecated / removed in this pass

| Item | Status |
| --- | --- |
| `ArticleLayoutV2.astro` | **removed** — merged into ArticleLayout (now the only article layout) |
| legacy ArticleLayout chrome (film-grain thumbnail, gold hub eyebrow with dateline, dark "Be a movement multiplier" `.cta-band`, full-title breadcrumb) | **removed** with the merge |
| `BrandSeal.astro` | **removed** — only the legacy CTA band used it |
| `renderLabsInto()` / `renderFeaturedLabInto()` + their card markup in labs-feed.js | **removed** — no callers after the merge |
| `.lab-card*`, `.featured-lab-card*`, `.cta-band__lab` CSS in global.css | **removed** — dead after the above |
| `article_system` frontmatter flag | **removed** from schema and all articles |
| `cta_variant` / `cta_heading` / `cta_body` / `cta_primary_*` / `cta_secondary_*` frontmatter fields | **removed** from schema (superseded by `article_cta`; no article used them) |
| `field-manual-article.css` | **renamed** to `article.css` (now sitewide) |

## Still-global CSS patterns (authorable from `.md` bodies)

`.callout` family, `.steps`, `.resource-grid`/`.resource-card`,
`.button-row`, `.cta-band` (used by starter-tools' in-body "Get
Training" band), `.eyebrow`, `.fm-underline`. See global.css comments.
