# NAVIGATION_MAP.md

The site's navigation surfaces and what belongs on each. Data lives in
`src/data/navigation.ts`; markup and behavior in
`src/components/Header.astro`.

## Primary navigation (unchanged)

Visible inline in the header at >900px:

| Label | Route |
| --- | --- |
| Labs | `/#ch-practice` |
| Tools | `/starter-tools/` |
| Articles | `/blog/` |
| About | `/vision/` |
| Join a Lab (button) | `/#ch-practice` |
| Search (icon) | `/search/` |

## Hamburger menu (all widths, far right)

A restrained drawer for deeper resources — not a mega menu, not a
sitemap. Structure:

**Desktop panel** (primary nav stays inline in the header):

1. `MORE RESOURCES` — Stickers (`/stickers/`) · 7 Stories of Hope
   (`/movement-resources/7-stories-of-hope-complete-facilitation-guide/`)
   · Kingdom Ministry Training (`/kingdom-ministry-training/`)
2. `BROWSE TOPICS` — All Articles (`/blog/`) · Share the Gospel
   (`/share-the-gospel/`) · Disciple Making (`/disciple-making/`) ·
   Simple Church (`/simple-church/`) · Prayer (`/prayer/`) · Church
   Planting Movements (`/church-planting-movements/`)
3. Contact Us (`/contact-us/`)

**Mobile panel** (≤900px; the inline nav is hidden, so hierarchy is):

1. Primary: Labs · Tools · Articles · About · Search, then the
   Join a Lab button
2. `MORE RESOURCES` (same three links)
3. `BROWSE TOPICS` (same six links)
4. Contact Us
5. Social icons (footer of the drawer)

One level of nesting only — no accordions (nine resource links didn't
earn them).

## Deliberately excluded from the menu

- **Commands of Christ** — no page exists on this site; the only
  reference anywhere is an external link to obeychrist.com inside the
  /movement-resources/ body. Not linked rather than inventing a route
  or pointing a first-class menu item at an unverified external site.
  **Migration need:** if this resource matters, either migrate a page
  for it or have Mark confirm the external destination.
- Strategy Coordinator resources (explicitly out of scope).
- Movement Resources index, 4 Fields Toolbox (deep resource pages,
  reachable from Tools/articles).
- Privacy Policy, Contact form internals, registration-confirmation
  pages, and all utility pages (privacy stays footer-only).
- Individual articles beyond the named featured resources.
- Start Here and Beliefs & Values — considered per the brief and left
  out: Start Here duplicates the primary-nav Tools destination almost
  exactly, and Beliefs & Values is one click away via About. Add later
  only if a real visitor path needs them.
- Hubs not in the curated six (Testimony, Four Fields, Jesus and the
  Twelve, Stories of Hope, 3 Circles) — reachable from /blog/'s
  browse-by-topic row and article breadcrumbs; listing all ten would
  turn the menu into a sitemap.

## Behavior and accessibility

Real `<button>` trigger with `aria-expanded`/`aria-controls`; panel
becomes `role="dialog" aria-modal="true"` while open. Focus moves to
the Close button on open, is trapped inside the drawer (Tab loops),
and returns to the trigger on close. Escape, the Close button, the
backdrop, and following any link all close it. Background scrolling is
locked while open. Slide/fade runs only under
`prefers-reduced-motion: no-preference`. Touch targets ≥44px.

**No-JavaScript fallback:** the same drawer opens and closes via a
visually identical hidden-checkbox + label mechanism (trigger, close
control, and backdrop are all labels). JavaScript, when present,
disables the checkbox, swaps the labels for the real buttons, and adds
the dialog semantics above.

## Footer (unchanged)

Labs · Tools · Articles · About · Contact · Privacy Policy.
