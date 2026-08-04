# DESIGN_SYSTEM.md

The sitewide visual system for multiplyingdisciples.us. The homepage is
the reference implementation; every other surface (articles, hubs, blog
index, utility pages, 404) reuses these tokens rather than inventing new
values. Tokens live in `src/styles/global.css` (`:root`); the article
layer's additions live in `src/styles/article.css`.

## Colors ("Rooted Harvest" palette)

| Token | Hex | Role |
| --- | --- | --- |
| `--color-primary` | `#174c3c` | Primary Green — buttons, article H1/H2, dark bands, footer |
| `--color-accent` | `#4f9d69` | Growth Green — links, icons, focus rings, "go do this" accents |
| `--color-accent-hover` | `#3d7a52` | darker Growth Green — link hover, readable green text |
| `--color-gold` | `#d8a642` | Harvest Gold — sparing accents: borders, badges, field-note rule |
| `--color-gold-text` | `#8a6416` | dark gold readable on light backgrounds (eyebrows) |
| `--color-clay` | `#bd5a22` | Clay — quote rules, live-lab dot, warning edge |
| `--color-clay-text` | `#934819` | dark clay readable on light backgrounds |
| `--color-bg` | `#f7f3ea` | Warm Paper — page background (never pure white pages) |
| `--color-surface` | `#dde8d6` | Soft Sage — cards, callouts, TOC, practice boxes |
| `--color-ink` / `--color-text` | `#1f2523` | Deep Ink — body text |
| `--color-text-muted` | `#57635c` | secondary text (passes AA on Warm Paper) |
| `--color-border` | `#dcd2bb` | hairline borders |
| `--color-clay-bright` / `--color-gold-bright` | `#f09e63` / `#ddae50` | small text on Primary Green only (AA-safe variants) |

Rules: the two greens carry the weight; gold and clay are minor accents
(edges, labels, dots) and never a main fill. White (`#ffffff`) appears
only as card fill on Warm Paper. Do not add new brand colors.

## Typography

- Font stack: system sans (`-apple-system, …`) for everything;
  `--font-mono` (system mono) for eyebrows/labels/meta only, never body
  copy; `--font-serif` (Lora, loaded on article pages only) for
  Scripture blocks and pull quotes only.
- Homepage scale: `--fs-h1/h2/h3/card-title/body/support/eyebrow`
  (fluid clamps — see global.css). Do not add sizes outside this set.
- Generic pages: `h1` 2.25rem, `h2` 1.7rem, `h3` 1.35rem.
- Article headline (`.fm-hero__headline`): `clamp(2.1rem → 2.75rem)`,
  Primary Green, max-width 34ch; 1.6rem on ≤640px.
- Article body: 1.0625rem / line-height 1.7. Intro paragraph
  (`.fm-intro`): 1.5rem desktop / 1.25rem mobile, weight 500.
- H1s on article, hub, blog, and 404 pages are Primary Green; H2s in
  article bodies are Primary Green, H3s are Deep Ink.

## Spacing and rhythm

- Article H2: 3.5rem above / 1rem below (2.75rem above on mobile).
  Article H3: 2rem above / 0.65rem below.
- Paragraphs/lists/tables: 1.25rem bottom margin; list items 0.35rem.
- Component blocks (cards, images, scripture, callouts): 2.5rem
  vertical margin; Field Note and Pull Quote get 3rem.
- Page container: `2rem 1.25rem 3rem` padding — 1.25rem is the
  standard mobile gutter everywhere.

## Content widths

| Token | Value | Used for |
| --- | --- | --- |
| `--content-max-width` | 42rem | generic page column (hubs, blog, utility) |
| `--fm-content-width` | 44rem | article reading column |
| hero image breakout | 56rem | article hero image only |
| `--site-max-width` | 60rem | footer inner, wide pages |
| `--header-max-width` | 78rem | header only |

## Radius, borders, shadows

- `--radius-button` 8px, `--radius-image` 8px, `--radius-card` 10px,
  `--radius-pill` 999px (badges/pills only).
- Borders: 1px `--color-border`; component identity edges are 3px
  colored top/left rules (gold = field note, clay = warning/quote,
  green = practice/key idea).
- Shadow: one token, `--fm-shadow: 0 3px 14px rgba(31,37,35,0.06)` for
  cards that need lift. Hero image: `0 10px 30px rgba(0,0,0,0.08)`.
  Never stack or darken beyond these.

## Buttons and links

- `.button` — Primary Green fill, Warm Paper text, 8px radius,
  hover → Deep Ink. `.button--secondary` — outlined green.
  `.button--secondary-dark` — outlined light, for dark bands.
  `.button--small` for compact contexts (header CTA).
- Body links: Deep Ink underlined; green (`--color-accent-hover`) is
  used for meta/nav link accents. External lab links carry
  `data-ecosystem-cta` tracking attributes — do not remove.

## Cards, callouts, and article components

See ARTICLE_SYSTEM.md for the full component reference. Family rules:
white card + border + `--fm-shadow` = "highlight" (Insight Card, Field
Note, CTA card); Soft Sage wash = "do this / read this" (Practice Card,
Scripture, TOC); left rule + pale wash = "caution/quote" (Warning,
blockquote). Not every section becomes a card — most paragraphs stay
paragraphs.

## Menu drawer (see NAVIGATION_MAP.md)

The hamburger opens a right-hand drawer at every width: Warm Paper
fill, hairline `--color-border` left edge, one soft shadow, mono
gold-text section labels (`MORE RESOURCES`, `BROWSE TOPICS`), plain
Deep Ink links with ≥44px targets, sections separated by hairline
rules and whitespace — no cards, no oversized type. 24rem wide on
desktop, full-width sheet on mobile. 0.2s slide only under
`prefers-reduced-motion: no-preference`.

## Search (see SEARCH_SYSTEM.md)

The /search/ page reuses these tokens wholesale: white input on Warm
Paper with the standard border/radius and a Primary Green focus ring,
mono uppercase status line, gold-text type eyebrows on result rows,
Primary Green result titles, and `<mark>` highlights as a quiet Soft
Sage wash (no color change, no glow). The header control is an
icon-only link at desktop widths and a full-width icon+word row in the
open mobile menu.

## Sticky media bar (see ARTICLE_SYSTEM.md, "Supporting media")

The article media bar (`ArticleMediaBar`) reuses these tokens rather than
inventing a loud floating widget. Warm Paper (`--color-bg`) pill on a
hairline `--color-border`, `--radius-card` corners, and one lifted shadow
(`--fm-shadow` plus a slightly deeper drop) so it reads as distinct but
quiet. Actions are the standard Primary Green `.button` scale, sized to a
single `--amb-btn` (44px) tap-target floor with the row hugging that
height so the bar stays as short as its controls (never oversized — the
padding is trimmed, not the target); the lead-in label is a mono
gold-free eyebrow in Primary Green; the close control is a matching 44px
outlined icon button. Centered within a 44rem max-width (the article
reading column) on desktop; full-row with `shortLabel`s on mobile. Icons
are inline accessible SVGs paired with text labels (`aria-hidden`), no
icon library added for the handful of glyphs. The third slot is
contextual — Guide crossfades once to Share in the article's final
quarter — with both buttons stacked in one grid cell so the swap never
resizes the slot or shifts the row. Focus rings are the sitewide 2px
Growth Green; the show/hide transition, the Guide→Share crossfade, and
smooth scroll are all disabled under `prefers-reduced-motion`; the bar
sits above the mobile safe-area via `env(safe-area-inset-bottom)`. It is
article-scoped, not a sitewide chrome element.

## Eyebrows, badges, meta

- `.eyebrow` — mono, uppercase, 0.14em tracking, with color variants
  (`--gold-text` on light, `--gold-bright` on dark, etc.).
- Article meta line (`.fm-hero__meta`): mono, uppercase,
  `date · Updated date · N min read`.
- Pills/badges (`.lab-card__badge` style): 999px radius, 0.7rem mono,
  used only for live-lab status and seat counts.

## Images

- 8px radius everywhere (`--radius-image`).
- Every image gets real `width`/`height` attributes — components use
  `src/lib/image-dimensions.mjs`; markdown images get them from the
  rehype plugin (`src/lib/rehype-img-dimensions.mjs`). No layout shift.
- Hero images: `loading="eager" fetchpriority="high"`; everything else
  lazy + async decoding.
- Square/portrait hero images (h/w > 0.9) are cropped to 3:2
  (`.fm-hero__image--tall`); landscape images and diagrams render at
  natural proportions.
- Captions: italic, 0.9rem, muted; they add context or credibility,
  not a description of what's already visible.
- Real ministry photographs, never stock-feel decoration.

## Mobile rules

- Test at 375 / 390 / 430 / 768 / 1024 / 1440. No horizontal overflow,
  ever (`overflow-wrap: break-word` on article text; tables scroll in
  their own container).
- 1.25rem gutters; resource grids go 2-up below 540px; footer columns
  stack; header nav collapses to the checkbox-driven hamburger at
  ≤900px.
- Touch targets: buttons ≥44px tall; nav items get full-width tap
  areas in the open mobile menu.

## Accessibility rules

- One `<h1>` per page; article bodies start at `##`.
- Global `:focus-visible` ring (2px Growth Green) plus gold rings on
  dark CTA surfaces; skip link ("Skip to content") is the first
  focusable element on every page.
- Muted text (#57635c) and all eyebrow colors pass WCAG AA at their
  sizes; small text on Primary Green must use the `-bright` variants.
- Icon-only controls carry `aria-label` (share row, socials, menu
  toggle); decorative images use empty `alt`; thumbnails duplicated by
  an adjacent text link use `aria-hidden` + `tabindex="-1"`.
- `prefers-reduced-motion` disables the live-dot pulse, skeleton
  shimmer, and any other animation.
- Native HTML first: the nav dropdown is `<details>`, the mobile menu
  is a checkbox, forms use real labels/aria-labels — no ARIA where
  HTML already solves it.
