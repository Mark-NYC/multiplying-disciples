// Shared constants for the submit-connect-form Edge Function.
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
} as const;
