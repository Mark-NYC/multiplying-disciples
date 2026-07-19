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
export function corsHeaders(req: Request): Record<string, string> {
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
