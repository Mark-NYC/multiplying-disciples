// Site-wide constants used by the SEO component and layouts.
// Keep this the single source of truth for the canonical domain
// so it can never drift from astro.config.mjs.
export const SITE = {
  name: 'Multiplying Disciples',
  url: 'https://multiplyingdisciples.us',
  description:
    'A practical disciple-making library: tools, articles, and next steps for evangelism, discipleship, and church planting movements.',
  locale: 'en_US',
  twitter: '',
} as const;

// Sister sites we link out to for training/tribe (CoVo Multipliers)
// and practical tools (Obey.Tools). We link to these, we do not
// duplicate their content here.
export const SISTER_SITES = {
  covoMultipliers: {
    name: 'CoVo Multipliers',
    url: 'https://covomultipliers.com',
  },
  obeyTools: {
    name: 'Obey.Tools',
    url: 'https://obey.tools',
  },
} as const;
