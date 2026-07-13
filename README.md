# Multiplying Disciples

The Astro site behind [multiplyingdisciples.us](https://multiplyingdisciples.us)
— a practical disciple-making library: tools, articles, and next steps
for evangelism, discipleship, and church planting movements, for
ordinary Christians who want to obey Jesus by making disciples.

## Running the site

```bash
npm install
npm run dev        # local dev server
npm run build      # astro check + production build to dist/
npm run preview    # serve the production build locally
```

Deployed on Vercel as a fully static build. Redirects live in
`vercel.json` (documented in REDIRECTS.md).

## Where things live

- `src/content/articles/` — all articles (`.md`/`.mdx`); routing is
  driven by each entry's `slug` frontmatter, not the filename.
- `src/content/hubs/` — topic hub pages; `src/content/field-notes/` —
  real, approved field stories (none live yet).
- `src/layouts/ArticleLayout.astro` — the one article layout;
  `src/components/` — shared + article components;
  `src/styles/` — `global.css` (tokens) and `article.css`.
- `public/wp-content/…` — preserved WordPress media paths (never
  rename; see REDIRECTS.md → "Media paths").

## Documentation index — one source of truth per topic

New here (human or Claude session)? Start with
[REPOSITORY_PLAYBOOK.md](REPOSITORY_PLAYBOOK.md) — the orientation
guide to the principles behind everything below. The documents in this
table remain the source of truth for their topics.

| Topic | Document |
| --- | --- |
| Design system (colors, type, spacing, imagery, a11y) | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) |
| Article system, frontmatter, editorial workflow, pre-publish checklist | [ARTICLE_SYSTEM.md](ARTICLE_SYSTEM.md) |
| Field Note authoring template | [FIELD_NOTE_TEMPLATE.md](FIELD_NOTE_TEMPLATE.md) |
| End-of-article CTAs (Practice / Lab / Tribe) | [CTA_GUIDE.md](CTA_GUIDE.md) |
| Component inventory | [COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md) |
| Navigation & menu structure | [NAVIGATION_MAP.md](NAVIGATION_MAP.md) |
| Site search | [SEARCH_SYSTEM.md](SEARCH_SYSTEM.md) |
| Content roadmap, clusters, production queue, gap analysis | [CONTENT_CLUSTER_ROADMAP.md](CONTENT_CLUSTER_ROADMAP.md) |
| Per-article status ledger | [CONTENT_AUDIT.md](CONTENT_AUDIT.md) |
| Internal linking rules & bridge map | [INTERNAL_LINKING_PLAN.md](INTERNAL_LINKING_PLAN.md) |
| Ecosystem / business strategy, funnels, tracking | [ECOSYSTEM_GROWTH_STRATEGY.md](ECOSYSTEM_GROWTH_STRATEGY.md) |
| URLs, GSC data, protected pages | [URL_INVENTORY.md](URL_INVENTORY.md) |
| Redirects (incl. media paths) | [REDIRECTS.md](REDIRECTS.md) |
| Launch gate & rollback | [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) |
| Media file status (temporary, until the last files land) | [MEDIA_ACQUISITION_CHECKLIST.md](MEDIA_ACQUISITION_CHECKLIST.md) |

Recent one-time records still at root: [SITE_AUDIT.md](SITE_AUDIT.md)
(the 2026-07-12 consistency pass) and
[DOCUMENTATION_AUDIT.md](DOCUMENTATION_AUDIT.md) (the audit behind
this structure) — both move to the archive once their branches merge.

Completed migration-era records live in
[docs/archive/](docs/archive/README.md). Where an archived file
disagrees with a document above, the document above wins.
