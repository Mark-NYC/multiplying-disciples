import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every migrated page must be traceable back to its original WordPress URL
// and its Search Console priority tier until the full export replaces
// "unknown"/"source-pending" placeholders. See URL_INVENTORY.md.
const migrationFields = {
  status: z.enum(['source-pending', 'migrated-draft', 'migrated', 'published']),
  migration_priority: z.enum(['tier-1', 'tier-2', 'tier-3', 'unknown']),
  // Optional because new pages (like hubs) don't have a WordPress
  // original. Required in practice for anything migrated 1:1 from
  // WordPress — see URL_INVENTORY.md.
  original_url: z.string().url().optional(),
  notes: z.string().optional(),
};

const externalLink = z.object({
  label: z.string(),
  url: z.string().url(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Full site-relative path, exactly matching the live WordPress URL,
    // e.g. "/discover-the-12-disciples-of-jesus-christ/". This is what
    // drives routing in src/pages/[...slug].astro, NOT the filename.
    slug: z.string().regex(/^\/.*\/$/, 'slug must start and end with "/"'),
    canonical: z.string().url(),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    primary_keyword: z.string().optional(),
    secondary_keywords: z.array(z.string()).default([]),
    category: z.string().optional(),
    // Slug of a hub in src/content/hubs/, e.g. "testimony".
    hub: z.string().optional(),
    related_articles: z.array(z.string()).default([]),
    related_tools: z.array(z.string()).default([]),
    external_links: z.array(externalLink).default([]),
    og_image: z.string().optional(),
    // True for utility/legal pages (e.g. /privacy-policy/) that should
    // exist as a real page but not appear in the /blog/ article index.
    exclude_from_blog: z.boolean().default(false),
    ...migrationFields,
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().regex(/^\/.*\/$/, 'slug must start and end with "/"'),
    canonical: z.string().url(),
    // Where this tool actually lives, if not on this site
    // (e.g. a CoVo Multipliers or Obey.Tools page).
    external_url: z.string().url().optional(),
    related_articles: z.array(z.string()).default([]),
    ...migrationFields,
  }),
});

const hubs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hubs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().regex(/^\/.*\/$/, 'slug must start and end with "/"'),
    canonical: z.string().url(),
    intro: z.string(),
    key_articles: z.array(z.string()).default([]),
    related_tools: z.array(z.string()).default([]),
    next_step: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    ...migrationFields,
  }),
});

export const collections = { articles, tools, hubs };
