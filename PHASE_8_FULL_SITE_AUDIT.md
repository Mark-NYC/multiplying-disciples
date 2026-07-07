# Phase 8: Full Post-Migration Site Audit

A comprehensive audit of all 93 generated pages, run after Tier 1,
Tier 2, and Tier 3 migration were all complete (Phase 7B Batch 7
closed out the last 5 Tier 3 URLs). Governing constraints (unchanged):
no launch, no DNS changes, no WordPress edits, no redirects
implemented, no redesign, no new page migrations except a
documented missed URL (none were found).

Method: scripted checks against the actual generated `dist/` output
(post `astro build`), cross-referenced against `URL_INVENTORY.md`,
`PROTECTED_URLS.md`, `MIGRATION_PLAN.md`, `REDIRECTS.md`,
`MEDIA_ACQUISITION_CHECKLIST.md`, `MEDIA_IMPORT_PLAN.md`,
`PHASE_5_PROTECTED_URL_AUDIT.md`, `PHASE_6_ARCHIVE_URL_DECISION.md`,
and all 7 Phase 7B batch docs — not a manual page-by-page read-through.

## 1. URL inventory

- Parsed the "Full inventory — all 122 published posts/pages" table
  in `URL_INVENTORY.md` (122 rows). 81 rows have `status: migrated`.
- **All 81 migrated URLs generate in `dist/`.** Zero missing.
- **Every generated page is accounted for**: 81 migrated content pages
  + `/blog/` (new Astro index, Phase 7A) + 11 hub pages (documented in
  URL_INVENTORY.md's "New pages not in this inventory (by design)"
  section) = 93. (The homepage `/` is itself one of the 81 migrated
  rows, not a 94th page.)
- **No duplicate slugs**: checked `slug:` frontmatter across all 91
  content files (articles + hubs + tools combined) — 91 unique
  values, 0 duplicates.
- **No hub/article path collisions**: covered by the same all-collection
  slug check above — 0 collisions.
- **No accidental renamed paths**: cross-checked every article's
  `slug:` frontmatter field against the URL path parsed from its own
  `original_url:` field — 0 mismatches across all migrated content.
- **Trailing slash consistency**: all 91 slugs start with `/` and end
  with `/` — 0 exceptions (enforced by the Zod schema regex, and
  confirmed empirically).

**Result: PASS, 0 issues.**

## 2. SEO basics

Parsed every one of the 93 generated `index.html` files for: H1 count,
`<title>`, meta description, canonical `<link>`, and `noindex`.

- **0 pages** with H1 count ≠ 1.
- **0 pages** missing a title or with an empty title.
- **0 pages** missing a meta description or with an empty one.
- **0 pages** missing a canonical tag.
- **0 pages** with a canonical that doesn't match its own URL path.
- **0 pages** with `noindex`.
- **Sitemap**: `dist/sitemap-0.xml` contains exactly 93 `<loc>` entries
  — matches the generated page count exactly. No draft/source-pending
  pages leaked in (all articles are `status: migrated`; the 11 hubs
  are `status: migrated-draft`, which is expected for new IA pages, not
  WordPress content, and is a pre-launch consideration rather than a
  defect — see "Remaining risks" below).
- **Utility pages excluded from `/blog/` where intended**: confirmed
  in section 3 below.

**Result: PASS, 0 issues.**

## 3. Blog index (`/blog/`)

- Generates correctly: exactly 1 `<h1>`, canonical
  `https://multiplyingdisciples.us/blog/`.
- 73 articles have `exclude_from_blog` unset/false (should appear); 7
  have it set to `true` (`/privacy-policy/`,
  `/kingdom-ministry-training/`, `/the-four-fields-sticker-simple-2x2/`,
  `/contact-us/`, `/action-plan/`, `/the-church-waffle-sticker/`,
  `/elementor-10714/` — should NOT appear).
- **All 73 included articles are linked** in the rendered `/blog/`
  page. 0 missing.
- **All 7 excluded pages are correctly absent** from `/blog/`. 0
  wrongly included.
- **All 11 hub links** referenced from `/blog/` resolve to real
  generated pages. 0 missing.

**Result: PASS, 0 issues.**

## 4. Hub pages

All 11 hubs generate (covered in section 2's 93-page SEO sweep — each
hub has exactly 1 H1, a title, a description, and a correct canonical).

- **67 total `key_articles` entries** across all 11 hubs. **0 broken**
  — every single one resolves to a real generated page.
- **0 broken `next_step` links** — every hub's `next_step.href`
  resolves.
- **Tool CTA placeholders**: `src/content/tools/` is empty (no real
  tool entries exist yet — this was already known and documented in
  `INTERNAL_LINKING_PLAN.md` since Phase 1). 8 `related_tools`
  references across 4 hubs ("3 Circles", "Stories of Hope") all
  correctly render the intentionally-documented "(coming soon)"
  placeholder via `ToolCTA.astro`. This is the one exception the audit
  brief explicitly allows for — not a defect.
- **No hub links pointing to non-existent pages** — fully covered by
  the `key_articles`/`next_step` checks above (100% of hub-authored
  links).

**Result: PASS, 0 issues.**

## 5. Internal links (full site crawl)

Crawled every `<a href>` in all 93 generated pages (excluding
`http(s)://`, `mailto:`, and `/wp-content/` media references, which
are audited separately in sections 6-7).

- **`href=""` (empty)**: 0 found.
- **`href="#"` or broken same-page anchors**: 0 found.
- **`javascript:` hrefs**: 0 found.
- **Header/footer nav**: all 6 `PRIMARY_NAV` links and all 3
  `FOOTER_NAV` links (`src/data/navigation.ts`) resolve to real pages.
- **`/movement-resources/` children**: confirmed `/movement-resources/`
  and its 2 real children
  (`/movement-resources/7-stories-of-hope-complete-facilitation-guide/`,
  `/movement-resources/12-practice-church-circle/`) are genuine
  migrated article content (real nested `slug:` frontmatter, not an
  archive listing) — not swallowed by or confused with the archive
  redirect plan.
- **33 internal links point to URLs that don't currently generate.**
  Investigated every one: all 33 resolve to exactly 5 distinct target
  paths — `/3-circles/`, `/free-training/`, `/4-1-1/`, `/4-fields/`,
  `/movement-resources/strategy-coordinator/`, and
  `/movement-resources/4-fields-toolbox/`. **This is not a defect.**
  Every one of these is a real, confirmed URL already tracked in
  `URL_INVENTORY.md` with `status: not-migrated` (tier `unknown`) —
  not a guessed slug. Several source files even carry their own notes
  explaining this explicitly (e.g. `starter-tools.md`'s notes: "Body
  text still references the real, not-yet-migrated WordPress page
  `/3-circles/` (the actual Google Slides tool) — do not confuse that
  with this site's new `/3-circles-guide/` hub, which was deliberately
  named to avoid colliding with it"). Per the established internal-
  linking policy carried through every migration batch ("If a related
  page is not migrated but final URL is confirmed, linking is okay"),
  these links are intentional and will resolve automatically once
  those specific pages are migrated in a future phase. Listed here for
  visibility, not as an action item.

**Result: PASS. 33 "unresolved" links reviewed and confirmed
intentional/documented, not guessed slugs or defects.**

## 6. External links

Catalogued every `https?://` link across all 93 pages (48 distinct
external domains referenced: YouTube, Google Docs/Slides, Spotify,
Apple Podcasts, JotForm, Printify, Zoom, Amazon, Sticker Mule, and
~30 book/ministry/mission-org reference sites).

- **No WordPress admin/junk links**: searched for `wp-admin`,
  `wp-login`, `xmlrpc`, `/feed/`, `?attachment_id=`, `/wp-json/` — 0
  found anywhere in the generated output.
- **1 absolute `multiplyingdisciples.us` link remains**, on
  `/privacy-policy/`: `http://www.multiplyingdisciples.us`. Reviewed
  in context — this is an intentional self-reference within the
  privacy policy's own legal prose ("...when you visit our website
  www.multiplyingdisciples.us..."), naming the site by domain as part
  of a legal document, not a leftover WordPress navigation link. Not a
  defect; left as-is.
- **JotForm, Google Slides, PDF, Printify, and tool links preserved**:
  confirmed present and correctly formatted — 4 JotForm checkpoint
  URLs (`/action-plan/`), 21 Google Docs/Slides links, 4 direct-access
  PDF links (verified again in section 7), 2 Printify product links
  (`/stickers/` family), and all book/ministry reference links from
  article bodies.

**Result: PASS, 0 issues. 1 self-reference reviewed and confirmed
intentional.**

## 7. Media

Extracted every `/wp-content/...` `src`/`href` reference from all 93
generated pages (123 unique references) and checked each against the
filesystem under `public/`.

- **121 of 123 present.** 2 missing:
  `2025/02/5520c44066fbc694ac1c2e207151fe125162f59d.jpeg` and
  `2025/02/760px-Ghirlandaio_Domenico_-_Calling_of_the_Apostles_-_1481.jpg`,
  both on `/apostles-meaning-unlock-biblical-roles-greek-origins-and-modern-mission/`
  — **already documented** in `MEDIA_ACQUISITION_CHECKLIST.md` since an
  earlier Tier 1 phase (only `-100x100` thumbnail crops were ever
  supplied for these two). Not a new finding; no action needed.
- **1 `og_image` frontmatter field points to a missing file**:
  `get-ready-to-be-empowered-evangelists-revolutionize-disciple-making.md`
  → `2023/05/pexels-photo-6150581.jpeg` — **already documented** in
  Phase 7B Batch 7's notes. Not new.
- **1 genuinely new bug found and fixed**: on
  `/kingdom-ministry-training/`, the linked screenshot image
  (`Screenshot-2025-01-22-at-9.10.54%20AM.webp`) used a regular
  URL-encoded space (`%20`), but the actual supplied file on disk uses
  a **U+202F narrow no-break space** in that exact position in its
  filename (a WordPress/macOS screenshot-naming artifact — confirmed
  via byte-level inspection, `hex(ord(c))` → `0x202f`). The `%20`
  encoding therefore pointed at a filename that doesn't exist, and the
  image would have 404'd in production despite the file being present
  on disk. **Fixed**: corrected the encoding to `%E2%80%AF` (the
  correct UTF-8 percent-encoding of U+202F) in
  `src/content/articles/kingdom-ministry-training.md`. Rebuilt and
  confirmed the corrected path now resolves to the real file.
- **All 4 direct-access PDF links resolve**:
  `Church-Waffle-English-04-2023.pdf`, `4-Fields-Nathan-Shank-2014.pdf`,
  `Church-Waffle-English-112222-1.pdf`, `Virtual-Training-Packet.pdf`
  — all present on disk.
- **No new broken images beyond the one fixed above.** No missing
  above-the-fold-critical media (both remaining gaps are supporting/
  featured images on already-content-complete pages, not blocking
  elements). No missing direct-access PDFs.
- **No media references outside `/wp-content/`** were found anywhere
  in the generated output (searched for local `.png`/`.jpg`/`.webp`/
  `.pdf`/etc. references not under `/wp-content/` — 0 found), so the
  `/wp-content/` sweep above is a complete media audit, not a partial
  one.

**Result: 1 new bug found and fixed. 3 pre-existing, already-documented
gaps reconfirmed (no new action).**

## 8. Redirect review

Re-opened `REDIRECTS.md` and `PHASE_6_ARCHIVE_URL_DECISION.md`.

- **All 20 proposed archive redirects (7 category + 13 tag) remain
  valid.** Re-checked every destination hub
  (`/church-planting-movements/`, `/four-fields/`, `/share-the-gospel/`,
  `/disciple-making/`, `/strategy-coordinator/`, `/jesus-and-the-twelve/`,
  `/simple-church/`, `/prayer/`, `/testimony/`) — all 9 distinct
  destination hubs still exist and generate correctly (unchanged by
  Tier 3 completion, since Tier 3 only added new content-page slugs,
  not new hub pages).
- **No new redirects are needed from any migrated page.** Confirmed
  via the slug-vs-`original_url` mismatch check in section 1: 0
  mismatches across all 91 content files (all of Tier 1, Tier 2, and
  Tier 3). Every migrated URL preserves its exact original WordPress
  path.
- **No content URL needs a redirect** — same evidence as above; exact
  slugs were preserved throughout every batch of every phase.
- **No child content URL is swallowed by an archive redirect.**
  Checked all 20 proposed archive-redirect *source* paths
  (`/category/...`, `/tag/...`) against the full set of 93 generated
  page paths — 0 collisions. `/movement-resources/` and its 2 real
  children are confirmed real content (section 5), not an archive, and
  are not among the 20 proposed redirect sources.
- **Category/tag row count unchanged**: `URL_INVENTORY.md`'s "Category
  and tag archive URLs" section still lists exactly 20 rows, matching
  `REDIRECTS.md` exactly — Tier 3 completion surfaced no new archive
  URLs.
- **Final redirect implementation notes** (documented here per
  instruction, **not implemented**): when a hosting provider is
  chosen, all 20 rows in `REDIRECTS.md` need a 301 rule added to that
  provider's redirects config (e.g. Netlify `_redirects`, Vercel
  `vercel.json`). Author/date archive URLs should be left to the
  default 404/410 — confirmed zero presence in GSC, WordPress export,
  or live sitemap. `/movement-resources/strategy-coordinator/` and
  `/movement-resources/4-fields-toolbox/` should be migrated as real
  Tier-unknown content in a future batch (not redirected) — they are
  two of the 5 real, confirmed-but-not-yet-migrated URLs also
  referenced in section 5's internal-link review, alongside
  `/3-circles/`, `/free-training/`, `/4-1-1/`, and `/4-fields/`.

**Result: PASS, 0 issues. All 20 redirects remain valid and
unimplemented (as intended at this phase). No new redirects
identified.**

## Issue log

| # | Found in | Description | Fix |
| - | --- | --- | --- |
| 1 | Media audit (§7) | `/kingdom-ministry-training/`'s screenshot image link used `%20` (regular space) but the actual file uses U+202F (narrow no-break space) in that position — image would 404 in production | Corrected the percent-encoding to `%E2%80%AF` in `src/content/articles/kingdom-ministry-training.md`; rebuilt and confirmed resolution |

No other issues were found across all 8 audit areas. This is the only
fix made during Phase 8.

## Remaining risks (not fixed — flagged for a future phase)

- **11 hub pages carry `status: "migrated-draft"`**, not `"migrated"`
  or `"published"`. This is expected (they're new information
  architecture, not 1:1 WordPress migrations) but worth a deliberate
  decision before launch: promote to a "published" status, or confirm
  the schema/launch checklist doesn't gate on this field for hubs.
  Not a defect — flagged for visibility only.
- **5 real, confirmed, not-yet-migrated URLs** are linked from
  existing content: `/3-circles/`, `/free-training/`, `/4-1-1/`,
  `/4-fields/`, `/movement-resources/strategy-coordinator/`, and
  `/movement-resources/4-fields-toolbox/` (6 paths, `/movement-resources/`
  children counted individually). These currently 404 if clicked. Not
  a Phase 8 defect (the task brief for every prior batch explicitly
  permits linking to confirmed-but-unmigrated URLs), but they represent
  the last known gap in link-target coverage and should be resolved by
  either migrating those pages or, if they're deliberately being
  retired, converting the links to plain text.
- **3 already-documented missing media files** remain deferred
  (2 on `/apostles-meaning-.../`, 1 og_image on
  `/get-ready-to-be-empowered-evangelists-.../`) — unchanged from prior
  phases, still non-blocking.

## Build verification

- `astro check`: 0 errors, 0 warnings (54 pre-existing Zod-deprecation
  hints, unchanged from every prior phase), 18 files checked.
- `astro build`: 0 errors, 93 pages built, `sitemap-index.xml` and
  `sitemap-0.xml` generated correctly (93 `<loc>` entries).

## Summary

| Area | Pages/items checked | Issues found | Issues fixed |
| --- | --- | --- | --- |
| URL inventory | 93 pages, 122 inventory rows, 91 content files | 0 | 0 |
| SEO basics | 93 pages | 0 | 0 |
| Blog index | 1 page, 80 linked items (73 articles + 11 hubs, minus dupes) | 0 | 0 |
| Hub pages | 11 hubs, 67 key_articles, 11 next_step links | 0 | 0 |
| Internal links | 93 pages crawled | 33 reviewed (all confirmed intentional) | 0 |
| External links | 48 distinct domains | 1 reviewed (confirmed intentional) | 0 |
| Media | 123 unique file references | 1 | 1 |
| Redirects | 20 proposed rows | 0 | 0 |

**Total: 93 pages audited, 81 migrated articles/pages audited, 11 hub
pages audited. 1 issue found, 1 issue fixed. 0 issues remain
outstanding as defects** (3 risk items are documented deferrals, not
open bugs).
