// submit-connect-form
//
// Public Edge Function behind the /contact-us/ ("Connect") form. The
// browser POSTs here; this function validates server-side, stores the
// submission with the service-role key, and sends two emails via Resend
// (an internal notification and a tailored visitor follow-up). It is the
// only writer of public.connect_submissions.
//
// Once the row is saved the submission is ACCEPTED: email problems never
// turn into a client-visible failure (which would invite a resubmit).
// The response reports { saved, email_sent } and the browser messages
// accordingly.
//
// Spam/abuse controls: Cloudflare Turnstile (verified server-side, the
// primary control) + a hidden honeypot + durable, DB-backed rate limiting
// keyed by a salted hash of the client IP (counts recent rows, so it holds
// across ephemeral instances). Idempotency: the client sends a
// per-submission key stored under a unique constraint; a replayed key
// returns the existing row instead of inserting a duplicate or
// re-emailing.
//
// Deploy WITHOUT JWT verification (called from the public site with no
// auth header, like subscribe-updates):
//   supabase functions deploy submit-connect-form --no-verify-jwt
//
// Required env (Supabase auto-injects SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY):
//   RESEND_API_KEY, CONNECT_FROM_EMAIL, CONNECT_REPLY_TO_EMAIL,
//   CONNECT_NOTIFICATION_EMAIL,
//   CONNECT_TURNSTILE_SECRET_KEY (set to enforce Turnstile),
//   (optional) CONNECT_ALLOWED_ORIGINS, CONNECT_IP_HASH_SALT,
//   (optional) CONNECT_TURNSTILE_DEV_BYPASS=true (local/test only)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from './cors.ts';
import { validate } from './validation.ts';
import { LIMITS, RATE_MAX, RATE_WINDOW_SECONDS } from '../_shared/model.ts';
import { buildFollowUpEmail, buildInternalEmail, sendEmail } from '../_shared/emails.ts';
import { clientIp, hashIp } from '../_shared/security.ts';
import { turnstileEnv, verifyTurnstile } from '../_shared/turnstile.ts';

function json(
  body: unknown,
  status: number,
  req: Request,
  extra: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(req), ...extra },
  });
}

// Safe visitor-facing "we got it" response. Never leaks internals; never
// implies the submission needs retrying.
function accepted(req: Request, emailSent: boolean): Response {
  return json(
    {
      ok: true,
      saved: true,
      email_sent: emailSent,
      message: emailSent
        ? 'Thanks — we received your response and sent a next step to your email.'
        : 'Thanks — we received your response and someone will follow up with you personally.',
    },
    200,
    req,
  );
}

Deno.serve(async (req) => {
  // CORS preflight.
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405, req, { Allow: 'POST' });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400, req);
  }

  // Honeypot: a real user never fills the hidden "company" field. If it's
  // present, pretend everything worked so bots get no signal — but store
  // and email nothing.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return accepted(req, true);
  }

  const result = validate(body);
  if (!result.ok) {
    return json({ ok: false, errors: result.errors }, 400, req);
  }
  const data = result.data;

  // Idempotency key: one per submission attempt. Use the client's if
  // present and sane, else generate one so every row has a unique key.
  const rawKey = typeof body.idempotency_key === 'string' ? body.idempotency_key.trim() : '';
  const idempotencyKey =
    rawKey && rawKey.length <= LIMITS.idempotencyKey ? rawKey : crypto.randomUUID();

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) {
    console.error('submit-connect-form: missing Supabase env');
    return json({ ok: false, error: 'Server misconfiguration.' }, 500, req);
  }
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // Replay: same key already stored → return the existing accepted
  // result. No duplicate row, no duplicate emails.
  {
    const { data: existing } = await supabase
      .from('connect_submissions')
      .select('follow_up_email_id')
      .eq('idempotency_key', idempotencyKey)
      .maybeSingle();
    if (existing) {
      return accepted(req, existing.follow_up_email_id !== null);
    }
  }

  const ip = clientIp(req);

  // Turnstile (primary bot control). Verified server-side before any save
  // or email. Placed AFTER the idempotent-replay check so a legitimate
  // timeout retry of an already-saved submission — which reuses its
  // idempotency key but may carry a stale/expired token — is answered from
  // the replay path above rather than rejected here. A brand-new
  // submission always needs a fresh, valid token.
  {
    const ts = await verifyTurnstile(body.turnstile_token, ip, turnstileEnv());
    if (ts.skipped && ts.reason === 'unconfigured') {
      console.warn(
        'submit-connect-form: TURNSTILE NOT CONFIGURED — submissions are not verified. Set CONNECT_TURNSTILE_SECRET_KEY to enforce.',
      );
    }
    if (!ts.ok) {
      // Generic, human copy. The widget resets and the visitor can retry.
      return json(
        { ok: false, error: 'We couldn’t verify your submission. Please try again.' },
        400,
        req,
      );
    }
  }

  // Durable rate limiting: count this IP's saved submissions in the
  // window. Holds across instances because it reads the table.
  const ipHash = await hashIp(ip, Deno.env.get('CONNECT_IP_HASH_SALT') ?? '');
  {
    const since = new Date(Date.now() - RATE_WINDOW_SECONDS * 1000).toISOString();
    const { count } = await supabase
      .from('connect_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if ((count ?? 0) >= RATE_MAX) {
      return json({ ok: false, error: 'Too many requests. Please try again shortly.' }, 429, req);
    }
  }

  // --- Persist first: the DB save must succeed even if Resend later
  // fails, so we never lose a submission or push someone to resubmit.
  const submittedAt = new Date();
  const { data: inserted, error: insertError } = await supabase
    .from('connect_submissions')
    .insert({
      idempotency_key: idempotencyKey,
      first_name: data.first_name,
      email: data.email,
      country: data.country,
      postal_code: data.postal_code,
      interests: data.interests,
      other_interest: data.other_interest,
      message: data.message,
      source_page: data.source_page,
      referrer: data.referrer,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      ip_hash: ipHash,
      created_at: submittedAt.toISOString(),
      email_delivery_status: 'pending',
    })
    .select('id')
    .single();

  if (insertError || !inserted) {
    // Unique-violation on idempotency_key: a concurrent request with the
    // same key won the race. Treat it as a replay, not a failure.
    if (insertError?.code === '23505') {
      const { data: existing } = await supabase
        .from('connect_submissions')
        .select('follow_up_email_id')
        .eq('idempotency_key', idempotencyKey)
        .maybeSingle();
      return accepted(req, existing ? existing.follow_up_email_id !== null : false);
    }
    console.error('submit-connect-form: insert failed', insertError);
    return json({ ok: false, error: 'We couldn’t save your response. Please try again.' }, 500, req);
  }
  const submissionId = inserted.id as string;

  // --- Emails: best-effort. "Sent" here means Resend accepted the send,
  // not confirmed delivery. Failures are logged and recorded, never
  // surfaced as a request failure.
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('CONNECT_FROM_EMAIL');
  const replyTo = Deno.env.get('CONNECT_REPLY_TO_EMAIL');
  const notifyEmail = Deno.env.get('CONNECT_NOTIFICATION_EMAIL');

  let internalId: string | null = null;
  let followUpId: string | null = null;
  let internalOk = false;
  let followUpOk = false;

  if (resendKey && fromEmail) {
    if (notifyEmail) {
      const internal = buildInternalEmail(data, submissionId, submittedAt);
      const r = await sendEmail(resendKey, {
        from: fromEmail,
        to: notifyEmail,
        reply_to: data.email, // owner replies land in the visitor's inbox
        subject: internal.subject,
        html: internal.html,
        text: internal.text,
      });
      internalId = r.id;
      internalOk = !r.error;
      if (r.error) console.error('submit-connect-form: internal email failed', r.error);
    } else {
      console.error('submit-connect-form: CONNECT_NOTIFICATION_EMAIL not set');
    }

    const followUp = buildFollowUpEmail(data);
    const r = await sendEmail(resendKey, {
      from: fromEmail,
      to: data.email,
      reply_to: replyTo ?? fromEmail,
      subject: followUp.subject,
      html: followUp.html,
      text: followUp.text,
    });
    followUpId = r.id;
    followUpOk = !r.error;
    if (r.error) console.error('submit-connect-form: follow-up email failed', r.error);
  } else {
    console.error('submit-connect-form: Resend env not fully configured; skipping emails');
  }

  const deliveryStatus =
    internalOk && followUpOk ? 'sent' : internalOk || followUpOk ? 'partial' : 'failed';

  const { error: updateError } = await supabase
    .from('connect_submissions')
    .update({
      email_delivery_status: deliveryStatus,
      internal_notification_id: internalId,
      follow_up_email_id: followUpId,
    })
    .eq('id', submissionId);
  if (updateError) {
    console.error('submit-connect-form: delivery-status update failed', updateError);
  }

  // Accepted. email_sent reflects the visitor follow-up specifically —
  // that's what the on-page copy references. A failed internal
  // notification is an owner-side issue handled by the retry path.
  return accepted(req, followUpOk);
});
