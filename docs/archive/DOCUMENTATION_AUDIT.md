# DOCUMENTATION_AUDIT.md

Audit of all 44 root-level `.md` strategy documents (2026-07-12).
Goal: one obvious place for every type of information — fewer files,
zero ambiguity about which document is the source of truth (SoT).

No files were changed by this audit. The merge plan below is a
recommendation awaiting Mark's approval.

---

## 1. Documentation audit

### Group A — Living system documentation (post-redesign, current)

| File | Purpose | Audience | Useful now? | Overlap / duplication | Conflicts | SoT? |
|---|---|---|---|---|---|---|
| DESIGN_SYSTEM.md | Visual tokens, typography, spacing, image/mobile/a11y rules | Developers, designers | High | Restates rationale that ARTICLE_DESIGN_SYSTEM and PHASE_10* pioneered | None (newer wins by its own note) | **Yes — design system** |
| ARTICLE_SYSTEM.md | Article structure, components, frontmatter, Field Note behavior | Authors, developers | High | Supersedes ~70% of ARTICLE_DESIGN_SYSTEM; duplicates CTA summary from CTA_GUIDE (one paragraph, acceptable pointer) | None | **Yes — article system** |
| CTA_GUIDE.md | The three CTA types, fallback, copy principles | Authors | High | CTA philosophy also appears in ECOSYSTEM_GROWTH_STRATEGY (funnel levels) and old ARTICLE_DESIGN_SYSTEM | None — this is the operational layer of the ecosystem doc's strategy | **Yes — CTA strategy (page-level)** |
| COMPONENT_INVENTORY.md | What components exist, where used, what was removed | Developers | High | Small overlaps with ARTICLE_SYSTEM (component table) — different lens (inventory vs authoring), acceptable | None | **Yes — components** |
| SEARCH_SYSTEM.md | Search architecture, index, ranking, sizes | Developers | High | None | None | **Yes — search** |
| NAVIGATION_MAP.md | Nav surfaces, menu contents, exclusions | Developers, Mark | High | Menu rationale also in commit messages only | None | **Yes — site navigation** |
| SITE_AUDIT.md | Record of the 2026-07-12 consistency pass + open issues | Mark, future maintainers | Medium (a record, not a system) | "Unresolved issues" list is the only live part | None | Partial — it's a changelog entry; archive after branch merges, move open issues into the roadmap |
| FIELD_NOTE_TEMPLATE.md | Copy-paste template for authoring a Field Note | Authors | High | References ARTICLE_DESIGN_SYSTEM (stale pointer; should say ARTICLE_SYSTEM) | Stale cross-reference only | Yes for its narrow job (template, not strategy) |

### Group B — Content strategy (new, 2026-07-12)

| File | Purpose | Audience | Useful now? | Overlap / duplication | Conflicts | SoT? |
|---|---|---|---|---|---|---|
| CONTENT_CLUSTER_ROADMAP.md | 8 clusters, ~76 articles, pillars, CTAs, 3 phases | Mark, editors | High | Phases = de facto production queue; supersedes ECOSYSTEM's "Current Priority Clusters" section | ECOSYSTEM's cluster section is older/shallower — must be marked superseded | **Yes — content roadmap + production queue** |
| CONTENT_AUDIT.md | Per-article classification (keep/improve/merge) | Editors | High | Tier data duplicated from URL_INVENTORY (correctly cited as source) | None | **Yes — article status** |
| CONTENT_GAP_ANALYSIS.md | Evidence-classed gaps behind the roadmap | Mark, editors | Medium | Entirely an appendix to the roadmap; every gap reappears there as a ☆ article | None | No — merge into roadmap |
| INTERNAL_LINKING_PLAN.md | Linking rules, bridge map, CTA flow | Authors, developers | High | CTA flow table duplicates CTA_GUIDE assignments (intentional cross-view; keep table, point at guide) | None (old version already replaced) | **Yes — internal linking** |
| ECOSYSTEM_GROWTH_STRATEGY.md | Business strategy: ecosystem roles, visitor types, funnels, tracking schema | Mark, strategists | High for strategy; its keyword-cluster section is stale | Cluster section superseded by CONTENT_CLUSTER_ROADMAP; CTA levels overlap CTA_GUIDE (different altitude — fine) | Yes: its Cluster 1–n details vs the roadmap | **Yes — ecosystem/business strategy** (after marking cluster section superseded) |

### Group C — Migration-era records (work completed; historical value only)

| File(s) | Purpose | Useful now? | Notes |
|---|---|---|---|
| MIGRATION_PLAN.md (58KB) | Master WordPress→Astro brief | Historical | Completed. The "why/how" record; nothing in it governs current work. |
| PHASE_3…PHASE_12 (17 files, ~230KB) | Per-phase working briefs + completion records | Historical | All phases executed. Each contains decisions later consolidated into URL_INVENTORY, REDIRECTS, and the living docs. Duplicate heavily with each other and with final-state docs. |
| SLUG_VERIFICATION_AUDIT.md | One-time slug ground-truth audit | Historical | Findings absorbed into PROTECTED_URLS/URL_INVENTORY. |
| ARTICLE_DESIGN_SYSTEM.md (41KB) | Original field-manual design rationale | Historical | Already carries a supersession note pointing at the four current docs. Still referenced by a few `src/` comments and FIELD_NOTE_TEMPLATE. |
| CONTENT_SIMPLIFICATION_REMOVAL_MANIFEST.md | Authoritative record of the 2026-07-11 removal of 29 articles + Strategy Coordinator hub | Historical but load-bearing | The *why* behind 26 redirects. REDIRECTS.md duplicates the *what*. Keep as archived record; never delete. |

### Group D — Operational references (live until/through launch)

| File | Purpose | Useful now? | Overlap / conflicts | SoT? |
|---|---|---|---|---|
| URL_INVENTORY.md | Every URL + real GSC data + tiers | High — the data backbone | Feeds CONTENT_AUDIT, PROTECTED_URLS; no conflict (they cite it) | **Yes — URLs & traffic data** |
| REDIRECTS.md | Every old URL → disposition | High | Duplicates vercel.json (declares itself SoT; vercel.json is the executable copy — acceptable pairing) | **Yes — redirects** |
| PROTECTED_URLS.md | "Don't rename/rewrite before launch" guardrail list | Medium | Derived view of URL_INVENTORY tiers | No — a guardrail annex; fold into LAUNCH_CHECKLIST or URL_INVENTORY |
| MEDIA_ACQUISITION_CHECKLIST.md (65KB) | File-by-file media status (104/109 supplied) | Medium — 5 outstanding files | Supersedes MEDIA_IMPORT_PLAN | **Yes — media status** (after absorbing the other two) |
| MEDIA_IMPORT_PLAN.md (51KB) | Earlier media catalog ("most not supplied") | **Stale — directly conflicts** with ACQUISITION's "104 of 109 supplied" | Superseded page-for-page | No — archive |
| MEDIA_URLS_TO_PRESERVE.md | Media paths that must survive/301 | Medium | Concern belongs with REDIRECTS | No — merge into REDIRECTS |
| LAUNCH_CHECKLIST.md | Gate for DNS cutover | High in principle; **status lines stale** ("As of Phase 1…") — needs a reality refresh (site now builds/deploys; phases done) | References PROTECTED_URLS, REDIRECTS, media | **Yes — launch/ops** |
| ROLLBACK_PLAN.md | Post-cutover rollback steps | Medium | Only meaningful next to the launch checklist | No — merge into LAUNCH_CHECKLIST |
| SEO_CHECKLIST.md | Per-page pre-publish checklist | Medium | Overlaps ARTICLE_SYSTEM frontmatter rules | No — becomes the "pre-publish checklist" section of ARTICLE_SYSTEM |
| DOCUMENTATION_AUDIT.md | This file | — | — | One-time; archive after the merge plan executes |

**Conflict summary (the only three real conflicts):**
1. MEDIA_IMPORT_PLAN vs MEDIA_ACQUISITION_CHECKLIST — supplied-status contradiction; archive the former.
2. ECOSYSTEM_GROWTH_STRATEGY "Current Priority Clusters" vs CONTENT_CLUSTER_ROADMAP — mark the ecosystem section superseded with a pointer.
3. LAUNCH_CHECKLIST/ROLLBACK "as of Phase 1" status lines vs present reality — refresh statuses when merged.
(Plus stale pointers: FIELD_NOTE_TEMPLATE and a few src comments still cite ARTICLE_DESIGN_SYSTEM.)

---

## 2. Recommended structure — one obvious place per topic

**Root: 13 living documents. Everything else: `docs/archive/`.**

| Topic | The one place | Absorbs |
|---|---|---|
| Repo entry point / doc index | **README.md** (missing today — see §5) | — |
| Design system | DESIGN_SYSTEM.md | — |
| Article system + editorial workflow | ARTICLE_SYSTEM.md | SEO_CHECKLIST (as "Pre-publish checklist" section) + a new short "Editorial workflow" section; FIELD_NOTE_TEMPLATE stays a separate template file beside it |
| CTA strategy | CTA_GUIDE.md | — |
| Components | COMPONENT_INVENTORY.md | — |
| Site architecture / navigation | NAVIGATION_MAP.md | — |
| Search | SEARCH_SYSTEM.md | — |
| Content roadmap + production queue | CONTENT_CLUSTER_ROADMAP.md | CONTENT_GAP_ANALYSIS (as "Evidence & gaps" appendix); production queue = its existing Phase 1/2/3 section, extended with per-article status checkboxes — **no new queue file** |
| Article status ledger | CONTENT_AUDIT.md | — |
| Internal linking | INTERNAL_LINKING_PLAN.md | — |
| Ecosystem / business strategy | ECOSYSTEM_GROWTH_STRATEGY.md | (cluster section replaced by a pointer to the roadmap) |
| URLs, traffic data, redirects | URL_INVENTORY.md + REDIRECTS.md | REDIRECTS absorbs MEDIA_URLS_TO_PRESERVE; URL_INVENTORY absorbs PROTECTED_URLS as a flagged column/section |
| Launch & operations | LAUNCH_CHECKLIST.md | ROLLBACK_PLAN (as "Rollback" section) + the 5-outstanding-files summary from media docs |
| Media file status | MEDIA_ACQUISITION_CHECKLIST.md (until the last 5 files land, then archive) | MEDIA_IMPORT_PLAN (archive) |

## 3. Merge plan (ordered, safe)

1. Append SEO_CHECKLIST content to ARTICLE_SYSTEM.md as
   "Pre-publish checklist"; delete SEO_CHECKLIST.md.
2. Append CONTENT_GAP_ANALYSIS to CONTENT_CLUSTER_ROADMAP.md as an
   appendix; delete CONTENT_GAP_ANALYSIS.md.
3. Append ROLLBACK_PLAN to LAUNCH_CHECKLIST.md as "Rollback";
   refresh the stale "Phase 1" status lines while there; delete
   ROLLBACK_PLAN.md.
4. Move MEDIA_URLS_TO_PRESERVE's obligations into REDIRECTS.md
   ("Media paths" section); delete the file.
5. Fold PROTECTED_URLS into URL_INVENTORY.md (a "protected" marker on
   tier-1/2 rows + the guardrail paragraph); delete PROTECTED_URLS.md.
6. In ECOSYSTEM_GROWTH_STRATEGY.md, replace the "Current Priority
   Clusters" body with a three-line pointer to
   CONTENT_CLUSTER_ROADMAP.md.
7. Fix stale pointers: FIELD_NOTE_TEMPLATE and `src/` comments that
   cite ARTICLE_DESIGN_SYSTEM → ARTICLE_SYSTEM.
8. Create `docs/archive/` and move Group C wholesale: MIGRATION_PLAN,
   all 17 PHASE_* files, SLUG_VERIFICATION_AUDIT,
   ARTICLE_DESIGN_SYSTEM, CONTENT_SIMPLIFICATION_REMOVAL_MANIFEST,
   MEDIA_IMPORT_PLAN — plus SITE_AUDIT.md and this file once the
   branch merges. Add a one-paragraph docs/archive/README explaining
   these are records, not guidance.
9. Write the root README.md (see §5).

Net result: 44 root files → 13 living + 1 template + archive.

## 4. Documents to retire (archive, never silently delete)

MIGRATION_PLAN.md · all 17 PHASE_*.md · SLUG_VERIFICATION_AUDIT.md ·
ARTICLE_DESIGN_SYSTEM.md · MEDIA_IMPORT_PLAN.md ·
CONTENT_SIMPLIFICATION_REMOVAL_MANIFEST.md (archived but permanent —
it is the removal-of-record) · after their merges: SEO_CHECKLIST,
CONTENT_GAP_ANALYSIS, ROLLBACK_PLAN, MEDIA_URLS_TO_PRESERVE,
PROTECTED_URLS · after branch merge: SITE_AUDIT.md,
DOCUMENTATION_AUDIT.md · after the last 5 media files land:
MEDIA_ACQUISITION_CHECKLIST.md.

## 5. Missing documents that truly do not exist

1. **README.md** — the repository has no entry point. One page:
   what this repo is, how to run it (`npm run dev/build`), where
   content lives, and a 13-line index of which document owns which
   topic. This is the single most valuable missing document and the
   keystone of "one obvious place."
2. **Editorial workflow** — how an article moves from roadmap idea →
   draft → review → published (who approves copy, when Field Notes
   get cleared, when `status` flips). Genuinely undocumented — but it
   should be a **section inside ARTICLE_SYSTEM.md**, not a new file.

Nothing else is truly missing: analytics/tracking lives in
ECOSYSTEM_GROWTH_STRATEGY, deployment behavior in vercel.json +
LAUNCH_CHECKLIST, and the production queue belongs inside the
roadmap's phase section.
