// AUTO-GENERATED — DO NOT EDIT.
// Paste-ready, self-contained build of the "retry-connect-emails" Edge Function
// for the Supabase Dashboard. All local modules are inlined; the only
// import left is the remote Supabase client (required, not local).
//
// Canonical source: the modular files under supabase/functions/.
// Regenerate with: node supabase/functions/_dashboard/build.mjs

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Shared model for the Connect form functions.
//
// The canonical interest keys are the single source of truth shared by
// validation (which values are accepted), the internal notification
// (which interests to list), and the tailored follow-up (which sections
// to include). The front end sends these exact keys.

type InterestKey = 'connecting' | 'training' | 'learning' | 'other';

const INTEREST_KEYS: InterestKey[] = [
  'connecting',
  'training',
  'learning',
  'other',
];

// Human labels for the notification email and subject line. Order here
// also defines "primary interest" precedence: the first selected key in
// this order is the one used in the notification subject.
const INTEREST_LABELS: Record<InterestKey, string> = {
  connecting: 'Connecting with local believers',
  training: 'Getting trained to make disciples',
  learning: 'Learning more about Jesus',
  other: 'Other',
};

// Live, verified on-site destinations used by the tailored follow-up.
// These are real pages on multiplyingdisciples.us — do not invent URLs.
const SITE_URL = 'https://multiplyingdisciples.us';
// "Start Making Disciples" — the site's beginner training pathway
// (src/pages/starter-tools.astro).
const TRAINING_URL = `${SITE_URL}/starter-tools/`;
// "Stories of Hope" — the welcoming Bible-discovery entry point for a
// seeker (src/content/hubs/stories-of-hope.md).
const JESUS_URL = `${SITE_URL}/stories-of-hope/`;

// Field size limits. Anything larger is rejected as oversized content.
const LIMITS = {
  firstName: 100,
  email: 254,
  country: 100,
  postalCode: 20,
  otherInterest: 1000,
  message: 2000,
  attribution: 500, // source_page / referrer / utm_* each
  idempotencyKey: 200,
} as const;

// Durable rate limit: at most RATE_MAX saved submissions per ip_hash
// within RATE_WINDOW_SECONDS, counted across all instances via the DB.
const RATE_WINDOW_SECONDS = 60;
const RATE_MAX = 5;

// The normalized, validated shape stored in connect_submissions. Shared
// so the retry function can rebuild emails from a stored row without
// depending on the request-validation module.
interface NormalizedSubmission {
  first_name: string;
  email: string;
  country: string;
  postal_code: string;
  interests: InterestKey[];
  other_interest: string | null;
  message: string | null;
  source_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

// Reconstructs a NormalizedSubmission from a stored connect_submissions
// row (used by the retry function). Unknown interest values are dropped.
function submissionFromRow(row: Record<string, unknown>): NormalizedSubmission {
  const rawInterests = Array.isArray(row.interests) ? row.interests : [];
  const interests = rawInterests.filter((i): i is InterestKey =>
    (INTEREST_KEYS as string[]).includes(i as string),
  );
  const str = (v: unknown): string => (typeof v === 'string' ? v : '');
  const orNull = (v: unknown): string | null => (typeof v === 'string' && v ? v : null);
  return {
    first_name: str(row.first_name),
    email: str(row.email),
    country: str(row.country),
    postal_code: str(row.postal_code),
    interests,
    other_interest: orNull(row.other_interest),
    message: orNull(row.message),
    source_page: orNull(row.source_page),
    referrer: orNull(row.referrer),
    utm_source: orNull(row.utm_source),
    utm_medium: orNull(row.utm_medium),
    utm_campaign: orNull(row.utm_campaign),
  };
}

// Email building + sending for the Connect form (via Resend).
//
// Two emails per submission:
//   1. Internal notification to the site owner (every field, reply_to
//      set to the visitor so a reply goes straight back to them).
//   2. One tailored, warm follow-up to the visitor combining a section
//      per selected interest (never multiple emails).
//
// NOTE: a successful send here means Resend ACCEPTED the request, not
// that the message reached the inbox — no delivery webhooks are consumed.


const RESEND_ENDPOINT = 'https://api.resend.com/emails';

interface SendResult {
  id: string | null;
  error: string | null;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Preserves visitor line breaks when rendering free text into HTML.
function nl2br(str: string): string {
  return escapeHtml(str).replace(/\n/g, '<br />');
}

// First selected interest in canonical order — used for the subject.
function primaryInterest(interests: InterestKey[]): InterestKey {
  return INTEREST_KEYS.find((k) => interests.includes(k)) ?? interests[0];
}

// Ensures a display-name sender ("Multiplying Disciples <addr>") even if
// the env var is a bare address.
function fromWithName(from: string): string {
  return from.includes('<') ? from : `Multiplying Disciples <${from}>`;
}

interface EmailPayload {
  from: string;
  to: string;
  reply_to?: string;
  subject: string;
  html: string;
  text: string;
}

async function sendEmail(
  apiKey: string,
  payload: EmailPayload,
): Promise<SendResult> {
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromWithName(payload.from),
        to: payload.to,
        reply_to: payload.reply_to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { id: null, error: `Resend ${res.status}: ${detail.slice(0, 300)}` };
    }
    const json = await res.json().catch(() => ({}));
    return { id: (json as { id?: string }).id ?? null, error: null };
  } catch (err) {
    return { id: null, error: err instanceof Error ? err.message : String(err) };
  }
}

// --- Internal notification -------------------------------------------

function buildInternalEmail(
  data: NormalizedSubmission,
  submissionId: string,
  submittedAt: Date,
): { subject: string; html: string; text: string } {
  const primary = INTEREST_LABELS[primaryInterest(data.interests)];
  const subject = `New Connect request from ${data.first_name}: ${primary}`;

  const when = submittedAt.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  });
  const interestList = data.interests.map((k) => INTEREST_LABELS[k]);

  const rows: Array<[string, string]> = [
    ['Name', escapeHtml(data.first_name)],
    ['Email', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`],
    ['Country', escapeHtml(data.country)],
    ['Postal code', escapeHtml(data.postal_code)],
    ['Interested in', interestList.map(escapeHtml).join('<br />')],
    ['Other response', data.other_interest ? nl2br(data.other_interest) : '—'],
    ['Message', data.message ? nl2br(data.message) : '—'],
    ['Submitted', escapeHtml(when)],
    ['Source page', data.source_page ? escapeHtml(data.source_page) : '—'],
    ['Referrer', data.referrer ? escapeHtml(data.referrer) : '—'],
    ['UTM source', data.utm_source ? escapeHtml(data.utm_source) : '—'],
    ['UTM medium', data.utm_medium ? escapeHtml(data.utm_medium) : '—'],
    ['UTM campaign', data.utm_campaign ? escapeHtml(data.utm_campaign) : '—'],
    ['Submission ID', escapeHtml(submissionId)],
  ];

  const html = `
<!doctype html>
<html><body style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#1f2523; line-height:1.5;">
  <h2 style="margin:0 0 4px;">New Connect request</h2>
  <p style="margin:0 0 16px; color:#57635c;">${escapeHtml(data.first_name)} is interested in: ${escapeHtml(primary)}</p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%; max-width:640px;">
    ${rows
      .map(
        ([label, value]) => `
      <tr>
        <td style="padding:8px 12px; border-bottom:1px solid #eee; font-weight:600; vertical-align:top; width:150px;">${label}</td>
        <td style="padding:8px 12px; border-bottom:1px solid #eee; vertical-align:top;">${value}</td>
      </tr>`,
      )
      .join('')}
  </table>
  <p style="margin:16px 0 0; color:#57635c; font-size:13px;">Reply to this email to respond directly to ${escapeHtml(data.first_name)}.</p>
</body></html>`.trim();

  const text = [
    `New Connect request from ${data.first_name}: ${primary}`,
    '',
    `Name: ${data.first_name}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    `Postal code: ${data.postal_code}`,
    `Interested in: ${interestList.join(', ')}`,
    `Other response: ${data.other_interest ?? '—'}`,
    `Message: ${data.message ?? '—'}`,
    `Submitted: ${when}`,
    `Source page: ${data.source_page ?? '—'}`,
    `Referrer: ${data.referrer ?? '—'}`,
    `UTM source: ${data.utm_source ?? '—'}`,
    `UTM medium: ${data.utm_medium ?? '—'}`,
    `UTM campaign: ${data.utm_campaign ?? '—'}`,
    `Submission ID: ${submissionId}`,
    '',
    `Reply to this email to respond directly to ${data.first_name}.`,
  ].join('\n');

  return { subject, html, text };
}

// --- Tailored visitor follow-up --------------------------------------

interface Section {
  html: string;
  text: string;
}

function sectionFor(key: InterestKey): Section {
  switch (key) {
    case 'connecting':
      return {
        html: `<p><strong>Connecting with local believers.</strong> We’ve received your request. We’ll take a look at your location and get back to you personally about any possible local connections. (We can’t promise there’s already someone nearby, but we’ll do our best to help.)</p>`,
        text: `Connecting with local believers: We’ve received your request. We’ll take a look at your location and get back to you personally about any possible local connections. We can’t promise there’s already someone nearby, but we’ll do our best to help.`,
      };
    case 'training':
      return {
        html: `<p><strong>Getting trained to make disciples.</strong> A good next step is our beginner pathway, Start Making Disciples: <a href="${TRAINING_URL}">${TRAINING_URL}</a>. Work through it at your own pace — reply anytime if you’d like a hand.</p>`,
        text: `Getting trained to make disciples: A good next step is our beginner pathway, Start Making Disciples: ${TRAINING_URL}. Work through it at your own pace — reply anytime if you’d like a hand.`,
      };
    case 'learning':
      return {
        html: `<p><strong>Learning more about Jesus.</strong> A simple, welcoming place to start is Stories of Hope — short Bible stories you can read on your own or with a friend: <a href="${JESUS_URL}">${JESUS_URL}</a>. And you can always reply to this email with any questions.</p>`,
        text: `Learning more about Jesus: A simple, welcoming place to start is Stories of Hope — short Bible stories you can read on your own or with a friend: ${JESUS_URL}. And you can always reply to this email with any questions.`,
      };
    case 'other':
      return {
        html: `<p><strong>Your note.</strong> Thanks for sharing — we’ve received it, and someone will follow up with you personally.</p>`,
        text: `Your note: Thanks for sharing — we’ve received it, and someone will follow up with you personally.`,
      };
  }
}

function buildFollowUpEmail(
  data: NormalizedSubmission,
): { subject: string; html: string; text: string } {
  const subject = 'Thanks for reaching out — Multiplying Disciples';
  const sections = data.interests.map(sectionFor);

  const html = `
<!doctype html>
<html><body style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#1f2523; line-height:1.6; max-width:560px;">
  <p>Hi ${escapeHtml(data.first_name)},</p>
  <p>Thanks for reaching out to Multiplying Disciples — we’re glad you did. Here’s a next step based on what you shared:</p>
  ${sections.map((s) => s.html).join('\n  ')}
  <p>You can reply directly to this email anytime.</p>
  <p>Grace and peace,<br />Multiplying Disciples</p>
</body></html>`.trim();

  const text = [
    `Hi ${data.first_name},`,
    '',
    'Thanks for reaching out to Multiplying Disciples — we’re glad you did. Here’s a next step based on what you shared:',
    '',
    ...sections.map((s) => s.text),
    '',
    'You can reply directly to this email anytime.',
    '',
    'Grace and peace,',
    'Multiplying Disciples',
  ].join('\n');

  return { subject, html, text };
}

// retry-connect-emails
//
// Protected, admin-only companion to submit-connect-form. Re-attempts the
// Resend sends for submissions whose email_delivery_status is 'partial'
// or 'failed', sending only the email that's still missing (identified by
// a null *_id column) so nobody is double-emailed. Recomputes the status
// and records any new Resend message IDs.
//
// Reminder: "sent" means Resend accepted the request, not confirmed inbox
// delivery — no delivery webhooks are consumed.
//
// Auth: requires the `x-retry-secret` header to equal CONNECT_RETRY_SECRET.
// Deploy WITHOUT JWT verification (the shared secret is the gate):
//   supabase functions deploy retry-connect-emails --no-verify-jwt
//
// Trigger it manually, e.g.:
//   curl -X POST -H "x-retry-secret: $CONNECT_RETRY_SECRET" \
//     https://<project>.supabase.co/functions/v1/retry-connect-emails
//
// Required env (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY auto-injected):
//   CONNECT_RETRY_SECRET, RESEND_API_KEY, CONNECT_FROM_EMAIL,
//   CONNECT_REPLY_TO_EMAIL, CONNECT_NOTIFICATION_EMAIL


const MAX_PER_RUN = 50;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed.' }, 405);
  }

  const secret = Deno.env.get('CONNECT_RETRY_SECRET');
  if (!secret) {
    console.error('retry-connect-emails: CONNECT_RETRY_SECRET not set');
    return json({ ok: false, error: 'Server misconfiguration.' }, 500);
  }
  if (req.headers.get('x-retry-secret') !== secret) {
    return json({ ok: false, error: 'Unauthorized.' }, 401);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('CONNECT_FROM_EMAIL');
  const replyTo = Deno.env.get('CONNECT_REPLY_TO_EMAIL');
  const notifyEmail = Deno.env.get('CONNECT_NOTIFICATION_EMAIL');
  if (!supabaseUrl || !serviceKey || !resendKey || !fromEmail) {
    console.error('retry-connect-emails: missing required env');
    return json({ ok: false, error: 'Server misconfiguration.' }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const { data: rows, error } = await supabase
    .from('connect_submissions')
    .select('*')
    .in('email_delivery_status', ['partial', 'failed'])
    .order('created_at', { ascending: true })
    .limit(MAX_PER_RUN);
  if (error) {
    console.error('retry-connect-emails: query failed', error);
    return json({ ok: false, error: 'Query failed.' }, 500);
  }

  const results: Array<{ id: string; status: string; retried: string[] }> = [];

  for (const row of rows ?? []) {
    const sub = submissionFromRow(row as Record<string, unknown>);
    const submissionId = row.id as string;
    const submittedAt = new Date(row.created_at as string);
    let internalId: string | null = (row.internal_notification_id as string | null) ?? null;
    let followUpId: string | null = (row.follow_up_email_id as string | null) ?? null;
    const retried: string[] = [];

    // Resend the internal notification only if it never succeeded.
    if (!internalId && notifyEmail) {
      const internal = buildInternalEmail(sub, submissionId, submittedAt);
      const r = await sendEmail(resendKey, {
        from: fromEmail,
        to: notifyEmail,
        reply_to: sub.email,
        subject: internal.subject,
        html: internal.html,
        text: internal.text,
      });
      if (r.id) {
        internalId = r.id;
        retried.push('internal');
      } else {
        console.error('retry-connect-emails: internal retry failed', submissionId, r.error);
      }
    }

    // Resend the visitor follow-up only if it never succeeded.
    if (!followUpId) {
      const followUp = buildFollowUpEmail(sub);
      const r = await sendEmail(resendKey, {
        from: fromEmail,
        to: sub.email,
        reply_to: replyTo ?? fromEmail,
        subject: followUp.subject,
        html: followUp.html,
        text: followUp.text,
      });
      if (r.id) {
        followUpId = r.id;
        retried.push('follow_up');
      } else {
        console.error('retry-connect-emails: follow-up retry failed', submissionId, r.error);
      }
    }

    // Recompute status. Internal is only "required" when a notification
    // address is configured; otherwise the follow-up alone is enough.
    const internalDone = internalId !== null || !notifyEmail;
    const status = internalDone && followUpId ? 'sent' : internalId || followUpId ? 'partial' : 'failed';

    const { error: updateError } = await supabase
      .from('connect_submissions')
      .update({
        email_delivery_status: status,
        internal_notification_id: internalId,
        follow_up_email_id: followUpId,
      })
      .eq('id', submissionId);
    if (updateError) console.error('retry-connect-emails: update failed', submissionId, updateError);

    results.push({ id: submissionId, status, retried });
  }

  return json({ ok: true, processed: results.length, results }, 200);
});
