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

  // /kingdom-ministry-training/ — keep in sync with that page's
  // SESSIONS list.
  docs.push({
    id: '/kingdom-ministry-training/',
    url: '/kingdom-ministry-training/',
    title: 'Kingdom Ministry Training',
    description:
      'Bridging the theology and practice of spiritual gifts through hands-on training — hearing God, prophecy, healing prayer, and power evangelism.',
    headings:
      'Hearing God for Self · Practicing Prophecy · Building a Community of Practice · Simple 5-Step Healing Prayer Model (GAPAP) · Power Evangelism · Build a healthy Kingdom Ministry learning community',
    body:
      'Do what Jesus did. Jesus proclaimed and demonstrated the gospel of the Kingdom. Jesus not only shared the good news — He also demonstrated it in the power of the Holy Spirit (Matthew 4:23). Five sessions with teaching, tools, and activations: hearing God, prophecy, healing prayer (GAPAP, adapted from John Wimber’s 5-Step Model), power evangelism, and building a community of practice, including how to lead and start a 1 Corinthians 14 meeting. Discipleship packet: a regular equipping and self-correcting rhythm for emerging and established networks.',
    type: 'Tool',
  });

  // /starter-tools/ — the beginner disciple-making tutorial (bespoke
  // page, was an articles-collection entry before the tutorial rebuild).
  // Keep in sync with src/pages/starter-tools.astro (STEPS list).
  docs.push({
    id: '/starter-tools/',
    url: '/starter-tools/',
    title: 'Start Making Disciples',
    seo_title: 'Start Making Disciples: Simple Tools & Coaching',
    description:
      'Learn how to start making disciples with simple tools for relationships, gospel conversations, follow-up, and simple church — plus coaching and community to keep going.',
    headings:
      'Tools help you obey. They do not make disciples for you. · One connected pathway · See the people God has already placed around you · Start spiritual conversations · Share your story and the gospel · Help interested people obey Jesus · Gather disciples as church · Help them do the same with others · You cannot learn disciple making alone · Your first three moves · Three ways to keep going',
    body:
      'How do I start making disciples? You do not need to master a program before you begin. You need a few simple tools, real people to practice with, and help taking your next step. Tools help you obey; they do not make disciples for you. Multiplying Disciples shows you the pathway, Obey.Tools gives you the tools, and CoVo Multipliers gives you people to practice with and coaching to keep going. The pathway: map the people around you and pray, start spiritual conversations, share your story and the gospel with the 3 Circles, help interested people obey Jesus through the Commands of Christ, gather disciples as simple church, and help them do the same with others. Learn one simple tool, use it with a real person, share what happened, receive feedback, set the next goal, and repeat. Your first three moves: map five people, start one spiritual conversation, and join a place where you can practice and receive coaching.',
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
