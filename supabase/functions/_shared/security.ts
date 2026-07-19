// Client-IP extraction + privacy-preserving hashing for rate limiting.
//
// We never store a raw IP. The salted SHA-256 hash is only ever used to
// count recent submissions from the same source; it can't be reversed to
// an address without the salt.

export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('cf-connecting-ip') || 'unknown';
}

// Salted SHA-256, hex-encoded. The salt comes from CONNECT_IP_HASH_SALT
// (falls back to an empty salt if unset — set it in production so hashes
// aren't guessable from a known IP).
export async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
