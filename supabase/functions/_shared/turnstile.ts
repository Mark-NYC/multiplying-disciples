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

export interface TurnstileEnv {
  secret: string | undefined;
  devBypass: boolean;
}

export interface TurnstileResult {
  ok: boolean;
  // True when verification was skipped (dev bypass, or not yet configured).
  skipped?: boolean;
  reason?: string;
}

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Reads the Turnstile config from function secrets. CONNECT_-prefixed so
// it never collides with CoVo's TURNSTILE_SECRET_KEY on the shared project.
export function turnstileEnv(): TurnstileEnv {
  return {
    secret: Deno.env.get('CONNECT_TURNSTILE_SECRET_KEY') || undefined,
    devBypass: Deno.env.get('CONNECT_TURNSTILE_DEV_BYPASS') === 'true',
  };
}

export async function verifyTurnstile(
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
