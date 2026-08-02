// AUTO-GENERATED — DO NOT EDIT.
// Paste-ready, self-contained build of the "submit-connect-form" Edge Function
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

// Client-IP extraction + privacy-preserving hashing for rate limiting.
//
// We never store a raw IP. The salted SHA-256 hash is only ever used to
// count recent submissions from the same source; it can't be reversed to
// an address without the salt.

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('cf-connecting-ip') || 'unknown';
}

// Salted SHA-256, hex-encoded. The salt comes from CONNECT_IP_HASH_SALT
// (falls back to an empty salt if unset — set it in production so hashes
// aren't guessable from a known IP).
async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Cloudflare Turnstile — server-side verification for the Connect form.
//
// Turnstile is the primary bot control. The browser renders a Turnstile
// widget and sends the resulting token; this verifies it against
// Cloudflare before anything is saved or emailed. Never trust the client:
// a token is only proof of a human when Cloudflare confirms it here.
//
// Rollout / config policy (mirrors how the rest of this function fails
// safe):
//   * secret set               → verify against Cloudflare; a missing or
//                                 invalid token fails closed (rejected).
//   * secret unset + devBypass → skip (explicit local/test opt-in only).
//   * secret unset + no bypass → skip, but log a warning. This lets the
//                                 form keep working during rollout BEFORE
//                                 the secret is set; set the secret to
//                                 enforce.
//
// This module has no local imports on purpose so the Dashboard bundler
// (_dashboard/build.mjs) can inline it verbatim. It never logs the secret
// or the token.
//
// NOTE: this Supabase project is shared with CoVo Multipliers, whose
// `register` function uses TURNSTILE_SECRET_KEY. To keep the two sites'
// widgets independent, the Connect form uses its own CONNECT_-prefixed
// secret name.

interface TurnstileEnv {
  secret: string | undefined;
  devBypass: boolean;
}

interface TurnstileResult {
  ok: boolean;
  // True when verification was skipped (dev bypass, or not yet configured).
  skipped?: boolean;
  reason?: string;
}

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Reads the Turnstile config from function secrets. CONNECT_-prefixed so
// it never collides with CoVo's TURNSTILE_SECRET_KEY on the shared project.
function turnstileEnv(): TurnstileEnv {
  return {
    secret: Deno.env.get('CONNECT_TURNSTILE_SECRET_KEY') || undefined,
    devBypass: Deno.env.get('CONNECT_TURNSTILE_DEV_BYPASS') === 'true',
  };
}

async function verifyTurnstile(
  token: unknown,
  remoteIp: string | null,
  env: TurnstileEnv,
  fetchImpl: FetchLike = fetch,
): Promise<TurnstileResult> {
  if (!env.secret) {
    if (env.devBypass) return { ok: true, skipped: true, reason: 'dev_bypass' };
    // Not configured yet — don't block legitimate users during rollout.
    return { ok: true, skipped: true, reason: 'unconfigured' };
  }

  // Secret is configured → enforcement is on. A missing token fails closed.
  if (typeof token !== 'string' || token.trim() === '') {
    return { ok: false, reason: 'missing_token' };
  }

  const form = new URLSearchParams();
  form.set('secret', env.secret);
  form.set('response', token);
  if (remoteIp && remoteIp !== 'unknown') form.set('remoteip', remoteIp);

  try {
    const res = await fetchImpl(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (data && data.success === true) return { ok: true };
    return { ok: false, reason: 'verification_failed' };
  } catch (_err) {
    // Couldn't reach Cloudflare. Fail closed — ask a real user to retry
    // rather than wave through an unverified submission once enforcing.
    return { ok: false, reason: 'siteverify_unreachable' };
  }
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

// CORS handling for the submit-connect-form Edge Function.
//
// The production site and local dev are the only origins that should be
// able to call this. Origins can be overridden/extended with the
// CONNECT_ALLOWED_ORIGINS env var (comma-separated) without a redeploy.

const DEFAULT_ALLOWED_ORIGINS = [
  'https://multiplyingdisciples.us',
  'https://www.multiplyingdisciples.us',
  // Local Astro dev + common alternates.
  'http://localhost:4321',
  'http://localhost:3000',
  'http://127.0.0.1:4321',
];

function allowedOrigins(): string[] {
  const fromEnv = (Deno.env.get('CONNECT_ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  return fromEnv.length > 0
    ? [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...fromEnv])]
    : DEFAULT_ALLOWED_ORIGINS;
}

// Reflects the request Origin only when it is on the allowlist, so we
// never emit a wildcard for a credentialed-looking cross-site POST.
function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  const allowed = allowedOrigins().includes(origin);
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (allowed) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

// Server-side validation and normalization for the Connect form.
//
// Never trust the client: every field is re-validated and normalized
// here regardless of what the browser did. Returns a normalized
// submission on success, or a flat list of human-readable errors.


type ValidationResult =
  | { ok: true; data: NormalizedSubmission }
  | { ok: false; errors: string[] };

// Pragmatic email check: one @, a dot in the domain, no spaces. Good
// enough to reject typos/garbage without rejecting valid-but-unusual
// addresses; the confirmation email is the real deliverability test.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

// Collapses internal whitespace runs and trims. Used for short,
// single-line fields (names, country, postal code).
function cleanLine(value: unknown): string {
  return asString(value).replace(/\s+/g, ' ').trim();
}

// Trims but preserves internal newlines/spacing for free-text fields.
function cleanText(value: unknown): string {
  return asString(value).replace(/\r\n/g, '\n').trim();
}

function optionalAttribution(value: unknown): string | null {
  const v = cleanText(value).slice(0, LIMITS.attribution);
  return v.length > 0 ? v : null;
}

function validate(body: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const first_name = cleanLine(body.first_name);
  if (!first_name) errors.push('First name is required.');
  else if (first_name.length > LIMITS.firstName) errors.push('First name is too long.');

  const email = cleanLine(body.email).toLowerCase();
  if (!email) errors.push('Email is required.');
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email))
    errors.push('Please enter a valid email address.');

  const country = cleanLine(body.country);
  if (!country) errors.push('Country is required.');
  else if (country.length > LIMITS.country) errors.push('Country is too long.');

  const postal_code = cleanLine(body.postal_code);
  if (!postal_code) errors.push('ZIP / postal code is required.');
  else if (postal_code.length > LIMITS.postalCode) errors.push('Postal code is too long.');

  // Interests: must be a non-empty array of known keys. Dedupe and drop
  // anything unrecognized; if nothing valid remains, that's an error.
  const rawInterests = Array.isArray(body.interests) ? body.interests : [];
  const interests = [
    ...new Set(
      rawInterests
        .map((i) => asString(i).trim())
        .filter((i): i is InterestKey => (INTEREST_KEYS as string[]).includes(i)),
    ),
  ] as InterestKey[];
  if (rawInterests.length > 0 && interests.length !== rawInterests.length)
    errors.push('One or more interest selections were invalid.');
  if (interests.length === 0) errors.push('Please choose at least one interest.');

  // "Other" requires an explanation; if "other" isn't selected, any
  // stray other_interest text is discarded.
  let other_interest: string | null = null;
  if (interests.includes('other')) {
    other_interest = cleanText(body.other_interest);
    if (!other_interest) errors.push('Please tell us a bit more about what you’re interested in.');
    else if (other_interest.length > LIMITS.otherInterest)
      errors.push('Your “Other” note is too long.');
  }

  let message: string | null = cleanText(body.message);
  if (message.length > LIMITS.message) errors.push('Your message is too long.');
  if (!message) message = null;

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      first_name,
      email,
      country,
      postal_code,
      interests,
      other_interest,
      message,
      source_page: optionalAttribution(body.source_page),
      referrer: optionalAttribution(body.referrer),
      utm_source: optionalAttribution(body.utm_source),
      utm_medium: optionalAttribution(body.utm_medium),
      utm_campaign: optionalAttribution(body.utm_campaign),
    },
  };
}

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
