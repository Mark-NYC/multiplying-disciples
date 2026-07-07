// Site-wide constants used by the SEO component and layouts.
// Keep this the single source of truth for the canonical domain
// so it can never drift from astro.config.mjs.
export const SITE = {
  name: 'Multiplying Disciples',
  url: 'https://multiplyingdisciples.us',
  description:
    'A practical disciple-making library: tools, articles, and next steps for evangelism, discipleship, and church planting movements.',
  // Real footer tagline and contact details as published on the live
  // WordPress site (multiplyingdisciples.us) — not fabricated for the
  // Astro migration.
  tagline: 'Multiplying disciples, leaders, and churches in every people and place.',
  contactEmail: 'contact@multiplyingdisciples.us',
  address: 'Flushing, NY 11367 United States',
  locale: 'en_US',
  twitter: '',
  // Real social profile URLs, provided directly by the site owner.
  social: {
    facebook: 'https://www.facebook.com/multiplyingdisciplesokc',
    instagram: 'https://instagram.com/multiplyingdisciples',
    youtube: 'https://www.youtube.com/channel/UC5-Mmcp5NHhmyVB0seaE4RQ',
    substack: 'https://multiplyingdisciples.substack.com/',
  },
} as const;

// CoVo Multipliers live training-lab schedule. Used by the header CTA
// and as the fallback destination when a lab has no landing page yet —
// kept here as the single source of truth so it can't drift between
// call sites.
export const COVO_LABS_URL = 'https://www.covomultipliers.com/#upcoming-labs';
export const COVO_HOME_URL = 'https://www.covomultipliers.com/';

// Actual lab data (titles, dates, descriptions, seat counts, landing
// page URLs) is never hardcoded here — it's fetched live from CoVo's
// public-labs Edge Function, the single source of truth shared by CoVo's
// own homepage and every MD lab CTA. src/lib/labs-feed.js is the only
// place that should import these two.
export const COVO_LABS_FEED_URL =
  'https://mryjrvinzbxebzvxtggi.supabase.co/functions/v1/public-labs';
export const COVO_SUBSCRIBE_FUNCTION_URL =
  'https://mryjrvinzbxebzvxtggi.supabase.co/functions/v1/subscribe-updates';
