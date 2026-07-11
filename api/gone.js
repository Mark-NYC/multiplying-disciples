// Vercel serverless function that returns a real HTTP 410 Gone.
// vercel.json rewrites intentionally-retired URLs here instead of 301
// redirecting them somewhere unrelated — see
// CONTENT_SIMPLIFICATION_REMOVAL_MANIFEST.md for which URLs and why.
// Static hosting (Vercel's redirects config) can only emit 3xx, so a
// genuine 410 requires this small function.
export default function handler(req, res) {
  res.status(410);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(
    '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
      '<title>410 Gone</title></head><body>' +
      '<h1>410 Gone</h1>' +
      '<p>This page has been permanently removed and will not return.</p>' +
      '<p><a href="/">Go to the homepage</a></p>' +
      '</body></html>'
  );
}
