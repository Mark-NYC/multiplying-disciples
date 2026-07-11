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
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
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
    // Opts a single article into ArticleLayoutV2 (the homepage-language
    // article design system) instead of the sitewide ArticleLayout.
    // Only set on the field-test articles; every other article is
    // untouched. See ARTICLE_DESIGN_SYSTEM.md.
    article_system: z.enum(['field-manual-v2']).optional(),
    // Article Hero fields, used only when article_system is set.
    hero_category: z.string().optional(),
    hero_subheading: z.string().optional(),
    hero_image: z.string().optional(),
    hero_image_alt: z.string().optional(),
    hero_image_caption: z.string().optional(),
    // Closing ArticleCTA, used only when article_system is set. Omit
    // entirely for the default "Ready to practice this?" copy; set
    // cta_variant: "tool-first" to swap which action is primary.
    cta_variant: z.enum(['default', 'tool-first']).optional(),
    cta_heading: z.string().optional(),
    cta_body: z.string().optional(),
    cta_primary_label: z.string().optional(),
    cta_primary_url: z.string().optional(),
    cta_secondary_label: z.string().optional(),
    cta_secondary_url: z.string().optional(),
    ...migrationFields,
  }),
});

// Field Notes are short, real, approved proof-of-practice stories —
// deliberately a separate collection from articles so a note can be
// authored, held back, or reused without touching any article's own
// content. An article references one by id (see the FieldNote
// component); an unapproved or missing id renders nothing. See
// FIELD_NOTE_TEMPLATE.md for the copy-paste authoring template and
// ARTICLE_DESIGN_SYSTEM.md for how this wires into an article.
const fieldNotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/field-notes' }),
  schema: z.object({
    number: z.string().optional(),
    location: z.string().optional(),
    date: z.string().optional(),
    headline: z.string().optional(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    image_caption: z.string().optional(),
    attribution: z.string().optional(),
    related_tool: z.string().optional(),
    related_article: z.string().optional(),
    // Must be explicitly true to render publicly. Defaults to false so
    // a note being drafted can never accidentally go live.
    approved: z.boolean().default(false),
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

export const collections = { articles, tools, hubs, fieldNotes };
