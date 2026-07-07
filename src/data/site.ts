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

// CoVo Multipliers live training-lab schedule. Used by the header CTA,
// homepage, and article closing CTA band — kept here as the single
// source of truth so it can't drift between call sites.
export const COVO_LABS_URL = 'https://www.covomultipliers.com/#upcoming-labs';
export const COVO_HOME_URL = 'https://www.covomultipliers.com/';

// Public Supabase project CoVo Multipliers uses for its live lab
// schedule. This is the same project ref and anon key CoVo already
// ships client-side in its own cross-origin "next lab" embed widget
// (covo-multipliers/embeds/next-lab-widget.html) — Row Level Security
// restricts the anon role to published, public-safe columns only, so
// it's safe to call from here too.
export const COVO_SUPABASE_URL = 'https://mryjrvinzbxebzvxtggi.supabase.co';
export const COVO_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yeWpydmluemJ4ZWJ6dnh0Z2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzQ3MzksImV4cCI6MjA5MTg1MDczOX0.U1JJQTBVKePsVFXr2oFRCdUZasWaZiTQg6g8QrFdRyw';
export const COVO_SUBSCRIBE_FUNCTION_URL =
  'https://mryjrvinzbxebzvxtggi.supabase.co/functions/v1/subscribe-updates';
