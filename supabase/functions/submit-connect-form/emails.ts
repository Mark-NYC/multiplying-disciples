// Email building + sending for the Connect form (via Resend).
//
// Two emails per submission:
//   1. Internal notification to the site owner (every field, reply_to
//      set to the visitor so a reply goes straight back to them).
//   2. One tailored, warm follow-up to the visitor combining a section
//      per selected interest (never multiple emails).

import {
  INTEREST_KEYS,
  INTEREST_LABELS,
  type InterestKey,
  JESUS_URL,
  TRAINING_URL,
} from './shared.ts';
import type { NormalizedSubmission } from './validation.ts';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export interface SendResult {
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
export function primaryInterest(interests: InterestKey[]): InterestKey {
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

export async function sendEmail(
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

export function buildInternalEmail(
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

export function buildFollowUpEmail(
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
