# SEO Checklist

Applies to every migrated page. Use this when reviewing a page before
moving its status from `draft-migrated`/`migrated` to `published`.

## Per-page

- [ ] `title` is set and under ~60 characters where possible.
- [ ] `description` is set, unique, and under ~155 characters.
- [ ] `canonical` matches the live production URL exactly (protocol,
      domain, trailing slash).
- [ ] `slug` matches the original WordPress path exactly (or is logged
      in `REDIRECTS.md` if it can't be).
- [ ] Open Graph title/description/URL render (view page source).
- [ ] Open Graph image set if one exists for the page.
- [ ] Article schema present for articles (`type="article"` on
      `ArticleLayout`); WebPage schema present for hubs/tools/homepage.
- [ ] Heading structure is a single `<h1>` (the title) followed by
      logical `<h2>`/`<h3>` — no skipped levels.
- [ ] At least one internal link to a parent hub (if applicable).
- [ ] 3–5 related article links via `RelatedArticles`.
- [ ] Related tool link(s) via `ToolCTA` where relevant.
- [ ] One clear "next step" link.
- [ ] All internal links are plain `<a href>` — nothing hidden behind
      JavaScript-only navigation (`RelatedArticles`/`ToolCTA`/
      `Breadcrumbs` all render server-side HTML anchors).
- [ ] `status: source-pending` pages carry `noindex` (handled
      automatically by `ArticleLayout`/`ToolLayout`/`HubLayout`/
      homepage) so placeholders can't get indexed if accidentally
      deployed.
- [ ] Any media referenced (images/PDFs) resolves at its preserved path.

## Site-wide

- [ ] `astro.config.mjs` `site` matches the production domain exactly.
- [ ] `trailingSlash: 'always'` and `build.format: 'directory'` remain
      set (matches WordPress's trailing-slash URLs).
- [ ] Sitemap (`@astrojs/sitemap`) generates and includes every
      published page, no draft/placeholder pages leaking through once
      real content lands.
- [ ] `robots.txt` points at the real sitemap URL and doesn't block
      anything it shouldn't.
- [ ] No orphan pages — every page reachable via at least one internal
      link (crawl check before launch).

## Do not do in Phase 1–2

- Do not rewrite tier-1 article body copy wholesale.
- Do not merge near-duplicate articles (e.g. the two "apostle" articles)
  even if they look redundant.
- Do not change any slug to "clean it up."
- Do not remove headings/sections from a performing page without
  confirming via GSC data that they're not driving rankings.
