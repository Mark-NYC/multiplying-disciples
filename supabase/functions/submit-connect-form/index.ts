// submit-connect-form
//
// Public Edge Function behind the /contact-us/ ("Connect") form. The
// browser POSTs here; this function validates server-side, stores the
// submission with the service-role key, and sends two emails via Resend
// (an internal notification and a tailored visitor follow-up). It is the
// only writer of public.connect_submissions.
//
// Deploy WITHOUT JWT verification (it is called from the public site
// with no auth header, exactly like the existing subscribe-updates
// function):  supabase functions deploy submit-connect-form --no-verify-jwt
//
// Required env (Supabase auto-injects SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY):
//   RESEND_API_KEY, CONNECT_FROM_EMAIL, CONNECT_REPLY_TO_EMAIL,
//   CONNECT_NOTIFICATION_EMAIL, (optional) CONNECT_ALLOWED_ORIGINS

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from './cors.ts';
import { validate } from './validation.ts';
import { buildFollowUpEmail, buildInternalEmail, sendEmail } from './emails.ts';

// Best-effort per-instance rate limiting. Edge instances are ephemeral
// and not shared, so this is a coarse first line of defence (paired with
// the honeypot), not a hard global limit: at most RATE_MAX submissions
// per IP within RATE_WINDOW_MS on a given instance.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

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

Deno.serve(async (req) => {
  // CORS preflight.
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
  }
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405, req, { Allow: 'POST' });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Too many requests. Please try again shortly.' }, 429, req);
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
    return json({ ok: true }, 200, req);
  }

  const result = validate(body);
  if (!result.ok) {
    return json({ ok: false, errors: result.errors }, 400, req);
  }
  const data = result.data;

  // --- Persist first: the DB save must succeed even if Resend later
  // fails, so we never lose a submission or push someone to resubmit.
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) {
    console.error('submit-connect-form: missing Supabase env');
    return json({ ok: false, error: 'Server misconfiguration.' }, 500, req);
  }
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const submittedAt = new Date();
  const { data: inserted, error: insertError } = await supabase
    .from('connect_submissions')
    .insert({
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
      created_at: submittedAt.toISOString(),
      email_delivery_status: 'pending',
    })
    .select('id')
    .single();

  if (insertError || !inserted) {
    console.error('submit-connect-form: insert failed', insertError);
    return json({ ok: false, error: 'We couldn’t save your response. Please try again.' }, 500, req);
  }
  const submissionId = inserted.id as string;

  // --- Emails: best-effort. Failures are logged and recorded, never
  // surfaced as a request failure (which would invite a resubmit).
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

  // Safe success: no internal details, no submission id, regardless of
  // email outcome — the record is saved.
  return json({ ok: true }, 200, req);
});
