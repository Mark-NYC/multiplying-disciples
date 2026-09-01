import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeImgDimensions from './src/lib/rehype-img-dimensions.mjs';

// Canonical production domain. Do not change without updating REDIRECTS.md
// and confirming DNS/hosting cutover with the site owner.
const SITE_URL = 'https://multiplyingdisciples.us';

// Build a pathname -> lastmod (YYYY-MM-DD) map from content frontmatter so
// the sitemap carries useful lastmod values (a re-crawl priority signal that
// matters most while the site recovers indexing after the WordPress → Astro
// migration). Read straight from disk at config load — astro:content isn't
// available in this context. Defensive by design: a page whose date can't be
// confidently parsed simply gets no lastmod (prior behavior), never a wrong
// one. Uses `updated` when present, else `date`.
function buildLastmodMap() {
  const contentRoot = fileURLToPath(new URL('./src/content', import.meta.url));
  const map = new Map();
  const dateLine = (body, key) =>
    body.match(new RegExp(`^${key}:\\s*"?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.mdx?$/.test(entry.name)) {
        const src = fs.readFileSync(full, 'utf8');
        const fm = src.match(/^---\n([\s\S]*?)\n---/);
        if (!fm) continue;
        const slug = fm[1].match(/^slug:\s*"?(\/[^"\n]*\/)"?/m)?.[1];
        if (!slug) continue;
        const lastmod = dateLine(fm[1], 'updated') ?? dateLine(fm[1], 'date');
        if (lastmod) map.set(slug, lastmod);
      }
    }
  };
  try {
    walk(contentRoot);
  } catch {
    /* leave the map empty on any read error — sitemap just omits lastmod */
  }
  return map;
}

const LASTMOD_BY_PATH = buildLastmodMap();

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
    // /search/ is a noindex utility page (see src/pages/search/) — keep
    // it out of the sitemap. Re-add a status filter here if a future
    // page gets added as a source-pending placeholder (see
    // MIGRATION_PLAN.md / URL_INVENTORY.md).
    sitemap({
      filter: (page) => !page.includes('/search/'),
      // Attach a real lastmod (from content frontmatter) to each URL we have
      // a date for; URLs without one are emitted unchanged.
      serialize(item) {
        const { pathname } = new URL(item.url);
        const lastmod = LASTMOD_BY_PATH.get(pathname);
        if (lastmod) item.lastmod = new Date(`${lastmod}T00:00:00Z`).toISOString();
        return item;
      },
    }),
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
