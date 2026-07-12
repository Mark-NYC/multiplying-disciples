# SITE_AUDIT.md — Full-Site Consistency Pass (2026-07-12)

Audit and implementation record for the sitewide visual-consistency, UX,
mobile, conversion, and technical-quality pass. This is not a redesign:
the homepage's established direction (Rooted Harvest palette, warm paper,
white cards, mono eyebrows, restrained emphasis) is the standard the rest
of the site is being brought up to.

## How the audit was done

- Read every layout, component, style file, and content schema in `src/`.
- Ran the production build (baseline: passing, 67 pages).
- Ran the built site in a headless Chromium (Playwright) and captured
  full-page screenshots at 390px and 1280px for: homepage, /blog/,
  hub pages, field-manual-v2 articles (three-thirds, APEST), legacy
  articles (3 core habits, CPM qualities, prayer wheel), start-here,
  starter-tools, and a 404 URL. Automated horizontal-overflow and
  console-error checks on every capture.

## Major problems found

1. **Two parallel article systems.** 20 `.mdx` articles use the approved
   `field-manual-v2` layout (`ArticleLayoutV2` + `field-manual-article.css`):
   calm person-first hero, green H2s, 44rem reading column, white
   end-of-article CTA card. The other ~36 `.md` articles still render
   through the old `ArticleLayout`: black H1, full-title breadcrumb,
   animated film-grain thumbnail, gold hub eyebrow, and a dark green
   "Be a movement multiplier" CTA band that looks nothing like the new
   CTA system. This is the single biggest "two different sites" problem.
2. **Visible TODO placeholder on the homepage.** The "Stories From the
   Field" section renders a literal "TODO: real, approved testimonial…
   — TODO: name, role" quote to every visitor.
3. **No custom 404 page.** Astro's default dark dev 404 / Vercel's plain
   404 shows instead of a branded page with a way back in.
4. **Hub pages are skeletal.** A hub is a bare link list (titles only) in
   a bordered box — no descriptions, no visual connection to the blog
   index's richer article list, and it's the site's main topic landing
   surface.
5. **Layout shift on article images.** Hero images and body images render
   without `width`/`height`, so text reflows as images load (the legacy
   layout's thumbnail had dimensions; the new hero doesn't).
6. **Resource-card drift.** On /starter-tools/ and /start-here/, cards
   with a missing image collapse to a floating label+button while others
   are image-first; internal order varies; on mobile the grid stacks
   one-per-row making the page extremely tall.
7. **Table of contents noise.** "In This Article" boxes render for pages
   with only 2 headings (e.g. Starter Tools), adding chrome where a
   reader can already see the whole page.
8. **CTA drift.** Three different bottom-of-article treatments in the
   wild: new `ArticleCTA` card (lab/tool/community), legacy dark
   `.cta-band` with an embedded lab card, and hand-authored `.cta-band`
   markup inside two article bodies.
9. **Schema debris.** `cta_variant`/`cta_heading`/`cta_*` frontmatter
   fields superseded by `article_cta` but still in the schema (unused by
   every article); `article_system` opt-in flag that will be meaningless
   once there is only one article system.
10. **No skip-to-content link** and no global `:focus-visible` treatment
    outside the fm- components.

## Implementation plan (executed in this order)

1. **Foundations** — keep all existing tokens (they are good). Promote the
   article CSS from an opt-in file to the sitewide article stylesheet.
   Add a skip link and a global focus-visible rule. Raise the TOC
   threshold from 2 H2s to 3.
2. **One article layout.** Merge `ArticleLayoutV2` into `ArticleLayout`
   (single layout, field-manual system, used by every article). Legacy
   articles flow in with graceful fallbacks: `og_image` becomes the hero
   image when no `hero_image` is set; `title` is the H1 when no
   `display_title`; utility pages (`exclude_from_blog: true`) skip share
   buttons and get no CTA unless one is configured. Delete the old layout
   and its film-grain/eyebrow/dark-band chrome. Remove the
   `article_system` flag and dead `cta_*` fields from the schema and
   from article frontmatter.
3. **CTA system.** Keep exactly three renderable CTA types on the
   existing `article_cta` frontmatter block — `tool` (Practice CTA),
   `lab` (Lab CTA), `community` (Tribe CTA) — plus `none`. Fallback: an
   article with no `article_cta` gets the Lab CTA with default copy;
   utility pages get none. One CTA per article, ever.
4. **Hubs + blog index.** Extract the blog index's article list into a
   shared `ArticleList` component (thumbnail, title, description, meta)
   and use it on hub pages for key articles, so hubs and the index are
   the same visual family.
5. **404 page** — branded, calm, links to Home / Articles / Tools.
6. **Images.** Build-time intrinsic-dimension lookup for local images
   (no new dependency) so hero, body, CTA, and field-note images get
   real `width`/`height` (no CLS); `loading="lazy"` + `decoding="async"`
   on body/markdown images via a small rehype plugin.
7. **Resource cards** — consistent internal order (image, label, price,
   button pinned to bottom), a reserved image area so imageless cards
   align, denser mobile grid.
8. **Homepage** — comment out (not delete) the TODO testimonial block so
   it can be restored the moment a real, approved quote exists. No other
   homepage changes.
9. **Mobile + a11y + perf verification** — re-run the browser pass at
   375/390/430/768/1024/1440 on a representative page set; fix what it
   surfaces; production build must be clean.
10. **Docs** — DESIGN_SYSTEM.md, ARTICLE_SYSTEM.md, CTA_GUIDE.md,
    COMPONENT_INVENTORY.md, and the results section below.

## Fixes completed

1. **One article system.** `ArticleLayoutV2` merged into
   `ArticleLayout` — all 55 articles (35 `.md` + 20 `.mdx`) now render
   through the field-manual layout. The 35 legacy `.md` articles were
   migrated in place: their old `og_image` thumbnails became explicit
   `hero_image` frontmatter (15 articles), long titles render through
   the standardized hero, and the old chrome (film-grain thumbnail,
   full-title breadcrumb, gold hub/date eyebrow, dark CTA band) is
   gone. URLs, slugs, canonicals, content, headings, internal links,
   and structured data untouched.
2. **CTA system finalized** (see CTA_GUIDE.md): three types —
   Practice (`tool`), Lab (`lab`), Tribe (`community`) — plus `none`,
   selected via `article_cta` frontmatter. Fallback: editorial
   articles → default Lab CTA; utility pages → none. The legacy dark
   "Be a movement multiplier" band and its embedded lab card were
   retired; dead code paths (`renderLabsInto`,
   `renderFeaturedLabInto`, `.lab-card*`/`.featured-lab-card*` CSS)
   removed.
3. **Homepage TODO testimonial removed from rendered output** — the
   "Stories From the Field" section no longer shows a literal "TODO"
   quote to visitors; an in-source comment marks the slot for a real,
   approved quote. No invented copy added.
4. **Branded 404 page** (`src/pages/404.astro`) with routes back to
   Home / Articles / Tools.
5. **Hubs joined the system**: new shared `ArticleList` component
   (thumbnail, title, description, meta) now used by both `/blog/` and
   every hub — hub pages went from bare link lists to the same rich
   list as the index. Hub/blog/404 H1s use the same Primary Green as
   article headlines; hub next-step box gained its mono "Next Step"
   label.
6. **Zero layout shift from images**: build-time intrinsic-dimension
   lookup (`src/lib/image-dimensions.mjs`, dependency-free) gives
   every component image real `width`/`height`; a rehype plugin does
   the same for every markdown image and adds `loading="lazy"`/
   `decoding="async"`. Hero images load eager + `fetchpriority=high`.
   Square/portrait heroes crop to an editorial 3:2 instead of towering
   over the page.
7. **Accessibility**: skip-to-content link on every page, global
   `:focus-visible` ring, TOC threshold raised to 3 H2s (removes
   contents-box noise on two-section pages). Verified keyboard path
   (skip link, nav, TOC) and no-JS mobile menu in a real browser.
8. **Utility-page classification**: start-here, starter-tools,
   stickers, vision, beliefs-values, movement-resources marked
   `exclude_from_blog: true` (consistent with their already-excluded
   siblings) — they skip the share row, reading meta, auto-CTA, and
   the blog index. This also resolved starter-tools' double CTA.
9. **Broken-media cleanup**: removed the two missing-image
   `ArticleImage` blocks on the apostles article, the dead
   "Download PNG" button on the 4 Fields Toolbox page, and the dead
   `og_image`/hero on strategy-coordinator. Internal link check across
   all 68 built pages now reports zero broken internal refs.
10. **Small copy/formatting fixes** (recorded editorial changes):
    removed exact-duplicate first headings that repeated the page H1
    (contact-us, action-plan, beliefs-values, elementor-10714,
    start-here, vision); converted start-here's tool list to the
    shared `resource-grid` markup already used by starter-tools.
    Resource cards got a consistent internal order (button pinned to
    bottom, white fill, paragraph-margin fix) and a 2-up mobile grid.
11. **Schema cleanup**: removed `article_system` and the dead
    `cta_*` fields; documented `article_cta` and utility behavior in
    the schema comments.

## Pages reviewed (in a real browser, full-page screenshots)

Homepage, /blog/, hubs (testimony, four-fields, church-planting-
movements, prayer, simple-church), long/medium/short articles (APEST,
three-thirds, 3-circles), migrated legacy articles (3 core habits,
CPM qualities, lone wolf, prayer wheel, kingdom-ministry-training),
12-disciples grid article, starter-tools, start-here, contact-us,
privacy-policy, 404 — at 375 / 390 / 430 / 768 / 1024 / 1280 / 1440px
as relevant. Automated horizontal-overflow and console-error checks on
every capture: no overflow on any page at any width.

## Articles migrated

35 legacy `.md` articles moved onto the shared field-manual layout
(plus 6 reclassified as utility pages). The 20 `.mdx` articles were
already on the approved system and are unchanged visually; their
`article_system` flag was removed.

## Addendum: hamburger menu (2026-07-12, later pass)

Added the restrained menu drawer documented in NAVIGATION_MAP.md:
hamburger at the far right at all widths, desktop panel with Featured
Resources / Browse Topics / Contact, mobile panel with the primary nav
first. The old checkbox-only mobile menu was upgraded to an accessible
dialog (real button, aria-expanded, focus trap, Escape, focus
restoration, scroll lock) with the checkbox retained as the no-JS
fallback. "Commands of Christ" was requested for the menu but has no
page on this site — documented in NAVIGATION_MAP.md as a migration
decision instead of inventing a route.

## Unresolved issues / needs Mark's judgment

1. **Missing media** (pre-existing, see MEDIA_ACQUISITION_CHECKLIST):
   Full Packet / Three Thirds / 4 Fields card artwork on
   starter-tools; the two apostles-article images and the 4-Fields
   PNG removed above can be restored by dropping files into
   `public/wp-content/...` and re-adding the references.
2. **Homepage testimonial slot** — still needs one real, approved
   quote naming a specific action (slot is marked in
   `src/pages/index.astro`).
3. **Field Notes** — the system is live but no approved note exists
   yet; the `_example-dev-preview` note stays unapproved.
4. **display_title for legacy articles** — migrated articles still
   show their long SEO titles as H1s (standardized size handles the
   wrapping, but short human headlines would read better). Writing
   them is an editorial task.
5. **article_cta assignments** — 16 migrated editorial articles now
   use the default Lab CTA; per-article stakes headlines (and
   Practice/Tribe assignments where a lab isn't the right next step)
   are an editorial pass.
6. **Responsive `srcset`** — images now have dimensions and lazy
   loading, but no responsive variants are generated; WordPress-era
   `-300x`/`-768x` files exist for many images if this is ever worth
   wiring up.
7. **Blog-list membership of `movement-resources-strategy-coordinator`
   and `4-responses-to-the-gospel`** — left as editorial articles;
   flag if they should be utility pages instead.
