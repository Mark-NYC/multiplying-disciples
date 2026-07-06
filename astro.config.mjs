import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production domain. Do not change without updating REDIRECTS.md
// and confirming DNS/hosting cutover with the site owner.
const SITE_URL = 'https://multiplyingdisciples.us';

export default defineConfig({
  site: SITE_URL,
  // WordPress served every migrated URL with a trailing slash
  // (e.g. /the-three-thirds/). Keep that behavior exactly so we
  // don't introduce redirect chains or duplicate-content issues.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // Exclude source-pending placeholder pages so the sitemap never
      // submits a noindex page to search engines. Update this list as
      // placeholders get replaced with real content (see
      // MIGRATION_PLAN.md / URL_INVENTORY.md) — it's a manual mirror of
      // every `status: source-pending` entry because sitemap filtering
      // runs outside the content collections pipeline.
      filter: (page) =>
        ![
          `${SITE_URL}/`,
          `${SITE_URL}/discover-the-12-disciples-of-jesus-christ/`,
          `${SITE_URL}/15-second-testimony-examples-ignite-your-faith/`,
          `${SITE_URL}/use-the-circles-gospel-presentation-step-by-step/`,
          `${SITE_URL}/movement-resources/7-stories-of-hope-complete-facilitation-guide/`,
        ].includes(page),
    }),
  ],
});
