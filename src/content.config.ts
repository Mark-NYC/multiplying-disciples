import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every migrated page must be traceable back to its original WordPress URL
// and its Search Console priority tier until the full export replaces
// "unknown"/"source-pending" placeholders. See URL_INVENTORY.md.
const migrationFields = {
  // Removes a page from the site search index (/search-index.json —
  // see SEARCH_SYSTEM.md). Independent of exclude_from_blog: utility
  // pages like /starter-tools/ stay searchable, while legal/contact/
  // registration-confirmation pages set this to true. source-pending
  // placeholders are always excluded regardless of this flag.
  exclude_from_search: z.boolean().default(false),
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

// Canonical end-of-article CTA config — see CTA_GUIDE.md for the full
// authoring reference. Exactly three renderable types: "tool" (the
// Practice CTA), "lab" (the Lab CTA), and "community" (the Tribe CTA),
// plus "none". Fallback when the block is absent: editorial articles
// get the default Lab CTA; utility pages (exclude_from_blog: true)
// get none — see ArticleLayout.astro. `type` defaults to "lab" once
// the block exists, since a lab invite is the right next step for
// most practical articles.
//
// `destination` is required for "tool" and "community" (there's no
// sitewide default tool/community URL to fall back to — the author
// must supply one), optional/ignored for "lab" and "none". Never put
// a lab title, date, seat count, or URL here — those are always
// fetched live from CoVo's public-labs feed (src/lib/labs-feed.js).
const articleCta = z
  .object({
    type: z.enum(['lab', 'tool', 'community', 'none']).default('lab'),
    stakes_headline: z.string().optional(),
    bridge_copy: z.string().optional(),
    // Optional per-article override for the CTA lead image. Each CTA
    // type has a standardized, type-mapped default image (in
    // ArticleCTA.astro); leave these off to use it. Set both together
    // only when the standardized image genuinely doesn't fit the
    // article's specific destination — e.g. a tool CTA that points at
    // the testimony exercise rather than the default Conversation Box.
    // See CTA_GUIDE.md.
    image: z.string().optional(),
    image_alt: z.string().optional(),
    destination: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
  })
  .optional();

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    // Optional human-written headline for the visible <h1> and page
    // hero. `title` stays the full SEO/keyword title used in <title>,
    // Open Graph, Twitter cards, and structured data (via SEO.astro) —
    // never shown to a reader. When display_title is absent, the H1
    // falls back to `title` (legacy/unconverted articles are
    // unaffected). See ARTICLE_SYSTEM.md ("Article hero").
    display_title: z.string().optional(),
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
    // Utility pages also skip the share row, reading meta, and the
    // automatic end-of-article CTA (see ArticleLayout.astro).
    exclude_from_blog: z.boolean().default(false),
    // Showcases the article in the /blog/ index's featured band (3
    // slots; first flagged article in index order becomes the large
    // lead card). If fewer than 3 articles are flagged the band fills
    // from the top of the index so it always shows exactly 3. Needs a
    // strong og_image/hero_image to earn the slot.
    featured: z.boolean().default(false),
    // Article Hero fields (see ARTICLE_SYSTEM.md, "Article hero").
    // No eyebrow by default — the breadcrumb already carries the
    // hub/category context, so a matching eyebrow just repeats it.
    // Set hero_eyebrow
    // only in the rare case where it adds real, new context the reader
    // can't get from the breadcrumb or H1 — e.g. "Field Guide", "Case
    // Study", "Tool", "Biblical Framework". Never the hub name, a
    // keyword, or a restatement of the title.
    hero_eyebrow: z.string().optional(),
    hero_subheading: z.string().optional(),
    hero_image: z.string().optional(),
    hero_image_alt: z.string().optional(),
    hero_image_caption: z.string().optional(),
    // Opt out of the automatic "In This Article" table of contents that
    // ArticleLayout otherwise renders for any article with 3+ H2s.
    // Off (TOC shows) by default everywhere; only set true when an
    // article's own search intent is better served by getting straight
    // to the content the reader came for (e.g. an order/list infographic)
    // than by a contents box first.
    hide_toc: z.boolean().optional(),
    // Canonical end-of-article CTA (see comment above the articleCta
    // schema and CTA_GUIDE.md).
    article_cta: articleCta,
    ...migrationFields,
  }),
});

// Field Notes are short, real, approved proof-of-practice stories —
// deliberately a separate collection from articles so a note can be
// authored, held back, or reused without touching any article's own
// content. An article references one by id (see the FieldNote
// component); an unapproved or missing id renders nothing. See
// FIELD_NOTE_TEMPLATE.md for the copy-paste authoring template and
// ARTICLE_SYSTEM.md for how this wires into an article.
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
