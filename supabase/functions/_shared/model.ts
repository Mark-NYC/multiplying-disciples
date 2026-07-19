// Shared model for the Connect form functions.
//
// The canonical interest keys are the single source of truth shared by
// validation (which values are accepted), the internal notification
// (which interests to list), and the tailored follow-up (which sections
// to include). The front end sends these exact keys.

export type InterestKey = 'connecting' | 'training' | 'learning' | 'other';

export const INTEREST_KEYS: InterestKey[] = [
  'connecting',
  'training',
  'learning',
  'other',
];

// Human labels for the notification email and subject line. Order here
// also defines "primary interest" precedence: the first selected key in
// this order is the one used in the notification subject.
export const INTEREST_LABELS: Record<InterestKey, string> = {
  connecting: 'Connecting with local believers',
  training: 'Getting trained to make disciples',
  learning: 'Learning more about Jesus',
  other: 'Other',
};

// Live, verified on-site destinations used by the tailored follow-up.
// These are real pages on multiplyingdisciples.us — do not invent URLs.
export const SITE_URL = 'https://multiplyingdisciples.us';
// "Start Making Disciples" — the site's beginner training pathway
// (src/pages/starter-tools.astro).
export const TRAINING_URL = `${SITE_URL}/starter-tools/`;
// "Stories of Hope" — the welcoming Bible-discovery entry point for a
// seeker (src/content/hubs/stories-of-hope.md).
export const JESUS_URL = `${SITE_URL}/stories-of-hope/`;

// Field size limits. Anything larger is rejected as oversized content.
export const LIMITS = {
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
export const RATE_WINDOW_SECONDS = 60;
export const RATE_MAX = 5;

// The normalized, validated shape stored in connect_submissions. Shared
// so the retry function can rebuild emails from a stored row without
// depending on the request-validation module.
export interface NormalizedSubmission {
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
export function submissionFromRow(row: Record<string, unknown>): NormalizedSubmission {
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
