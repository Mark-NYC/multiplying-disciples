import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production domain. Do not change without updating REDIRECTS.md
// and confirming DNS/hosting cutover with the site owner.
const SITE_URL = 'https://multiplyingdisciples.us';

export default defineConfig({
  site: SITE_URL,
  // WordPress served every migrated URL with a trailing slash
  // (e.g. /three-thirds/). Keep that behavior exactly so we
  // don't introduce redirect chains or duplicate-content issues.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    // Phase 1 batch (homepage + 4 articles) now has real, lightly-improved
    // content — status: migrated, no exclusions needed. Re-add a filter
    // here if a future page gets added as a source-pending placeholder
    // (see MIGRATION_PLAN.md / URL_INVENTORY.md).
    sitemap(),
  ],
});
