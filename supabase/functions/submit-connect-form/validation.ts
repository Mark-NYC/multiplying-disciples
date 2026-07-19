// Server-side validation and normalization for the Connect form.
//
// Never trust the client: every field is re-validated and normalized
// here regardless of what the browser did. Returns a normalized
// submission on success, or a flat list of human-readable errors.

import {
  INTEREST_KEYS,
  type InterestKey,
  LIMITS,
  type NormalizedSubmission,
} from '../_shared/model.ts';

export type ValidationResult =
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

export function validate(body: Record<string, unknown>): ValidationResult {
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
