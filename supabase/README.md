# Supabase — Connect form

Backend for the `/contact-us/` ("Connect") form. Everything here targets
the **same** Supabase project that already serves the labs feed
(`mryjrvinzbxebzvxtggi`). It does not create a second system.

- `migrations/20260719000000_connect_submissions.sql` — the
  `connect_submissions` table + RLS (deny-all; service role only),
  including the `idempotency_key` unique constraint and the `ip_hash`
  rate-limit index.
- `functions/submit-connect-form/` — the public Edge Function the browser
  POSTs to. Validates server-side, inserts with the service-role key,
  and sends two Resend emails (internal notification + tailored
  visitor follow-up).
- `functions/retry-connect-emails/` — a protected, admin-only function
  that re-attempts the emails for submissions stuck at `partial`/`failed`.
- `functions/_shared/` — model/constants, email builders, and IP-hash
  helpers shared by both functions.

## Email status is acceptance, not delivery

`email_delivery_status` (and a "sent" email ID) means **Resend accepted
the send request** — not that it landed in the inbox. We are **not**
consuming Resend delivery webhooks, so a message can still bounce or be
filtered after being accepted. Values:

| Value | Meaning |
| --- | --- |
| `pending` | Not yet attempted |
| `sent` | Both emails accepted by Resend |
| `partial` | One accepted, one failed (see `internal_notification_id` / `follow_up_email_id` for which) |
| `failed` | Neither accepted |

If you later want true delivery confirmation, add a Resend webhook
handler and a separate delivery column; don't overload this one.

## Spam / abuse controls

- **Honeypot** — a hidden `company` field; filled → silently dropped.
- **Durable rate limiting** — counts saved rows for a salted hash of the
  client IP within a 60s window (max 5). It reads the table, so it holds
  across ephemeral Edge instances (unlike per-instance memory).
- **Idempotency** — the browser sends a per-submission `idempotency_key`
  stored under a unique constraint; a replayed key returns the existing
  row instead of inserting a duplicate or re-emailing.
- **Cloudflare Turnstile** *(primary)* — the browser renders a Turnstile
  widget and sends its token; the function verifies it against Cloudflare
  (`_shared/turnstile.ts`) before anything is saved or emailed. Enforcement
  turns on when `CONNECT_TURNSTILE_SECRET_KEY` is set; until then the check
  is skipped (a warning is logged) so the form keeps working during rollout,
  after which a missing/invalid token fails closed. Verification runs
  **after** the idempotent-replay check, so a legitimate timeout retry of an
  already-saved submission isn't blocked by a stale token.

### Turnstile keys

- **Site key** (public) — set as the **Vercel** environment variable
  `PUBLIC_TURNSTILE_SITE_KEY` (Vercel → Settings → Environment Variables).
  Astro inlines it into the front end at build (`import.meta.env`). Local
  dev falls back to Cloudflare's "always passes" test key.
- **Secret key** — set as the Supabase Function secret
  `CONNECT_TURNSTILE_SECRET_KEY` (below). It never reaches the browser.
- The site key and secret must be switched to real values **together** — a
  real secret rejects tokens minted by the test site key.
- **Shared-project note:** this project also runs CoVo's `register`
  function, which uses `TURNSTILE_SECRET_KEY`. The Connect form uses the
  distinct `CONNECT_TURNSTILE_SECRET_KEY` so the two sites' widgets stay
  independent — do not merge them.

## Environment variables (Function secrets)

Set on the Supabase project (Dashboard → Edge Functions → Secrets, or
`supabase secrets set`). `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
are injected automatically — **do not** set the service-role key anywhere
in the front end.

| Name | Used by | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | both | Resend API key |
| `CONNECT_FROM_EMAIL` | both | Sender, on the verified Resend domain (e.g. `Multiplying Disciples <connect@multiplyingdisciples.us>` or a bare address) |
| `CONNECT_REPLY_TO_EMAIL` | both | Reply-to on the visitor follow-up (e.g. `contact@multiplyingdisciples.us`) |
| `CONNECT_NOTIFICATION_EMAIL` | both | Where internal notifications are delivered |
| `CONNECT_IP_HASH_SALT` | submit | Salt for the IP hash. **Set in production** so hashes aren't guessable from a known IP |
| `CONNECT_TURNSTILE_SECRET_KEY` | submit | Cloudflare Turnstile **secret** key. Set to enforce Turnstile; unset = skipped (rollout). Distinct from CoVo's `TURNSTILE_SECRET_KEY` on this shared project |
| `CONNECT_TURNSTILE_DEV_BYPASS` | submit | *(optional)* `true` to skip Turnstile locally without a secret. **Never set in production** |
| `CONNECT_RETRY_SECRET` | retry | Shared secret required in the `x-retry-secret` header to run the retry function |
| `CONNECT_ALLOWED_ORIGINS` | submit | *(optional)* extra CORS origins, comma-separated |

> The Turnstile **site** key is not a function secret — it's the Vercel
> front-end env var `PUBLIC_TURNSTILE_SITE_KEY` (see *Turnstile keys* above).

## Deploy (run after the site owner approves)

```bash
# One-time: point the CLI at the project.
supabase link --project-ref mryjrvinzbxebzvxtggi

# 1. Apply the migration.
supabase db push

# 2. Set secrets (once, or when they change).
supabase secrets set \
  RESEND_API_KEY=... \
  CONNECT_FROM_EMAIL='Multiplying Disciples <connect@multiplyingdisciples.us>' \
  CONNECT_REPLY_TO_EMAIL=contact@multiplyingdisciples.us \
  CONNECT_NOTIFICATION_EMAIL=owner@example.com \
  CONNECT_IP_HASH_SALT="$(openssl rand -hex 16)" \
  CONNECT_RETRY_SECRET="$(openssl rand -hex 24)"

# 3. Deploy both functions. --no-verify-jwt makes submit callable from
#    the public site with no auth header (like subscribe-updates); the
#    retry function is instead gated by CONNECT_RETRY_SECRET.
supabase functions deploy submit-connect-form --no-verify-jwt
supabase functions deploy retry-connect-emails --no-verify-jwt
```

Dashboard equivalent: SQL Editor → run the migration file; Edge Functions
→ create each function, disable "Verify JWT", paste the files, add the
secrets above.

## Retrying failed emails

**Automated option** — schedule the retry function (e.g. Supabase
Scheduled Functions / a cron job) to POST to it periodically:

```bash
curl -X POST \
  -H "x-retry-secret: $CONNECT_RETRY_SECRET" \
  https://mryjrvinzbxebzvxtggi.supabase.co/functions/v1/retry-connect-emails
```

It re-sends only the missing email for each `partial`/`failed` row (never
double-emails), records new Resend IDs, and recomputes the status.

**Manual option** — inspect and re-drive by hand:

```sql
select id, email, email_delivery_status, internal_notification_id, follow_up_email_id
from connect_submissions
where email_delivery_status in ('partial','failed')
order by created_at desc;
```

Then run the `curl` above (or resend from the Resend dashboard and update
the row's IDs/status manually).
