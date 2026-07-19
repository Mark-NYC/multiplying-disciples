# Supabase — Connect form

Backend for the `/contact-us/` ("Connect") form. Everything here targets
the **same** Supabase project that already serves the labs feed
(`mryjrvinzbxebzvxtggi`). It does not create a second system.

- `migrations/20260719000000_connect_submissions.sql` — the
  `connect_submissions` table + RLS (deny-all; service role only).
- `functions/submit-connect-form/` — the public Edge Function the browser
  POSTs to. It validates server-side, inserts with the service-role key,
  and sends two Resend emails (internal notification + tailored
  visitor follow-up).

## Environment variables (Function secrets)

Set on the Supabase project (Dashboard → Edge Functions → Secrets, or
`supabase secrets set`). `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
are injected automatically — **do not** set the service-role key anywhere
in the front end.

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONNECT_FROM_EMAIL` | Sender, on the verified Resend domain (e.g. `Multiplying Disciples <connect@multiplyingdisciples.us>` or a bare address) |
| `CONNECT_REPLY_TO_EMAIL` | Reply-to on the visitor follow-up (e.g. `contact@multiplyingdisciples.us`) |
| `CONNECT_NOTIFICATION_EMAIL` | Where internal notifications are delivered |
| `CONNECT_ALLOWED_ORIGINS` | *(optional)* extra CORS origins, comma-separated |

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
  CONNECT_NOTIFICATION_EMAIL=owner@example.com

# 3. Deploy the function. --no-verify-jwt makes it callable from the
#    public site with no auth header, exactly like subscribe-updates.
supabase functions deploy submit-connect-form --no-verify-jwt
```

Dashboard equivalent: SQL Editor → run the migration file; Edge Functions
→ create `submit-connect-form`, disable "Verify JWT", paste the files,
add the secrets above.
