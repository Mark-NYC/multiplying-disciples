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

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { submissionFromRow } from '../_shared/model.ts';
import { buildFollowUpEmail, buildInternalEmail, sendEmail } from '../_shared/emails.ts';

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
