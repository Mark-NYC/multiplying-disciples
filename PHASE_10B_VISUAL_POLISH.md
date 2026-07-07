# Phase 10B — Visual Polish Against WordPress Reference Screenshots

Goal per this phase's instructions: make the Astro/Vercel preview feel
as polished, spacious, readable, and trustworthy as the current
WordPress site, using 14 reference screenshots the user supplied
(homepage desktop/mobile, `/free-training/` desktop/mobile,
`/starter-tools/` desktop/mobile, `/stickers/` desktop/mobile, an
article page desktop/mobile, `/contact-us/` desktop, a "Kingdom
Ministry Training" resource page desktop, and the 4 Fields Toolbox
desktop) — not a brand rebuild, and explicitly not copying WordPress
defects (comment forms, sidebars, embedded 404 blocks, stale dated
sessions, plugin chrome).

## Method

1. Read every reference screenshot and compared it against fresh
   screenshots of the current Astro build (same pages, same viewports)
   to build a concrete visual gap list before making any changes.
2. Attempted to reach the live Vercel preview
   (`https://multiplying-disciples.vercel.app/`) directly, per this
   phase's instructions. **Blocked**: this environment's outbound
   network policy returns the same 403 policy denial seen in Phase 10
   for the live WordPress domain (`curl` fails with `CONNECT tunnel
   failed, response 403`). Since that preview deploys this exact
   repo/branch, the local `astro dev`/`astro build` output is a valid
   stand-in — used that instead, and confirmed it's git-identical to
   what Vercel would be serving.
3. Made the highest-impact fixes (design tokens first, then shared
   components, then page-level changes), rebuilding and
   re-screenshotting after each major change to check progress against
   the references.
4. Ran the full Phase 8 audit-script suite plus a sitewide Playwright
   horizontal-overflow sweep (all 98 pages, 375px and 1440px) after
   every batch of changes.

## Top visual gaps found

1. **No accent color anywhere.** The entire site used only black/gray/
   white. The reference uses a periwinkle-blue accent consistently for
   buttons, active nav state, and callout badges.
2. **No pill buttons.** All CTAs (`Start Training`, hub `next_step`,
   resource-page `View`/`Buy Now`) were dark, 4px-radius rectangular
   buttons. The reference uses fully-rounded pill buttons throughout.
3. **Flat, un-styled footer.** The footer was a single light-background
   row (border-top only) with no logo, no address/contact info, no
   quick links. The reference has a solid dark 3-column footer with
   real contact details.
4. **No active nav state.** The reference visibly highlights the
   current section in the header nav; ours had no visual feedback at
   all for the active page.
5. **Resource/tool pages rendered as plain vertical text lists**
   (`/starter-tools/`, `/stickers/`, `/movement-resources/4-fields-toolbox/`)
   instead of the reference's card grid with images, labels, and pill
   buttons.
6. **No closing CTA band on articles.** The reference shows a
   recurring dark "Be a movement multiplier" CTA band near the bottom
   of every real article. Ours had nothing after the related-articles
   box.
7. **Homepage had no visual rhythm.** The two "why coaching matters"
   paragraphs and the FAQ section were plain, undifferentiated text
   blocks. The reference uses rounded pill "badge" callouts (checkmark
   + bold headline) and lightly-boxed FAQ rows for scannability.
8. Two content bugs surfaced during the pass (see below).

## Changes made

### Design tokens (`src/styles/global.css`)
- Added a blue accent (`--color-accent: #4a63e8`, with a hover shade)
  and a dark footer/CTA-band palette (`--color-footer-bg`,
  `--color-footer-text`, `--color-footer-text-muted`).
- Added `--radius-pill` (999px) and `--radius-card` (10px) tokens.
- Added shared, reusable classes: `.button` / `.button--secondary` /
  `.button--secondary-dark` (pill CTAs), `.feature-badge` (checkmark +
  pill bubble), `.cta-band` (dark closing-CTA block), `.resource-grid`
  / `.resource-card` / `.resource-card__cta` (tool/resource card grid),
  `.button-row` (a plain row of pill-button links).

### Header (`src/components/Header.astro`)
- Added real active-page highlighting (`aria-current="page"`, styled
  blue + bold) by comparing `Astro.url.pathname` against each nav
  link.
- Widened the header's inner container from the narrow 42rem
  article-reading width to the same 60rem site-wide width the homepage
  already used, so the nav bar reads as a full site header rather than
  a cramped article-width strip.
- Did **not** add social icons: the reference shows Facebook/Instagram/
  YouTube icons, but no real profile URLs for the organization's own
  accounts exist anywhere in this repo, the WordPress export, or any
  prior phase's docs (checked — only individual YouTube video links
  exist, never a channel/profile URL). Per this project's standing
  "never guess/fabricate a URL" rule, these were left out rather than
  invented. Documented as a gap that needs the user to supply real
  URLs.

### Footer (`src/components/Footer.astro`, `src/data/site.ts`)
- Rebuilt as a solid dark 3-column footer: brand + real tagline
  ("Multiplying disciples, leaders, and churches in every people and
  place." — copied verbatim from the reference screenshots, which show
  it on the real live site, not invented), contact email + Privacy
  Policy + address, and a Vision/Beliefs & Values/Contact Us link
  column — all real, already-migrated pages.
- Added `"Built by Frontier Creative"` to the copyright line — also
  copied verbatim from the reference screenshots' real footer text.
- Removed the old flat nav row (Home/Starter Tools/Blog + CoVo
  Multipliers/Obey.Tools) in favor of matching the reference's cleaner
  pattern. Both sister-site links remain reachable from the 6 article
  pages that already link to them in-body (checked before removing).
  Deleted the now-unused `FOOTER_NAV` and `SISTER_SITES` exports.

### Homepage (`src/pages/index.astro`)
- Converted two existing paragraphs into pill "feature badge" sections
  using headline text lifted directly from the reference screenshots
  ("Learn what is working in North America." / "The momentum of a
  community of practice.") — the underlying supporting sentences were
  already on the page verbatim; only the visual treatment and headline
  wrapper are new, no content invented.
- Restyled the 3-question FAQ block as lightly-boxed rows instead of
  plain running text (no fake accordion/chevron affordance added,
  since there's no interactivity behind it — that would be exactly the
  "fake-looking" pattern this project avoids).
- Converted the closing "Get Hands-on Training on Zoom" section to the
  shared `.cta-band` dark-block treatment.

### Article layout (`src/layouts/ArticleLayout.astro`)
- Added a closing "Be a movement multiplier." CTA band (Start Training
  / Connect buttons, same destinations as the homepage hero) on real
  editorial articles only (`exclude_from_blog: false`) — utility/tool/
  legal pages already have their own specific CTA and would get
  cluttered by a second, generic one.

### Resource-grid pages (`starter-tools.md`, `stickers.md`,
`movement-resources-4-fields-toolbox.md`)
- Restructured each into a real card grid (`.resource-grid` /
  `.resource-card`, raw HTML wrappers directly in the markdown body)
  with pill `View`/`Buy Now` buttons, matching the reference's grid
  layout. Every image, label, price, and link is unchanged — only the
  wrapper markup and button styling changed.
- `/free-training/`'s two "Save My FREE Seat" links were wrapped in the
  shared `.button-row` so they render as pill buttons too.

### Blog index (`src/pages/blog/index.astro`)
- Light touch only, per this phase's own "keep it simpler than
  WordPress" and the earlier Phase 10 "avoid over-designed cards"
  guidance (no reference screenshot was supplied for this page): hub
  tags and article-title hover state now use the accent blue for
  consistency with the rest of the site; spacing tightened slightly.
  Left as a plain, scannable list rather than building cards — 74
  articles in a card grid would be visual clutter, not polish.

### Two content bugs found and fixed
- **`/movement-resources/4-fields-toolbox/`**: had a duplicate H1 (the
  body opened with a second "## 4 Fields Toolbox" heading right under
  the frontmatter-rendered H1) — same bug class caught repeatedly in
  earlier phases, missed on this file. Removed the duplicate heading.
- **A markdown/remark parsing bug**: raw `<a class="button" href="https://...">`
  HTML tags in markdown content collided with remark-gfm's bare-URL
  autolinking — the autolinker matched the literal `https://...` text
  inside the tag's `href` attribute and injected a nested, broken link,
  corrupting the button (visible as an empty pill plus garbled literal
  text on the `/starter-tools/` "Full Packet" card during testing).
  Fixed by never embedding raw `<a class="button">` HTML with an
  absolute URL in markdown; instead, plain markdown link syntax
  (`[label](url)`) is wrapped in a styled `<div class="resource-card__cta">`
  or `<div class="button-row">` container, which sidesteps the
  autolink collision entirely (a properly-parsed markdown link is
  never exposed to the raw bare-URL text scanner). Applied consistently
  across all resource-grid pages, `/free-training/`, and hub `next_step`
  buttons (`ToolCTA.astro`, which was already safe since its buttons
  are Astro-component JSX, not markdown-parsed text).

## Pages/screens tested

Screenshots captured before and after, at desktop (1440×900) and
mobile (390×844): homepage, `/blog/`, `/disciple-making/` and
`/share-the-gospel/` hubs, `/the-three-circles-gospel-presentation-step-by-step/`
and `/15-second-testimony-examples-ignite-your-faith/` articles,
`/free-training/`, `/starter-tools/`, `/stickers/`, and
`/movement-resources/4-fields-toolbox/` — the 8 priority pages named in
this phase's instructions, all of them.

## Mobile status

Sitewide Playwright sweep of all 98 built pages at 375px and 1440px,
run twice (before and after the final round of edits): **0 pages with
horizontal overflow** in the final state. (One transient
`net::ERR_ABORTED` on a single page during a mid-edit rebuild was
confirmed to be a dev-server race, not a real issue, on immediate
retry.)

## Build status

- `astro check`: 0 errors, 0 warnings, 54 hints (pre-existing,
  unrelated Zod-deprecation hints).
- `astro build`: clean, 98 pages (unchanged — no pages added or
  removed this phase).
- Sitemap: 98 `<loc>` entries, matching.
- Link audit (Phase 8 script suite): 0 SEO issues, 0 broken internal
  links, 0 empty/`#`/`javascript:` hrefs, 75 `key_articles` entries all
  resolving, 74 blog-eligible articles all correctly included/excluded.
  One expected non-issue: the blog-vs-excluded-pages check flags
  `/contact-us/` and `/privacy-policy/` as appearing on `/blog/` —
  verified this is only because the new footer (present on every page)
  links to them, not because they appear in the actual article list
  (confirmed by isolating the `.blog-list` HTML section directly).
- `grep -rl "coming soon" dist/`: 0 matches (unchanged from Phase 10).

## Remaining visual concerns

- **Social icons**: not added, since no real Facebook/Instagram/
  YouTube profile URL for the organization exists anywhere in this
  repo or its source documents. If the user supplies real URLs, adding
  them to the header (and optionally footer) is a small, low-risk
  follow-up.
- **Homepage hero photo**: the reference shows a large lifestyle photo
  under the hero text; the current build uses the same small banner
  graphic from Phase 1 (no equivalent lifestyle photo was ever supplied
  during migration, and fabricating a substitute image is out of
  scope).
- **`/contact-us/` form**: the reference shows a full lead-capture form
  (name/email/country/zip/checkboxes) with a photo hero. This remains
  the documented `mailto:` fallback from Phase 7B (no form backend
  exists in this static Astro site) — unchanged by this phase, since
  Phase 10B's priority list didn't include this page and building real
  form handling is a backend feature, not a visual-polish task.
- **`/blog/`** remains a plain list by design (see above) rather than a
  card grid — a deliberate simplicity choice, not an oversight.

## Redirects

No change. Still 20 pending archive-taxonomy rows in `REDIRECTS.md`,
none implemented.

## Ready for launch prep?

Yes, structurally — same standing gates as before (redirects not yet
implemented, hosting/DNS/human sign-off still outstanding in
`LAUNCH_CHECKLIST.md`). Nothing in this phase blocks moving forward.

## Addendum — accent color and corner-radius follow-up

Per direct user follow-up feedback:

- Corrected the accent blue from an approximated `#4a63e8` to the
  user-specified exact `#477ff7` (with a matching darker hover shade).
- Changed buttons and images from a full pill/fully-rounded shape to a
  small, slightly-rounded corner radius (8px) instead — added
  `--radius-button` and `--radius-image` tokens, used everywhere the
  old `--radius-pill` token was applied to a button (`.button`,
  `.resource-card__cta a`, `.cta-band__actions a`, `.button-row a`,
  `ToolCTA.astro`'s `.tool-cta__button`) and added `border-radius` to
  the global `img` rule. `--radius-pill` (999px) is kept only for the
  homepage's non-button feature-badge bubble, which is a full pill by
  design in the reference screenshots.
- **Found and fixed a real bug while verifying this**: `.cta-band__actions a`'s
  background-color rule had higher CSS specificity than
  `.button--secondary-dark`'s, so the "Connect" secondary button on
  every article's closing CTA band was silently rendering with a solid
  blue fill identical to the primary "Start Training" button instead
  of its intended transparent/outlined look. Confirmed via computed
  styles before and after. Fixed by scoping the generic markdown-link
  button rules to `:not(.button)`, so they only style plain
  markdown-syntax links and never override an explicit `.button`/
  `.button--secondary-dark` class already applied by an Astro
  component.

Re-ran the full sitewide QA after this change: `astro check`/`astro
build` clean (98 pages, sitemap 98 entries), Phase 8 audit suite 0
regressions, and the 98-page × 2-viewport horizontal-overflow sweep
0 offenders.
