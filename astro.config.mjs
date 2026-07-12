import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeImgDimensions from './src/lib/rehype-img-dimensions.mjs';

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
    // Powers the .mdx articles, so InsightCard/PracticeCard/etc. can be
    // used as real components instead of raw HTML divs. Plain .md
    // articles run through the same shared article layout.
    mdx(),
  ],
  markdown: {
    // Real width/height + lazy loading on every markdown image — see
    // src/lib/rehype-img-dimensions.mjs. Inherited by MDX too.
    rehypePlugins: [rehypeImgDimensions],
  },
});
