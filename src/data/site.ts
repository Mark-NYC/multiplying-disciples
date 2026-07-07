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
} as const;
