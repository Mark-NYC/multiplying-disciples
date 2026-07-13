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

  // /kingdom-ministry-training/ is a bespoke landing page
  // (src/pages/kingdom-ministry-training.astro), not a collection entry,
  // so the loops above can't see it — indexed by hand so its five named
  // skills stay findable. Keep this in sync with that page's SESSIONS
  // list. Typed 'Tool' (it's a training/tool landing, not an article).
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
