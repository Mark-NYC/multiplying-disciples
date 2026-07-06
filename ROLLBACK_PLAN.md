# Rollback Plan

## Current risk level: none

As of Phase 1, this Astro codebase has not been deployed anywhere, DNS
has not been touched, and the live WordPress site is untouched and
continues serving `multiplyingdisciples.us`. There is nothing to roll
back from yet. This document defines the plan for when that changes.

## Principle

WordPress stays live and authoritative until the Astro site has been
verified against the full `LAUNCH_CHECKLIST.md` and a human has
explicitly approved cutover. The safest rollback is **not cutting over
until confident** — but a plan exists in case a cutover happens and needs
to be reversed.

## If a preview/staging deployment is created (pre-launch)

- Deploy to a subdomain or preview URL (e.g. Netlify/Vercel preview
  deploy), never the production domain.
- Ensure the preview deployment's `robots.txt` disallows all crawling and
  pages carry `noindex` — prevents duplicate-content or premature
  indexing risk. (Placeholder pages already carry `noindex` by default
  via `status: source-pending`; a preview-wide `noindex` should be added
  at deploy-config time regardless.)
- No DNS changes at this stage — nothing to roll back.

## If DNS/hosting cutover happens (future, requires explicit approval)

1. **Before cutover**: note current DNS records (A/CNAME/MX/TXT) and
   current hosting provider details somewhere safe outside this repo.
2. **Cutover**: point DNS at the new Astro hosting target.
3. **If something breaks post-cutover** (404s on real pages, ranking
   drop, redirect loop, missing media):
   - Revert DNS to the original WordPress hosting records captured in
     step 1. DNS TTL determines how fast this takes effect — use a low
     TTL in the hours around cutover specifically so rollback is fast.
   - WordPress itself is never deleted or modified during this
     migration, so reverting DNS alone should be sufficient to restore
     the old site fully.
4. **After rollback**: diagnose the issue against `LAUNCH_CHECKLIST.md`
   before attempting cutover again.

## Non-negotiables that make rollback possible

- Never delete the WordPress installation, database, or media library
  during this migration.
- Never let this be the only copy of anything — WordPress remains the
  system of record until Astro is verified and cutover is complete.
- Keep DNS TTL low in the window around any real cutover attempt.
