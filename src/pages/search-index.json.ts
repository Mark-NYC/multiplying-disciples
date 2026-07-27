// /search-index.json — the site search index, generated at build time
// from the same content collections the pages render from, so nothing
// unpublished or excluded can leak in. Consumed only by the /search/
// page (see src/pages/search/index.astro and SEARCH_SYSTEM.md).
//
// Inclusion rules:
//   - articles, hubs, and tools collections
//   - skip `exclude_from_search: true` (legal/contact/confirmation pages)
//   - skip `status: source-pending` placeholders
// Utility pages (exclude_from_blog) stay searchable on purpose —
// visitors reasonably search for "starter tools", "stickers", etc.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

interface SearchDoc {
  id: string;
  url: string;
  title: string;
  seo_title?: string;
  description: string;
  headings: string;
  body: string;
  type: 'Article' | 'Hub' | 'Tool';
  hub?: string;
}

// Cap per-page body text so one 300KB book page can't triple the whole
// index. Headings are indexed separately and never truncated, so deep
// sections stay findable by their titles even past the cap. 8000 chars
// ≈ the first ~1400 words of an article — enough for every body-match
// query tested in SEARCH_SYSTEM.md while keeping the index ~100KB gzipped.
const BODY_CHAR_CAP = 8000;

// Reduce a markdown/MDX source body to plain searchable text.
function plainText(body: string): string {
  return (
    body
      // MDX imports and JSX-comment blocks
      .replace(/^import .+$/gm, ' ')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
      // fenced code blocks
      .replace(/```[\s\S]*?```/g, ' ')
      // HTML/JSX tags (keeps inner text)
      .replace(/<[^>]+>/g, ' ')
      // images: drop entirely; links: keep the label
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      // bare URLs
      .replace(/https?:\/\/\S+/g, ' ')
      // markdown decoration
      .replace(/^#{1,6} /gm, '')
      .replace(/[*_`>|#]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function extractHeadings(body: string): string {
  const matches = body.match(/^#{2,4} .+$/gm) ?? [];
  return matches
    .map((h) => h.replace(/^#{2,4} /, '').replace(/[*_`]/g, '').trim())
    .join(' · ');
}

export const GET: APIRoute = async () => {
  const [articles, hubs, tools] = await Promise.all([
    getCollection('articles'),
    getCollection('hubs'),
    getCollection('tools'),
  ]);

  const hubTitleBySlug = new Map(
    hubs.map((hub) => [hub.data.slug.replace(/^\/|\/$/g, ''), hub.data.title]),
  );

  const docs: SearchDoc[] = [];

  for (const entry of articles) {
    if (entry.data.exclude_from_search || entry.data.status === 'source-pending') continue;
    const visibleTitle = entry.data.display_title ?? entry.data.title;
    const body = (entry as unknown as { body?: string }).body ?? '';
    docs.push({
      id: entry.data.slug,
      url: entry.data.slug,
      title: visibleTitle,
      // Full SEO title only when it differs — lets "complete guide"-style
      // phrasing still match without duplicating every title.
      seo_title: entry.data.title !== visibleTitle ? entry.data.title : undefined,
      description: entry.data.description,
      headings: extractHeadings(body),
      body: plainText(body).slice(0, BODY_CHAR_CAP),
      type: 'Article',
      hub: entry.data.hub ? hubTitleBySlug.get(entry.data.hub) : undefined,
    });
  }

  for (const entry of hubs) {
    if (entry.data.exclude_from_search || entry.data.status === 'source-pending') continue;
    docs.push({
      id: entry.data.slug,
      url: entry.data.slug,
      title: entry.data.title,
      description: entry.data.description,
      headings: '',
      body: plainText(entry.data.intro ?? ''),
      type: 'Hub',
    });
  }

  // Bespoke landing pages (src/pages/*.astro) aren't collection entries,
  // so the loops above can't see them — indexed by hand here, typed
  // 'Tool' (they're training/tool landings, not articles). Keep each in
  // sync with its page's source data.

  // /kingdom-ministry-training/ is intentionally NOT indexed for search
  // (per Mark's direction, 2026-07-27: KMT is not to be linked or
  // surfaced anywhere on the site). The page still exists at its URL but
  // is deliberately unlinked and unsearchable.

  // /starter-tools/ — the beginner disciple-making tutorial (bespoke
  // page, was an articles-collection entry before the tutorial rebuild).
  // Keep in sync with src/pages/starter-tools.astro (STEPS list).
  docs.push({
    id: '/starter-tools/',
    url: '/starter-tools/',
    title: 'Start Making Disciples',
    seo_title: 'Start Making Disciples: Simple Tools on a Napkin',
    description:
      'Three simple moves — find people, share Jesus, make disciples — and the hand-drawn field tools that help you take your next step with the people already around you.',
    headings:
      'Find people · Share Jesus · Make disciples · Start with people you already know · Share your story, then explain the gospel simply · When someone is open, meet again quickly · Tools are simple. Using them with real people takes practice. · Your first three moves · Use the Tools · Practice With Others',
    body:
      'How do I start making disciples? Start with the people God has already placed around you. Three simple moves: find people, share Jesus, make disciples. Find people: pay attention, pray, and begin intentional spiritual conversations with the people already in your life. Use the Conversation Box to name those people and track where each conversation is going, and use Follow and Fish to orient your first steps. Add five names. Share Jesus: say what Jesus has done in your life and draw the gospel simply with the 3 Circles, then build your 15-second testimony so you can share it naturally. Practice one tool until you can use it naturally. Make disciples: when someone is open, meet again quickly and help them obey Jesus, gather with others, and multiply. Start with a Three Thirds meeting and use the Church Waffle to check the twelve practices of a healthy church. Tools are simple, but using them with real people takes practice: learn, use, share, get feedback, repeat. Join a live practice lab and a community. Your first three moves: add five people to the Conversation Box, start one spiritual conversation, and practice with people who will help you keep going.',
    type: 'Tool',
  });

  // /about/ — the About page (bespoke landing). Keep in sync with
  // src/pages/about.astro.
  docs.push({
    id: '/about/',
    url: '/about/',
    title: 'About',
    seo_title: 'About Multiplying Disciples',
    description:
      'Multiplying Disciples helps ordinary Christians move from learning about disciple-making to actually making disciples — through simple tools, real practice, coaching, and a community of practitioners.',
    headings:
      'Why This Exists · Most Christians do not need more information. They need a way to begin. · What We Are Pursuing · The goal is multiplication. · Core Convictions · What shapes the work · Meet the Founder · Mark Goering · How to Begin · You do not need to have it all figured out.',
    body:
      'Ordinary Christians can make disciples. Multiplying Disciples helps people move from learning about disciple-making to actually doing it through simple tools, real-world practice, coaching, and a community of practitioners. Most Christians do not need more information; they need a way to begin. Many have spent years in church but still do not feel equipped to share the gospel, disciple someone, or help a simple church begin. People need simple tools they can use, real practice, coaching when they get stuck, and a tribe of practitioners who stay in the game. The goal is multiplication — not an audience around a ministry brand, but ordinary people who obey Jesus, make disciples, develop leaders, and start churches that multiply across generations: disciples to leaders to churches to generations. Core convictions: every follower of Jesus can make disciples; disciple-making begins with obedience, not expertise; the best tools are simple enough to reproduce; training is incomplete until it becomes practice; churches can begin wherever disciples gather and obey Jesus together; healthy disciples multiply disciples, leaders, and churches; coaching and community help people stay in the game; local obedience matters more than platform growth; the goal is generational fruit that outlives us. Mark Goering is a disciple-maker, church planter, and movement catalyst based in New York City. He founded Multiplying Disciples to give practitioners the simple tools, coaching, and community he wished more Christians had. He hosts the H3X podcast and helps lead CoVo Multipliers, and lives in Queens with his wife, Megan, and their twin sons. How to begin: learn, practice, find your tribe.',
    type: 'Tool',
  });

  // /stickers/ — keep in sync with that page's STICKERS list.
  docs.push({
    id: '/stickers/',
    url: '/stickers/',
    title: 'Stickers',
    description:
      'Quality, inexpensive movement stickers — 3 Circles, 15-Second Testimony, Prayer Wheel, 4 Fields, and Church Waffle — shared at cost on Sticker Mule.',
    headings: 'Movement Stickers · Every sticker is a tool you can learn',
    body:
      'Put the gospel in plain sight. A tool sticker on your phone, laptop, or water bottle keeps a gospel conversation one question away. We created this page as a service to you. Order inexpensive, quality stickers to help you share the gospel and advance the Kingdom — no profit is made from these links. 3 Circles Sticker, 15 Second Testimony Sticker, Prayer Wheel Sticker, 3 Circles Sticker Black, 4 Fields Sticker, Church Waffle Sticker. How it works: we upload quality sticker ready images to Sticker Mule and create shared cart links with very affordable pricing. Get $10 credit on Sticker Mule.',
    type: 'Tool',
  });

  for (const entry of tools) {
    if (entry.data.exclude_from_search || entry.data.status === 'source-pending') continue;
    const body = (entry as unknown as { body?: string }).body ?? '';
    docs.push({
      id: entry.data.slug,
      url: entry.data.slug,
      title: entry.data.title,
      description: entry.data.description,
      headings: extractHeadings(body),
      body: plainText(body).slice(0, BODY_CHAR_CAP),
      type: 'Tool',
    });
  }

  return new Response(JSON.stringify({ generated: new Date().toISOString(), docs }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
