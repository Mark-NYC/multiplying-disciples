# SEARCH_SYSTEM.md

Lightweight site search for multiplyingdisciples.us: a build-time JSON
index plus a small client-side fuzzy search on a dedicated `/search/`
page. No hosted service, no database, no AI.

## Architecture and why

- **`/search-index.json`** (`src/pages/search-index.json.ts`) — a
  static Astro endpoint generated at build time from the same content
  collections the pages render from. Because it reads the collections
  (not the built HTML), inclusion/exclusion is driven by frontmatter,
  unpublished (`source-pending`) content can never leak in, and field
  weighting is fully controlled.
- **MiniSearch** (npm `minisearch`, zero dependencies) runs in the
  browser on the `/search/` page only. It provides prefix matching,
  typo-tolerant fuzzy matching (`fuzzy: 0.2`), and per-field boosts —
  the whole reason a library is used instead of `String.includes`.
- **`/search/`** (`src/pages/search/index.astro` +
  `src/lib/site-search.js`) — a dedicated page, not a modal: the nav
  control is a real link (works without JavaScript), the query lives in
  the URL (`?q=…`), results are ordinary `<li><a>` links, and no
  focus-trap machinery exists to get wrong.

Why not Pagefind: it would add a binary dev-dependency, a post-build
step, and ~100KB+ of JS/wasm whose default UI would need restyling
anyway — all to index ~60 pages that a 110KB-gzipped JSON handles.

## What is indexed

| Collection | Included | Notes |
| --- | --- | --- |
| articles | 50 | includes utility/landing pages like starter-tools and vision |
| hubs | 10 | title, description, intro |
| tools | 0 today | wired up; indexes automatically when entries exist |
| hand-indexed | 2 | `/kingdom-ministry-training/` and `/stickers/` — bespoke landing pages (`src/pages/`), not collection entries, so each is added as a static doc (typed Tool) in `search-index.json.ts`; keep them in sync with each page's source data |

Per document: visible title (`display_title` fallback `title`), SEO
title (only when it differs), description, all H2–H4 headings, plain-text
body (markdown/HTML/URLs stripped, capped at 8,000 chars — headings are
never capped, so deep sections stay findable), type (Article/Hub/Tool),
hub name, URL.

**Excluded:** `exclude_from_search: true` pages (currently
/privacy-policy/, /contact-us/, /elementor-10714/), any
`status: source-pending` placeholder, /404/, /blog/ and /search/
themselves (not collection entries).

## How to exclude a page from search

Add to its frontmatter:

```yaml
exclude_from_search: true
```

Independent of `exclude_from_blog` — utility pages stay searchable
unless you also set this.

## Ranking

MiniSearch field boosts: title 8 · headings 4 · description 3 ·
seo_title 2 · hub 2 · body 1, with prefix matching and fuzzy 0.2.
Multi-word queries run AND-first, falling back to OR when AND finds
nothing. On top of that, deterministic tier bonuses guarantee the
spec's ordering (exact title > title prefix > all-terms-in-title >
headings > description > body): +100 exact title, +60 title prefix,
+30 all terms in title, +8 heading hit, +4 description hit. No
traffic-based ranking (no reliable traffic data lives in the repo).

## The interface

- Nav: a magnifying-glass link in the header actions (icon-only on
  desktop, icon + "Search" full-width item in the open mobile menu),
  pointing at `/search/`.
- `/search/`: labeled `<input type="search">` in a real GET form,
  150ms-debounced instant results from 2 characters, top 10 shown with
  a "Show N more" button (50 max), quiet `<mark>` highlighting (Soft
  Sage wash), result cards showing type · hub, title, and one relevant
  excerpt — no dates, no reading time.
- URL: `?q=` synced via `replaceState`; direct `/search/?q=…` links,
  reload, back/forward, and bfcache restores all work. Enter never
  reloads the page (but the form still submits as normal GET without JS).
- Empty state suggests common searches; no-results state links to the
  full /blog/ index; Clear button resets and refocuses the input.
- The index starts fetching when the page loads so the first keystroke
  feels immediate; it is fetched at most once.

## Accessibility

Real `<label>` on the input; results are a plain `<ol>` of links (no
custom listbox, no aria-activedescendant); result count announced via
one `role="status"` `aria-live="polite"` line, updated only after the
debounce; `<mark>` styling keeps normal text color; keyboard path is
input → Clear → result links; global `:focus-visible` ring applies; no
animation added (nothing to guard for reduced motion); mobile menu
search item is a ≥44px full-width target.

## Analytics

Follows the existing `window.dataLayer` push pattern
(ecosystem-tracking.js) — inert until GA4/GTM is wired up. **No query
text is ever pushed** — events carry only names and non-sensitive
metadata:

- `site_search` (debounced 1.5s): `results_count` (0 = a no-results
  search happened).
- `site_search_result_click`: `result_position` (1-based rank of the
  clicked result), `result_type` (Article/Hub/Tool), `destination_url`
  (an on-site path).

This means individual failed queries can't be analyzed — only how
often searches fail. That trade-off is deliberate; revisit here if
richer search analytics are ever wanted.

## Sizes (measured, this build)

- `search-index.json`: **341KB raw / 110KB gzipped** (62 docs). Loaded
  only on `/search/`.
- Search page JS (MiniSearch + UI, one bundle): **22KB min / 7.5KB
  gzipped**. Loaded only on `/search/`.
- Added to every other page: one inline SVG icon link in the header
  (~0.4KB HTML). No sitewide JS added.

## SEO / deployment

`/search/` is `noindex` and filtered out of the sitemap. Everything is
static output in `dist/` — no Vercel config changes needed; verified in
the production build and preview server.

## Known limitations

- Body text is capped at 8,000 chars/page — a term that first appears
  deeper than that in a very long page (e.g. the Four Fields book page)
  matches only if it also appears in a heading, description, or title.
- Instant results require JavaScript; the no-JS experience is the page
  shell with browse links (per spec minimum).
- OR-fallback on junk multi-word queries can inflate result counts
  (fuzzy matching is generous); ranking still surfaces sensible pages
  first.
- No search across Field Notes (none are approved yet) — add a loop in
  `search-index.json.ts` when they go live, if wanted.

## Replacing or expanding later

Everything is behind three files: swap the library or ranking in
`src/lib/site-search.js`, change what's indexed in
`src/pages/search-index.json.ts`, restyle in
`src/pages/search/index.astro`. Nothing else on the site knows search
exists beyond the header link. If the site grows past a few hundred
pages, Pagefind (post-build over `dist/`) is the natural upgrade; the
nav link and `/search/` URL can stay identical.
