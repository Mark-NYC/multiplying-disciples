// Content-based spam scoring for the Connect form.
//
// Turnstile + the honeypot stop most bots, but some spam always slips
// through (paid CAPTCHA solvers, real-browser automation, click farms).
// The tell is almost always the same on a ministry "connect" form: the
// submission carries LINKS and promotional keywords no real seeker would
// send. This module scores that content so the caller can drop it
// silently — exactly like the honeypot — giving the spammer no signal.
//
// Design goals:
//   * High precision. A genuine global seeker must never be dropped, so
//     the rules that fire on their own are ones with essentially no
//     legitimate use (a URL inside a *name*, HTML/BBCode link markup,
//     several URLs at once). Softer signals only add to a score and need
//     to corroborate before crossing the threshold.
//   * Pure + dependency-free. No imports, so the Dashboard bundler can
//     inline it and it stays trivially testable.
//
// It inspects only the normalized fields; the caller passes the validated
// submission. It never throws.

export interface SpamInput {
  first_name: string;
  country: string;
  postal_code: string;
  other_interest: string | null;
  message: string | null;
}

export interface SpamResult {
  spam: boolean;
  score: number;
  reason: string;
}

// Score at or above which a submission is treated as spam.
const SPAM_THRESHOLD = 3;

// Bare URLs (http/https, protocol-relative, or a naked www.host) and the
// "domain-dot-tld/path" shape spammers use to dodge an http:// check.
const URL_RE =
  /\b(?:https?:\/\/|www\.)[^\s]+|\b[a-z0-9][a-z0-9-]*\.(?:com|net|org|io|ru|top|xyz|buzz|club|online|site|shop|info|biz|cn|link|live|store|vip|icu)\b(?:\/[^\s]*)?/gi;

// HTML anchors and BBCode link markup — a dead giveaway of an automated
// SEO/link-spam post; no human types these into a contact form.
const MARKUP_RE = /<\s*a\s+[^>]*href|\[url[=\]]|\[\/url\]|\[link[=\]]/i;

// Spammy TLDs seen inside a URL (bumps the score of any link that uses one).
const SPAMMY_TLD_RE = /\.(?:ru|top|xyz|buzz|club|online|icu|vip|cn|store)\b/i;

// Keyword categories. pharma / adult / gambling essentially never appear
// in a genuine ministry-connect message, so they weigh more; the rest are
// plausible in real text and only nudge the score.
const KEYWORD_CATEGORIES: Array<{ weight: number; re: RegExp }> = [
  {
    weight: 2,
    re: /\b(?:viagra|cialis|levitra|tadalafil|pharmacy|prescription|meds\s*online)\b/i,
  },
  { weight: 2, re: /\b(?:porn|xxx|escort|sex\s*cam|adult\s*dating|hookup)\b/i },
  {
    weight: 2,
    re: /\b(?:casino|gambl(?:e|ing)|betting|poker|slots|jackpot|sportsbook)\b/i,
  },
  {
    weight: 1,
    re: /\b(?:seo|backlink|rank(?:ing)?\s+(?:your|on\s+google)|web\s*traffic|guest\s*post|link\s*building|digital\s*marketing)\b/i,
  },
  {
    weight: 1,
    re: /\b(?:crypto(?:currency)?|bitcoin|forex|binary\s*options|investment\s*opportunity|payday\s*loan)\b/i,
  },
  {
    weight: 1,
    re: /\b(?:buy\s*now|order\s*now|cheap|discount|best\s*price|limited\s*offer|earn\s*\$?\d|make\s*money)\b/i,
  },
];

function countUrls(s: string): number {
  const m = s.match(URL_RE);
  return m ? m.length : 0;
}

// A real first name is short and word-like: no URLs (checked separately),
// no digits, and not a whole sentence.
function nameLooksSpammy(name: string): boolean {
  if (/\d/.test(name)) return true;
  if (name.trim().split(/\s+/).length > 6) return true;
  return false;
}

export function spamCheck(input: SpamInput): SpamResult {
  const identity = [input.first_name, input.country, input.postal_code];
  const freeText = [input.other_interest ?? '', input.message ?? ''];
  const all = [...identity, ...freeText].join('\n');

  // --- Hard rules (fire on their own) --------------------------------
  // A link inside a name / country / postal field: no legitimate reason.
  for (const field of identity) {
    URL_RE.lastIndex = 0;
    if (URL_RE.test(field)) {
      return { spam: true, score: SPAM_THRESHOLD, reason: 'url_in_identity_field' };
    }
  }
  // HTML/BBCode link markup anywhere.
  if (MARKUP_RE.test(all)) {
    return { spam: true, score: SPAM_THRESHOLD, reason: 'link_markup' };
  }
  // Several URLs across the free-text fields at once.
  const urlCount = freeText.reduce((n, t) => n + countUrls(t), 0);
  if (urlCount >= 2) {
    return { spam: true, score: SPAM_THRESHOLD, reason: 'multiple_urls' };
  }

  // --- Scored rules (need to corroborate) ----------------------------
  let score = 0;
  const reasons: string[] = [];

  if (urlCount === 1) {
    score += 2;
    reasons.push('url');
  }
  if (SPAMMY_TLD_RE.test(all)) {
    score += 2;
    reasons.push('spammy_tld');
  }
  if (nameLooksSpammy(input.first_name)) {
    score += 2;
    reasons.push('name_anomaly');
  }
  for (const { weight, re } of KEYWORD_CATEGORIES) {
    if (re.test(all)) {
      score += weight;
      reasons.push('kw');
    }
  }

  return {
    spam: score >= SPAM_THRESHOLD,
    score,
    reason: reasons.join('+') || 'clean',
  };
}
